import { describe, it, expect } from "vitest";
import { buildPersonalityBreakdown, fillDailySeries } from "./stats";
import { personalities } from "./quiz-data";

describe("buildPersonalityBreakdown", () => {
  it("includes every personality, even ones with zero signups", () => {
    const result = buildPersonalityBreakdown([
      { personality: "bold-adventurer", count: 3 },
    ]);
    expect(result).toHaveLength(personalities.length);
  });

  it("sorts by count descending", () => {
    const result = buildPersonalityBreakdown([
      { personality: "bold-adventurer", count: 2 },
      { personality: "cozy-classic", count: 5 },
      { personality: "night-owl", count: 1 },
    ]);
    expect(result[0].personality.id).toBe("cozy-classic");
    expect(result[1].personality.id).toBe("bold-adventurer");
  });

  it("computes percentages relative to the total", () => {
    const result = buildPersonalityBreakdown([
      { personality: "bold-adventurer", count: 1 },
      { personality: "cozy-classic", count: 3 },
    ]);
    const bold = result.find((r) => r.personality.id === "bold-adventurer");
    const cozy = result.find((r) => r.personality.id === "cozy-classic");
    expect(bold?.percentage).toBe(25);
    expect(cozy?.percentage).toBe(75);
  });

  it("handles zero total signups without dividing by zero", () => {
    const result = buildPersonalityBreakdown([]);
    expect(result.every((r) => r.count === 0 && r.percentage === 0)).toBe(
      true
    );
  });
});

describe("fillDailySeries", () => {
  const now = new Date("2026-08-26T12:00:00Z");

  it("returns exactly `days` consecutive days ending on `now`", () => {
    const result = fillDailySeries([], 5, now);
    expect(result.map((r) => r.day)).toEqual([
      "2026-08-22",
      "2026-08-23",
      "2026-08-24",
      "2026-08-25",
      "2026-08-26",
    ]);
  });

  it("fills in zero for days with no signups", () => {
    const result = fillDailySeries(
      [{ day: "2026-08-24", count: 4 }],
      5,
      now
    );
    expect(result.find((r) => r.day === "2026-08-24")?.count).toBe(4);
    expect(result.find((r) => r.day === "2026-08-22")?.count).toBe(0);
  });
});

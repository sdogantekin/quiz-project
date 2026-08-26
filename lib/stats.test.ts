import { describe, it, expect } from "vitest";
import {
  buildPersonalityBreakdown,
  fillDailySeries,
  buildFunnelSummary,
  buildShareMethodBreakdown,
} from "./stats";
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

describe("buildFunnelSummary", () => {
  it("returns all 5 funnel steps in a fixed order, even with no data", () => {
    const result = buildFunnelSummary([]);
    expect(result.map((s) => s.name)).toEqual([
      "quiz_started",
      "quiz_completed",
      "email_submitted",
      "share_clicked",
      "quiz_retaken",
    ]);
    expect(result.every((s) => s.count === 0)).toBe(true);
  });

  it("computes percentage relative to quiz_started", () => {
    const result = buildFunnelSummary([
      { name: "quiz_started", count: 10 },
      { name: "quiz_completed", count: 6 },
      { name: "email_submitted", count: 3 },
    ]);
    expect(result.find((s) => s.name === "quiz_completed")?.percentage).toBe(
      60
    );
    expect(
      result.find((s) => s.name === "email_submitted")?.percentage
    ).toBe(30);
  });

  it("doesn't divide by zero when quiz_started is missing", () => {
    const result = buildFunnelSummary([{ name: "quiz_completed", count: 2 }]);
    expect(
      result.find((s) => s.name === "quiz_completed")?.percentage
    ).toBeGreaterThanOrEqual(0);
  });
});

describe("buildShareMethodBreakdown", () => {
  it("labels known methods and sorts by count descending", () => {
    const result = buildShareMethodBreakdown([
      { method: "copy_link", count: 2 },
      { method: "twitter", count: 5 },
      { method: "native", count: 1 },
    ]);
    expect(result[0]).toMatchObject({ label: "Share on X", count: 5 });
    expect(result.map((r) => r.label)).toContain("Copy link");
    expect(result.map((r) => r.label)).toContain("Native share");
  });

  it("computes percentage relative to the total", () => {
    const result = buildShareMethodBreakdown([
      { method: "twitter", count: 3 },
      { method: "copy_link", count: 1 },
    ]);
    expect(result.find((r) => r.label === "Share on X")?.percentage).toBe(75);
  });

  it("falls back to the raw method name for unknown methods", () => {
    const result = buildShareMethodBreakdown([
      { method: "carrier_pigeon", count: 1 },
    ]);
    expect(result[0].label).toBe("carrier_pigeon");
  });
});

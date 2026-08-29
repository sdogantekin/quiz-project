import { describe, it, expect } from "vitest";
import { getWindowStart } from "./rate-limit";

describe("getWindowStart", () => {
  it("truncates down to the start of a 10-minute window", () => {
    const now = new Date("2026-08-29T10:07:32Z");
    const start = getWindowStart(now, 600);
    expect(start.toISOString()).toBe("2026-08-29T10:00:00.000Z");
  });

  it("maps two timestamps in the same window to the same window start", () => {
    const a = getWindowStart(new Date("2026-08-29T10:00:01Z"), 600);
    const b = getWindowStart(new Date("2026-08-29T10:09:59Z"), 600);
    expect(a.getTime()).toBe(b.getTime());
  });

  it("maps timestamps in adjacent windows to different window starts", () => {
    const a = getWindowStart(new Date("2026-08-29T10:09:59Z"), 600);
    const b = getWindowStart(new Date("2026-08-29T10:10:00Z"), 600);
    expect(a.getTime()).not.toBe(b.getTime());
  });

  it("works with a different window size (5 minutes)", () => {
    const start = getWindowStart(new Date("2026-08-29T10:07:32Z"), 300);
    expect(start.toISOString()).toBe("2026-08-29T10:05:00.000Z");
  });
});

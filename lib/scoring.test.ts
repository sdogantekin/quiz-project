import { describe, it, expect } from "vitest";
import { getWinningIndex } from "./scoring";
import { personalities, questions } from "./quiz-data";

describe("getWinningIndex", () => {
  it("picks the personality with the highest score", () => {
    expect(getWinningIndex([1, 4, 0, 2, 0])).toBe(1);
  });

  it("breaks ties by picking the first personality that reached the max", () => {
    expect(getWinningIndex([3, 3, 0, 0, 0])).toBe(0);
  });

  it("handles an all-zero starting state", () => {
    expect(getWinningIndex([0, 0, 0, 0, 0])).toBe(0);
  });

  it("picks the last personality when it's the clear winner", () => {
    expect(getWinningIndex([1, 1, 1, 1, 5])).toBe(4);
  });
});

describe("quiz data integrity", () => {
  it("gives every question exactly one answer per personality", () => {
    for (const q of questions) {
      expect(q.answers).toHaveLength(personalities.length);
    }
  });

  it("has a unique icon and image for every personality", () => {
    const icons = new Set(personalities.map((p) => p.icon));
    const images = new Set(personalities.map((p) => p.image));
    expect(icons.size).toBe(personalities.length);
    expect(images.size).toBe(personalities.length);
  });
});

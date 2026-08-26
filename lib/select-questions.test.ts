import { describe, it, expect } from "vitest";
import { selectQuizQuestions } from "./select-questions";
import { questions } from "./quiz-data";

describe("selectQuizQuestions", () => {
  it("returns exactly `count` questions when the pool is larger", () => {
    const result = selectQuizQuestions(questions, 10);
    expect(result).toHaveLength(10);
  });

  it("never returns duplicates", () => {
    const result = selectQuizQuestions(questions, 10);
    const unique = new Set(result.map((q) => q.question));
    expect(unique.size).toBe(10);
  });

  it("only returns questions that exist in the pool", () => {
    const result = selectQuizQuestions(questions, 10);
    const poolTexts = new Set(questions.map((q) => q.question));
    expect(result.every((q) => poolTexts.has(q.question))).toBe(true);
  });

  it("caps at the pool size when `count` exceeds it", () => {
    const smallPool = questions.slice(0, 3);
    const result = selectQuizQuestions(smallPool, 10);
    expect(result).toHaveLength(3);
  });

  it("is deterministic given the same injected random sequence", () => {
    const pool = questions.slice(0, 5);
    const fixedSequence = [0.1, 0.2, 0.3, 0.4];
    let i = 0;
    const random = () => fixedSequence[i++ % fixedSequence.length];

    const a = selectQuizQuestions(pool, 5, random);
    i = 0;
    const b = selectQuizQuestions(pool, 5, random);

    expect(a.map((q) => q.question)).toEqual(b.map((q) => q.question));
  });

  it("can produce a different order across two calls with real randomness", () => {
    const orders = new Set<string>();
    for (let i = 0; i < 20; i++) {
      orders.add(
        selectQuizQuestions(questions, 10)
          .map((q) => q.question)
          .join("|")
      );
    }
    expect(orders.size).toBeGreaterThan(1);
  });
});

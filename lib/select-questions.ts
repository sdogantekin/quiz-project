import { Question } from "./quiz-data";

/**
 * Picks `count` random questions from `pool`, in a random order (Fisher-Yates
 * shuffle), so every quiz attempt - including retakes - can look different.
 * `random` is injectable so this stays deterministic in tests.
 */
export function selectQuizQuestions(
  pool: Question[],
  count: number,
  random: () => number = Math.random
): Question[] {
  const shuffled = [...pool];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Returns the index of the personality with the highest score.
 * Ties resolve to whichever personality reached the max first (lowest index).
 */
export function getWinningIndex(scores: number[]): number {
  return scores.indexOf(Math.max(...scores));
}

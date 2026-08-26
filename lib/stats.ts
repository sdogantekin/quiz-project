import { personalities, Personality } from "./quiz-data";

export type PersonalityBreakdownRow = {
  personality: Personality;
  count: number;
  percentage: number;
};

/**
 * Turns raw {personality id, count} rows into a full breakdown across every
 * personality (including ones with zero signups), sorted by count desc.
 */
export function buildPersonalityBreakdown(
  counts: { personality: string; count: number }[]
): PersonalityBreakdownRow[] {
  const total = counts.reduce((sum, c) => sum + c.count, 0);
  const countById = new Map(counts.map((c) => [c.personality, c.count]));

  return personalities
    .map((p) => {
      const count = countById.get(p.id) ?? 0;
      return {
        personality: p,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export type DailyCount = { day: string; count: number };

/**
 * Fills a raw {day, count} series out into `days` consecutive calendar days
 * ending on `now` (UTC), inserting zero-count days that had no signups.
 */
export function fillDailySeries(
  rows: DailyCount[],
  days: number,
  now: Date = new Date()
): DailyCount[] {
  const countByDay = new Map(rows.map((r) => [r.day, r.count]));
  const series: DailyCount[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i)
    );
    const day = d.toISOString().slice(0, 10);
    series.push({ day, count: countByDay.get(day) ?? 0 });
  }

  return series;
}

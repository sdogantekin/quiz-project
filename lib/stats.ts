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

export type EventCountRow = { name: string; count: number };

const FUNNEL_LABELS: Record<string, string> = {
  quiz_started: "Started the quiz",
  quiz_completed: "Got a result",
  email_submitted: "Saved their email",
  share_clicked: "Shared their result",
  quiz_retaken: "Took it again",
};

export type FunnelStep = {
  name: string;
  label: string;
  count: number;
  percentage: number;
};

/**
 * Turns raw {event name, count} rows into the funnel, in a fixed step order.
 * Percentage is relative to `quiz_started` (the top of the funnel).
 */
export function buildFunnelSummary(rows: EventCountRow[]): FunnelStep[] {
  const countByName = new Map(rows.map((r) => [r.name, r.count]));
  const base = Math.max(1, countByName.get("quiz_started") ?? 0);

  return Object.entries(FUNNEL_LABELS).map(([name, label]) => {
    const count = countByName.get(name) ?? 0;
    return { name, label, count, percentage: Math.round((count / base) * 100) };
  });
}

export type ShareMethodRow = { method: string; count: number };

const SHARE_METHOD_LABELS: Record<string, string> = {
  native: "Native share",
  twitter: "Share on X",
  copy_link: "Copy link",
};

export type ShareMethodBreakdownRow = {
  label: string;
  count: number;
  percentage: number;
};

/**
 * Turns raw {method, count} rows (from the share_clicked event's
 * `method` property) into a sorted, labeled breakdown.
 */
export function buildShareMethodBreakdown(
  rows: ShareMethodRow[]
): ShareMethodBreakdownRow[] {
  const total = rows.reduce((sum, r) => sum + r.count, 0);

  return rows
    .map((r) => ({
      label: SHARE_METHOD_LABELS[r.method] ?? r.method,
      count: r.count,
      percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

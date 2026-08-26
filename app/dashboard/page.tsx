import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "@/lib/db";
import {
  buildPersonalityBreakdown,
  fillDailySeries,
  buildFunnelSummary,
  buildShareMethodBreakdown,
} from "@/lib/stats";
import BarChart from "@/components/BarChart";
import TrendChart from "@/components/TrendChart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard - What's Your Coffee Personality?",
};

const TREND_DAYS = 30;

type PersonalityCountRow = { personality: string; count: number };
type DailyCountRow = { day: string; count: number };
type EventCountRow = { name: string; count: number };
type ShareMethodRow = { method: string; count: number };

export default async function DashboardPage() {
  const [totalRows, breakdownRows, dailyRows, funnelRows, shareMethodRows] =
    await Promise.all([
      sql`SELECT COUNT(*)::int AS total FROM subscribers`,
      sql`SELECT personality, COUNT(*)::int AS count FROM subscribers GROUP BY personality`,
      sql`
        SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
        FROM subscribers
        WHERE created_at >= now() - (${TREND_DAYS} * interval '1 day')
        GROUP BY day
        ORDER BY day
      `,
      sql`
        SELECT name, COUNT(DISTINCT session_id)::int AS count
        FROM events
        GROUP BY name
      `,
      sql`
        SELECT properties->>'method' AS method, COUNT(*)::int AS count
        FROM events
        WHERE name = 'share_clicked' AND properties->>'method' IS NOT NULL
        GROUP BY method
      `,
    ]);

  const total = (totalRows[0]?.total as number) ?? 0;
  const breakdown = buildPersonalityBreakdown(
    breakdownRows as PersonalityCountRow[]
  );
  const daily = fillDailySeries(dailyRows as DailyCountRow[], TREND_DAYS);
  const funnel = buildFunnelSummary(funnelRows as EventCountRow[]);
  const shareMethods = buildShareMethodBreakdown(
    shareMethodRows as ShareMethodRow[]
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <Link
          href="/"
          className="mb-10 inline-block text-sm text-[var(--muted)] transition-colors duration-150 hover:text-[var(--accent-strong)]"
        >
          ← Back to quiz
        </Link>

        <div className="mb-2 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
          Dashboard
        </div>
        <div className="mb-1 text-5xl font-semibold text-[var(--foreground)]">
          {total}
        </div>
        <p className="mb-14 text-base text-[var(--muted)]">
          {total === 1 ? "person has" : "people have"} saved a result
        </p>

        <section className="mb-14">
          <h2 className="mb-6 text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
            Funnel
          </h2>
          <BarChart
            data={funnel.map((step) => ({
              label: step.label,
              value: step.count,
              percentage: step.percentage,
            }))}
          />
          <p className="mt-4 text-xs text-[var(--muted)]">
            Counts are distinct quiz attempts (not raw clicks), so repeat
            actions in one attempt only count once. Percentages are relative
            to quiz starts. Self-hosted in Postgres until this project is on
            a Vercel Pro team (Custom Events).
          </p>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
            Results breakdown
          </h2>
          <BarChart
            data={breakdown.map((row) => ({
              label: row.personality.name,
              value: row.count,
              percentage: row.percentage,
            }))}
          />
        </section>

        {shareMethods.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
              How people shared
            </h2>
            <BarChart
              data={shareMethods.map((row) => ({
                label: row.label,
                value: row.count,
                percentage: row.percentage,
              }))}
            />
          </section>
        )}

        <section>
          <h2 className="mb-6 text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
            Signups, last {TREND_DAYS} days
          </h2>
          <TrendChart data={daily} />
        </section>
      </div>
    </div>
  );
}

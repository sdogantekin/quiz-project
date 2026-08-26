"use client";

import { useState } from "react";
import type { DailyCount } from "@/lib/stats";

type TrendChartProps = {
  data: DailyCount[];
};

function formatDayLabel(day: string) {
  const [, month, date] = day.split("-");
  return `${Number(month)}/${Number(date)}`;
}

export default function TrendChart({ data }: TrendChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maxValue = Math.max(1, ...data.map((d) => d.count));

  return (
    <div>
      <div className="flex h-32 items-end gap-[3px]">
        {data.map((d, i) => {
          const heightPct = Math.max(
            (d.count / maxValue) * 100,
            d.count > 0 ? 6 : 2
          );
          return (
            <div
              key={d.day}
              className="relative flex h-32 flex-1 items-end"
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
              aria-label={`${formatDayLabel(d.day)}: ${d.count} ${d.count === 1 ? "signup" : "signups"}`}
            >
              <div
                className="w-full rounded-t-[4px] bg-[var(--accent)]"
                style={{ height: `${heightPct}%` }}
              />

              {activeIndex === i && (
                <div
                  role="tooltip"
                  className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2.5 py-1.5 text-xs text-[var(--background)] shadow-md"
                >
                  {formatDayLabel(d.day)}: {d.count}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
        <span>{formatDayLabel(data[0].day)}</span>
        <span>{formatDayLabel(data[Math.floor(data.length / 2)].day)}</span>
        <span>{formatDayLabel(data[data.length - 1].day)}</span>
      </div>
    </div>
  );
}

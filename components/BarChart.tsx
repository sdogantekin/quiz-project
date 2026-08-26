"use client";

import { useState } from "react";

type BarChartDatum = {
  label: string;
  value: number;
  percentage: number;
};

type BarChartProps = {
  data: BarChartDatum[];
};

export default function BarChart({ data }: BarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maxValue = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex flex-col gap-3">
      {data.map((d, i) => {
        const widthPct = (d.value / maxValue) * 100;
        return (
          <div
            key={d.label}
            className="relative flex items-center gap-3"
            tabIndex={0}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
            aria-label={`${d.label}: ${d.value} ${d.value === 1 ? "person" : "people"} (${d.percentage}%)`}
          >
            <div className="w-28 shrink-0 text-sm text-[var(--foreground)]">
              {d.label}
            </div>

            <div className="relative h-6 flex-1 rounded-r-[4px] bg-[var(--border)]">
              <div
                className="h-6 rounded-r-[4px] bg-[var(--accent)] transition-all duration-300"
                style={{ width: `${widthPct}%` }}
              />
            </div>

            <div className="w-20 shrink-0 text-right text-sm tabular-nums text-[var(--muted)]">
              {d.value} · {d.percentage}%
            </div>

            {activeIndex === i && (
              <div
                role="tooltip"
                className="absolute -top-9 right-0 z-10 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2.5 py-1.5 text-xs text-[var(--background)] shadow-md"
              >
                {d.label}: {d.value} {d.value === 1 ? "person" : "people"} (
                {d.percentage}%)
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

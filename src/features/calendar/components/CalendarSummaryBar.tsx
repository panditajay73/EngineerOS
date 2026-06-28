import { CalendarCheck2, Clock3, Flame, TimerReset } from "lucide-react";

import type { CalendarSummary } from "@/features/calendar/types";

type CalendarSummaryBarProps = {
  summary: CalendarSummary;
};

const formatHours = (hours: number) =>
  `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`;

export function CalendarSummaryBar({ summary }: CalendarSummaryBarProps) {
  const metrics = [
    {
      label: "Total Planned Hours",
      value: formatHours(summary.totalPlannedHours),
      icon: Clock3,
      tone: "text-brand bg-brand/12"
    },
    {
      label: "Hours Completed",
      value: formatHours(summary.completedHours),
      icon: CalendarCheck2,
      tone: "text-success bg-success/12"
    },
    {
      label: "Current Streak",
      value: `${summary.currentStreak} days`,
      icon: Flame,
      tone: "text-warning bg-warning/12"
    },
    {
      label: "Today's Sessions",
      value: `${summary.todaysSessions}`,
      icon: CalendarCheck2,
      tone: "text-brand bg-brand/12"
    },
    {
      label: "Upcoming Session",
      value: summary.upcomingCountdown,
      icon: TimerReset,
      tone: "text-danger bg-danger/12"
    }
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <div
          className="rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-glow backdrop-blur"
          key={metric.label}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">{metric.value}</p>
            </div>
            <span className={`rounded-md p-2.5 ${metric.tone}`}>
              <metric.icon aria-hidden="true" size={20} />
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

import type { CalendarFilter } from "@/features/calendar/types";
import { calendarFilters } from "@/features/calendar/data/calendarFilters";
import { cn } from "@/shared/lib/cn";

type CalendarFilterBarProps = {
  activeFilter: CalendarFilter;
  onFilterChange: (filter: CalendarFilter) => void;
};

export function CalendarFilterBar({
  activeFilter,
  onFilterChange
}: CalendarFilterBarProps) {
  return (
    <section
      aria-label="Calendar filters"
      className="flex gap-2 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.055] p-2 backdrop-blur"
    >
      {calendarFilters.map((filter) => (
        <button
          className={cn(
            "min-h-9 shrink-0 rounded-md px-3 text-sm font-medium transition",
            activeFilter === filter.id
              ? "bg-brand text-slate-950"
              : "text-muted hover:bg-panel-soft hover:text-ink"
          )}
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </section>
  );
}

import type { CalendarFilter } from "@/features/calendar/types";

export const calendarFilters: Array<{
  id: CalendarFilter;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "dsa", label: "DSA" },
  { id: "development", label: "Development" },
  { id: "system-design", label: "System Design" },
  { id: "devops", label: "DevOps" },
  { id: "projects", label: "Projects" },
  { id: "interview", label: "Interview" },
  { id: "revision", label: "Revision" }
];

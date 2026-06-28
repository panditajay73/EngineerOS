export type CalendarSessionStatus = "pending" | "completed" | "missed";

export type CalendarFilter =
  | "all"
  | "dsa"
  | "development"
  | "system-design"
  | "devops"
  | "projects"
  | "interview"
  | "revision";

export type StudyTopic = {
  id: Exclude<CalendarFilter, "all">;
  label: string;
  detail: string;
};

export type StudySession = {
  id: string;
  title: "Study Session";
  description: "Daily learning roadmap";
  dayNumber: number;
  dateKey: string;
  start: Date;
  end: Date;
  plannedHours: number;
  blockLabel: string;
  primaryFocus: Exclude<CalendarFilter, "all">;
  topics: StudyTopic[];
};

export type SessionState = {
  sessionId: string;
  status: "pending" | "completed";
  completedHours: number;
  notes: string;
  updatedAt: string;
};

export type CalendarSummary = {
  totalPlannedHours: number;
  completedHours: number;
  currentStreak: number;
  todaysSessions: number;
  upcomingCountdown: string;
};

import type {
  CalendarFilter,
  CalendarSessionStatus,
  SessionState,
  StudySession,
  StudyTopic
} from "@/features/calendar/types";

const DAY_COUNT = 90;

const TOPIC_LIBRARY: Record<Exclude<CalendarFilter, "all">, StudyTopic> = {
  dsa: {
    id: "dsa",
    label: "DSA",
    detail: "Pattern practice, problem solving, and revision"
  },
  development: {
    id: "development",
    label: "Development",
    detail: ".NET, React, SQL Server, Azure, and GenAI implementation"
  },
  "system-design": {
    id: "system-design",
    label: "System Design",
    detail: "Architecture, scaling, caching, messaging, and database design"
  },
  devops: {
    id: "devops",
    label: "DevOps",
    detail: "Git, Docker, CI/CD, Azure deployment, monitoring, and logging"
  },
  projects: {
    id: "projects",
    label: "Project Work",
    detail: "Portfolio features for the task API and restaurant platform"
  },
  interview: {
    id: "interview",
    label: "Interview",
    detail: "Mock interviews, explanations, behavioral stories, and salary prep"
  },
  revision: {
    id: "revision",
    label: "Revision",
    detail: "Spaced repetition, notes cleanup, and weak-area review"
  }
};

const REQUIRED_TOPICS = [
  TOPIC_LIBRARY.dsa,
  TOPIC_LIBRARY.development,
  TOPIC_LIBRARY["system-design"],
  TOPIC_LIBRARY.devops,
  TOPIC_LIBRARY.projects
];

const WEEKDAY_FOCUS: Array<Exclude<CalendarFilter, "all">> = [
  "dsa",
  "development",
  "system-design",
  "devops",
  "projects",
  "revision",
  "interview"
];

const WEEKEND_LATE_FOCUS: Array<Exclude<CalendarFilter, "all">> = [
  "system-design",
  "devops",
  "interview",
  "revision"
];

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function atTime(date: Date, hour: number, minute = 0) {
  const next = new Date(date);
  next.setHours(hour, minute, 0, 0);
  return next;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createTopics(primaryFocus: Exclude<CalendarFilter, "all">) {
  const focusTopic = TOPIC_LIBRARY[primaryFocus];
  const hasFocusTopic = REQUIRED_TOPICS.some((topic) => topic.id === primaryFocus);

  return hasFocusTopic ? REQUIRED_TOPICS : [...REQUIRED_TOPICS, focusTopic];
}

function createSession({
  blockLabel,
  day,
  dayIndex,
  durationHours,
  end,
  primaryFocus,
  start
}: {
  blockLabel: string;
  day: Date;
  dayIndex: number;
  durationHours: number;
  end: Date;
  primaryFocus: Exclude<CalendarFilter, "all">;
  start: Date;
}): StudySession {
  const dateKey = formatDateKey(day);
  const startKey = `${start.getHours().toString().padStart(2, "0")}${start
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return {
    id: `studyos-day-${dayIndex + 1}-${startKey}`,
    title: "Study Session",
    description: "Daily learning roadmap",
    dayNumber: dayIndex + 1,
    dateKey,
    start,
    end,
    plannedHours: durationHours,
    blockLabel,
    primaryFocus,
    topics: createTopics(primaryFocus)
  };
}

export function generateStudySessions(today = new Date()) {
  const startDate = startOfLocalDay(today);
  const sessions: StudySession[] = [];

  for (let dayIndex = 0; dayIndex < DAY_COUNT; dayIndex += 1) {
    const day = addDays(startDate, dayIndex);
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      const dayFocus = dayOfWeek === 6 ? "dsa" : "revision";
      const afternoonFocus = dayOfWeek === 6 ? "development" : "projects";
      const lateFocus =
        WEEKEND_LATE_FOCUS[dayIndex % WEEKEND_LATE_FOCUS.length] ??
        "system-design";

      sessions.push(
        createSession({
          blockLabel: "Weekend Block 1",
          day,
          dayIndex,
          durationHours: 2,
          start: atTime(day, 10),
          end: atTime(day, 12),
          primaryFocus: dayFocus
        }),
        createSession({
          blockLabel: "Weekend Block 2",
          day,
          dayIndex,
          durationHours: 3,
          start: atTime(day, 14),
          end: atTime(day, 17),
          primaryFocus: afternoonFocus
        }),
        createSession({
          blockLabel: "Weekend Block 3",
          day,
          dayIndex,
          durationHours: 3,
          start: atTime(day, 23),
          end: atTime(addDays(day, 1), 2),
          primaryFocus: lateFocus
        })
      );
      continue;
    }

    sessions.push(
      createSession({
        blockLabel: "Weekday Study Block",
        day,
        dayIndex,
        durationHours: 3,
        start: atTime(day, 23),
        end: atTime(addDays(day, 1), 2),
        primaryFocus:
          WEEKDAY_FOCUS[dayIndex % WEEKDAY_FOCUS.length] ?? "development"
      })
    );
  }

  return sessions;
}

export function getSessionStatus(
  session: StudySession,
  state: SessionState | undefined,
  now = new Date()
): CalendarSessionStatus {
  if (state?.status === "completed") {
    return "completed";
  }

  return session.end.getTime() < now.getTime() ? "missed" : "pending";
}

export function formatSessionTime(session: StudySession) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });

  return `${formatter.format(session.start)} - ${formatter.format(session.end)}`;
}

export function getTodayDateKey(now = new Date()) {
  return formatDateKey(startOfLocalDay(now));
}

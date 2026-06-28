import type { CalendarSummary, SessionState, StudySession } from "@/features/calendar/types";
import {
  getSessionStatus,
  getTodayDateKey
} from "@/features/calendar/data/studySchedule";

function formatCountdown(milliseconds: number) {
  if (milliseconds <= 0) {
    return "Now";
  }

  const totalMinutes = Math.ceil(milliseconds / 60_000);
  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

function isDayCompleted(
  dateKey: string,
  sessions: StudySession[],
  stateBySessionId: Map<string, SessionState>
) {
  const daySessions = sessions.filter((session) => session.dateKey === dateKey);

  return (
    daySessions.length > 0 &&
    daySessions.every(
      (session) => stateBySessionId.get(session.id)?.status === "completed"
    )
  );
}

export function buildCalendarSummary(
  sessions: StudySession[],
  sessionStates: SessionState[],
  now = new Date()
): CalendarSummary {
  const stateBySessionId = new Map(
    sessionStates.map((state) => [state.sessionId, state])
  );
  const todayKey = getTodayDateKey(now);
  const totalPlannedHours = sessions.reduce(
    (sum, session) => sum + session.plannedHours,
    0
  );
  const completedHours = sessions.reduce((sum, session) => {
    const state = stateBySessionId.get(session.id);
    if (state?.status !== "completed") {
      return sum;
    }
    return sum + (state.completedHours || session.plannedHours);
  }, 0);
  const todaysSessions = sessions.filter(
    (session) => session.dateKey === todayKey
  ).length;
  const upcomingSession = sessions.find(
    (session) =>
      getSessionStatus(session, stateBySessionId.get(session.id), now) ===
        "pending" && session.start.getTime() >= now.getTime()
  );

  let currentStreak = 0;
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstDate = sessions[0]?.start;

  while (firstDate && cursor.getTime() >= firstDate.getTime()) {
    const dateKey = getTodayDateKey(cursor);
    if (!isDayCompleted(dateKey, sessions, stateBySessionId)) {
      break;
    }
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    totalPlannedHours,
    completedHours,
    currentStreak,
    todaysSessions,
    upcomingCountdown: upcomingSession
      ? formatCountdown(upcomingSession.start.getTime() - now.getTime())
      : "Complete"
  };
}

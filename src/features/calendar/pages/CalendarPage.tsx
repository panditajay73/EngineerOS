import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core";
import { CircleHelp, Download, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CalendarFilterBar } from "@/features/calendar/components/CalendarFilterBar";
import { CalendarSummaryBar } from "@/features/calendar/components/CalendarSummaryBar";
import { FocusModeModal } from "@/features/calendar/components/FocusModeModal";
import { GoogleCalendarHelpDialog } from "@/features/calendar/components/GoogleCalendarHelpDialog";
import { SessionModal } from "@/features/calendar/components/SessionModal";
import {
  getSessionStatus,
  getTodayDateKey
} from "@/features/calendar/data/studySchedule";
import { useStudyCalendar } from "@/features/calendar/hooks/useStudyCalendar";
import type {
  CalendarFilter,
  CalendarSessionStatus,
  StudySession
} from "@/features/calendar/types";
import { buildCalendarSummary } from "@/features/calendar/utils/calendarSummary";
import { downloadIcsFile } from "@/features/calendar/utils/ics";
import { Button } from "@/shared/components/Button";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";

const statusColors: Record<
  CalendarSessionStatus,
  {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  }
> = {
  pending: {
    backgroundColor: "#38bdf8",
    borderColor: "#7dd3fc",
    textColor: "#06111f"
  },
  completed: {
    backgroundColor: "#34d399",
    borderColor: "#6ee7b7",
    textColor: "#041611"
  },
  missed: {
    backgroundColor: "#fb7185",
    borderColor: "#fda4af",
    textColor: "#1c0509"
  }
};

function getFocusLabel(value: unknown) {
  return typeof value === "string"
    ? value.replaceAll("-", " ").replace("dsa", "DSA")
    : "Study";
}

function renderEventContent(eventInfo: EventContentArg) {
  const focusLabel = getFocusLabel(eventInfo.event.extendedProps.primaryFocus);

  return (
    <div className="studyos-event-content">
      <span className="studyos-event-time">{eventInfo.timeText}</span>
      <span className="studyos-event-title">{eventInfo.event.title}</span>
      <span className="studyos-event-focus">{focusLabel}</span>
    </div>
  );
}

export function CalendarPage() {
  const {
    isLoading,
    sessions,
    sessionStates,
    stateBySessionId,
    updateSessionState
  } = useStudyCalendar();
  const [activeFilter, setActiveFilter] = useState<CalendarFilter>("all");
  const [selectedSession, setSelectedSession] = useState<StudySession | null>(null);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const filteredSessions = useMemo(
    () =>
      activeFilter === "all"
        ? sessions
        : sessions.filter((session) => session.primaryFocus === activeFilter),
    [activeFilter, sessions]
  );

  const calendarEvents = useMemo<EventInput[]>(
    () =>
      filteredSessions.map((session) => {
        const status = getSessionStatus(
          session,
          stateBySessionId.get(session.id),
          now
        );
        const colors = statusColors[status];

        return {
          id: session.id,
          title: session.title,
          start: session.start,
          end: session.end,
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          textColor: colors.textColor,
          classNames: [`studyos-session-${status}`],
          extendedProps: {
            blockLabel: session.blockLabel,
            dayNumber: session.dayNumber,
            description: session.description,
            primaryFocus: session.primaryFocus,
            sessionId: session.id,
            status,
            topics: session.topics.map((topic) => topic.label).join(", ")
          }
        };
      }),
    [filteredSessions, now, stateBySessionId]
  );

  const summary = useMemo(
    () => buildCalendarSummary(sessions, sessionStates, now),
    [now, sessionStates, sessions]
  );

  const handleEventClick = (clickInfo: EventClickArg) => {
    const session = sessions.find(
      (studySession) => studySession.id === clickInfo.event.id
    );

    if (session) {
      setSelectedSession(session);
    }
  };

  return (
    <PageTransition>
      <PageHeader
        actions={
          <>
            <Button onClick={() => downloadIcsFile(sessions)} variant="outline">
              <Download aria-hidden="true" size={16} />
              Export to Google Calendar (.ics)
            </Button>
            <Button onClick={() => setIsHelpOpen(true)} variant="outline">
              <CircleHelp aria-hidden="true" size={16} />
              Import Help
            </Button>
            <Button onClick={() => setIsFocusModeOpen(true)} variant="primary">
              <Play aria-hidden="true" size={16} />
              Start Focus Mode
            </Button>
          </>
        }
        description="A generated 90-day monthly planner with weekday late-night blocks, weekend deep-work sessions, local completion tracking, and exportable calendar events."
        eyebrow="Calendar"
        title="90-Day Study Calendar"
      />

      <CalendarSummaryBar summary={summary} />
      <CalendarFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section className="study-calendar-shell rounded-lg border border-white/10 bg-white/[0.055] p-3 shadow-glow backdrop-blur md:p-5">
        {isLoading ? (
          <div className="grid min-h-[50vh] place-items-center text-sm text-muted">
            Loading calendar...
          </div>
        ) : (
          <FullCalendar
            allDaySlot={false}
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day",
              list: "Agenda"
            }}
            dayMaxEvents={3}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            eventDisplay="block"
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short"
            }}
            events={calendarEvents}
            firstDay={1}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            height="auto"
            initialDate={getTodayDateKey(now)}
            initialView="dayGridMonth"
            nowIndicator
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin
            ]}
          />
        )}
      </section>

      <SessionModal
        onClose={() => setSelectedSession(null)}
        onStartFocus={() => setIsFocusModeOpen(true)}
        onUpdateState={updateSessionState}
        session={selectedSession}
        state={
          selectedSession
            ? stateBySessionId.get(selectedSession.id)
            : undefined
        }
      />
      <FocusModeModal
        isOpen={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
      />
      <GoogleCalendarHelpDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onExport={() => downloadIcsFile(sessions)}
      />
    </PageTransition>
  );
}

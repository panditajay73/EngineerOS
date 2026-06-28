import { useCallback, useEffect, useMemo, useState } from "react";

import { generateStudySessions } from "@/features/calendar/data/studySchedule";
import {
  getSessionStates,
  saveSessionState
} from "@/features/calendar/storage/calendarDb";
import type { SessionState } from "@/features/calendar/types";

export function useStudyCalendar() {
  const sessions = useMemo(() => generateStudySessions(new Date()), []);
  const [sessionStates, setSessionStates] = useState<SessionState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getSessionStates()
      .then((states) => {
        if (isMounted) {
          setSessionStates(states);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const stateBySessionId = useMemo(
    () => new Map(sessionStates.map((state) => [state.sessionId, state])),
    [sessionStates]
  );

  const updateSessionState = useCallback(async (state: SessionState) => {
    await saveSessionState(state);
    setSessionStates((currentStates) => {
      const nextStates = currentStates.filter(
        (currentState) => currentState.sessionId !== state.sessionId
      );
      return [...nextStates, state];
    });
  }, []);

  return {
    isLoading,
    sessions,
    sessionStates,
    stateBySessionId,
    updateSessionState
  };
}

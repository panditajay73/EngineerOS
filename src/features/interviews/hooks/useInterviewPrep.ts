import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getInterviewTopicStates,
  saveInterviewTopicState
} from "@/features/interviews/storage/interviewPrepDb";
import type { InterviewTopicState } from "@/features/interviews/types";
import { buildInterviewReadinessSummary } from "@/features/interviews/utils/interviewProgress";

function createTopicState(
  topicId: string,
  currentState: InterviewTopicState | undefined,
  patch: Partial<InterviewTopicState>
): InterviewTopicState {
  return {
    topicId,
    completed: currentState?.completed ?? false,
    notes: currentState?.notes ?? "",
    revisionCount: currentState?.revisionCount ?? 0,
    lastRevisionDate: currentState?.lastRevisionDate ?? null,
    updatedAt: new Date().toISOString(),
    ...patch
  };
}

export function useInterviewPrep() {
  const [topicStates, setTopicStates] = useState<InterviewTopicState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getInterviewTopicStates()
      .then((states) => {
        if (isMounted) {
          setTopicStates(states);
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

  const stateByTopicId = useMemo(
    () => new Map(topicStates.map((state) => [state.topicId, state])),
    [topicStates]
  );

  const saveState = useCallback(async (nextState: InterviewTopicState) => {
    await saveInterviewTopicState(nextState);
    setTopicStates((currentStates) => [
      ...currentStates.filter((state) => state.topicId !== nextState.topicId),
      nextState
    ]);
  }, []);

  const toggleTopicComplete = useCallback(
    async (topicId: string, completed?: boolean) => {
      const currentState = stateByTopicId.get(topicId);
      const nextCompleted = completed ?? !currentState?.completed;
      await saveState(
        createTopicState(topicId, currentState, {
          completed: nextCompleted,
          lastRevisionDate: nextCompleted
            ? new Date().toISOString()
            : currentState?.lastRevisionDate ?? null
        })
      );
    },
    [saveState, stateByTopicId]
  );

  const updateTopicNotes = useCallback(
    async (topicId: string, notes: string) => {
      const currentState = stateByTopicId.get(topicId);
      await saveState(createTopicState(topicId, currentState, { notes }));
    },
    [saveState, stateByTopicId]
  );

  const markTopicRevised = useCallback(
    async (topicId: string) => {
      const currentState = stateByTopicId.get(topicId);
      await saveState(
        createTopicState(topicId, currentState, {
          completed: true,
          revisionCount: (currentState?.revisionCount ?? 0) + 1,
          lastRevisionDate: new Date().toISOString()
        })
      );
    },
    [saveState, stateByTopicId]
  );

  const markCategoryComplete = useCallback(
    async (topicIds: string[]) => {
      await Promise.all(
        topicIds.map((topicId) =>
          saveState(
            createTopicState(topicId, stateByTopicId.get(topicId), {
              completed: true,
              lastRevisionDate: new Date().toISOString()
            })
          )
        )
      );
    },
    [saveState, stateByTopicId]
  );

  const summary = useMemo(
    () => buildInterviewReadinessSummary(topicStates),
    [topicStates]
  );

  return {
    isLoading,
    markCategoryComplete,
    markTopicRevised,
    stateByTopicId,
    summary,
    toggleTopicComplete,
    topicStates,
    updateTopicNotes
  };
}

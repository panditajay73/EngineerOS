import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/shared/constants/app";

export type LevelTitle =
  | "Intern"
  | "Junior"
  | "Software Engineer"
  | "Senior Engineer"
  | "Lead Engineer"
  | "Architect";

export type StudyProgressState = {
  coins: number;
  completedResourceIds: string[];
  completedTasks: number;
  completedTaskIds: string[];
  currentLevel: LevelTitle;
  lastResetAt: string | null;
  streakDays: number;
  weeklyHours: number;
  xp: number;
  resetProgress: () => void;
  toggleResource: (resourceId: string) => void;
  toggleTask: (taskId: string) => void;
};

const INITIAL_PROGRESS = {
  coins: 420,
  completedResourceIds: [
    "dev-dotnet-intro",
    "dev-aspnet-core-docs",
    "dev-ef-core",
    "dsa-arrays-lc-array",
    "devops-git-docs",
    "sd-http-mdn"
  ],
  completedTasks: 6,
  completedTaskIds: [
    "dev-api-skeleton",
    "dev-ef-repository",
    "dsa-arrays-two-sum",
    "dsa-valid-anagram",
    "devops-dockerize-api",
    "sd-request-path"
  ],
  currentLevel: "Software Engineer" as const,
  lastResetAt: null,
  streakDays: 6,
  weeklyHours: 19,
  xp: 2840
};

export const useStudyProgressStore = create<StudyProgressState>()(
  persist(
    (set) => ({
      ...INITIAL_PROGRESS,
      resetProgress: () =>
        set({
          ...INITIAL_PROGRESS,
          coins: 0,
          completedResourceIds: [],
          completedTasks: 0,
          completedTaskIds: [],
          currentLevel: "Intern",
          lastResetAt: new Date().toISOString(),
          streakDays: 0,
          weeklyHours: 0,
          xp: 0
        }),
      toggleResource: (resourceId) =>
        set((state) => {
          const exists = state.completedResourceIds.includes(resourceId);
          return {
            completedResourceIds: exists
              ? state.completedResourceIds.filter((id) => id !== resourceId)
              : [...state.completedResourceIds, resourceId],
            xp: exists ? Math.max(state.xp - 15, 0) : state.xp + 15,
            coins: exists ? Math.max(state.coins - 3, 0) : state.coins + 3
          };
        }),
      toggleTask: (taskId) =>
        set((state) => {
          const exists = state.completedTaskIds.includes(taskId);
          const completedTaskIds = exists
            ? state.completedTaskIds.filter((id) => id !== taskId)
            : [...state.completedTaskIds, taskId];

          return {
            completedTaskIds,
            completedTasks: completedTaskIds.length,
            xp: exists ? Math.max(state.xp - 35, 0) : state.xp + 35,
            coins: exists ? Math.max(state.coins - 8, 0) : state.coins + 8
          };
        })
    }),
    {
      name: STORAGE_KEYS.progress,
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  )
);

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/shared/constants/app";
import { DEFAULT_DSA_DOCUMENT_URL } from "@/shared/constants/dsa";

export type ThemePreference = "dark" | "system";
export type ReminderSound = "focus-bell" | "digital-chime" | "silent";

export type SettingsState = {
  alarmVolume: number;
  dsaDocumentUrl: string;
  notificationTime: string;
  remindersEnabled: boolean;
  weekdayReminderTimes: string[];
  weekendReminderTimes: string[];
  reminderSound: ReminderSound;
  targetCompany: string;
  targetSalaryLpa: number;
  theme: ThemePreference;
  weekdayStudyHours: number;
  weekendStudyHours: number;
  setAlarmVolume: (volume: number) => void;
  setDsaDocumentUrl: (url: string) => void;
  resetDsaDocumentUrl: () => void;
  setNotificationTime: (time: string) => void;
  setRemindersEnabled: (enabled: boolean) => void;
  setWeekdayReminderTimes: (times: string[]) => void;
  setWeekendReminderTimes: (times: string[]) => void;
  setReminderSound: (sound: ReminderSound) => void;
  setTargetCompany: (company: string) => void;
  setTargetSalaryLpa: (salary: number) => void;
  setTheme: (theme: ThemePreference) => void;
  setWeekdayStudyHours: (hours: number) => void;
  setWeekendStudyHours: (hours: number) => void;
};

const DEFAULT_SETTINGS = {
  alarmVolume: 85,
  dsaDocumentUrl: DEFAULT_DSA_DOCUMENT_URL,
  notificationTime: "09:30",
  remindersEnabled: false,
  weekdayReminderTimes: ["23:00"],
  weekendReminderTimes: ["10:00", "14:00", "23:00"],
  reminderSound: "focus-bell" as const,
  targetCompany: "Product engineering roles",
  targetSalaryLpa: 15,
  theme: "dark" as const,
  weekdayStudyHours: 3,
  weekendStudyHours: 8
};

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      setAlarmVolume: (volume) =>
        set({ alarmVolume: clampNumber(Math.round(volume), 0, 100) }),
      setDsaDocumentUrl: (url) => set({ dsaDocumentUrl: url.trim() }),
      resetDsaDocumentUrl: () =>
        set({ dsaDocumentUrl: DEFAULT_SETTINGS.dsaDocumentUrl }),
      setNotificationTime: (time) => set({ notificationTime: time }),
      setRemindersEnabled: (enabled) => set({ remindersEnabled: enabled }),
      setWeekdayReminderTimes: (times) =>
        set({ weekdayReminderTimes: Array.from(new Set(times)).sort() }),
      setWeekendReminderTimes: (times) =>
        set({ weekendReminderTimes: Array.from(new Set(times)).sort() }),
      setReminderSound: (sound) => set({ reminderSound: sound }),
      setTargetCompany: (company) => set({ targetCompany: company }),
      setTargetSalaryLpa: (salary) =>
        set({ targetSalaryLpa: clampNumber(Math.round(salary), 1, 100) }),
      setTheme: (theme) => set({ theme }),
      setWeekdayStudyHours: (hours) =>
        set({ weekdayStudyHours: clampNumber(hours, 0, 16) }),
      setWeekendStudyHours: (hours) =>
        set({ weekendStudyHours: clampNumber(hours, 0, 16) })
    }),
    {
      name: STORAGE_KEYS.settings,
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  )
);

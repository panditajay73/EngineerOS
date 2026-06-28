import { useEffect, useRef } from "react";

import { useSettingsStore } from "@/features/settings/store/settingsStore";

const NOTIFICATION_TITLE = "Time to Study";
const NOTIFICATION_BODY =
  "Your scheduled EngineerOS study session starts now.";

type NotificationActionOption = {
  action: string;
  title: string;
};

type ExtendedNotificationOptions = NotificationOptions & {
  actions?: NotificationActionOption[];
  badge?: string;
  data?: {
    url: string;
  };
  renotify?: boolean;
  tag?: string;
};

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTimeKey(date: Date) {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getReminderTimesForDate(
  date: Date,
  weekdayReminderTimes: string[],
  weekendReminderTimes: string[]
) {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  return isWeekend ? weekendReminderTimes : weekdayReminderTimes;
}

async function showStudyNotification() {
  const registration = await navigator.serviceWorker?.ready;
  const baseUrl = import.meta.env.BASE_URL;
  const targetUrl = `${window.location.origin}${baseUrl}calendar?session=today`;

  if (registration?.showNotification) {
    const notificationOptions: ExtendedNotificationOptions = {
      body: NOTIFICATION_BODY,
      icon: `${baseUrl}icon-192.png`,
      badge: `${baseUrl}maskable-icon-192.png`,
      tag: "engineeros-study-session",
      renotify: true,
      data: {
        url: targetUrl
      },
      actions: [
        {
          action: "start-session",
          title: "Start Session"
        },
        {
          action: "snooze",
          title: "Snooze"
        }
      ]
    };

    await registration.showNotification(
      NOTIFICATION_TITLE,
      notificationOptions as NotificationOptions
    );
    return;
  }

  new Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
    icon: `${baseUrl}icon-192.png`
  });
}

export function ReminderScheduler() {
  const remindersEnabled = useSettingsStore((state) => state.remindersEnabled);
  const weekdayReminderTimes = useSettingsStore(
    (state) => state.weekdayReminderTimes
  );
  const weekendReminderTimes = useSettingsStore(
    (state) => state.weekendReminderTimes
  );
  const lastNotificationKey = useRef<string | null>(
    localStorage.getItem("engineeros:last-reminder-key")
  );

  useEffect(() => {
    if (
      !remindersEnabled ||
      !("Notification" in window) ||
      Notification.permission !== "granted"
    ) {
      return undefined;
    }

    const tick = () => {
      const now = new Date();
      const currentTime = getTimeKey(now);
      const reminderTimes = getReminderTimesForDate(
        now,
        weekdayReminderTimes,
        weekendReminderTimes
      );

      if (!reminderTimes.includes(currentTime)) {
        return;
      }

      const notificationKey = `${getDateKey(now)}-${currentTime}`;
      if (lastNotificationKey.current === notificationKey) {
        return;
      }

      lastNotificationKey.current = notificationKey;
      localStorage.setItem("engineeros:last-reminder-key", notificationKey);
      void showStudyNotification();
    };

    tick();
    const intervalId = window.setInterval(tick, 30_000);
    return () => window.clearInterval(intervalId);
  }, [remindersEnabled, weekdayReminderTimes, weekendReminderTimes]);

  return null;
}

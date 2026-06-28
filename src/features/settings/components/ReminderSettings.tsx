import { BellRing, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";

type ReminderGroup = "weekday" | "weekend";

function formatTime(time: string) {
  const [hours = "0", minutes = "0"] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function ReminderSettings() {
  const remindersEnabled = useSettingsStore((state) => state.remindersEnabled);
  const setRemindersEnabled = useSettingsStore(
    (state) => state.setRemindersEnabled
  );
  const weekdayReminderTimes = useSettingsStore(
    (state) => state.weekdayReminderTimes
  );
  const weekendReminderTimes = useSettingsStore(
    (state) => state.weekendReminderTimes
  );
  const setWeekdayReminderTimes = useSettingsStore(
    (state) => state.setWeekdayReminderTimes
  );
  const setWeekendReminderTimes = useSettingsStore(
    (state) => state.setWeekendReminderTimes
  );
  const [newWeekdayTime, setNewWeekdayTime] = useState("23:00");
  const [newWeekendTime, setNewWeekendTime] = useState("23:00");
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    () => ("Notification" in window ? Notification.permission : "unsupported")
  );

  const requestPermissionAndEnable = async (enabled: boolean) => {
    if (!enabled) {
      setRemindersEnabled(false);
      return;
    }

    if (!("Notification" in window)) {
      setPermission("unsupported");
      setRemindersEnabled(false);
      return;
    }

    const nextPermission =
      Notification.permission === "granted"
        ? Notification.permission
        : await Notification.requestPermission();

    setPermission(nextPermission);
    setRemindersEnabled(nextPermission === "granted");
  };

  const addReminderTime = (group: ReminderGroup, time: string) => {
    if (group === "weekday") {
      setWeekdayReminderTimes([...weekdayReminderTimes, time]);
      return;
    }

    setWeekendReminderTimes([...weekendReminderTimes, time]);
  };

  const removeReminderTime = (group: ReminderGroup, time: string) => {
    if (group === "weekday") {
      setWeekdayReminderTimes(weekdayReminderTimes.filter((item) => item !== time));
      return;
    }

    setWeekendReminderTimes(weekendReminderTimes.filter((item) => item !== time));
  };

  const reminderGroups = [
    {
      id: "weekday" as const,
      title: "Weekdays",
      description: "Default EngineerOS study reminder: 11:00 PM.",
      times: weekdayReminderTimes,
      newTime: newWeekdayTime,
      setNewTime: setNewWeekdayTime
    },
    {
      id: "weekend" as const,
      title: "Weekends",
      description: "Default reminders: 10:00 AM, 2:00 PM, and 11:00 PM.",
      times: weekendReminderTimes,
      newTime: newWeekendTime,
      setNewTime: setNewWeekendTime
    }
  ];

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <span className="rounded-md bg-warning/12 p-2 text-warning">
          <BellRing aria-hidden="true" size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-ink">Study Reminders</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Notifications are requested only when reminders are enabled. Browser
            reminders run best while EngineerOS is installed or open.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-3 rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink">
          <input
            checked={remindersEnabled}
            className="size-4 accent-brand"
            onChange={(event) => {
              void requestPermissionAndEnable(event.target.checked);
            }}
            type="checkbox"
          />
          Enable reminders
        </label>
        <span className="rounded-md border border-border bg-canvas px-3 py-2 text-sm text-muted">
          Permission: {permission}
        </span>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {reminderGroups.map((group) => (
          <section
            className="rounded-md border border-border bg-canvas/55 p-4"
            key={group.id}
          >
            <h3 className="font-semibold text-ink">{group.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">
              {group.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.times.map((time) => (
                <span
                  className="inline-flex items-center gap-2 rounded-md border border-brand/30 bg-brand/10 px-2.5 py-1 text-sm text-brand"
                  key={time}
                >
                  {formatTime(time)}
                  <button
                    aria-label={`Remove ${formatTime(time)} reminder`}
                    className="rounded p-0.5 hover:bg-brand/15"
                    onClick={() => removeReminderTime(group.id, time)}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" size={13} />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                className="min-h-10 rounded-md border border-border bg-panel px-3 text-sm text-ink"
                onChange={(event) => group.setNewTime(event.target.value)}
                type="time"
                value={group.newTime}
              />
              <Button
                onClick={() => addReminderTime(group.id, group.newTime)}
                variant="outline"
              >
                <Plus aria-hidden="true" size={16} />
                Add
              </Button>
            </div>
          </section>
        ))}
      </div>
    </Card>
  );
}

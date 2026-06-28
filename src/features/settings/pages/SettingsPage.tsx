import { RotateCcw, Volume2 } from "lucide-react";

import { DsaDocumentSettings } from "@/features/settings/components/DsaDocumentSettings";
import { PwaStatusCard } from "@/features/settings/components/PwaStatusCard";
import { ReminderSettings } from "@/features/settings/components/ReminderSettings";
import {
  type ReminderSound,
  type ThemePreference,
  useSettingsStore
} from "@/features/settings/store/settingsStore";
import { useStudyProgressStore } from "@/features/progress/store/progressStore";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";

export function SettingsPage() {
  const settings = useSettingsStore();
  const resetProgress = useStudyProgressStore((state) => state.resetProgress);

  const handleResetProgress = () => {
    const confirmed = window.confirm(
      "Reset XP, coins, streak, weekly hours, and completed task totals?"
    );

    if (confirmed) {
      resetProgress();
    }
  };

  return (
    <PageTransition>
      <PageHeader
        description="Configure the study environment, reminders, alarm behavior, target outcomes, and external DSA document access."
        eyebrow="Settings"
        title="Personalize StudyOS"
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <DsaDocumentSettings />
          <PwaStatusCard />

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-ink">Study Preferences</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-ink">
                Theme
                <select
                  className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                  onChange={(event) =>
                    settings.setTheme(event.target.value as ThemePreference)
                  }
                  value={settings.theme}
                >
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm text-ink">
                Notification Time
                <input
                  className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                  onChange={(event) => settings.setNotificationTime(event.target.value)}
                  type="time"
                  value={settings.notificationTime}
                />
              </label>
              <label className="grid gap-2 text-sm text-ink">
                Weekday Study Hours
                <input
                  className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                  min={0}
                  onChange={(event) =>
                    settings.setWeekdayStudyHours(Number(event.target.value))
                  }
                  step={0.5}
                  type="number"
                  value={settings.weekdayStudyHours}
                />
              </label>
              <label className="grid gap-2 text-sm text-ink">
                Weekend Study Hours
                <input
                  className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                  min={0}
                  onChange={(event) =>
                    settings.setWeekendStudyHours(Number(event.target.value))
                  }
                  step={0.5}
                  type="number"
                  value={settings.weekendStudyHours}
                />
              </label>
              <label className="grid gap-2 text-sm text-ink">
                Target Company
                <input
                  className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                  onChange={(event) => settings.setTargetCompany(event.target.value)}
                  type="text"
                  value={settings.targetCompany}
                />
              </label>
              <label className="grid gap-2 text-sm text-ink">
                Target Salary LPA
                <input
                  className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                  min={1}
                  onChange={(event) =>
                    settings.setTargetSalaryLpa(Number(event.target.value))
                  }
                  type="number"
                  value={settings.targetSalaryLpa}
                />
              </label>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <ReminderSettings />

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-md bg-brand/12 p-2 text-brand">
                <Volume2 aria-hidden="true" size={20} />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-ink">Reminder Sound</h2>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Loud alarms can play while StudyOS is open. Closed browsers limit audio,
                  so background reminders rely on browser notification support.
                </p>
              </div>
            </div>
            <label className="mt-5 grid gap-2 text-sm text-ink">
              Sound
              <select
                className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
                onChange={(event) =>
                  settings.setReminderSound(event.target.value as ReminderSound)
                }
                value={settings.reminderSound}
              >
                <option value="focus-bell">Focus Bell</option>
                <option value="digital-chime">Digital Chime</option>
                <option value="silent">Silent</option>
              </select>
            </label>
            <label className="mt-5 grid gap-2 text-sm text-ink">
              Alarm Volume: {settings.alarmVolume}%
              <input
                className="accent-brand"
                max={100}
                min={0}
                onChange={(event) => settings.setAlarmVolume(Number(event.target.value))}
                type="range"
                value={settings.alarmVolume}
              />
            </label>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-ink">Reset Progress</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Clears local XP, coins, streak, weekly hours, and completed task totals.
            </p>
            <Button className="mt-5" onClick={handleResetProgress} variant="danger">
              <RotateCcw aria-hidden="true" size={16} />
              Reset Progress
            </Button>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}

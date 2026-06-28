import { BookOpen, CheckCircle2, ExternalLink, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
  formatSessionTime,
  getSessionStatus
} from "@/features/calendar/data/studySchedule";
import type { SessionState, StudySession } from "@/features/calendar/types";
import { Button } from "@/shared/components/Button";
import { buttonClassName } from "@/shared/components/buttonStyles";
import { useSettingsStore } from "@/features/settings/store/settingsStore";

type SessionModalProps = {
  session: StudySession | null;
  state: SessionState | undefined;
  onClose: () => void;
  onStartFocus: () => void;
  onUpdateState: (state: SessionState) => Promise<void>;
};

export function SessionModal({
  session,
  state,
  onClose,
  onStartFocus,
  onUpdateState
}: SessionModalProps) {
  const dsaDocumentUrl = useSettingsStore((settings) => settings.dsaDocumentUrl);
  const [completedHours, setCompletedHours] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCompletedHours(state?.completedHours ?? session?.plannedHours ?? 0);
    setNotes(state?.notes ?? "");
  }, [session, state]);

  const completion = useMemo(() => {
    if (!session) {
      return 0;
    }

    return Math.min(
      Math.round((completedHours / session.plannedHours) * 100),
      100
    );
  }, [completedHours, session]);

  if (!session) {
    return null;
  }

  const status = getSessionStatus(session, state);

  const saveState = async (nextStatus: SessionState["status"]) => {
    setIsSaving(true);
    await onUpdateState({
      sessionId: session.id,
      status: nextStatus,
      completedHours: nextStatus === "completed" ? completedHours : 0,
      notes,
      updatedAt: new Date().toISOString()
    });
    setIsSaving(false);
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/10 bg-panel/95 p-6 shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Day {session.dayNumber} of 90
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              {session.title}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {session.blockLabel} · {formatSessionTime(session)}
            </p>
          </div>
          <Button aria-label="Close session details" onClick={onClose} size="icon" variant="ghost">
            <X aria-hidden="true" size={18} />
          </Button>
        </div>

        <section className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-md border border-border bg-canvas/55 p-3">
            <p className="text-xs text-muted">Expected Study Hours</p>
            <p className="mt-1 text-xl font-semibold text-ink">
              {session.plannedHours}h
            </p>
          </div>
          <div className="rounded-md border border-border bg-canvas/55 p-3">
            <p className="text-xs text-muted">Completed Hours</p>
            <p className="mt-1 text-xl font-semibold text-ink">
              {completedHours}h
            </p>
          </div>
          <div className="rounded-md border border-border bg-canvas/55 p-3">
            <p className="text-xs text-muted">Completion</p>
            <p className="mt-1 text-xl font-semibold text-ink">{completion}%</p>
          </div>
          <div className="rounded-md border border-border bg-canvas/55 p-3">
            <p className="text-xs text-muted">Status</p>
            <p className="mt-1 text-xl font-semibold capitalize text-ink">
              {status}
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <BookOpen aria-hidden="true" size={17} />
            Today's Topics
          </h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {session.topics.map((topic) => (
              <div
                className="rounded-md border border-border bg-canvas/55 p-3"
                key={topic.id}
              >
                <p className="text-sm font-semibold text-ink">{topic.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{topic.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-[0.45fr_0.55fr]">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Completed Hours
            <input
              className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
              max={session.plannedHours}
              min={0}
              onChange={(event) => setCompletedHours(Number(event.target.value))}
              step={0.25}
              type="number"
              value={completedHours}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Quick Notes
            <textarea
              className="min-h-24 rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand"
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Capture blockers, solved topics, revision notes, or interview insights."
              value={notes}
            />
          </label>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className={buttonClassName({ variant: "primary" })}
            href={dsaDocumentUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={16} />
            Open DSA Question List
          </a>
          <Link className={buttonClassName({ variant: "outline" })} to="/development">
            <ExternalLink aria-hidden="true" size={16} />
            Open Development Module
          </Link>
          <Button onClick={onStartFocus} variant="secondary">
            <Play aria-hidden="true" size={16} />
            Start Focus Session
          </Button>
          <Button
            disabled={isSaving}
            onClick={() => saveState("completed")}
            variant="primary"
          >
            <CheckCircle2 aria-hidden="true" size={16} />
            Mark Complete
          </Button>
          <Button
            disabled={isSaving}
            onClick={() => saveState("pending")}
            variant="outline"
          >
            Mark Pending
          </Button>
        </div>
      </section>
    </div>
  );
}

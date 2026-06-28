import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/shared/components/Button";

type FocusModeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FOCUS_SECONDS = 25 * 60;

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function FocusModeModal({ isOpen, onClose }: FocusModeModalProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isOpen || !isRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(intervalId);
          setIsRunning(false);
          return 0;
        }
        return currentSeconds - 1;
      });
    }, 1_000);

    return () => window.clearInterval(intervalId);
  }, [isOpen, isRunning]);

  const progress = useMemo(
    () => ((FOCUS_SECONDS - remainingSeconds) / FOCUS_SECONDS) * 100,
    [remainingSeconds]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-panel/95 p-6 shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Focus Mode
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              Pomodoro Session
            </h2>
          </div>
          <Button aria-label="Close focus mode" onClick={onClose} size="icon" variant="ghost">
            <X aria-hidden="true" size={18} />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-6xl font-semibold tabular-nums text-ink">
            {formatSeconds(remainingSeconds)}
          </p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-panel-soft">
            <span
              className="block h-full rounded-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => setIsRunning((current) => !current)} variant="primary">
            {isRunning ? (
              <Pause aria-hidden="true" size={16} />
            ) : (
              <Play aria-hidden="true" size={16} />
            )}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={() => {
              setIsRunning(false);
              setRemainingSeconds(FOCUS_SECONDS);
            }}
            variant="outline"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Reset
          </Button>
        </div>
      </section>
    </div>
  );
}

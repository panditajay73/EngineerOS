import { MessageSquareText, X } from "lucide-react";

import type { InterviewCategory } from "@/features/interviews/types";
import { Button } from "@/shared/components/Button";

type MockInterviewModalProps = {
  category: InterviewCategory | null;
  onClose: () => void;
};

export function MockInterviewModal({ category, onClose }: MockInterviewModalProps) {
  if (!category) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <section className="w-full max-w-2xl rounded-lg border border-white/10 bg-panel/95 p-6 shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Mock Interview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              {category.title}
            </h2>
          </div>
          <Button aria-label="Close mock interview" onClick={onClose} size="icon" variant="ghost">
            <X aria-hidden="true" size={18} />
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {category.mockPrompts.map((prompt, index) => (
            <div
              className="rounded-md border border-border bg-canvas/60 p-4"
              key={prompt}
            >
              <p className="flex items-start gap-3 text-sm leading-6 text-ink">
                <MessageSquareText
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand"
                  size={17}
                />
                <span>
                  <span className="font-semibold text-brand">Q{index + 1}.</span>{" "}
                  {prompt}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

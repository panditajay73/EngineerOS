import { Download, X } from "lucide-react";

import { Button } from "@/shared/components/Button";

type GoogleCalendarHelpDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
};

export function GoogleCalendarHelpDialog({
  isOpen,
  onClose,
  onExport
}: GoogleCalendarHelpDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <section className="w-full max-w-xl rounded-lg border border-white/10 bg-panel/95 p-6 shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Google Calendar Import
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              Use the exported .ics file
            </h2>
          </div>
          <Button aria-label="Close help dialog" onClick={onClose} size="icon" variant="ghost">
            <X aria-hidden="true" size={18} />
          </Button>
        </div>

        <ol className="mt-6 space-y-3 text-sm leading-6 text-muted">
          <li>1. Click Export to Google Calendar (.ics) and save the file.</li>
          <li>2. Open Google Calendar in a desktop browser.</li>
          <li>3. Go to Settings, then Import and export.</li>
          <li>4. Choose the downloaded .ics file and select your calendar.</li>
          <li>5. Click Import. Google Calendar will add all generated study sessions.</li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={onExport} variant="primary">
            <Download aria-hidden="true" size={16} />
            Export .ics
          </Button>
          <Button onClick={onClose} variant="outline">
            Done
          </Button>
        </div>
      </section>
    </div>
  );
}

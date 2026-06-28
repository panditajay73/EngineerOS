import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/shared/components/Button";
import {
  getManualInstallMessage,
  isStandaloneDisplay
} from "@/shared/pwa/pwaStatus";

type InstallOutcome = "accepted" | "dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: InstallOutcome;
    platform: string;
  }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function InstallPwaButton() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  useEffect(() => {
    setIsStandalone(isStandaloneDisplay());

    const handlePrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setPromptEvent(event);
      setShowGuidance(false);
    };

    const handleInstalled = () => {
      setPromptEvent(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (isStandalone) {
    return null;
  }

  const handleInstall = async () => {
    if (!promptEvent) {
      setShowGuidance(true);
      return;
    }

    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-[calc(100vw-2rem)] xl:bottom-5">
      {showGuidance ? (
        <section className="mb-3 max-w-sm rounded-lg border border-white/10 bg-panel/95 p-4 text-sm text-muted shadow-glow backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <p>{getManualInstallMessage()}</p>
            <button
              aria-label="Dismiss install guidance"
              className="rounded-md p-1 text-muted hover:bg-panel-soft hover:text-ink"
              onClick={() => setShowGuidance(false)}
              type="button"
            >
              <X aria-hidden="true" size={16} />
            </button>
          </div>
        </section>
      ) : null}
      <Button
        aria-label="Install StudyOS"
        className="shadow-glow"
        onClick={handleInstall}
        variant="primary"
      >
        <Download aria-hidden="true" size={16} />
        📲 Install StudyOS
      </Button>
    </div>
  );
}

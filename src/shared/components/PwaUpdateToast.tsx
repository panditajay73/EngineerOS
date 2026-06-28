import { RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

import { Button } from "@/shared/components/Button";

export function PwaUpdateToast() {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] =
    useState<((reloadPage?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    const update = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
      }
    });

    setUpdateServiceWorker(() => update);
  }, []);

  if (!needRefresh && !offlineReady) {
    return null;
  }

  return (
    <section className="fixed inset-x-4 bottom-36 z-40 mx-auto max-w-md rounded-lg border border-white/10 bg-panel/95 p-4 shadow-glow backdrop-blur xl:bottom-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">
            {needRefresh ? "New Version Available" : "Offline Ready"}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">
            {needRefresh
              ? "A fresh EngineerOS build is ready to install."
              : "EngineerOS can now load offline with cached study data."}
          </p>
        </div>
        <button
          aria-label="Dismiss PWA status message"
          className="rounded-md p-1 text-muted hover:bg-panel-soft hover:text-ink"
          onClick={() => {
            setNeedRefresh(false);
            setOfflineReady(false);
          }}
          type="button"
        >
          <X aria-hidden="true" size={16} />
        </button>
      </div>
      {needRefresh ? (
        <Button
          className="mt-4"
          onClick={() => {
            void updateServiceWorker?.(true);
          }}
          variant="primary"
        >
          <RefreshCcw aria-hidden="true" size={16} />
          Update Now
        </Button>
      ) : null}
    </section>
  );
}

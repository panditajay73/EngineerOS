import { CheckCircle2, RefreshCw, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import { getPwaStatus, type PwaStatus } from "@/shared/pwa/pwaStatus";

const fallbackStatus: PwaStatus = {
  installationStatus: "unknown",
  pwaStatus: "Checking",
  notificationPermission: "default",
  offlineCacheStatus: "Checking",
  currentVersion: __APP_VERSION__,
  lastUpdate: "Checking"
};

export function PwaStatusCard() {
  const [status, setStatus] = useState<PwaStatus>(fallbackStatus);

  const refreshStatus = async () => {
    setStatus(await getPwaStatus());
  };

  useEffect(() => {
    void refreshStatus();
  }, []);

  const rows = [
    {
      label: "Installation Status",
      value: status.installationStatus
    },
    {
      label: "PWA Status",
      value: status.pwaStatus
    },
    {
      label: "Notification Permission",
      value: status.notificationPermission
    },
    {
      label: "Offline Cache Status",
      value: status.offlineCacheStatus
    },
    {
      label: "Current Version",
      value: status.currentVersion
    },
    {
      label: "Last Update",
      value: status.lastUpdate
    }
  ];

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="rounded-md bg-success/12 p-2 text-success">
            <Smartphone aria-hidden="true" size={20} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-ink">PWA Status</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              EngineerOS is configured for installability, offline caching,
              updates, and GitHub Pages deployment.
            </p>
          </div>
        </div>
        <Button aria-label="Refresh PWA status" onClick={refreshStatus} size="icon" variant="ghost">
          <RefreshCw aria-hidden="true" size={17} />
        </Button>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <div
            className="rounded-md border border-border bg-canvas/60 p-3"
            key={row.label}
          >
            <p className="text-xs text-muted">{row.label}</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium capitalize text-ink">
              <CheckCircle2 aria-hidden="true" className="text-success" size={15} />
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

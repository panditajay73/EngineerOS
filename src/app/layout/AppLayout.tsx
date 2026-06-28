import { Outlet } from "react-router-dom";

import { MobileNavigation } from "@/app/layout/MobileNavigation";
import { Sidebar } from "@/app/layout/Sidebar";
import { InstallPwaButton } from "@/shared/components/InstallPwaButton";
import { PwaUpdateToast } from "@/shared/components/PwaUpdateToast";
import { ReminderScheduler } from "@/shared/components/ReminderScheduler";
import { APP_NAME } from "@/shared/constants/app";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-border bg-canvas/82 px-4 py-3 backdrop-blur md:px-6 xl:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="xl:hidden">
                <p className="text-sm font-semibold text-ink">{APP_NAME}</p>
                <p className="text-xs text-muted">Prepare with intention</p>
              </div>
              <div className="hidden text-sm text-muted xl:block">
                Software engineering preparation workspace
              </div>
            </div>
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 md:px-6 xl:px-8 xl:pb-10">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNavigation />
      <InstallPwaButton />
      <PwaUpdateToast />
      <ReminderScheduler />
    </div>
  );
}

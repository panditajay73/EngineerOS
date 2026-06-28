import { ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigationGroups } from "@/app/router/navigation";
import { APP_NAME } from "@/shared/constants/app";
import { cn } from "@/shared/lib/cn";
import { useSettingsStore } from "@/features/settings/store/settingsStore";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition",
    isActive
      ? "bg-brand/15 text-brand"
      : "text-muted hover:bg-panel-soft hover:text-ink"
  );

export function Sidebar() {
  const dsaDocumentUrl = useSettingsStore((state) => state.dsaDocumentUrl);

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-border bg-canvas/88 px-4 py-5 backdrop-blur xl:sticky xl:top-0 xl:block">
      <div className="flex items-center gap-3 px-2">
        <span className="grid size-10 place-items-center rounded-lg border border-brand/40 bg-brand/10 text-lg font-semibold text-brand">
          S
        </span>
        <div>
          <p className="font-semibold text-ink">{APP_NAME}</p>
          <p className="text-xs text-muted">90-day preparation OS</p>
        </div>
      </div>

      <nav aria-label="Primary navigation" className="mt-8 space-y-7">
        {navigationGroups.map((group) => (
          <section key={group.label}>
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {group.label}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => (
                <NavLink
                  className={navLinkClassName}
                  end={item.path === "/"}
                  key={item.path}
                  to={item.path}
                >
                  <item.icon aria-hidden="true" size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
              {group.label === "DSA" ? (
                <a
                  className="flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition hover:bg-panel-soft hover:text-ink"
                  href={dsaDocumentUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink aria-hidden="true" size={18} />
                  <span>Question List</span>
                </a>
              ) : null}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}

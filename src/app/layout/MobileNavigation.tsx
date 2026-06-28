import { NavLink } from "react-router-dom";

import { mobileNavigationItems } from "@/app/router/navigation";
import { cn } from "@/shared/lib/cn";

export function MobileNavigation() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-lg border border-border bg-canvas/95 p-1 shadow-glow backdrop-blur xl:hidden"
    >
      {mobileNavigationItems.map((item) => (
        <NavLink
          aria-label={item.label}
          className={({ isActive }) =>
            cn(
              "grid min-h-12 place-items-center rounded-md text-muted transition",
              isActive ? "bg-brand/15 text-brand" : "hover:bg-panel-soft hover:text-ink"
            )
          }
          end={item.path === "/"}
          key={item.path}
          to={item.path}
        >
          <item.icon aria-hidden="true" size={20} />
        </NavLink>
      ))}
    </nav>
  );
}

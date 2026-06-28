import { Link, useRouteError } from "react-router-dom";

import { buttonClassName } from "@/shared/components/buttonStyles";

export function RouteError() {
  const error = useRouteError();
  const message =
    error instanceof Error
      ? error.message
      : "StudyOS could not render this route.";

  return (
    <main className="grid min-h-screen place-items-center bg-canvas p-6 text-ink">
      <section className="max-w-lg rounded-lg border border-border bg-panel p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-danger">
          Route error
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Something needs attention</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>
        <Link className={buttonClassName({ className: "mt-6" })} to="/">
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}

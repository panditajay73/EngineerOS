import { AlertTriangle, Brain, CheckCircle2, Target } from "lucide-react";
import { Link } from "react-router-dom";

import { useInterviewPrep } from "@/features/interviews/hooks/useInterviewPrep";
import type { InterviewReadinessSummary } from "@/features/interviews/types";
import { Card } from "@/shared/components/Card";
import { buttonClassName } from "@/shared/components/buttonStyles";

type InterviewReadinessPanelProps = {
  summary?: InterviewReadinessSummary;
};

export function InterviewReadinessPanel({
  summary
}: InterviewReadinessPanelProps) {
  const prep = useInterviewPrep();
  const activeSummary = summary ?? prep.summary;
  const topCategories = activeSummary.categoryProgress
    .slice()
    .sort((a, b) => b.completion - a.completion)
    .slice(0, 5);

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-brand/12 p-2 text-brand">
              <Brain aria-hidden="true" size={21} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">
                Interview Readiness
              </h2>
              <p className="text-sm text-muted">
                Central prep score across role-focused interview categories.
              </p>
            </div>
          </div>
          <p className="mt-5 text-5xl font-semibold text-ink">
            {activeSummary.overallReadiness}%
          </p>
        </div>
        <Link className={buttonClassName({ variant: "primary" })} to="/interviews">
          Open Interview Hub
        </Link>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <CheckCircle2 aria-hidden="true" size={17} />
            Category Completion
          </div>
          <div className="space-y-3">
            {topCategories.map((progress) => (
              <div key={progress.category.id}>
                <div className="mb-1 flex items-center justify-between text-xs text-muted">
                  <span>{progress.category.title}</span>
                  <span>{progress.completion}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-panel-soft">
                  <span
                    className="block h-full rounded-full bg-brand"
                    style={{ width: `${progress.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-canvas/55 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-warning">
              <AlertTriangle aria-hidden="true" size={17} />
              Revision Due Today
            </div>
            <p className="mt-3 text-2xl font-semibold text-ink">
              {activeSummary.revisionDueToday.length}
            </p>
          </div>
          <div className="rounded-md border border-border bg-canvas/55 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand">
              <Target aria-hidden="true" size={17} />
              Recommended Next
            </div>
            <p className="mt-3 text-sm leading-6 text-ink">
              {activeSummary.recommendedNextTopic
                ? `${activeSummary.recommendedNextTopic.categoryTitle}: ${activeSummary.recommendedNextTopic.topic.title}`
                : "All interview topics are complete."}
            </p>
          </div>
        </section>
      </div>

      <section className="mt-5">
        <p className="text-sm font-semibold text-ink">Weakest Topics</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {activeSummary.weakestTopics.length > 0 ? (
            activeSummary.weakestTopics.map((item) => (
              <span
                className="rounded-md border border-danger/30 bg-danger/10 px-2.5 py-1 text-xs font-medium text-rose-100"
                key={`${item.categoryTitle}-${item.topic.id}`}
              >
                {item.categoryTitle}: {item.topic.title}
              </span>
            ))
          ) : (
            <span className="rounded-md border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              No weak topics left
            </span>
          )}
        </div>
      </section>
    </Card>
  );
}

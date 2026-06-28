import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  MessageSquareText,
  RotateCcw
} from "lucide-react";
import { useMemo } from "react";

import { DsaDocumentLink } from "@/features/dsa/components/DsaDocumentLink";
import type {
  InterviewCategory,
  InterviewTopicState
} from "@/features/interviews/types";
import { buildCategoryProgress } from "@/features/interviews/utils/interviewProgress";
import { Button } from "@/shared/components/Button";
import { buttonClassName } from "@/shared/components/buttonStyles";

type InterviewCategoryCardProps = {
  category: InterviewCategory;
  stateByTopicId: Map<string, InterviewTopicState>;
  onMarkCategoryComplete: (topicIds: string[]) => void;
  onMockInterview: (category: InterviewCategory) => void;
  onToggleTopic: (topicId: string) => void;
  onUpdateNotes: (topicId: string, notes: string) => void;
  onMarkRevised: (topicId: string) => void;
};

function formatDate(dateIso: string | null) {
  if (!dateIso) {
    return "Not revised";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(dateIso));
}

export function InterviewCategoryCard({
  category,
  stateByTopicId,
  onMarkCategoryComplete,
  onMockInterview,
  onToggleTopic,
  onUpdateNotes,
  onMarkRevised
}: InterviewCategoryCardProps) {
  const progress = useMemo(
    () => buildCategoryProgress(category, stateByTopicId),
    [category, stateByTopicId]
  );
  const primaryResource = category.resources[0];

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-glow backdrop-blur"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex gap-3">
          <span className="rounded-md bg-brand/12 p-2.5 text-brand">
            <category.icon aria-hidden="true" size={22} />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-ink">{category.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              {category.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {primaryResource ? (
            <a
              className={buttonClassName({ variant: "primary", size: "sm" })}
              href={primaryResource.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink aria-hidden="true" size={15} />
              Open Resource
            </a>
          ) : null}
          <Button
            onClick={() =>
              onMarkCategoryComplete(category.topics.map((topic) => topic.id))
            }
            size="sm"
            variant="outline"
          >
            <CheckCircle2 aria-hidden="true" size={15} />
            Mark Complete
          </Button>
          {category.id === "dsa" ? <DsaDocumentLink size="sm" variant="secondary" /> : null}
        </div>
      </div>

      <section className="mt-5 grid gap-3 md:grid-cols-4">
        <div className="rounded-md border border-border bg-canvas/55 p-3">
          <p className="text-xs text-muted">Progress</p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            {progress.completion}%
          </p>
        </div>
        <div className="rounded-md border border-border bg-canvas/55 p-3">
          <p className="text-xs text-muted">Estimated Time</p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            {category.estimatedHours}h
          </p>
        </div>
        <div className="rounded-md border border-border bg-canvas/55 p-3">
          <p className="text-xs text-muted">Difficulty</p>
          <p className="mt-1 text-lg font-semibold text-ink">
            {category.difficulty}
          </p>
        </div>
        <div className="rounded-md border border-border bg-canvas/55 p-3">
          <p className="text-xs text-muted">Questions</p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            {category.questionCount}
          </p>
        </div>
      </section>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-panel-soft">
        <span
          className="block h-full rounded-full bg-brand transition-all"
          style={{ width: `${progress.completion}%` }}
        />
      </div>

      <section className="mt-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <BookOpen aria-hidden="true" size={17} />
          Resources
        </h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {category.resources.map((resource) => (
            <a
              className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-border bg-canvas/55 px-3 py-2 text-sm text-ink transition hover:border-brand/50 hover:text-brand"
              href={resource.url}
              key={resource.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{resource.label}</span>
                <span className="block truncate text-xs text-muted">
                  {resource.provider}
                </span>
              </span>
              <ExternalLink aria-hidden="true" className="shrink-0" size={14} />
            </a>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <FileText aria-hidden="true" size={17} />
            Topics
          </h3>
          <Button onClick={() => onMockInterview(category)} size="sm" variant="secondary">
            <MessageSquareText aria-hidden="true" size={15} />
            Mock Interview
          </Button>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-2">
          {category.topics.map((topic) => {
            const state = stateByTopicId.get(topic.id);
            const completed = state?.completed ?? false;

            return (
              <div
                className="rounded-md border border-border bg-canvas/55 p-3"
                key={topic.id}
              >
                <div className="flex items-start gap-3">
                  <input
                    aria-label={`Mark ${topic.title} complete`}
                    checked={completed}
                    className="mt-1 size-4 accent-brand"
                    onChange={() => onToggleTopic(topic.id)}
                    type="checkbox"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{topic.title}</p>
                      <span className="rounded-md border border-border bg-panel-soft px-2 py-0.5 text-xs text-muted">
                        {topic.difficulty}
                      </span>
                      <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs text-brand">
                        {topic.questionCount} Qs
                      </span>
                    </div>
                    <div className="mt-2 grid gap-2 text-xs text-muted sm:grid-cols-3">
                      <span>Revision Count: {state?.revisionCount ?? 0}</span>
                      <span>Last Revision: {formatDate(state?.lastRevisionDate ?? null)}</span>
                      <span>Time: {topic.estimatedMinutes}m</span>
                    </div>
                  </div>
                  <Button
                    aria-label={`Mark ${topic.title} revised`}
                    onClick={() => onMarkRevised(topic.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <RotateCcw aria-hidden="true" size={16} />
                  </Button>
                </div>
                <textarea
                  className="mt-3 min-h-20 w-full rounded-md border border-border bg-panel/70 px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand"
                  defaultValue={state?.notes ?? ""}
                  onBlur={(event) => onUpdateNotes(topic.id, event.target.value)}
                  placeholder={`Notes for ${topic.title}`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </motion.article>
  );
}

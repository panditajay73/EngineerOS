import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock3,
  ExternalLink,
  FileText,
  ListChecks,
  MessageSquareText,
  PlayCircle,
  Search
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  getEstimatedTrackHours,
  getModuleProgress,
  getTrackProgress
} from "@/features/study/utils/progress";
import { useStudyProgressStore } from "@/features/progress/store/progressStore";
import { getTrack, getTrackModules } from "@/features/study/data/studyCatalog";
import type { StudyMaterialType, StudyTrackId } from "@/features/study/types";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";
import { ProgressRing } from "@/shared/components/ProgressRing";
import { StatCard } from "@/shared/components/StatCard";

type StudyTrackPageProps = {
  actions?: ReactNode;
  trackId: StudyTrackId;
};

const materialIcons: Record<StudyMaterialType, typeof BookOpen> = {
  docs: BookOpen,
  guide: FileText,
  practice: ListChecks,
  video: PlayCircle,
  project: CheckCircle2,
  reference: BookOpen
};

export function StudyTrackPage({ actions, trackId }: StudyTrackPageProps) {
  const track = getTrack(trackId);
  const modules = useMemo(() => getTrackModules(trackId), [trackId]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const completedResourceIds = useStudyProgressStore(
    (state) => state.completedResourceIds
  );
  const completedTaskIds = useStudyProgressStore((state) => state.completedTaskIds);
  const toggleResource = useStudyProgressStore((state) => state.toggleResource);
  const toggleTask = useStudyProgressStore((state) => state.toggleTask);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(modules.map((module) => module.category)))],
    [modules]
  );

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesCategory = category === "All" || module.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        module.title.toLowerCase().includes(normalizedQuery) ||
        module.description.toLowerCase().includes(normalizedQuery) ||
        module.resources.some((resource) =>
          resource.title.toLowerCase().includes(normalizedQuery)
        );

      return matchesCategory && matchesQuery;
    });
  }, [category, modules, query]);

  if (!track) {
    return (
      <PageTransition>
        <PageHeader
          description="The requested study track is not configured."
          eyebrow="StudyOS"
          title="Track unavailable"
        />
      </PageTransition>
    );
  }

  const TrackIcon = track.icon;
  const progress = getTrackProgress(
    modules,
    completedResourceIds,
    completedTaskIds
  );
  const materialCount = modules.reduce(
    (sum, module) => sum + module.resources.length,
    0
  );
  const taskCount = modules.reduce((sum, module) => sum + module.tasks.length, 0);
  const estimatedHours = getEstimatedTrackHours(modules);

  return (
    <PageTransition>
      <PageHeader
        actions={actions}
        description={track.description}
        eyebrow={track.eyebrow}
        title={track.title}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card className="grid place-items-center p-4">
          <ProgressRing label="Track Progress" size={124} value={progress} />
        </Card>
        <StatCard icon={TrackIcon} label="Modules" value={`${modules.length}`} />
        <StatCard
          icon={BookOpen}
          label="Study Materials"
          tone="success"
          value={`${materialCount}`}
        />
        <StatCard
          icon={ListChecks}
          label="Practice Tasks"
          tone="danger"
          value={`${taskCount}`}
        />
        <StatCard
          icon={Clock3}
          label="Estimated Hours"
          tone="warning"
          value={`${estimatedHours}h`}
        />
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-border bg-panel/82 p-4 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={17}
          />
          <span className="sr-only">Search modules and materials</span>
          <input
            className="min-h-10 w-full rounded-md border border-border bg-canvas pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search modules or materials"
            type="search"
            value={query}
          />
        </label>
        <label className="grid gap-1 text-sm text-muted md:w-64">
          <span className="sr-only">Filter by category</span>
          <select
            className="min-h-10 rounded-md border border-border bg-canvas px-3 text-sm text-ink"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="grid gap-5">
        {filteredModules.map((module) => {
          const moduleProgress = getModuleProgress({
            completedResourceIds,
            completedTaskIds,
            module
          });

          return (
            <Card className="p-5 md:p-6" key={module.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
                      Days {module.targetDayStart}-{module.targetDayEnd}
                    </span>
                    <span className="rounded-md border border-border bg-canvas px-2.5 py-1 text-xs font-medium text-muted">
                      {module.category}
                    </span>
                    <span className="rounded-md border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                      {module.difficulty}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-ink">
                    {module.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {module.description}
                  </p>
                </div>
                <div className="min-w-40">
                  <div className="mb-2 flex items-center justify-between text-xs text-muted">
                    <span>Completion</span>
                    <span>{moduleProgress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-panel-soft">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_1fr]">
                <section>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <BookOpen aria-hidden="true" size={17} />
                    Study Material
                  </h3>
                  <div className="mt-3 space-y-2">
                    {module.resources.map((material) => {
                      const MaterialIcon = materialIcons[material.type];
                      const checked = completedResourceIds.includes(material.id);

                      return (
                        <div
                          className="flex items-center gap-3 rounded-md border border-border bg-canvas/55 px-3 py-3"
                          key={material.id}
                        >
                          <input
                            aria-label={`Mark ${material.title} complete`}
                            checked={checked}
                            className="size-4 accent-brand"
                            onChange={() => toggleResource(material.id)}
                            type="checkbox"
                          />
                          <MaterialIcon
                            aria-hidden="true"
                            className="shrink-0 text-brand"
                            size={17}
                          />
                          <div className="min-w-0 flex-1">
                            <a
                              className="inline-flex max-w-full items-center gap-1 text-sm font-medium text-ink hover:text-brand"
                              href={material.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span className="truncate">{material.title}</span>
                              <ExternalLink
                                aria-hidden="true"
                                className="shrink-0"
                                size={14}
                              />
                            </a>
                            <p className="mt-1 text-xs text-muted">
                              {material.provider} · {material.durationMinutes}m
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <ListChecks aria-hidden="true" size={17} />
                    Practice Tasks
                  </h3>
                  <div className="mt-3 space-y-2">
                    {module.tasks.map((task) => {
                      const checked = completedTaskIds.includes(task.id);

                      return (
                        <label
                          className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-canvas/55 px-3 py-3"
                          key={task.id}
                        >
                          <input
                            checked={checked}
                            className="mt-1 size-4 accent-brand"
                            onChange={() => toggleTask(task.id)}
                            type="checkbox"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start gap-2 text-sm font-medium text-ink">
                              {checked ? (
                                <CheckCircle2
                                  aria-hidden="true"
                                  className="mt-0.5 shrink-0 text-success"
                                  size={16}
                                />
                              ) : (
                                <Circle
                                  aria-hidden="true"
                                  className="mt-0.5 shrink-0 text-muted"
                                  size={16}
                                />
                              )}
                              {task.title}
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted">
                              {task.outcome} · {task.estimateMinutes}m
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              </div>

              <section className="mt-5 rounded-md border border-border bg-canvas/45 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <MessageSquareText aria-hidden="true" size={17} />
                  Interview Prompts
                </h3>
                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                  {module.interviewPrompts.map((prompt) => (
                    <li className="text-sm leading-6 text-muted" key={prompt}>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </section>
            </Card>
          );
        })}
      </section>
    </PageTransition>
  );
}

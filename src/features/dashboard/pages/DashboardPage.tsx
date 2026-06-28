import {
  Bell,
  CheckCircle2,
  Circle,
  Flame,
  Gem,
  GraduationCap,
  Timer,
  TrendingUp,
  Trophy
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { DsaDocumentLink } from "@/features/dsa/components/DsaDocumentLink";
import { useDashboardPlan } from "@/features/dashboard/hooks/useDashboardPlan";
import { StudyHeatMap } from "@/features/dashboard/components/StudyHeatMap";
import { InterviewReadinessPanel } from "@/features/interviews/components/InterviewReadinessPanel";
import { useStudyProgressStore } from "@/features/progress/store/progressStore";
import { useSettingsStore } from "@/features/settings/store/settingsStore";
import {
  getAllStudyTasks,
  getTrack,
  studyModules
} from "@/features/study/data/studyCatalog";
import { getModuleProgress } from "@/features/study/utils/progress";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";
import { ProgressRing } from "@/shared/components/ProgressRing";
import { StatCard } from "@/shared/components/StatCard";
import {
  STUDY_PROGRAM_DAYS,
  STUDY_PROGRAM_START_DATE
} from "@/shared/constants/app";
import { formatReminderTime, getStudyProgramDay } from "@/shared/utils/date";

export function DashboardPage() {
  const { data } = useDashboardPlan();
  const progress = useStudyProgressStore();
  const completedResourceIds = useStudyProgressStore(
    (state) => state.completedResourceIds
  );
  const completedTaskIds = useStudyProgressStore((state) => state.completedTaskIds);
  const toggleTask = useStudyProgressStore((state) => state.toggleTask);
  const notificationTime = useSettingsStore((state) => state.notificationTime);
  const day = getStudyProgramDay(STUDY_PROGRAM_START_DATE);
  const completion = (day / STUDY_PROGRAM_DAYS) * 100;
  const pendingTasks = getAllStudyTasks().filter(
    (task) => !completedTaskIds.includes(task.id)
  );
  const todayTasks = pendingTasks.slice(0, 4);
  const totalStudyMinutes = todayTasks.reduce(
    (sum, task) => sum + task.estimateMinutes,
    0
  );
  const roadmapCompletion =
    studyModules.length === 0
      ? 0
      : Math.round(
          studyModules.reduce(
            (sum, module) =>
              sum +
              getModuleProgress({
                completedResourceIds,
                completedTaskIds,
                module
              }),
            0
          ) / studyModules.length
        );

  return (
    <PageTransition>
      <PageHeader
        actions={<DsaDocumentLink />}
        description="A focused operating system for DSA, .NET backend depth, React, SQL Server, Azure, GenAI, system design, and interview execution."
        eyebrow="Dashboard"
        title="Welcome back, keep the streak alive"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Flame}
          label="Study Streak"
          tone="success"
          value={`${progress.streakDays} days`}
        />
        <StatCard icon={Gem} label="XP" value={progress.xp.toLocaleString()} />
        <StatCard
          icon={Trophy}
          label="Current Level"
          tone="warning"
          value={progress.currentLevel}
        />
        <StatCard
          icon={Timer}
          label="Weekly Hours"
          tone="danger"
          value={`${progress.weeklyHours}h`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden p-5 md:p-6">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <ProgressRing label={`Day ${day} of ${STUDY_PROGRAM_DAYS}`} value={completion} />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-brand/30 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                  Day {day} of {STUDY_PROGRAM_DAYS}
                </span>
                <span className="rounded-md border border-success/30 bg-success/10 px-3 py-1 text-sm font-medium text-success">
                  {Math.round(totalStudyMinutes / 60)}h planned next
                </span>
                <span className="rounded-md border border-warning/30 bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
                  {roadmapCompletion}% roadmap complete
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-ink">
                Today is for execution, revision, and one visible career asset.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                The plan is calibrated for a 12 PM to 9 PM shift: compact weekday blocks,
                deeper weekend work, and steady DSA progress without touching the source
                document.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <DsaDocumentLink variant="outline" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-ink">Next Reminder</h2>
              <p className="mt-1 text-sm text-muted">
                Daily study notification at {formatReminderTime(notificationTime)}
              </p>
            </div>
            <span className="rounded-md bg-warning/12 p-3 text-warning">
              <Bell aria-hidden="true" size={22} />
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {todayTasks.map((task) => {
              const track = getTrack(task.trackId);
              const checked = completedTaskIds.includes(task.id);

              return (
              <div
                className="flex items-center justify-between gap-4 rounded-md border border-border bg-canvas/55 px-4 py-3"
                key={task.id}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <input
                    aria-label={`Mark ${task.title} complete`}
                    checked={checked}
                    className="mt-1 size-4 accent-brand"
                    onChange={() => toggleTask(task.id)}
                    type="checkbox"
                  />
                  <div className="min-w-0">
                    <p className="flex items-start gap-2 text-sm font-medium text-ink">
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
                      <span>{task.title}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {track?.eyebrow ?? task.trackId} · {task.moduleTitle}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm text-muted">
                  {task.estimateMinutes}m
                </span>
              </div>
              );
            })}
          </div>
        </Card>
      </section>

      <InterviewReadinessPanel />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-md bg-success/12 p-2 text-success">
              <GraduationCap aria-hidden="true" size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">Study Heat Map</h2>
              <p className="text-sm text-muted">Six-week consistency snapshot</p>
            </div>
          </div>
          {data ? <StudyHeatMap cells={data.heatMapCells} /> : null}
        </Card>

        <Card className="p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-md bg-brand/12 p-2 text-brand">
              <TrendingUp aria-hidden="true" size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">Weekly Hours</h2>
              <p className="text-sm text-muted">Weekday depth plus weekend acceleration</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={data?.weeklyHours ?? []}>
                <CartesianGrid stroke="rgba(154, 164, 178, 0.12)" vertical={false} />
                <XAxis dataKey="day" stroke="#9aa4b2" tickLine={false} />
                <YAxis stroke="#9aa4b2" tickLine={false} width={32} />
                <Tooltip
                  contentStyle={{
                    background: "#10131a",
                    border: "1px solid #262b36",
                    borderRadius: 8,
                    color: "#f4f7fb"
                  }}
                  cursor={{ fill: "rgba(56, 189, 248, 0.08)" }}
                />
                <Bar dataKey="hours" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}

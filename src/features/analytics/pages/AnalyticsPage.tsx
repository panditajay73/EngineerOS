import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { weeklyHours } from "@/features/dashboard/data/dashboardData";
import { useStudyProgressStore } from "@/features/progress/store/progressStore";
import {
  getTrackModules,
  studyTracks
} from "@/features/study/data/studyCatalog";
import {
  getModuleProgress,
  getTrackProgress
} from "@/features/study/utils/progress";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";

const chartColors = [
  "#38bdf8",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#a78bfa"
];

export function AnalyticsPage() {
  const completedResourceIds = useStudyProgressStore(
    (state) => state.completedResourceIds
  );
  const completedTaskIds = useStudyProgressStore((state) => state.completedTaskIds);
  const topicCompletion = studyTracks.map((track, index) => ({
    name: track.eyebrow,
    value: getTrackProgress(
      getTrackModules(track.id),
      completedResourceIds,
      completedTaskIds
    ),
    color: chartColors[index] ?? "#38bdf8"
  }));
  const dsaChartData = getTrackModules("dsa").map((module) => ({
    name: module.title,
    completion: getModuleProgress({
      completedResourceIds,
      completedTaskIds,
      module
    })
  }));

  return (
    <PageTransition>
      <PageHeader
        description="Visualize weekly hours, monthly direction, topic completion, DSA progress, development progress, and system design coverage."
        eyebrow="Analytics"
        title="Study signal without spreadsheet fatigue"
      />
      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-ink">Weekly Hours</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={weeklyHours}>
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
                <Bar dataKey="hours" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-ink">Topic Completion</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={topicCompletion}
                  dataKey="value"
                  innerRadius={62}
                  outerRadius={96}
                  paddingAngle={4}
                >
                  {topicCompletion.map((entry) => (
                    <Cell fill={entry.color} key={entry.name} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#10131a",
                    border: "1px solid #262b36",
                    borderRadius: 8,
                    color: "#f4f7fb"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">DSA Progress</h2>
        <div className="mt-4 h-80">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={dsaChartData}>
              <CartesianGrid stroke="rgba(154, 164, 178, 0.12)" vertical={false} />
              <XAxis dataKey="name" stroke="#9aa4b2" tickLine={false} />
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
              <Bar dataKey="completion" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </PageTransition>
  );
}

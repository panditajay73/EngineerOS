import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";
import { RouteFallback } from "@/app/router/RouteFallback";
import { RouteError } from "@/shared/components/RouteError";

const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/DashboardPage").then((module) => ({
    default: module.DashboardPage
  }))
);
const DsaTrackerPage = lazy(() =>
  import("@/features/dsa/pages/DsaTrackerPage").then((module) => ({
    default: module.DsaTrackerPage
  }))
);
const DevelopmentRoadmapPage = lazy(() =>
  import("@/features/development/pages/DevelopmentRoadmapPage").then(
    (module) => ({
      default: module.DevelopmentRoadmapPage
    })
  )
);
const DevOpsPage = lazy(() =>
  import("@/features/devops/pages/DevOpsPage").then((module) => ({
    default: module.DevOpsPage
  }))
);
const SystemDesignPage = lazy(() =>
  import("@/features/system-design/pages/SystemDesignPage").then((module) => ({
    default: module.SystemDesignPage
  }))
);
const ProjectsPage = lazy(() =>
  import("@/features/projects/pages/ProjectsPage").then((module) => ({
    default: module.ProjectsPage
  }))
);
const ResumeTrackerPage = lazy(() =>
  import("@/features/resume/pages/ResumeTrackerPage").then((module) => ({
    default: module.ResumeTrackerPage
  }))
);
const InterviewTrackerPage = lazy(() =>
  import("@/features/interviews/pages/InterviewTrackerPage").then((module) => ({
    default: module.InterviewTrackerPage
  }))
);
const CalendarPage = lazy(() =>
  import("@/features/calendar/pages/CalendarPage").then((module) => ({
    default: module.CalendarPage
  }))
);
const AnalyticsPage = lazy(() =>
  import("@/features/analytics/pages/AnalyticsPage").then((module) => ({
    default: module.AnalyticsPage
  }))
);
const AchievementsPage = lazy(() =>
  import("@/features/achievements/pages/AchievementsPage").then((module) => ({
    default: module.AchievementsPage
  }))
);
const SettingsPage = lazy(() =>
  import("@/features/settings/pages/SettingsPage").then((module) => ({
    default: module.SettingsPage
  }))
);

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <DashboardPage />
          </Suspense>
        )
      },
      {
        path: "dsa",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <DsaTrackerPage />
          </Suspense>
        )
      },
      {
        path: "development",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <DevelopmentRoadmapPage />
          </Suspense>
        )
      },
      {
        path: "devops",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <DevOpsPage />
          </Suspense>
        )
      },
      {
        path: "system-design",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <SystemDesignPage />
          </Suspense>
        )
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ProjectsPage />
          </Suspense>
        )
      },
      {
        path: "resume",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ResumeTrackerPage />
          </Suspense>
        )
      },
      {
        path: "interviews",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <InterviewTrackerPage />
          </Suspense>
        )
      },
      {
        path: "calendar",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <CalendarPage />
          </Suspense>
        )
      },
      {
        path: "analytics",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <AnalyticsPage />
          </Suspense>
        )
      },
      {
        path: "achievements",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <AchievementsPage />
          </Suspense>
        )
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <SettingsPage />
          </Suspense>
        )
      }
    ]
  }
]);

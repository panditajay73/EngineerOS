import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  FileCheck2,
  GitBranch,
  LayoutDashboard,
  Medal,
  Network,
  Settings,
  SquareKanban,
  Trophy
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

const dashboardItem: NavigationItem = {
  icon: LayoutDashboard,
  label: "Dashboard",
  path: "/"
};

const calendarItem: NavigationItem = {
  icon: CalendarDays,
  label: "Calendar",
  path: "/calendar"
};

const analyticsItem: NavigationItem = {
  icon: BarChart3,
  label: "Analytics",
  path: "/analytics"
};

const dsaTrackerItem: NavigationItem = {
  icon: Network,
  label: "DSA Tracker",
  path: "/dsa"
};

const developmentItem: NavigationItem = {
  icon: Code2,
  label: "Development",
  path: "/development"
};

const devOpsItem: NavigationItem = {
  icon: GitBranch,
  label: "DevOps",
  path: "/devops"
};

const systemDesignItem: NavigationItem = {
  icon: SquareKanban,
  label: "System Design",
  path: "/system-design"
};

const projectsItem: NavigationItem = {
  icon: BriefcaseBusiness,
  label: "Projects",
  path: "/projects"
};

const resumeItem: NavigationItem = {
  icon: FileCheck2,
  label: "Resume",
  path: "/resume"
};

const interviewsItem: NavigationItem = {
  icon: Trophy,
  label: "Interviews",
  path: "/interviews"
};

const achievementsItem: NavigationItem = {
  icon: Medal,
  label: "Achievements",
  path: "/achievements"
};

const settingsItem: NavigationItem = {
  icon: Settings,
  label: "Settings",
  path: "/settings"
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Command Center",
    items: [dashboardItem, calendarItem, analyticsItem]
  },
  {
    label: "DSA",
    items: [dsaTrackerItem]
  },
  {
    label: "Skills",
    items: [developmentItem, devOpsItem, systemDesignItem, projectsItem]
  },
  {
    label: "Career",
    items: [resumeItem, interviewsItem, achievementsItem, settingsItem]
  }
];

export const mobileNavigationItems = [
  dashboardItem,
  dsaTrackerItem,
  developmentItem,
  interviewsItem,
  settingsItem
];

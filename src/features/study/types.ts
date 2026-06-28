import type { LucideIcon } from "lucide-react";

export type StudyTrackId =
  | "dsa"
  | "development"
  | "devops"
  | "system-design"
  | "projects";

export type StudyMaterialType =
  | "docs"
  | "guide"
  | "practice"
  | "video"
  | "project"
  | "reference";

export type StudyDifficulty = "Foundation" | "Intermediate" | "Advanced";

export type StudyResource = {
  id: string;
  title: string;
  provider: string;
  type: StudyMaterialType;
  url: string;
  durationMinutes: number;
};

export type StudyTask = {
  id: string;
  title: string;
  outcome: string;
  estimateMinutes: number;
};

export type StudyModule = {
  id: string;
  trackId: StudyTrackId;
  title: string;
  category: string;
  description: string;
  difficulty: StudyDifficulty;
  targetDayStart: number;
  targetDayEnd: number;
  resources: StudyResource[];
  tasks: StudyTask[];
  interviewPrompts: string[];
};

export type StudyTrack = {
  id: StudyTrackId;
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
};

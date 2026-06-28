import type { LucideIcon } from "lucide-react";

export type InterviewCategoryId =
  | "csharp"
  | "aspnet-core"
  | "sql-server"
  | "react"
  | "javascript"
  | "python"
  | "azure"
  | "devops"
  | "system-design"
  | "dsa"
  | "generative-ai"
  | "hr";

export type InterviewDifficulty = "Foundation" | "Intermediate" | "Advanced";

export type InterviewResourceType =
  | "youtube"
  | "microsoft-learn"
  | "official-docs"
  | "roadmap"
  | "cheat-sheet"
  | "interview-questions"
  | "coding-questions"
  | "mock-interview";

export type InterviewTopic = {
  id: string;
  title: string;
  difficulty: InterviewDifficulty;
  estimatedMinutes: number;
  questionCount: number;
  revisionEveryDays: number;
};

export type InterviewResource = {
  id: string;
  label: string;
  provider: string;
  type: InterviewResourceType;
  url: string;
};

export type InterviewCategory = {
  id: InterviewCategoryId;
  title: string;
  description: string;
  targetRoles: string[];
  difficulty: InterviewDifficulty;
  estimatedHours: number;
  questionCount: number;
  icon: LucideIcon;
  topics: InterviewTopic[];
  resources: InterviewResource[];
  mockPrompts: string[];
};

export type InterviewTopicState = {
  topicId: string;
  completed: boolean;
  notes: string;
  revisionCount: number;
  lastRevisionDate: string | null;
  updatedAt: string;
};

export type InterviewCategoryProgress = {
  category: InterviewCategory;
  completedTopics: number;
  completion: number;
  revisionDueCount: number;
  weakestTopics: InterviewTopic[];
  recommendedTopic: InterviewTopic | null;
};

export type InterviewReadinessSummary = {
  overallReadiness: number;
  categoryProgress: InterviewCategoryProgress[];
  revisionDueToday: InterviewTopic[];
  weakestTopics: Array<{
    categoryTitle: string;
    topic: InterviewTopic;
  }>;
  recommendedNextTopic: {
    categoryTitle: string;
    topic: InterviewTopic;
  } | null;
};

import {
  interviewCategories
} from "@/features/interviews/data/interviewCatalog";
import type {
  InterviewCategory,
  InterviewCategoryProgress,
  InterviewReadinessSummary,
  InterviewTopic,
  InterviewTopicState
} from "@/features/interviews/types";

const MS_PER_DAY = 24 * 60 * 60 * 1_000;

function daysSince(dateIso: string | null, now = new Date()) {
  if (!dateIso) {
    return Number.POSITIVE_INFINITY;
  }

  const date = new Date(dateIso);
  return Math.floor((now.getTime() - date.getTime()) / MS_PER_DAY);
}

export function isRevisionDue(
  topic: InterviewTopic,
  state: InterviewTopicState | undefined,
  now = new Date()
) {
  if (!state?.completed) {
    return false;
  }

  return daysSince(state.lastRevisionDate, now) >= topic.revisionEveryDays;
}

export function buildCategoryProgress(
  category: InterviewCategory,
  stateByTopicId: Map<string, InterviewTopicState>,
  now = new Date()
): InterviewCategoryProgress {
  const completedTopics = category.topics.filter(
    (topic) => stateByTopicId.get(topic.id)?.completed
  ).length;
  const revisionDueTopics = category.topics.filter((topic) =>
    isRevisionDue(topic, stateByTopicId.get(topic.id), now)
  );
  const weakestTopics = category.topics
    .filter((topic) => !stateByTopicId.get(topic.id)?.completed)
    .slice(0, 3);

  return {
    category,
    completedTopics,
    completion: Math.round((completedTopics / category.topics.length) * 100),
    revisionDueCount: revisionDueTopics.length,
    weakestTopics,
    recommendedTopic: weakestTopics[0] ?? null
  };
}

export function buildInterviewReadinessSummary(
  topicStates: InterviewTopicState[],
  now = new Date()
): InterviewReadinessSummary {
  const stateByTopicId = new Map(
    topicStates.map((state) => [state.topicId, state])
  );
  const categoryProgress = interviewCategories.map((category) =>
    buildCategoryProgress(category, stateByTopicId, now)
  );
  const overallReadiness =
    categoryProgress.length === 0
      ? 0
      : Math.round(
          categoryProgress.reduce(
            (sum, progress) => sum + progress.completion,
            0
          ) / categoryProgress.length
        );
  const revisionDueToday = interviewCategories.flatMap((category) =>
    category.topics.filter((topic) =>
      isRevisionDue(topic, stateByTopicId.get(topic.id), now)
    )
  );
  const weakestTopics = categoryProgress
    .flatMap((progress) =>
      progress.weakestTopics.map((topic) => ({
        categoryTitle: progress.category.title,
        topic
      }))
    )
    .slice(0, 6);
  const recommendedProgress =
    categoryProgress
      .filter((progress) => progress.recommendedTopic)
      .sort((a, b) => a.completion - b.completion)[0] ?? null;

  return {
    overallReadiness,
    categoryProgress,
    revisionDueToday,
    weakestTopics,
    recommendedNextTopic:
      recommendedProgress?.recommendedTopic
        ? {
            categoryTitle: recommendedProgress.category.title,
            topic: recommendedProgress.recommendedTopic
          }
        : null
  };
}

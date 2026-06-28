import type { StudyModule } from "@/features/study/types";

export type ModuleProgressInput = {
  completedResourceIds: string[];
  completedTaskIds: string[];
  module: StudyModule;
};

export function getModuleProgress({
  completedResourceIds,
  completedTaskIds,
  module
}: ModuleProgressInput) {
  const resourceCount = module.resources.length;
  const taskCount = module.tasks.length;
  const totalItems = resourceCount + taskCount;

  if (totalItems === 0) {
    return 0;
  }

  const completedResources = module.resources.filter((resource) =>
    completedResourceIds.includes(resource.id)
  ).length;
  const completedTasks = module.tasks.filter((task) =>
    completedTaskIds.includes(task.id)
  ).length;

  return Math.round(((completedResources + completedTasks) / totalItems) * 100);
}

export function getTrackProgress(
  modules: StudyModule[],
  completedResourceIds: string[],
  completedTaskIds: string[]
) {
  if (modules.length === 0) {
    return 0;
  }

  const totalProgress = modules.reduce(
    (sum, module) =>
      sum + getModuleProgress({ completedResourceIds, completedTaskIds, module }),
    0
  );

  return Math.round(totalProgress / modules.length);
}

export function getEstimatedTrackHours(modules: StudyModule[]) {
  const minutes = modules.reduce((sum, module) => {
    const resourceMinutes = module.resources.reduce(
      (resourceSum, resource) => resourceSum + resource.durationMinutes,
      0
    );
    const taskMinutes = module.tasks.reduce(
      (taskSum, task) => taskSum + task.estimateMinutes,
      0
    );
    return sum + resourceMinutes + taskMinutes;
  }, 0);

  return Math.round(minutes / 60);
}

import { productWorkflows, isWorkflowStageReady } from "./productWorkflows";

// Completed timeline entries automatically become searchable homepage solutions.
export const solutions = Object.values(productWorkflows)
  .flat()
  .filter(isWorkflowStageReady)
  .map((record) => ({ ...record, stageIds: [record.stageId] }));

export function findSolutionsByStages(selectedStageIds) {
  if (selectedStageIds.length === 0) return [];

  return solutions.filter((solution) =>
    solution.stageIds.some((stageId) => selectedStageIds.includes(stageId)),
  );
}

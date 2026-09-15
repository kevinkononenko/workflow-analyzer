// Solution records will be added after their card format is defined.
// Each record can belong to one product and one or more workflow stages.
export const solutions = [];

export function findSolutionsByStages(selectedStageIds) {
  if (selectedStageIds.length === 0) return [];

  return solutions.filter((solution) =>
    solution.stageIds.some((stageId) => selectedStageIds.includes(stageId)),
  );
}

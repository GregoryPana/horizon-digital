export type HomeProcessFlowStage = {
  index: number;
  progress: number;
};

export function buildHomeProcessFlowStages(count: number): HomeProcessFlowStage[] {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error("Home process flow requires at least two stages");
  }

  return Array.from({ length: count }, (_, index) => ({
    index,
    progress: index / (count - 1),
  }));
}

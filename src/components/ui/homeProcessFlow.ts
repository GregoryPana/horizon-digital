export type HomeProcessFlowStage = {
  index: number;
  progress: number;
};

export function getHomeProcessActiveIndex(progress: number, count: number): number {
  if (!Number.isInteger(count) || count < 1) return -1;
  return Math.min(count - 1, Math.max(-1, Math.floor(progress * count)));
}

export function buildHomeProcessFlowStages(count: number): HomeProcessFlowStage[] {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error("Home process flow requires at least two stages");
  }

  return Array.from({ length: count }, (_, index) => ({
    index,
    progress: index / (count - 1),
  }));
}

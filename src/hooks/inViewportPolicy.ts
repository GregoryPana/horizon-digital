export type ViewportIconAutoplayPolicy = {
  isNearViewport: boolean;
  hasCoarsePointer: boolean;
  hasHover: boolean;
  reducedMotion: boolean;
};

export function shouldAutoplayViewportIcon({
  isNearViewport,
  hasCoarsePointer,
  hasHover,
  reducedMotion,
}: ViewportIconAutoplayPolicy): boolean {
  if (reducedMotion || !isNearViewport) return false;

  return hasCoarsePointer || !hasHover;
}

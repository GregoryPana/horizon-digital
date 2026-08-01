export const HOME_SCROLL_PRELOAD_MARGIN = 600;

type HomeScrollMotionLoadPolicy = {
  sectionTop: number;
  viewportHeight: number;
  preloadMargin?: number;
};

export function shouldLoadHomeScrollMotion({
  sectionTop,
  viewportHeight,
  preloadMargin = HOME_SCROLL_PRELOAD_MARGIN,
}: HomeScrollMotionLoadPolicy): boolean {
  return sectionTop <= viewportHeight + preloadMargin;
}

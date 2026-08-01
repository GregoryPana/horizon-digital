export interface WorkProjectAccessibility {
  ariaHidden: true | undefined;
  inert: true | undefined;
  tabIndex: 0 | -1;
}

export interface GridSpanGeometry {
  containerWidth: number;
  horizontalPadding: number;
  columns: number;
  gap: number;
  span: number;
}

/**
 * Selects the presentation active at a GSAP timeline time. Activation
 * boundaries must be ordered by project and come from the timeline's labels.
 */
export function getActiveWorkProjectAtTime(
  timelineTime: number,
  activationBoundaries: readonly number[],
): number {
  if (activationBoundaries.length === 0 || timelineTime <= activationBoundaries[0]) return 0;

  const lastIndex = activationBoundaries.length - 1;
  if (timelineTime >= activationBoundaries[lastIndex]) return lastIndex;

  let low = 0;
  let high = lastIndex;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (activationBoundaries[middle] <= timelineTime) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return Math.max(0, high);
}

/** Returns a grid span's width after container padding and inter-track gaps. */
export function calculateGridSpanWidth(
  containerWidth: number,
  horizontalPadding: number,
  columns: number,
  gap: number,
  span: number,
): number {
  const trackWidth = (containerWidth - horizontalPadding - (columns - 1) * gap) / columns;
  return span * trackWidth + (span - 1) * gap;
}

export const WORK_XL_VISUAL_GEOMETRY: GridSpanGeometry = {
  containerWidth: 1280,
  horizontalPadding: 64,
  columns: 12,
  gap: 80,
  span: 7,
};

export const WORK_SECONDARY_WIDTH_RATIO = 0.62;
export const WORK_DESKTOP_PRIMARY_WIDTH = calculateGridSpanWidth(
  WORK_XL_VISUAL_GEOMETRY.containerWidth,
  WORK_XL_VISUAL_GEOMETRY.horizontalPadding,
  WORK_XL_VISUAL_GEOMETRY.columns,
  WORK_XL_VISUAL_GEOMETRY.gap,
  WORK_XL_VISUAL_GEOMETRY.span,
);
export const WORK_DESKTOP_SECONDARY_WIDTH = Math.round(
  WORK_DESKTOP_PRIMARY_WIDTH * WORK_SECONDARY_WIDTH_RATIO,
);

const workLgHorizontalPadding = 64;
const workLgSecondaryOffset = workLgHorizontalPadding * WORK_SECONDARY_WIDTH_RATIO;
const workTabletSecondaryWidth = Math.round((460 - 64) * WORK_SECONDARY_WIDTH_RATIO);

export const WORK_PRIMARY_SIZES = `(min-width: 1280px) ${WORK_DESKTOP_PRIMARY_WIDTH}px, (min-width: 1024px) calc(100vw - 64px), (min-width: 640px) 460px, (min-width: 380px) 340px, calc(100vw - 40px)`;
export const WORK_SECONDARY_SIZES = `(min-width: 1280px) ${WORK_DESKTOP_SECONDARY_WIDTH}px, (min-width: 1024px) calc(62vw - ${workLgSecondaryOffset}px), (min-width: 768px) ${workTabletSecondaryWidth}px, 0px`;

/**
 * Reduced-motion renders every project in normal document flow. The pinned
 * presentation exposes only the active slide to keyboard and assistive tech.
 */
export function getWorkProjectAccessibility(
  index: number,
  activeIndex: number,
  reducedMotion: boolean,
): WorkProjectAccessibility {
  const inactive = !reducedMotion && index !== activeIndex;
  return {
    ariaHidden: inactive ? true : undefined,
    inert: inactive ? true : undefined,
    tabIndex: inactive ? -1 : 0,
  };
}

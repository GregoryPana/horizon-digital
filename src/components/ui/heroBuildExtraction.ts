export type HeroBuildExtractionStageId =
  | "screen-build"
  | "headline-reveal"
  | "support";

export type HeroBuildExtractionMode = "desktop" | "mobile";

export const HERO_DESKTOP_HEADLINE_EFFECT = Object.freeze({
  desktopStoryStart: 0,
  mobileStoryStart: 0,
});

/** One finite word reveal on every viewport; no per-letter or recurring work. */
export const HERO_WORD_HEADLINE_EFFECT = Object.freeze({
  start: 0.14,
  duration: 0.22,
  // Equal start spacing and duration: every word finishes before the next starts.
  stagger: 0.22,
  blur: 6,
  initialOpacity: 0,
});

export function getHeroWordRevealTiming(wordCount: number) {
  const revealEnd = HERO_WORD_HEADLINE_EFFECT.start
    + HERO_WORD_HEADLINE_EFFECT.duration
    + Math.max(0, wordCount - 1) * HERO_WORD_HEADLINE_EFFECT.stagger;
  return { revealEnd, supportStart: revealEnd + 0.12 };
}

export interface HeroBuildExtractionStage {
  readonly id: HeroBuildExtractionStageId;
  readonly start: number;
  readonly duration: number;
}

export interface HeroBuildExtractionFinalState {
  readonly copyPosition: "editorial-left" | "mobile-top";
  readonly device: "dual-device-stage" | "absent";
  readonly supportVisible: true;
}

export interface HeroBuildExtractionPolicy {
  readonly mode: HeroBuildExtractionMode;
  readonly stages: readonly HeroBuildExtractionStage[];
  readonly totalDuration: number;
  readonly finalState: HeroBuildExtractionFinalState;
}

const definePolicy = (
  mode: HeroBuildExtractionMode,
  stages: readonly HeroBuildExtractionStage[],
  finalState: HeroBuildExtractionFinalState,
): HeroBuildExtractionPolicy => ({
  mode,
  stages,
  totalDuration: Math.max(...stages.map(({ start, duration }) => start + duration)),
  finalState,
});

const desktopStages: HeroBuildExtractionStage[] = [
  { id: "screen-build", start: 0, duration: 0 },
];

const mobileStages: HeroBuildExtractionStage[] = [
  { id: "headline-reveal", start: HERO_WORD_HEADLINE_EFFECT.start, duration: getHeroWordRevealTiming(7).revealEnd - HERO_WORD_HEADLINE_EFFECT.start },
  { id: "support", start: getHeroWordRevealTiming(7).supportStart, duration: 0.76 },
];

export function shouldMountHeroStories(viewportWidth: number): boolean {
  return viewportWidth >= 768;
}

export const HERO_BUILD_EXTRACTION_POLICIES = {
  desktop: definePolicy("desktop", desktopStages, {
    copyPosition: "editorial-left",
    device: "dual-device-stage",
    supportVisible: true,
  }),
  mobile: definePolicy("mobile", mobileStages, {
    copyPosition: "mobile-top",
    device: "absent",
    supportVisible: true,
  }),
} as const;

export interface HeroBuildExtractionCompositionInput {
  readonly viewportWidth: number;
  readonly reducedMotion: boolean;
}

export interface HeroBuildExtractionComposition extends HeroBuildExtractionPolicy {
  readonly animate: boolean;
}

/** Pure responsive/motion selector aligned with the CSS/GSAP 768px boundary. */
export function getHeroBuildExtractionComposition({
  viewportWidth,
  reducedMotion,
}: HeroBuildExtractionCompositionInput): HeroBuildExtractionComposition {
  const mode: HeroBuildExtractionMode = viewportWidth >= 768 ? "desktop" : "mobile";
  const policy = HERO_BUILD_EXTRACTION_POLICIES[mode];

  if (reducedMotion) {
    return {
      ...policy,
      animate: false,
      stages: [],
      totalDuration: 0,
    };
  }

  return { ...policy, animate: mode === "mobile" };
}

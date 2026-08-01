export const WEBSITE_BUILD_STAGES = [
  { id: "plan", label: "PLAN", start: 0, duration: 2.8 },
  { id: "design", label: "DESIGN", start: 2.8, duration: 1.7 },
  { id: "build", label: "BUILD", start: 4.5, duration: 2 },
  { id: "test", label: "TEST", start: 6.5, duration: 4 },
  { id: "launch", label: "LIVE", start: 10.5, duration: 3.5 },
] as const;

export type WebsiteBuildStage = (typeof WEBSITE_BUILD_STAGES)[number];
export type WebsiteBuildStageId = WebsiteBuildStage["id"];

export const WEBSITE_BUILD_ACTIVE_DURATION = Math.max(
  ...WEBSITE_BUILD_STAGES.map((stage) => stage.start + stage.duration)
);

export function shouldAnimateWebsiteBuildStory(input: {
  reducedMotion: boolean;
  inViewport: boolean;
  mobile: boolean;
}): boolean {
  return !input.reducedMotion && input.inViewport && !input.mobile;
}

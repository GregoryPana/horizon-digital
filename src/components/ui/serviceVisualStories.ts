export const SERVICE_STORY_STAGES = {
  atelier: [
    { id: "brief", label: "Brief", start: 0, duration: 0.8 },
    { id: "structure", label: "Structure", start: 0.9, duration: 0.9 },
    { id: "design", label: "Design", start: 1.9, duration: 0.9 },
    { id: "responsive", label: "Responsive check", start: 2.9, duration: 0.8 },
    { id: "ready", label: "Ready for review", start: 3.8, duration: 1.2 },
  ],
  seo: [
    { id: "crawl", label: "Crawl", start: 0, duration: 0.7 },
    { id: "checks", label: "Page checks", start: 0.8, duration: 0.8 },
    { id: "priorities", label: "Priorities", start: 1.7, duration: 0.8 },
    { id: "boundary", label: "Review or scoped implementation", start: 2.6, duration: 1.2 },
  ],
  analytics: [
    { id: "interaction", label: "Interaction", start: 0, duration: 0.55 },
    { id: "consent", label: "Consent", start: 0.65, duration: 0.55 },
    { id: "measurement", label: "Measurement", start: 1.3, duration: 0.65 },
    { id: "verification", label: "Verification", start: 2.05, duration: 0.6 },
    { id: "activity", label: "Simple activity", start: 2.75, duration: 1.05 },
  ],
} as const;

export type ServiceStoryKind = keyof typeof SERVICE_STORY_STAGES;

export function getServiceStoryDuration(kind: ServiceStoryKind): number {
  return Math.max(
    ...SERVICE_STORY_STAGES[kind].map((stage) => stage.start + stage.duration),
  );
}

export function getServiceStoryDelay(
  kind: ServiceStoryKind,
  stageId: string,
): number {
  return SERVICE_STORY_STAGES[kind].find((stage) => stage.id === stageId)?.start ?? 0;
}

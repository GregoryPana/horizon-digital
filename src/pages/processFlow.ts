import { projectSteps } from "../data/site";

export const PROCESS_DETAIL_KEYS = [
  "clientInput",
  "horizonActivity",
  "reviewPoint",
  "deliverable",
  "nextStep",
] as const;

export type ProcessDetailKey = (typeof PROCESS_DETAIL_KEYS)[number];
export type ProcessIconName = "MessageSquare" | "Palette" | "Code2" | "Rocket" | "ShieldCheck";

type ProcessDetails = Readonly<Record<ProcessDetailKey, string>>;

type ProcessPhaseMeta = Readonly<{
  expectedTitle: string;
  id: string;
  icon: ProcessIconName;
  details: ProcessDetails;
}>;

const phaseMeta = [
  {
    expectedTitle: "First chat",
    id: "first-chat",
    icon: "MessageSquare",
    details: {
      clientInput: "Your business, customers and what the website needs to do.",
      horizonActivity: "We listen, clarify priorities and shape the initial scope.",
      reviewPoint: "We confirm the website's purpose and the agreed needs.",
      deliverable: "An agreed project direction.",
      nextStep: "Move into structure and visual planning.",
    },
  },
  {
    expectedTitle: "Plan and design",
    id: "plan-and-design",
    icon: "Palette",
    details: {
      clientInput: "Your feedback on the proposed structure and visual direction.",
      horizonActivity: "We prepare the site structure and visual direction.",
      reviewPoint: "You review the direction before development begins.",
      deliverable: "A proposed structure and visual direction.",
      nextStep: "Development begins after the direction is approved.",
    },
  },
  {
    expectedTitle: "Build and test",
    id: "build-and-test",
    icon: "Code2",
    details: {
      clientInput: "The approved structure and visual direction.",
      horizonActivity: "We build the website and test the agreed scope.",
      reviewPoint: "We check supported screen sizes and browsers.",
      deliverable: "The website built to the agreed scope.",
      nextStep: "Complete final checks for launch.",
    },
  },
  {
    expectedTitle: "Go live",
    id: "go-live",
    icon: "Rocket",
    details: {
      clientInput: "Any final feedback against the agreed scope.",
      horizonActivity: "We complete final checks and prepare the website for launch.",
      reviewPoint: "The agreed scope is checked before launch.",
      deliverable: "The launched website.",
      nextStep: "Begin the package's post-launch support period.",
    },
  },
  {
    expectedTitle: "Support after launch",
    id: "support-after-launch",
    icon: "ShieldCheck",
    details: {
      clientInput: "Details of an issue raised during the included support period.",
      horizonActivity: "We provide the post-launch support included with your package.",
      reviewPoint: "Support needs are considered against the selected package.",
      deliverable: "Included post-launch support for 30, 45 or 60 days.",
      nextStep: "The included support period concludes.",
    },
  },
] as const satisfies readonly ProcessPhaseMeta[];

if (projectSteps.length !== phaseMeta.length) {
  throw new Error("Process phase metadata must match the authoritative project step count");
}

phaseMeta.forEach((metadata, index) => {
  const authoritativeTitle = projectSteps[index]?.title;
  if (authoritativeTitle !== metadata.expectedTitle) {
    throw new Error(
      `Process phase metadata title mismatch at index ${index}: expected "${metadata.expectedTitle}", received "${authoritativeTitle ?? "<missing>"}"`,
    );
  }
});

export const PROCESS_PHASES = projectSteps.map((step, index) => ({
  ...step,
  id: phaseMeta[index].id,
  icon: phaseMeta[index].icon,
  details: phaseMeta[index].details,
}));

export function shouldShowProcessPhase(
  phaseIndex: number,
  activeIndex: number,
  shouldReduceMotion: boolean,
): boolean {
  const isValidPhase = Number.isInteger(phaseIndex)
    && phaseIndex >= 0
    && phaseIndex < phaseMeta.length;

  if (!isValidPhase) return false;
  if (shouldReduceMotion) return true;
  if (!Number.isFinite(activeIndex)) return false;

  return phaseIndex <= Math.floor(activeIndex);
}

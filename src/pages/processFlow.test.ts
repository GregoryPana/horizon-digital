import { describe, expect, it } from "vitest";
import { projectSteps } from "../data/site";
import {
  PROCESS_DETAIL_KEYS,
  PROCESS_PHASES,
  shouldShowProcessPhase,
} from "./processFlow";

const authoritativeTitles = [
  "First chat",
  "Plan and design",
  "Build and test",
  "Go live",
  "Support after launch",
];

describe("Process flow contract", () => {
  it("keeps exactly the five authoritative phases in canonical order", () => {
    expect(PROCESS_PHASES).toHaveLength(5);
    expect(PROCESS_PHASES.map((phase) => phase.title)).toEqual(authoritativeTitles);
    expect(PROCESS_PHASES.map((phase) => phase.title)).toEqual(
      projectSteps.map((step) => step.title),
    );
    expect(PROCESS_PHASES.map((phase) => phase.description)).toEqual(
      projectSteps.map((step) => step.description),
    );
  });

  it("provides all five distinct visible detail fields for every phase", () => {
    expect(PROCESS_DETAIL_KEYS).toEqual([
      "clientInput",
      "horizonActivity",
      "reviewPoint",
      "deliverable",
      "nextStep",
    ]);

    for (const phase of PROCESS_PHASES) {
      const values = PROCESS_DETAIL_KEYS.map((key) => phase.details[key].trim());
      expect(values.every(Boolean), phase.title).toBe(true);
      expect(new Set(values).size, phase.title).toBe(PROCESS_DETAIL_KEYS.length);
    }
  });

  it("keeps each stable ID and icon coupled to its authoritative title", () => {
    expect(PROCESS_PHASES.map(({ title, id, icon }) => ({ title, id, icon }))).toEqual([
      { title: "First chat", id: "first-chat", icon: "MessageSquare" },
      { title: "Plan and design", id: "plan-and-design", icon: "Palette" },
      { title: "Build and test", id: "build-and-test", icon: "Code2" },
      { title: "Go live", id: "go-live", icon: "Rocket" },
      { title: "Support after launch", id: "support-after-launch", icon: "ShieldCheck" },
    ]);
    expect(new Set(PROCESS_PHASES.map((phase) => phase.id)).size).toBe(5);
    expect(PROCESS_PHASES.every((phase) => !("expectedTitle" in phase))).toBe(true);
  });

  it("shows current and completed phases after normal or restored progress", () => {
    expect(PROCESS_PHASES.map((_, index) => shouldShowProcessPhase(index, 0, false))).toEqual([
      true,
      false,
      false,
      false,
      false,
    ]);
    expect(PROCESS_PHASES.map((_, index) => shouldShowProcessPhase(index, 2, false))).toEqual([
      true,
      true,
      true,
      false,
      false,
    ]);
    expect(PROCESS_PHASES.map((_, index) => shouldShowProcessPhase(index, 4, false))).toEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });

  it("is safe for invalid progress and makes reduced-motion phases static", () => {
    expect(shouldShowProcessPhase(-1, 4, false)).toBe(false);
    expect(shouldShowProcessPhase(PROCESS_PHASES.length, 4, true)).toBe(false);
    expect(shouldShowProcessPhase(0, Number.NaN, false)).toBe(false);
    expect(PROCESS_PHASES.every((_, index) => shouldShowProcessPhase(index, -1, true))).toBe(true);
  });

  it("allows reverse state without changing the monotonic reveal boundary contract", () => {
    const revealedThroughIndex = Math.max(4, 1);
    expect(PROCESS_PHASES.every((_, index) => (
      shouldShowProcessPhase(index, revealedThroughIndex, false)
    ))).toBe(true);
  });
});

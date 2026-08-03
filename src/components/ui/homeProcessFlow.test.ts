import { describe, expect, it } from "vitest";
import { buildHomeProcessFlowStages, getHomeProcessActiveIndex } from "./homeProcessFlow";

describe("buildHomeProcessFlowStages", () => {
  it("spaces a five-stage flow from the first node to the completed path", () => {
    expect(buildHomeProcessFlowStages(5)).toEqual([
      { index: 0, progress: 0 },
      { index: 1, progress: 0.25 },
      { index: 2, progress: 0.5 },
      { index: 3, progress: 0.75 },
      { index: 4, progress: 1 },
    ]);
  });

  it("rejects a flow that cannot move between at least two nodes", () => {
    expect(() => buildHomeProcessFlowStages(1)).toThrow(
      "Home process flow requires at least two stages",
    );
  });
});

describe("getHomeProcessActiveIndex", () => {
  it("maps scroll progress cumulatively using the same stepped policy as service journeys", () => {
    expect(getHomeProcessActiveIndex(-0.01, 5)).toBe(-1);
    expect(getHomeProcessActiveIndex(0, 5)).toBe(0);
    expect(getHomeProcessActiveIndex(0.39, 5)).toBe(1);
    expect(getHomeProcessActiveIndex(0.8, 5)).toBe(4);
    expect(getHomeProcessActiveIndex(1, 5)).toBe(4);
  });
});

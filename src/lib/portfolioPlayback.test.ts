import { describe, expect, it } from "vitest";
import { getPortfolioPauseReason, type PortfolioPlaybackState } from "./portfolioPlayback";
const playing: PortfolioPlaybackState = { active: true, reducedMotion: false, visible: true, hovered: false, focused: false, manual: false, hidden: false };
describe("portfolio preview lifecycle", () => {
  it("plays only an active visible unfocused unpaused preview in a visible tab", () => {
    expect(getPortfolioPauseReason(playing)).toBeUndefined();
  });
  it.each([
    ["active", false, "inactive"], ["visible", false, "offscreen"],
    ["hidden", true, "hidden-tab"], ["reducedMotion", true, "reduced-motion"],
    ["hovered", true, "hover"], ["focused", true, "focus"], ["manual", true, "manual"],
  ] as const)("stops for %s=%s", (key, value, reason) => {
    expect(getPortfolioPauseReason({ ...playing, [key]: value })).toBe(reason);
  });
  it("never lets hover exit or manual play override inactive/offscreen/hidden gates", () => {
    expect(getPortfolioPauseReason({ ...playing, active: false, hovered: false, manual: false })).toBe("inactive");
    expect(getPortfolioPauseReason({ ...playing, visible: false, hovered: false, manual: false })).toBe("offscreen");
    expect(getPortfolioPauseReason({ ...playing, hidden: true, hovered: false, manual: false })).toBe("hidden-tab");
  });
});

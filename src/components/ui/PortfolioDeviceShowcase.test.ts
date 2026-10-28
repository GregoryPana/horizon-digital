import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { portfolioDeviceMedia } from "../../data/portfolioDeviceMedia";
const component = readFileSync(new URL("./PortfolioDeviceShowcase.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("./PortfolioDeviceShowcase.css", import.meta.url), "utf8");

describe("Portfolio device previews", () => {
  it("provides real independent desktop and phone captures for all five projects", () => {
    expect(Object.keys(portfolioDeviceMedia)).toEqual(["drake", "horizon-auto", "takamaka", "forma", "beauty"]);
    for (const media of Object.values(portfolioDeviceMedia)) {
      expect(media.desktop.viewportWidth).toBe(1440);
      expect(media.desktop.viewportHeight).toBe(900);
      expect(media.mobile.viewportWidth).toBe(390);
      expect(media.mobile.viewportHeight).toBe(844);
      expect(media.mobile.width).toBe(390);
      expect(media.mobile.height).toBeGreaterThan(844);
      expect(media.desktop.height / media.desktop.width).toBeGreaterThan(900 / 1440);
    }
  });
  it("fits each full screenshot by width and clips only the vertical scrolling viewport", () => {
    expect(css).toContain("aspect-ratio:1440/900");
    expect(css).toContain("aspect-ratio:390/844");
    expect(css).toContain("width:100%;height:auto");
    expect(css).toContain("overflow:hidden");
    expect(css).not.toContain("object-fit:cover");
  });
  it("pauses the shared timeline on hover/focus/touch pause, hidden tabs and inactive projects", () => {
    expect(component).toContain("!active || reducedMotion || hover.current || focus.current || manual.current || !visible.current || document.hidden");
    expect(component).toContain('el.addEventListener("pointerenter", enter)');
    expect(component).toContain('el.addEventListener("focusin", focusIn)');
    expect(component).toContain("aria-pressed={paused}");
    expect(component).toContain("timeline.current?.paused(stop)");
    expect(component).toContain("timeline.current?.kill()");
  });
  it("blurs before resetting to the top and clears blur before repeating", () => {
    expect(component).toContain('filter: "blur(7px)"');
    expect(component).toContain('duration: 13, ease: "none"');
    expect(component).toContain('.set(images, { y: 0 }, 16.05)');
    expect(component).toContain('filter: "blur(0px)", opacity: 1, duration: 0.65');
    expect(component).toContain("repeat: -1");
    expect(component).toContain('if (reducedMotion || disposed)');
  });
});

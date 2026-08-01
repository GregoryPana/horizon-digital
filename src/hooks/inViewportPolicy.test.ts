import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InteractiveSvgIcon } from "../components/ui/InteractiveSvgIcon";
import { shouldAutoplayViewportIcon } from "./inViewportPolicy";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const iconCss = readFileSync(new URL("../index.css", import.meta.url), "utf8");

const touchViewportIcon = {
  isNearViewport: true,
  hasCoarsePointer: true,
  hasHover: false,
  reducedMotion: false,
};

describe("shouldAutoplayViewportIcon", () => {
  it("does not autoplay touch icons while they are off-screen", () => {
    expect(shouldAutoplayViewportIcon({
      ...touchViewportIcon,
      isNearViewport: false,
    })).toBe(false);
  });

  it("autoplays intersecting touch/coarse icons", () => {
    expect(shouldAutoplayViewportIcon(touchViewportIcon)).toBe(true);
    expect(shouldAutoplayViewportIcon({
      ...touchViewportIcon,
      hasCoarsePointer: false,
    })).toBe(true);
    expect(shouldAutoplayViewportIcon({
      ...touchViewportIcon,
      hasHover: true,
    })).toBe(true);
  });

  it("keeps pointer and hover-capable users interaction-driven", () => {
    expect(shouldAutoplayViewportIcon({
      ...touchViewportIcon,
      hasCoarsePointer: false,
      hasHover: true,
    })).toBe(false);
  });

  it("disables autoplay when reduced motion is preferred", () => {
    expect(shouldAutoplayViewportIcon({
      ...touchViewportIcon,
      reducedMotion: true,
    })).toBe(false);
  });
});

describe("viewport animation integration contracts", () => {
  it("renders icons without autonomous viewport state during SSR", () => {
    const markup = renderToStaticMarkup(createElement(InteractiveSvgIcon, {
      kind: "check",
      effect: "trace",
    }));

    expect(markup).toContain("interactive-svg-icon--trace");
    expect(markup).not.toContain("is-viewport-active");
  });

  it("requires viewport-active state for coarse-pointer icon loops and preserves tap replay", () => {
    expect(iconCss).toContain(
      ".interactive-svg-icon--trace:where(.is-viewport-active) .interactive-svg-path",
    );
    expect(iconCss).toContain(".interactive-svg-icon--glow:where(.is-viewport-active)");
    expect(iconCss).toContain(".interactive-svg-icon--pop:where(.is-viewport-active)");
    expect(iconCss).toContain(".interactive-svg-icon--colour:where(.is-viewport-active)");
    expect(iconCss).toContain(
      ".group.is-tap-animating .interactive-svg-icon--trace .interactive-svg-path",
    );
  });

  it("loads homepage ScrollTrigger dynamically behind a near-viewport observer", () => {
    expect(homeSource).not.toMatch(
      /import\s+[^;]+from\s+["']gsap\/ScrollTrigger["']/,
    );
    expect(homeSource).toContain('await import("gsap/ScrollTrigger")');
    expect(homeSource).toContain("new window.IntersectionObserver(");
    expect(homeSource).toContain("firstMotionSectionRef");
    expect(homeSource).toContain("shouldLoadHomeScrollMotion({");
    expect(homeSource).toContain("firstMotionSection.getBoundingClientRect().top");
    expect(homeSource).toContain("entry.boundingClientRect.top");
    expect(homeSource).toContain("if (!scrollTriggerPlugin) return;");
    expect(homeSource).toContain("scrollTriggerPlugin.create({");
    expect(homeSource).toMatch(/setScrollTriggerPlugin\(\(\) => plugin\)/);
    expect(homeSource).not.toMatch(/setScrollTriggerPlugin\(plugin\)/);
  });
});

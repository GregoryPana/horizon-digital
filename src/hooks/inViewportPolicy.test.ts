import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InteractiveSvgIcon } from "../components/ui/InteractiveSvgIcon";
import { shouldAutoplayViewportIcon } from "./inViewportPolicy";

const proceduralRevealSource = readFileSync(
  new URL("./useProceduralReveal.ts", import.meta.url),
  "utf8",
);
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
  it('keeps the shared procedural reveal plugin dynamically loaded', () => {
    expect(proceduralRevealSource).toContain('import("gsap/ScrollTrigger")');
  });
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

  // Retired Home-only integration: docs/release-evidence/retired-homepage-assertions.md.
  // Replacement: editorialHome.reconciliation.test.ts (content/route) and editorial runtime tests.
});

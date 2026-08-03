import { createElement } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WorkMarquee, normalizeLoopPosition } from "./WorkMarquee";

const items = [
  createElement("a", { href: "/one", key: "one" }, "One"),
  createElement("a", { href: "/two", key: "two" }, "Two"),
];

describe("WorkMarquee", () => {
  it("renders three equal visual groups but exposes only one semantic list", () => {
    const html = renderToStaticMarkup(
      createElement(WorkMarquee, { label: "Selected work", children: items })
    );
    expect(html.match(/class="work-marquee-group/g)).toHaveLength(3);
    expect(html.match(/role="list"/g)).toHaveLength(1);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("inert");
  });

  it("uses native horizontal scrolling and advances the real scroll position", () => {
    const componentSource = readFileSync(new URL("./WorkMarquee.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../../index.css", import.meta.url), "utf8");

    expect(styles).toMatch(/\.work-marquee-viewport\s*\{[\s\S]*overflow-x:\s*auto/);
    expect(styles).toMatch(/\.work-marquee-viewport\s*\{[\s\S]*touch-action:\s*pan-y/);
    expect(styles).not.toContain("@keyframes work-marquee-scroll");
    expect(componentSource).toContain("requestAnimationFrame");
    expect(componentSource).toContain("viewport.scrollLeft");
    expect(componentSource).toContain("normalizeLoopPosition");
    expect(componentSource).toContain("onWheel");
    expect(componentSource).toContain("onPointerDown");
    expect(componentSource).toContain("onKeyDown");
  });

  it("pauses for interaction and resumes from the user's current scrollLeft", () => {
    const componentSource = readFileSync(new URL("./WorkMarquee.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../../index.css", import.meta.url), "utf8");

    expect(componentSource).toContain("pauseReasonsRef");
    expect(componentSource).toContain("resumeAfterInteraction");
    expect(componentSource).not.toMatch(/scrollLeft\s*=\s*0[^\n]*resume/);
    expect(styles).toMatch(/\.work-marquee-item:(?:hover|focus-within)[\s\S]*translateY\(-12px\)/);
  });

  it("normalizes equivalent positions in both directions at the duplicated boundary", () => {
    expect(normalizeLoopPosition(1_140, 1_000)).toBe(140);
    expect(normalizeLoopPosition(-140, 1_000)).toBe(860);
  });

  it("stops autonomous advancement and hides the duplicate for reduced motion", () => {
    const componentSource = readFileSync(new URL("./WorkMarquee.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../../index.css", import.meta.url), "utf8");

    expect(componentSource).toContain("reducedMotion");
    expect(styles).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*\.work-marquee-group\[aria-hidden="true"\][\s\S]*display:\s*none/);
  });
});

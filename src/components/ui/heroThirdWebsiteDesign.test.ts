// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { act, cleanup, render } from "@testing-library/react";
import gsap from "gsap";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HeroLightWorkspace, HeroWebsitePlayback, WEBSITE_BUILD_STYLES } from "./HeroLightWorkspace";

const css = readFileSync(`${process.cwd()}/src/components/ui/heroLightWorkspace.css`, "utf8");
const source = readFileSync(`${process.cwd()}/src/components/ui/HeroLightWorkspace.tsx`, "utf8");


afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("third wordless architectural website", () => {
  it.each(["desktop", "mobile"] as const)("retains wordless geometry while the owner-requested business art replaces the abstract A/B in %s", variant => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(createElement(HeroLightWorkspace, { variant }));
    for (const style of ["a", "b"] as const) {
      const design = container.querySelector(`.hwb-design-${style}`)!;
      expect(design.textContent).toBe("");
      expect(design.querySelectorAll('.hwb-finished img')).toHaveLength(3);
      expect(design.querySelectorAll('[data-geometry-part]')).toHaveLength(14);
      expect(design.getAttribute('data-business')).toBe(style === 'a' ? 'coastal-stay' : 'coffee-house');
    }
  });

  it.each(["desktop", "mobile"] as const)("maps seven C groups through the same blueprint/final geometry in %s", variant => {
    const { container } = render(createElement(HeroLightWorkspace, { variant }));
    const design = container.querySelector(".hwb-design-c")!;
    const blueprint = design.querySelector(".hwb-blueprint")!;
    const finished = design.querySelector(".hwb-finished")!;
    expect(design.textContent).toBe("");
    expect(blueprint.querySelectorAll("svg")).toHaveLength(0);
    expect(finished.querySelectorAll("svg")).toHaveLength(0);
    expect(finished.querySelectorAll("img")).toHaveLength(3);
    expect(design.querySelectorAll("image, filter, text, button, a, aside")).toHaveLength(0);
    for (let i = 0; i < 7; i++) {
      const plan = blueprint.querySelector(`[data-geometry-part="${i}"]`)!;
      const final = finished.querySelector(`[data-geometry-part="${i}"]`)!;
      expect(plan.className).toBe(final.className);
      expect(plan.getAttribute("data-build-part")).toBe(String(i));
      expect(final.hasAttribute("data-build-part")).toBe(false);
    }
    expect(blueprint.querySelectorAll('img')).toHaveLength(0);
    expect(css).toContain("left:6%;width:52%;height:51%");
    expect(css).toContain("left:8%;width:84%;height:34%");
    expect(source).toContain('clipPath: "inset(0 100% 0 0)"');
  });

  it("uses scoped business palettes and keeps static reduced motion exclusive to A", () => {
    expect(css).toContain('.hwb-design-b,.hwb-design-c{opacity:0 !important;visibility:hidden !important}');
    expect(css).toContain('.hwb-design-a{opacity:1 !important;visibility:visible !important}');
    expect(css).not.toMatch(/filter:|mix-blend|will-change|url\(/);
    const story = readFileSync(`${process.cwd()}/src/components/ui/HeroBuildExtractionStory.tsx`, "utf8");
    expect(story).toContain("HeroLightWorkspace");
    // The existing parent, not a CSS-hidden C scene, continues to own the phone mount gate.
    const hero = readFileSync(`${process.cwd()}/src/components/ui/BuildExtractionHero.tsx`, "utf8");
    expect(hero).toContain("{mountHeroStories ? (");
    const gate = readFileSync(`${process.cwd()}/src/components/ui/useHeroStoryMount.ts`, "utf8");
    expect(gate).toContain('(min-width: 768px)');
    expect(gate).toContain('shouldMountHeroStories(window.innerWidth)');
  });

  it("runs legible placement → finishing stages for A/B/C and freezes/cleans the shared owner", () => {
    let intersect: (entries: { isIntersecting: boolean }[]) => void = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: typeof intersect) { intersect = callback; }
      observe() {} disconnect = disconnect;
    });
    const media = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    vi.stubGlobal("matchMedia", () => media);
    const timelineSpy = vi.spyOn(gsap, "timeline");
    const { container, unmount } = render(createElement("section", { className: "hbe-hero", "data-hbe-preview-paused": "true" },
      createElement(HeroWebsitePlayback, null,
        createElement(HeroLightWorkspace, { variant: "desktop" }),
        createElement(HeroLightWorkspace, { variant: "mobile" }))));
    act(() => intersect([{ isIntersecting: true }]));
    expect(timelineSpy).toHaveBeenCalledTimes(1);
    const timeline = timelineSpy.mock.results[0].value as gsap.core.Timeline;
    expect(WEBSITE_BUILD_STYLES).toEqual(["a", "b", "c"]);
    expect(timeline.duration()).toBeCloseTo(22.2, 5);
    const roots = Array.from(container.querySelectorAll<HTMLElement>("[data-website-build]"));
    for (const [offset, style] of [[0, "a"], [7.4, "b"], [14.8, "c"]] as const) {
      for (const [time, phase] of [[0.1, "plan"], [1, "construct"], [4.4, "resolve"], [6.3, "complete"], [7.1, "reset"]] as const) {
        act(() => { timeline.totalTime(offset + time, false); });
        for (const root of roots) {
          expect(root.dataset.buildStyle).toBe(style);
          expect(root.dataset.buildPhase).toBe(phase);
          const visible = Array.from(root.querySelectorAll(".hwb-design")).filter(page => Number(gsap.getProperty(page, "opacity")) > 0.001);
          expect(visible).toHaveLength(1);
          expect(visible[0].classList.contains(`hwb-design-${style}`)).toBe(true);
        }
        if (phase === "construct") {
          act(() => { timeline.totalTime(offset + 1.16, false); });
          for (const root of roots) {
            const header = root.querySelector(`.hwb-design-${style} [data-build-part="1"]`)!;
            const image = root.querySelector(`.hwb-design-${style} [data-build-part="0"]`)!;
            expect(Number(gsap.getProperty(header, "opacity"))).toBeGreaterThan(0.1);
            expect(Number(gsap.getProperty(header, "opacity"))).toBeLessThan(0.9);
            expect(Number(gsap.getProperty(image, "opacity"))).toBe(0);
            expect(Number(gsap.getProperty(header, "x"))).toBeLessThan(-1);
            expect((header as HTMLElement).style.clipPath).not.toBe("inset(0 0% 0 0)");
          }
        }
      }
    }
    act(() => { timeline.totalTime(22.3, false); });
    expect(roots.every(root => root.dataset.buildStyle === "a" && root.dataset.buildCycle === "1")).toBe(true);
    act(() => { timeline.totalTime(20.2, false); });
    const hero = container.querySelector(".hbe-hero")!;
    act(() => { hero.dispatchEvent(new CustomEvent("hbe-preview-playback", { detail: false })); });
    expect(timeline.paused()).toBe(false);
    act(() => { hero.dispatchEvent(new CustomEvent("hbe-preview-playback", { detail: true })); });
    expect(timeline.paused()).toBe(true);
    expect(roots.every(root => root.dataset.buildPaused === "manual")).toBe(true);
    const position = timeline.time();
    act(() => { hero.dispatchEvent(new CustomEvent("hbe-preview-playback", { detail: false })); });
    const field = container.querySelector(".hbe-story-column")!;
    act(() => { field.dispatchEvent(new MouseEvent("mouseenter")); });
    expect(timeline.paused()).toBe(true);
    expect(roots.every(root => root.dataset.buildPaused === "hover")).toBe(true);
    act(() => { field.dispatchEvent(new MouseEvent("mouseleave")); field.dispatchEvent(new FocusEvent("focusin")); });
    expect(timeline.paused()).toBe(true);
    expect(roots.every(root => root.dataset.buildPaused === "focus")).toBe(true);
    act(() => { field.dispatchEvent(new FocusEvent("focusout")); });
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(timeline.paused()).toBe(true);
    expect(roots.every(root => root.dataset.buildPaused === "hidden")).toBe(true);
    expect(timeline.time()).toBe(position);
    hidden.mockRestore();
    act(() => intersect([{ isIntersecting: false }]));
    expect(timeline.time()).toBe(position);
    expect(roots.every(root => root.dataset.buildPaused === "offscreen")).toBe(true);
    act(() => { media.matches = true; const callback = media.addEventListener.mock.calls[0][1] as () => void; callback(); });
    expect(roots.every(root => root.dataset.buildStyle === "a" && root.dataset.buildPhase === "complete" && root.dataset.buildPaused === "reduced")).toBe(true);
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(timeline.parent).toBeNull();
    expect(media.removeEventListener).toHaveBeenCalled();
  });
});

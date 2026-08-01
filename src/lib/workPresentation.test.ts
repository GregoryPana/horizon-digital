import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InertDiv } from "../components/ui/InertDiv";
import {
  WORK_DESKTOP_PRIMARY_WIDTH,
  WORK_DESKTOP_SECONDARY_WIDTH,
  WORK_PRIMARY_SIZES,
  WORK_SECONDARY_SIZES,
  calculateGridSpanWidth,
  getActiveWorkProjectAtTime,
  getWorkProjectAccessibility,
} from "./workPresentation";

const workSource = readFileSync(new URL("../pages/Work.tsx", import.meta.url), "utf8");

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getActiveWorkProjectAtTime", () => {
  const activationBoundaries = [0, 5.8, 14.6, 21.25];

  it("uses unequal timeline activation boundaries instead of equal progress segments", () => {
    expect(getActiveWorkProjectAtTime(5.79, activationBoundaries)).toBe(0);
    expect(getActiveWorkProjectAtTime(6, activationBoundaries)).toBe(1);
    expect(getActiveWorkProjectAtTime(14.59, activationBoundaries)).toBe(1);
    expect(getActiveWorkProjectAtTime(20, activationBoundaries)).toBe(2);
  });

  it("activates a project exactly at its presentation boundary", () => {
    expect(getActiveWorkProjectAtTime(0, activationBoundaries)).toBe(0);
    expect(getActiveWorkProjectAtTime(5.8, activationBoundaries)).toBe(1);
    expect(getActiveWorkProjectAtTime(14.6, activationBoundaries)).toBe(2);
    expect(getActiveWorkProjectAtTime(21.25, activationBoundaries)).toBe(3);
  });

  it("clamps timeline queries before the first and after the final activation", () => {
    expect(getActiveWorkProjectAtTime(-100, activationBoundaries)).toBe(0);
    expect(getActiveWorkProjectAtTime(100, activationBoundaries)).toBe(3);
    expect(getActiveWorkProjectAtTime(10, [])).toBe(0);
  });

  it("selects earlier projects again for reverse-time queries", () => {
    const reverseTimes = [24, 21.25, 21.24, 14.6, 14.59, 5.8, 5.79, 0];
    expect(reverseTimes.map((time) => getActiveWorkProjectAtTime(time, activationBoundaries))).toEqual([
      3, 3, 2, 2, 1, 1, 0, 0,
    ]);
  });
});

describe("getWorkProjectAccessibility", () => {
  it("keeps every project visible and keyboard accessible in the static reduced-motion layout", () => {
    for (let index = 0; index < 4; index += 1) {
      expect(getWorkProjectAccessibility(index, 0, true)).toEqual({
        ariaHidden: undefined,
        inert: undefined,
        tabIndex: 0,
      });
    }
  });

  it("removes inactive pinned slides from keyboard and assistive technology", () => {
    expect(getWorkProjectAccessibility(0, 1, false)).toEqual({
      ariaHidden: true,
      inert: true,
      tabIndex: -1,
    });
    expect(getWorkProjectAccessibility(1, 1, false)).toEqual({
      ariaHidden: undefined,
      inert: undefined,
      tabIndex: 0,
    });
  });
});

describe("InertDiv", () => {
  it("emits literal inert markup for inactive content without a React warning", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const markup = renderToStaticMarkup(
      createElement(
        InertDiv,
        { inert: true, "aria-hidden": true },
        createElement("a", { href: "/hidden", tabIndex: -1 }, "Hidden link"),
      ),
    );

    expect(markup).toContain('inert=""');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('tabindex="-1"');
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("omits inert markup for active content without a React warning", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const markup = renderToStaticMarkup(
      createElement(InertDiv, { inert: undefined }, "Active content"),
    );

    expect(markup).not.toMatch(/\sinert(?:=|\s|>)/);
    expect(consoleError).not.toHaveBeenCalled();
  });
});

describe("Work responsive geometry", () => {
  it("derives the xl seven-column visual width from the actual grid", () => {
    expect(calculateGridSpanWidth(1280, 64, 12, 80, 1)).toBe(28);
    expect(calculateGridSpanWidth(1280, 64, 12, 80, 7)).toBe(676);
    expect(WORK_DESKTOP_PRIMARY_WIDTH).toBe(676);
    expect(WORK_DESKTOP_PRIMARY_WIDTH * 0.62).toBeCloseTo(419.12);
    expect(WORK_DESKTOP_SECONDARY_WIDTH).toBe(419);
  });

  it("advertises primary slots derived from the grid and responsive caps", () => {
    expect(WORK_PRIMARY_SIZES).toBe(
      "(min-width: 1280px) 676px, (min-width: 1024px) calc(100vw - 64px), (min-width: 640px) 460px, (min-width: 380px) 340px, calc(100vw - 40px)",
    );
    expect(workSource).toContain("sizes={WORK_PRIMARY_SIZES}");
  });

  it("advertises secondary slots for the xl grid, lg viewport, md cap, and hidden mobile range", () => {
    expect(WORK_SECONDARY_SIZES).toBe(
      "(min-width: 1280px) 419px, (min-width: 1024px) calc(62vw - 39.68px), (min-width: 768px) 246px, 0px",
    );
    expect(workSource).toContain("sizes={WORK_SECONDARY_SIZES}");
    expect(workSource).toContain("sm:px-8 lg:px-0");
  });
});

describe("Work responsive and typing contracts", () => {
  it("uses H2 project titles directly beneath the visible page H1", () => {
    expect(workSource).toMatch(/<h1[\s\S]*?<h2[^>]*>\s*\{proj\.title\}\s*<\/h2>/);
    expect(workSource).not.toMatch(/<h3[^>]*>\s*\{proj\.title\}\s*<\/h3>/);
  });

  it("keeps project rendering strictly typed and delegates inert emission", () => {
    expect(workSource).not.toMatch(/LaptopMockupVisual[\s\S]{0,500}: any/);
    expect(workSource).not.toContain("proj: any");
    expect(workSource).toContain("inert={accessibility.inert}");
    expect(workSource).not.toContain("type InertDivProps");
  });

  it("synchronizes accessibility from explicit GSAP activation labels and timeline time", () => {
    expect(workSource).toContain("tl.addLabel(activationLabel, revealLabel)");
    expect(workSource).toContain("getActiveWorkProjectAtTime(tl.time(), activationBoundaries)");
    expect(workSource).not.toContain("Math.floor(self.progress * projects.length)");
  });
});

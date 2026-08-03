/** @vitest-environment jsdom */

import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WorkMarquee } from "./WorkMarquee";

let nextFrameId = 1;
let frameQueue: FrameRequestCallback[] = [];

beforeEach(() => {
  frameQueue = [];
  nextFrameId = 1;

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query === "(hover: hover)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frameQueue.push(callback);
    return nextFrameId++;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  Object.defineProperties(HTMLElement.prototype, {
    setPointerCapture: { configurable: true, value: vi.fn() },
    releasePointerCapture: { configurable: true, value: vi.fn() },
    hasPointerCapture: { configurable: true, value: vi.fn(() => false) },
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const width = this.classList.contains("work-marquee-group") ? 1200 : 900;
    return new DOMRect(0, 0, width, 400);
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function runNextFrame(now: number) {
  const callback = frameQueue.shift();
  if (!callback) throw new Error("Expected an autoplay animation frame");
  act(() => callback(now));
}

describe("WorkMarquee desktop autoplay behavior", () => {
  it("advances the actual desktop viewport scrollLeft under no-preference motion", () => {
    const { container } = render(
      <WorkMarquee>
        <a href="/one">One</a>
        <a href="/two">Two</a>
      </WorkMarquee>,
    );
    const viewport = container.querySelector<HTMLElement>(".work-marquee-viewport");
    expect(viewport).not.toBeNull();
    expect(container.querySelector(".work-marquee-track")?.getAttribute("data-autoplay")).toBe("on");

    const start = performance.now();
    for (let index = 1; index <= 12; index += 1) runNextFrame(start + index * 64);

    expect(viewport!.scrollLeft).toBeGreaterThan(80);
  });

  it("starts without a manual drag when transformed layout reports a zero bounding width", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      const width = this.classList.contains("work-marquee-group") ? 0 : 900;
      return new DOMRect(0, 0, width, 400);
    });
    const { container } = render(
      <WorkMarquee><a href="/one">One</a><a href="/two">Two</a></WorkMarquee>,
    );
    const viewport = container.querySelector<HTMLElement>(".work-marquee-viewport")!;
    const group = container.querySelector<HTMLElement>(".work-marquee-group")!;
    Object.defineProperties(viewport, {
      scrollWidth: { configurable: true, value: 2400 },
      clientWidth: { configurable: true, value: 900 },
    });
    Object.defineProperty(group, "scrollWidth", { configurable: true, value: 1200 });

    const start = performance.now();
    for (let index = 1; index <= 12; index += 1) runNextFrame(start + index * 64);
    expect(viewport.scrollLeft).toBeGreaterThan(80);
  });

  it("recovers autoplay when a desktop drag loses the browser window", () => {
    const { container } = render(
      <WorkMarquee><a href="/one">One</a><a href="/two">Two</a></WorkMarquee>,
    );
    const viewport = container.querySelector<HTMLElement>(".work-marquee-viewport")!;
    fireEvent.pointerDown(viewport, { button: 0, pointerId: 3, clientX: 120 });
    fireEvent(window, new Event("blur"));

    const start = performance.now();
    for (let index = 1; index <= 15; index += 1) runNextFrame(start + index * 64);
    expect(viewport.scrollLeft).toBeGreaterThan(20);
  });
});

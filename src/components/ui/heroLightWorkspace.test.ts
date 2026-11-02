import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HeroLightWorkspace } from "./HeroLightWorkspace";
const source = readFileSync(new URL("./HeroLightWorkspace.tsx", import.meta.url), "utf8");
const lines = readFileSync(new URL("./heroLineReveal.ts", import.meta.url), "utf8");
const css = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
describe("light illustrative hero workspace", () => {
  it.each(["desktop", "mobile"] as const)("provides a coherent %s interface without fabricated results", variant => {
    const html = renderToStaticMarkup(createElement(HeroLightWorkspace, { variant }));
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('data-build-part');
    expect(html.replace(/<[^>]*>/g, "")).toBe("");
    for (const shape of ["hwb-header", "hwb-logo", "hwb-nav", "hwb-heading", "hwb-lines", "hwb-cta", "hwb-image", "hwb-editorial"]) expect(html).toContain(shape);
    expect(html).not.toMatch(/sidebar|dashboard|project|<aside|<h[1-6]|<button/i);
    expect(html).not.toContain("<button");
  });
  it("pauses the owned timeline offscreen and in hidden documents", () => {
    expect(source).toContain("IntersectionObserver");
    expect(source).toContain("intersecting && !document.hidden");
    expect(source).toContain('document.addEventListener("visibilitychange", sync)');
    expect(source).toContain('document.removeEventListener("visibilitychange", sync)');
    expect(source).toContain("timeline.pause()");
    expect(source).toContain("observer.disconnect()");
    expect(source).toContain("media.matches");
    const artworkCss = readFileSync(new URL("./heroLightWorkspace.css", import.meta.url), "utf8");
    expect(artworkCss.replace(/\s/g, "")).toContain('opacity:1!important;visibility:visible!important;transform:none!important');
  });
  it("keeps CTAs in normal flexible flow with viewport and safe-area room", () => {
    expect(css).toContain("min-height:100dvh");
    expect(css).toContain("margin-top:auto");
    expect(css).toContain("env(safe-area-inset-bottom)");
    expect(css).toContain("line-height:1.12");
  });
  it("uses a finite compositor-owned phone entrance and cancels it on cleanup", () => {
    expect(lines).toContain('typeof visual.animate === "function"');
    expect(lines).toContain('element.animate(frames');
    expect(lines).toContain('animation.cancel()');
    expect(lines).toContain('guides.onfinish = finish');
    expect(lines).toContain('visibility: "hidden"');
  });
  it("owns one shared A/B/C clock with distinct original image compositions", () => {
    expect(source.match(/timeline = gsap.timeline/g)).toHaveLength(1);
    expect(source).toContain('for (const style of WEBSITE_BUILD_STYLES)');
    expect(source).toContain('root.dataset.buildCycle = String(cycle)');
    expect(source).toContain('root.dataset.buildStyle = style');
    expect(source).toContain('field.querySelectorAll(`.hwb-design-${style}');
    expect(source).not.toContain('delay: startDelay');
  });
  it("keeps native phone stages and cancellation owned without GSAP line setup", () => {
    expect(lines).toContain('cursor += groups.length * (phoneLineDuration + phoneLineGap)');
    expect(lines).toContain('root.querySelectorAll(".hbe-actions > a")');
    expect(lines).toContain('header?.addEventListener("focusin", onFocus)');
    expect(lines).toContain('document.activeElement');
    expect(lines).toContain('document.hidden || !intersecting');
    expect(lines).toContain('animation.pause()');
  });
  it("uses shared exact geometry for blueprint and finished paint with a directional wash", () => {
    const html = renderToStaticMarkup(createElement(HeroLightWorkspace, { variant: "desktop" }));
    expect(html.match(/data-geometry-part=/g)).toHaveLength(42);
    expect(html.match(/data-build-part=/g)).toHaveLength(21);
    expect(html.match(/class="hwb-page hwb-finished"/g)).toHaveLength(3);
    expect(source).toContain('<WebsiteParts style={style} skeleton={skeleton} />');
    expect(source).toContain('clipPath: "inset(0 100% 0 0)"');
    expect(source).toContain('clipPath: "inset(0 0% 0 0)"');
    expect(source).not.toContain('.to(masks, { opacity: 0');
    expect(lines).toContain('blueprint.setAttribute("aria-hidden", "true")');
    expect(lines).toContain('blueprint?.remove()');
    expect(lines).toContain('const phoneLineDuration = 0.30, phoneLineGap = 0.015');
  });
  it("handles resize/font readiness and focus interruption without replaying", () => {
    expect(lines).toContain("document.fonts.ready");
    expect(lines).toContain('window.addEventListener("resize", onResize)');
    expect(lines).toContain('window.removeEventListener("resize", onResize)');
    expect(lines).toContain('root.addEventListener("focusin", onFocus)');
    expect(lines).toContain("layout(false)");
    expect(lines).toContain("visual.innerHTML = original");
    expect(lines).not.toContain("gsap.set(support, { autoAlpha: 0");
  });
});

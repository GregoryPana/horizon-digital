import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const source = readFileSync(new URL("./Work.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("./Work.css", import.meta.url), "utf8");
describe("full viewport portfolio scenes", () => {
  it("keeps the pinned presentation on phones and tablets unless reduced motion is requested", () => {
    expect(source).toContain("const staticPresentation = Boolean(shouldReduceMotion)");
    expect(source).not.toContain("compactViewport");
    expect(source).toContain("start: 'top top'");
    expect(css).toContain(".work-stage{height:100svh");
  });
  it("does not split reduced-motion projects into inset rounded cards", () => {
    expect(source).not.toContain("rounded-3xl");
    expect(source).toContain("work-project-static");
    expect(css).toContain(".work-project-static{min-height:100svh");
  });
  it("restores reversible laptop and phone object choreography without touching screen scroll transforms", () => {
    expect(source).toContain(".portfolio-laptop-lid`");
    expect(source).toContain('{ "--lid-angle": i === 0 ? "10deg" : "20deg" }');
    expect(source).toContain('{ "--lid-angle": "10deg", duration: 3.8');
    expect(source).toContain(".portfolio-phone`");
    expect(source).not.toContain(".portfolio-device-page`");
    expect(source).toContain("revertOnUpdate: true");
  });
  it("bounds responsive device groups by available media height rather than clipping a 600px stage", () => {
    expect(source).not.toContain("min-h-[600px]");
    expect(css).toContain("container-type:size");
    expect(css).toContain("100cqh - 72px");
  });
  it("shows Drake and its colour at the top before the first scroll", () => {
    expect(source).toContain("style={{ backgroundColor: projects[0].bgColor }}");
    expect(source).not.toContain("backgroundColor: 'transparent'");
    expect(source).toContain('className="sr-only" aria-label="Portfolio introduction"');
    expect(source).toContain('staticPresentation || i === 0 ? "opacity-100"');
    expect(source).toContain("opacity: i === 0 ? 1 : 0");
    expect(css).toContain("margin-top:calc(-1 * var(--header-height,88px))");
  });
  it("isolates device depth so the phone paints in front of the laptop", () => {
    expect(css).toContain("transform-style:flat;isolation:isolate");
    const devices = readFileSync(new URL("../components/ui/PortfolioDeviceShowcase.css", import.meta.url), "utf8");
    expect(devices).toContain("z-index:1;isolation:isolate;container-type:inline-size");
    expect(devices).toContain("transform:rotateX(var(--lid-angle));transform-origin:bottom center");
    expect(devices).toContain("z-index:2");
  });
  it("uses one local camera for a connected lid, keyboard deck and chassis", () => {
    const devices = readFileSync(new URL("../components/ui/PortfolioDeviceShowcase.css", import.meta.url), "utf8");
    const component = readFileSync(new URL("../components/ui/PortfolioDeviceShowcase.tsx", import.meta.url), "utf8");
    expect(devices.match(/perspective:/g)).toHaveLength(1);
    expect(devices).toContain("perspective:var(--camera-distance)");
    expect(devices).toContain("transform:rotateX(var(--deck-angle))");
    for (const part of ["assembly", "hinge", "keyboard", "trackpad", "front"]) expect(component).toContain(`portfolio-laptop-${part}`);
    expect(css).toContain(".work-project .work-visual{justify-content:center}");
    expect(css).toContain("column-gap:24px;row-gap:12px");
  });
  it("places one shared action group after the mockups and warms media only after browsing starts", () => {
    expect(source.indexOf('className={`work-actions')).toBeGreaterThan(source.indexOf('<PortfolioDeviceShowcase'));
    expect(source).toContain('project-actions-${i}');
    expect(source).toContain('tl.time() > 0.05');
    expect(source).toContain('preload={!staticPresentation && i <= warmThrough}');
    expect(css).toContain('grid-template-rows:auto minmax(0,1fr) auto');
    expect(css).toContain('min-height:44px');
  });
});

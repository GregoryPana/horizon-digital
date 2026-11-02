import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const lines = readFileSync(new URL("./heroLineReveal.ts", import.meta.url), "utf8");
const css = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
describe("bounded mobile laser construction", () => {
  it("reveals real live text with a shared linear spatial boundary, not glyph conversion", () => {
    expect(lines).toContain('clipPath: "inset(0 100% 0 0)"');
    expect(lines).toContain('clipPath: "inset(0 0% 0 0)"');
    expect(lines).toContain('slots.has(element) ? "linear"');
    expect(lines).toContain('translateX(${parseFloat(slot.style.width)}px)');
    expect(lines).not.toMatch(/requestAnimationFrame\(.*getBoundingClientRect|canvas|getImageData/);
  });
  it("keeps transparent crossed boxes and dashed actual-radius CTA geometry scoped below768", () => {
    const mobile = css.slice(css.indexOf('/* Font-ready measured boxes'));
    expect(mobile).toContain('background:transparent');
    expect(mobile).toContain('to top right');
    expect(mobile).toContain('to bottom right');
    expect(mobile).toContain('border:1px dashed #b0ece0');
    expect(lines).toContain('slot.style.borderRadius = getComputedStyle(target).borderRadius');
  });
  it("holds whole boxes until owned text resolves and clears every clip on settlement", () => {
    expect(lines).toContain('{ opacity: 1, offset: 0.78 }');
    expect(lines).toContain('blueprint?.remove()');
    expect(lines).toContain('["transform", "opacity", "visibility", "will-change", "clip-path"]');
    expect(lines).toContain('const actionInk = ink.map(frame => ({ ...frame, visibility: "visible" }))');
  });
  it("preserves finite measured-line sequencing and shares pause/cleanup clocks", () => {
    expect(lines).toContain('const phoneLineDuration = 0.30, phoneLineGap = 0.015');
    expect(lines).toContain('cursor += groups.length * (phoneLineDuration + phoneLineGap)');
    expect(lines).toContain('animation.startTime = origin');
    expect(lines).toContain('document.hidden || !intersecting');
    expect(lines).toContain('if (phone) document.fonts.addEventListener("loadingdone", onResize)');
    expect(lines).toContain('if (phone) document.fonts.removeEventListener("loadingdone", onResize)');
  });
});

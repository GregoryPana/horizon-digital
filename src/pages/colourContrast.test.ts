import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");

function rgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16)) as [number, number, number];
}

function luminance(hex: string): number {
  const values = rgb(hex).map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrast(foreground: string, background: string): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("small supporting text contrast", () => {
  it("keeps light-section dim text above WCAG AA against the authored surface", () => {
    expect(css).toMatch(/\.section-light\s*\{[\s\S]*--text-dim:\s*#587179;/);
    expect(contrast("#587179", "#eef7f5")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps Insights dim text above WCAG AA against pure black", () => {
    expect(css).toMatch(/\.insights-theme-shell\s*\{[\s\S]*--text-dim:\s*#71808A;/);
    expect(contrast("#71808A", "#000000")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps the homepage neutral prototype's supporting text above WCAG AA", () => {
    expect(contrast("#565a5e", "#fafaf8")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#b6b8bb", "#000000")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#8f9397", "#000000")).toBeGreaterThanOrEqual(4.5);
  });
});
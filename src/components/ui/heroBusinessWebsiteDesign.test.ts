// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { fireEvent, render, cleanup } from "@testing-library/react";
import { HeroLightWorkspace } from "./HeroLightWorkspace";
import { HeroPlaybackControl } from "./BuildExtractionHero";
const hero = readFileSync(`${process.cwd()}/src/components/ui/BuildExtractionHero.tsx`, "utf8");
const css = readFileSync(`${process.cwd()}/src/components/ui/heroLightWorkspace.css`, "utf8");
const scene = readFileSync(`${process.cwd()}/src/components/ui/HeroLightWorkspace.tsx`, "utf8");
describe("business-led wordless hero brief", () => {
 it.each(["desktop", "mobile"] as const)("has three concrete photographic businesses with seven shared geometry groups in %s", variant => {
  const root=document.createElement("div");root.innerHTML=renderToStaticMarkup(createElement(HeroLightWorkspace,{variant}));
  expect(root.textContent).toBe("");
  for (const [style,business] of [["a","coastal-stay"],["b","coffee-house"],["c","sailing-charter"]]) {
   const design=root.querySelector(`.hwb-design-${style}`)!;
   expect(design.getAttribute("data-business")).toBe(business);
   expect(design.querySelectorAll('.hwb-finished .hwb-image img')).toHaveLength(1);
   expect(design.querySelectorAll('.hwb-blueprint img')).toHaveLength(0);
   expect(design.querySelectorAll('.hwb-image svg')).toHaveLength(0);
   for(let i=0;i<7;i++)expect(design.querySelectorAll(`[data-geometry-part="${i}"]`)).toHaveLength(2);
   expect(design.querySelectorAll('a,button,text,iframe,video')).toHaveLength(0);
   expect(design.closest('[aria-hidden="true"]')).toBeTruthy();
  }
 });
 it("uses distinct hospitality, café and marine tokens, not copied Horizon CTA gradients",()=>{
  for(const business of ['coastal-stay','coffee-house','sailing-charter'])expect(css).toContain(`[data-business="${business}"]`);
  expect(css).toContain('--site-accent:');
  expect(css).not.toContain('b7a0eb');
  expect(css).not.toContain('284bd3');
 });
 it("shortens placement intervals and finished hold while retaining the legible two-second finish",()=>{
  expect(scene).toContain('placement: 0.6');expect(scene).toContain('step: 0.4');expect(scene).toContain('hold: 0.85');expect(scene).toContain('finish: 2');
 });
 it("separates playback from marketing actions and uses real SVG media controls",()=>{
  expect(hero).toContain('export function HeroPlaybackControl');
  expect(hero).toContain('className="hbe-playback-rail"');
  expect(hero).toContain('<rect x="6"');expect(hero).toContain('<path d="M8 5');
  expect(hero).not.toContain('{previewPaused ? "▷" : "Ⅱ"}');
  const actions=hero.slice(hero.indexOf('<div className="hbe-actions">'));
  expect(actions).not.toContain('className="hbe-preview-playback');
 });
 it("exposes conventional pause/play shapes, names and pressed state with real click feedback",()=>{
  let presses=0;const onToggle=()=>{presses++};
  const view=render(createElement(HeroPlaybackControl,{paused:false,onToggle}));
  const button=view.getByRole('button',{name:'Pause website animation'});
  expect(button.getAttribute('aria-pressed')).toBe('false');
  expect(button.querySelectorAll('rect')).toHaveLength(2);
  expect(button.closest('.hbe-actions')).toBeNull();
  fireEvent.click(button);expect(presses).toBe(1);
  view.rerender(createElement(HeroPlaybackControl,{paused:true,onToggle}));
  expect(view.getByRole('button',{name:'Play website animation'}).getAttribute('aria-pressed')).toBe('true');
  expect(button.querySelectorAll('rect')).toHaveLength(0);expect(button.querySelectorAll('path')).toHaveLength(1);
  cleanup();
 });
});

// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import EditorialNavbar from "./EditorialNavbar";
import EditorialFooter from "./EditorialFooter";
import facts from "../data/businessFacts.json";
import { readFileSync } from "node:fs";
import { STATIC_ROUTES } from "../config/routes";

let frames = new Map<number, FrameRequestCallback>(), next = 0, now = 0;
let reduced = false;
let motions: { currentTime: number; pause: ReturnType<typeof vi.fn>; cancel: ReturnType<typeof vi.fn> }[];
function advance(ms: number) {
  act(() => { now += ms; const batch = [...frames.values()]; frames.clear(); batch.forEach(fn => fn(now)); });
}
function CurrentRoute() { return <output data-testid="route">{useLocation().pathname}</output>; }
function mount() {
  return render(<MemoryRouter initialEntries={["/pricing"]}><div className="editorial-site"><EditorialNavbar /><main><h1>Pricing</h1><button>Outside</button></main><EditorialFooter /><CurrentRoute /></div></MemoryRouter>);
}
beforeEach(() => {
  frames = new Map(); next = 0; now = 0; reduced = false; motions = [];
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => { frames.set(++next, fn); return next; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("matchMedia", () => ({ get matches() { return reduced; }, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  Element.prototype.animate = vi.fn(() => { const a = { currentTime: 0, pause: vi.fn(), cancel: vi.fn() }; motions.push(a); return a as unknown as Animation; });
  Element.prototype.scrollIntoView = vi.fn();
  window.scrollTo = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); document.body.removeAttribute("data-menu-open"); document.body.removeAttribute("data-ambient-paused"); });

describe("editorial shared shell", () => {
  it("links navigation only to registered pages, never homepage sections or aliases", () => {
    const { container } = mount();
    const registered = new Set(STATIC_ROUTES.map(route => route.path));
    const links = [...container.querySelectorAll('[data-site-header] nav a')];
    expect(links).toHaveLength(8);
    for (const link of links) {
      const href = link.getAttribute('href')!;
      expect(href).not.toContain('#');
      expect(href).not.toContain('?');
      expect(registered.has(href)).toBe(true);
    }
    expect(container.querySelector('[data-site-header] a[href="/#faq"]')).toBeNull();
  });
  it("uses governed service routes and genuine contact/social destinations", () => {
    const { container } = mount();
    const desktop = [...container.querySelectorAll('.editorial-desktop-nav a')].map(a => a.getAttribute('href'));
    const menu = [...container.querySelectorAll('.editorial-menu-primary a')].map(a => a.getAttribute('href'));
    expect(desktop).toEqual(['/services', '/work', '/pricing', '/about']);
    expect(menu).toEqual(desktop);
    expect(container.querySelector('.editorial-menu-services')).toBeNull();
    for (const url of [facts.site.whatsappUrl, facts.site.instagramUrl, facts.site.facebookUrl]) {
      expect([...container.querySelectorAll('footer a')].some(a => a.getAttribute('href') === url)).toBe(true);
    }
    expect(container.querySelector('[data-site-header]')).not.toBeNull();
    expect(container.querySelectorAll('footer')).toHaveLength(1);
  });
  it("locks all background branches until the true reverse endpoint and restores focus", () => {
    const { container } = mount(); const button = screen.getByRole('button', { name: 'Open the menu' });
    fireEvent.click(button); advance(0); advance(300);
    const main = container.querySelector('main')!;
    expect(main.inert).toBe(true);
    expect(document.body.hasAttribute('data-ambient-paused')).toBe(true);
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true');
    const entered = motions[0].currentTime;
    fireEvent.click(button); advance(0); advance(100);
    expect(motions[0].currentTime).toBe(entered - 100);
    expect(main.inert).toBe(true);
    advance(600);
    expect(main.inert).toBe(false);
    expect(document.body.hasAttribute('data-menu-open')).toBe(false);
    expect(document.activeElement).toBe(button);
  });
  it("reverses in place on rapid close/reopen without stale completion releasing isolation", () => {
    const { container } = mount(); const button = screen.getByRole('button', { name: 'Open the menu' });
    fireEvent.click(button); advance(0); advance(280);
    fireEvent.click(button); advance(0); advance(100);
    const reversed = motions[0].currentTime;
    fireEvent.click(button); advance(0); advance(80);
    expect(motions[0].currentTime).toBe(reversed + 80);
    advance(1000);
    expect(container.querySelector('main')!.inert).toBe(true);
    expect(document.body.hasAttribute('data-menu-open')).toBe(true);
  });
  it("defers service selection until exit; reopening cancels a pending destination", () => {
    mount(); const button = screen.getByRole('button', { name: 'Open the menu' });
    fireEvent.click(button); advance(0); advance(560);
    const menu = document.getElementById('editorial-site-menu')!;
    fireEvent.click(menu.querySelector('a[href="/services"]')!);
    expect(screen.getByTestId('route').textContent).toBe('/pricing');
    advance(0); advance(100);
    fireEvent.click(button); advance(0); advance(600);
    expect(screen.getByTestId('route').textContent).toBe('/pricing');
    fireEvent.click(menu.querySelector('a[href="/services"]')!);
    advance(0); advance(600);
    expect(screen.getByTestId('route').textContent).toBe('/services');
    expect(document.body.hasAttribute('data-menu-open')).toBe(false);
  });
  it("traps the complete menu focus sequence and Escape dismisses", () => {
    reduced = true; mount(); const button = screen.getByRole('button', { name: 'Open the menu' });
    fireEvent.click(button); fireEvent.keyDown(button, { key: 'Tab', shiftKey: true });
    expect(document.activeElement?.getAttribute('href')).toBe(`mailto:${facts.site.email}`);
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' }); expect(document.activeElement).toBe(button);
    fireEvent.keyDown(button, { key: 'Escape' });
    expect(document.body.hasAttribute('data-menu-open')).toBe(false);
  });
  it("same-route action still exits and releases the modal", () => {
    reduced = true; mount(); fireEvent.click(screen.getByRole('button', { name: 'Open the menu' }));
    fireEvent.click(document.querySelector('#editorial-site-menu a[href="/pricing"]')!);
    expect(document.body.hasAttribute('data-menu-open')).toBe(false);
    expect(screen.getByTestId('route').textContent).toBe('/pricing');
  });
  it("restores prior locks and pauses and cancels all owned clocks on unmount", () => {
    document.body.setAttribute('data-ambient-paused', 'other-owner'); document.documentElement.style.overflow = 'clip';
    const view = mount(); fireEvent.click(screen.getByRole('button', { name: 'Open the menu' })); advance(0); advance(180);
    view.unmount();
    expect(frames.size).toBe(0); expect(motions.every(a => a.cancel.mock.calls.length === 1)).toBe(true);
    expect(document.documentElement.style.overflow).toBe('clip');
    expect(document.body.getAttribute('data-ambient-paused')).toBe('other-owner');
    document.documentElement.style.overflow = '';
  });
  it("has one visible semantic About H1 and no showcase/global page resets", () => {
    const about = readFileSync('src/pages/About.tsx', 'utf8');
    expect(about.match(/<h1\b/g)).toHaveLength(1);
    expect(about).toContain('<h1 id="about-title"');
    const css = readFileSync('src/styles/editorial-system.css', 'utf8');
    expect(css).not.toMatch(/(?:^|\n)(?:body|html|main|:root|\.editorial-site\s+h[1-6])\s*[{,]/);
    expect(css).toContain('.editorial-standard-page .pricing-page');
    expect(css).toContain('.editorial-standard-page .service-page');
    expect(css).toContain('overscroll-behavior: contain');
    expect(css).toContain('100dvh');
  });
});

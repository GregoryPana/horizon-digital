// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('../components/editorial-home/runtime', () => ({ mountEditorialHome: () => () => {} }));
vi.mock('../lib/analytics', () => ({ trackContactIntent: vi.fn(), trackEvent: vi.fn() }));
import Home from './Home';
import { HelmetProvider } from 'react-helmet-async';
import { trackEvent } from '../lib/analytics';
import { editorialHomeHtml } from '../components/editorial-home/content';

// Replacements for archived Home-only composition checks. Shared legacy component
// tests remain executable; these assert the owner-selected route, not old classes.
afterEach(() => { cleanup(); vi.clearAllMocks(); });
function Destination() { const l = useLocation(); return <output data-testid="destination">{l.pathname}{l.search}{l.hash}</output>; }
function mount() { return render(<HelmetProvider><MemoryRouter><Routes><Route path="/" element={<Home />} /><Route path="*" element={<Destination />} /></Routes></MemoryRouter></HelmetProvider>); }
function body() { const root = document.createElement('div'); root.innerHTML = editorialHomeHtml; return root; }
describe('editorial Home replacements for retired integration contracts', () => {
  it('paints the semantic title and support copy without enhancement or a nested shell', () => {
    const { container } = mount();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 }).textContent?.replace(/\s+/g, ' ').trim()).toBe('Websites for businesses in Seychelles.');
    expect(container.textContent).toContain('Based on Mahé, working with businesses across Seychelles.');
    expect(container.querySelectorAll('main,header,footer,iframe,script')).toHaveLength(0);
  });
  it('renders differentiated work with truthful client/concept labels and destinations', () => {
    const root = body(); const work = root.querySelector('#coaches')!;
    const cards = work.querySelectorAll('.co-person');
    expect(cards).toHaveLength(3);
    expect(cards[0].textContent).toContain('Drake Seaside Apartments');
    expect(cards[0].textContent).toContain('Live client project');
    expect(cards[1].textContent).toContain('Horizon Auto');
    expect(cards[2].textContent).toContain('Forma Studio');
    for (const card of [cards[1],cards[2]]) expect(card.textContent).toContain('Concept showcase');
    for (const href of ['/showcase/drake-seaside','https://auto.horizondigitalsey.com/','/showcase/forma-studio','/work']) expect(work.querySelector(`a[href="${href}"]`)).not.toBeNull();
  });
  it('provides five readable service demos and a named Services hub action instead of tabs', () => {
    const services = body().querySelector('#disciplines')!;
    expect(services.querySelectorAll('[data-service-demo]')).toHaveLength(5);
    for (const label of ['Website design','Mobile design','Website build','Search optimisation','Analytics']) expect(services.textContent).toContain(label);
    expect(within(services as HTMLElement).getByRole('link', { name: 'Explore all services' }).getAttribute('href')).toBe('/services');
  });
  it('executes the Services action through the actual Home React route', () => {
    mount(); fireEvent.click(screen.getByRole('link', { name: 'Explore all services' }));
    expect(screen.getByTestId('destination').textContent).toBe('/services');
  });
  it('executes the hero contact action and preserves governed analytics without legacy callback names', () => {
    mount(); fireEvent.click(screen.getAllByRole('link', { name: 'Request a free quote' })[0]);
    expect(screen.getByTestId('destination').textContent).toBe('/contact');
    expect(trackEvent).toHaveBeenCalledWith('cta_click', { cta_name: 'editorial_request_a_free_quote', page_path: '/' });
  });
  it('keeps work navigation as a resolvable in-page anchor rather than a retired marquee', () => {
    const root = body(); const link = within(root).getByRole('link', { name: 'See our work' });
    expect(link.getAttribute('href')).toBe('#coaches');
    expect(root.querySelector(link.getAttribute('href')!)).not.toBeNull();
    for (const anchor of root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) expect(root.querySelector(anchor.getAttribute('href')!)).not.toBeNull();
  });
  it('keeps all process and support information visible before animation', () => {
    const root = body(); const process = root.querySelector('#week')!;
    expect(process.querySelectorAll('[data-process-card]')).toHaveLength(5);
    for (const title of ['First chat','Plan and design','Build and test','Go live','Support after launch']) expect(process.textContent).toContain(title);
    expect(root.querySelector('#recovery')?.textContent).toContain('30, 45 or 60 days');
    expect(root.querySelector('#lab')?.textContent).toContain('Search positions and business results are never guaranteed.');
  });
  it('keeps native keyboard-operable FAQ disclosures and meaningful hero media', () => {
    const root = body(); const details = root.querySelectorAll('#faq details');
    expect(details).toHaveLength(6);
    for (const detail of details) {
      expect(detail.querySelector('summary')?.textContent?.trim()).toBeTruthy();
      expect(detail.querySelector('p')?.textContent?.trim()).toBeTruthy();
      expect(detail.hasAttribute('hidden')).toBe(false);
    }
    const image = root.querySelector<HTMLImageElement>('#opening img')!;
    expect(image.alt).toContain('Horizon Digital');
    expect(image.getAttribute('width')).toBe('1800');
    expect(root.querySelector('picture source[media="(max-width: 767px)"]')).not.toBeNull();
  });
});

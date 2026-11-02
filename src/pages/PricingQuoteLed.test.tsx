// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
afterEach(cleanup);
import { MemoryRouter } from 'react-router-dom';
import Pricing from './Pricing';
import { trackEvent } from '../lib/analytics';
import { siteConfig } from '../data/site';

vi.mock('../lib/analytics', () => ({ trackEvent: vi.fn(), trackContactIntent: vi.fn() }));

vi.mock('../hooks/useProceduralReveal', () => ({ useProceduralReveal: () => {} }));
vi.mock('framer-motion', () => ({ useReducedMotion: () => true }));
vi.mock('../components/Seo', () => ({ default: ({ structuredData, description }: { structuredData: unknown; description: string }) => <script type="application/json" data-description={description} dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /> }));

function page() {
  return render(<MemoryRouter initialEntries={['/pricing']}><Pricing /></MemoryRouter>).container;
}

describe('quote-led Pricing page', () => {
  it('publishes no monetary amount or price schema, including hidden FAQ content', () => {
    const root = page();
    expect(root.textContent).not.toMatch(/\bSCR\b|\b(?:7,500|12,500|25,000|2,500|2,200)\b|\+40%/i);
    const schema = JSON.parse(root.querySelector('script')!.textContent!);
    const schemaText = JSON.stringify(schema);
    expect(schemaText).not.toMatch(/"(?:price|priceCurrency|priceSpecification|lowPrice|highPrice)"/);
    expect(root.querySelector('script')!.dataset.description).toContain('quote');
  });

  it('keeps package order, recommends Starter without a popularity claim, and carries no budget inference', () => {
    const root = page();
    const cards = [...root.querySelectorAll('.pricing-package-card')];
    expect(cards.map(card => card.querySelector('h2')!.textContent)).toEqual(['Foundation', 'Starter', 'Growth']);
    expect(cards.map(card => card.getAttribute('data-featured'))).toEqual(['false', 'true', 'false']);
    for (const [index, id] of ['foundation', 'starter', 'growth'].entries()) {
      const action = cards[index].querySelector('a')!;
      expect(action.getAttribute('href')).toBe(`/contact?package=${id}`);
      expect(action.textContent).toBe('Request a free quote');
    }
    expect(cards[1].textContent).toContain('Recommended');
    expect(cards[1].textContent).toContain('Recommended for editable content and basic visitor measurement.');
    expect(root.textContent).not.toMatch(/best value|most popular/i);
    expect(root.querySelector('[href*="budget="]')).toBeNull();
    const call = root.querySelector<HTMLAnchorElement>('.pricing-hero-intro a[href^="tel:"]')!;
    expect(call.getAttribute('href')).toBe(`tel:${siteConfig.phone.replace(/\s+/g, '')}`);
    expect(call.textContent).toContain('Call for a free quote');
    expect(call.textContent).toContain(siteConfig.phone);
    expect(root.querySelector('#pricing-package-comparison')!.getAttribute('tabindex')).toBe('0');
    expect(root.querySelector('.pricing-comparison-scroll-cue')!.textContent).toContain('Scroll sideways');
  });

  it('preserves decision anchors, comparison disclosures, governed support and stable hero content', () => {
    const root = page();
    for (const id of ['packages', 'addons', 'hosting-support', 'payment-timeline', 'faq-consultation']) expect(root.querySelector(`#${id}`)).not.toBeNull();
    expect(root.querySelectorAll('.pricing-comparison-group-toggle[aria-expanded="true"]')).toHaveLength(3);
    expect(root.querySelectorAll('.pricing-comparison-table thead th')).toHaveLength(4);
    for (const days of [30, 45, 60]) expect(root.querySelector('.pricing-support-periods')!.textContent).toContain(`${days} days`);
    expect(root.querySelector('#packages')!.classList.contains('section-reveal')).toBe(false);
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelector('details.pricing-hosting-disclosure')).not.toBeNull();
    expect(root.textContent).toMatch(/rankings are not guaranteed/i);
  });

  it('retains independent comparison toggles and their analytics payload', () => {
    const root = page();
    const group = root.querySelector('#pricing-comparison-group-scope-build')!;
    const toggle = group.querySelector('button')!;
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(group.querySelectorAll('tr[hidden]')).toHaveLength(4);
    expect(trackEvent).toHaveBeenCalledWith('pricing_comparison_group_toggle', expect.objectContaining({ group: 'scope-build', action: 'collapse' }));
    expect(root.querySelector('#pricing-comparison-group-support-control button')!.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(group.querySelectorAll('tr[hidden]')).toHaveLength(0);
  });
});

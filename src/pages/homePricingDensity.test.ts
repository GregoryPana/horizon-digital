// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { editorialHomeHtml } from '../components/editorial-home/content';

// Compact Tailwind density was retired: exact original assertions are retained in
// docs/release-evidence/retired-homepage-assertions.md. Content and enquiry survive.
describe('editorial homepage package contract', () => {
  it('keeps quote-led package names, exact scope facts and real enquiry queries without a budget', () => {
    const root = document.createElement('div'); root.innerHTML = editorialHomeHtml;
    const packages = root.querySelector('#membership')!;
    const cards = packages.querySelectorAll('article');
    expect(cards).toHaveLength(3);
    const expected = [
      ['foundation', 'Foundation', ['Up to 3 pages', '1 revision round', '30 days of post-launch support']],
      ['starter', 'Starter', ['Up to 5–6 pages', 'Content management', 'Google Analytics setup', '2 revision rounds', '45 days of post-launch support']],
      ['growth', 'Growth', ['Up to 10–12 pages', 'Content management', 'Google Analytics and Google Business Profile setup', '2 revision rounds', '60 days of post-launch support']],
    ] as const;
    for (const [index, [id, name, features]] of expected.entries()) {
      const card = cards[index];
      expect(card.querySelector('h3')?.textContent).toBe(name);
      for (const feature of features) expect(card.textContent).toContain(feature);
      const link = card.querySelector('a')!;
      expect(link.textContent).toBe('Request a free quote');
      expect(link.getAttribute('aria-label')).toBe(`Request a free quote for ${name}`);
      expect(link.getAttribute('href')).toBe(`/contact?package=${id}`);
      expect(new URL(link.href).searchParams.has('budget')).toBe(false);
      expect(card.textContent?.includes('Recommended')).toBe(id === 'starter');
    }
    expect(packages.textContent).toContain('Start with a free consultation and get a quote for your project.');
    expect(packages.textContent).not.toMatch(/SCR\s*[\d,]+|Best value/i);
    expect(packages.querySelector('a[href="/pricing"]')?.textContent).toBe('Compare all package features');
    expect(packages.querySelectorAll('a')).toHaveLength(4);
  });
});

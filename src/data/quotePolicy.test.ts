import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import facts from './businessFacts.json';
import { editorialHomeHtml } from '../components/editorial-home/content';
const amount = /\bSCR\s*[\d,]+|\b(?:starting prices?|published prices?)\b/i;
describe('quote-led public commercial policy', () => {
 it('keeps package names, inclusions and support without publishing amounts', () => {
  expect(facts.packages.map(p=>p.title)).toEqual(['Foundation','Starter','Growth','Custom']);
  expect(JSON.stringify(facts)).not.toMatch(amount);
  for(const [i,days]of [30,45,60].entries()) expect(facts.packages[i].includes.some(x=>x.title.includes(`${days} days`))).toBe(true);
  expect(facts.site.primaryCtaLabel).toBe('Request a free quote');
 });
 it('renders differentiated homepage package summaries with Starter still featured', () => {
  expect(editorialHomeHtml).not.toMatch(amount);
  expect(editorialHomeHtml).not.toContain('Best value');
  for(const id of ['foundation','starter','growth'])expect(editorialHomeHtml).toContain(`/contact?package=${id}`);
  expect(editorialHomeHtml).toContain('mb-plan--featured');
  expect(editorialHomeHtml).toContain('Content management');
  expect(editorialHomeHtml).toContain('Google Analytics and Google Business Profile setup');
 });
 it('keeps generated chatbot documents on the same no-published-amount policy', () => {
  for(const f of ['services.md','pricing.md','hosting.md']){
   const text=readFileSync(new URL(`../../knowledge/${f}`,import.meta.url),'utf8');
   expect(text).not.toMatch(/\bSCR\s*[\d,]+/i);
  }
 });
});

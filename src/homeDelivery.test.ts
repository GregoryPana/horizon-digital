import { describe, it, expect } from 'vitest';
import worker from './worker';

const hints = '<link rel="modulepreload" crossorigin href="/assets/Home-test.js"><link rel="preload" as="style" crossorigin href="/assets/Home-test.css">';
const shell = `<html><head><meta name="viewport" content="width=device-width"><!--horizon-home-preloads:${hints}--></head><body></body></html>`;
const env = { ASSETS: { fetch: async () => new Response(shell, { headers: { 'content-type': 'text/html' } }) } };
describe('build-bound homepage dependency delivery', () => {
  it.each(['/', '/?source=test'])('activates generated hints only on successful root %s', async path => {
    const html = await (await worker.fetch(new Request('https://horizondigitalsey.com' + path), env)).text();
    expect(html).toContain(hints);
    expect(html).not.toContain('<!--horizon-home-preloads:');
    expect(html.indexOf('name="viewport"')).toBeLessThan(html.indexOf('rel="modulepreload"'));
  });
  it.each(['/pricing', '/contact', '/insights/missing'])('strips inert root hints on %s', async path => {
    const html = await (await worker.fetch(new Request('https://horizondigitalsey.com' + path), env)).text();
    expect(html).not.toContain('/assets/Home-test');
    expect(html).not.toContain('horizon-home-preloads');
  });
  it('remains compatible with a shell without generated hints', async () => {
    const response = await worker.fetch(new Request('https://horizondigitalsey.com/'), { ASSETS: { fetch: async () => new Response('<html><head></head><body></body></html>') } });
    expect(response.status).toBe(200);
    expect(await response.text()).not.toContain('horizon-home-preloads');
  });
});

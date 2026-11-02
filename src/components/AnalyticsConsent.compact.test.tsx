// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it } from 'vitest';
import AnalyticsConsent from './AnalyticsConsent';
import { getAnalyticsConsent } from '../lib/analyticsConsent';
beforeEach(() => { localStorage.clear(); document.body.removeAttribute('data-menu-open'); });
afterEach(cleanup);
it('starts with a compact nonmodal notice and brief explicit default-off copy', () => {
  render(<AnalyticsConsent />);
  const panel = screen.getByRole('region', { name: 'Your analytics choice' });
  expect(panel.classList.contains('analytics-consent-panel--compact')).toBe(true);
  expect(panel.hasAttribute('aria-modal')).toBe(false);
  expect(panel.querySelector('#analytics-consent-description')?.textContent).toBe('Optional Google Analytics measures visits and contact clicks. Off unless you allow it.');
  expect(panel.textContent).not.toContain('Change your choice anytime');
  expect(screen.getByRole('button', { name: 'Allow analytics' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'No thanks' })).toBeTruthy();
  fireEvent.keyDown(panel, { key: 'Escape' });
  expect(getAnalyticsConsent()).toBe('unknown');
  expect(screen.getByRole('region', { name: 'Your analytics choice' })).toBeTruthy();
});
it('retains detailed reversible preferences and returns focus without a persistent status band', () => {
  render(<AnalyticsConsent />);
  fireEvent.click(screen.getByRole('button', { name: 'No thanks' }));
  const opener = screen.getByRole('button', { name: 'Analytics preferences' });
  expect(opener).toBe(document.activeElement);
  fireEvent.click(opener);
  const panel = screen.getByRole('region', { name: 'Your analytics choice' });
  expect(panel.classList.contains('analytics-consent-panel--compact')).toBe(false);
  expect(panel.textContent).toContain('Change your choice anytime');
  expect(screen.getByRole('heading', { name: 'Your analytics choice' })).toBe(document.activeElement);
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(opener).toBe(document.activeElement);
  expect(screen.queryByRole('region', { name: 'Your analytics choice' })).toBeNull();
});

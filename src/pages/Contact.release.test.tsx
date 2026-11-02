// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Contact from './Contact';

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const mount = (url: string) => render(<HelmetProvider><MemoryRouter initialEntries={[url]}><Contact /></MemoryRouter></HelmetProvider>);

describe('release contact handoff', () => {
  it('preserves literal percent characters in the once-decoded request', () => {
    expect(() => mount('/contact?request=100%25%20custom')).not.toThrow();
    expect((screen.getByRole('textbox', { name: 'Message' }) as HTMLTextAreaElement).value).toContain('100% custom');
  });
  it('names the real email-draft action rather than claiming server delivery', () => {
    mount('/contact?budget=12500-25000&request=Forma%20Studio');
    expect(screen.getByRole('button', { name: 'Prepare email' })).toBeTruthy();
    expect(screen.getByText(/opens your email app/i)).toBeTruthy();
    expect((screen.getByRole('combobox', { name: 'Project budget range' }) as HTMLSelectElement).value).toBe('12500-25000');
  });
});

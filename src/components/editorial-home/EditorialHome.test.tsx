// @vitest-environment jsdom
import { StrictMode } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const lifecycle = vi.hoisted(() => ({ mount: vi.fn(), dispose: vi.fn() }));
vi.mock('./runtime', () => ({ mountEditorialHome: lifecycle.mount }));
vi.mock('../../lib/analytics', () => ({ trackContactIntent: vi.fn(), trackEvent: vi.fn() }));
import EditorialHome from './EditorialHome';
function Destination() { const location = useLocation(); return <output data-testid="destination">{location.pathname}{location.search}{location.hash}</output>; }
function App() { return <MemoryRouter><Routes><Route path="/" element={<EditorialHome />} /><Route path="*" element={<Destination />} /></Routes></MemoryRouter>; }
beforeEach(() => { vi.clearAllMocks(); lifecycle.mount.mockReturnValue(lifecycle.dispose); });
afterEach(cleanup);
describe('editorial React route ownership', () => {
  it('owns cleanup across StrictMode disposable setup and final unmount', () => {
    const result = render(<StrictMode><App /></StrictMode>);
    expect(lifecycle.mount).toHaveBeenCalledTimes(2);
    expect(lifecycle.dispose).toHaveBeenCalledTimes(1);
    result.unmount();
    expect(lifecycle.dispose).toHaveBeenCalledTimes(2);
  });
  it('navigates contact using React Router and cleans the old route', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('link', { name: 'Request a free quote' })[0]);
    expect(screen.getByTestId('destination').textContent).toBe('/contact');
    expect(lifecycle.dispose).toHaveBeenCalledOnce();
  });
  it('retains the actual selected package query for enquiry prefill', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Request a free quote for Starter' }));
    expect(screen.getByTestId('destination').textContent).toBe('/contact?package=starter');
  });
  it('keeps external client/concept/contact links native, with no fake form', () => {
    const { container } = render(<App />);
    expect(container.querySelector('a[href="https://auto.horizondigitalsey.com/"]')).not.toBeNull();
    expect(container.querySelector('a[href="mailto:horizondigital.sey@gmail.com"]')).not.toBeNull();
    expect(container.querySelector('form')).toBeNull();
    expect(container.querySelectorAll('main,header,footer,iframe,script')).toHaveLength(0);
  });
});

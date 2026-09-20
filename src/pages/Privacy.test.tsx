// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "../data/site";
import Privacy from "./Privacy";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Privacy", () => {
  it("renders approved facts without presenting unreleased consent behavior as live", () => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
    render(
      <HelmetProvider>
        <MemoryRouter><Privacy /></MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const copy = document.body.textContent ?? "";
    expect(copy).toMatch(/Cloudflare.*website and security traffic/is);
    expect(copy).toMatch(/Resend.*notification/is);
    expect(copy).toMatch(/Google Analytics.*runs only after.*accepts optional analytics/is);
    expect(copy).toMatch(/stored locally.*reopen.*Analytics choices/is);
    expect(copy).toMatch(/revoke consent.*page reloads immediately.*analytics disabled/is);
    expect(copy).toMatch(/review and respond.*does not subscribe.*marketing/is);
    expect(copy).toMatch(/does not sell enquiry data/i);
    expect(copy).toMatch(/up to 12 months/i);
    expect(copy).toMatch(/project and client records.*necessary business records/is);
    expect(copy).toMatch(/access, correction or deletion/i);
    expect(screen.getByRole("link", { name: siteConfig.email }).getAttribute("href")).toBe(`mailto:${siteConfig.email}`);
    expect(copy).toMatch(/Turnstile.*independently.*analytics/is);
    expect(copy).toMatch(/practical operational notice.*not legal certification/is);
    expect(document.querySelector('a[href="/terms"]')).toBeNull();
  });
});

// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import AnalyticsConsentControl from "./AnalyticsConsentControl";
import {
  ANALYTICS_PREFERENCES_OPEN_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "../lib/analytics";

describe("AnalyticsConsentControl", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("offers equal accept and decline actions when no choice exists", () => {
    render(
      <MemoryRouter>
        <AnalyticsConsentControl />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "Accept analytics" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "Decline optional analytics" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Read privacy details" }).getAttribute("href")).toBe("/privacy");
  });

  it("stores a decline and closes without creating analytics state", () => {
    render(
      <MemoryRouter>
        <AnalyticsConsentControl />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Decline optional analytics" }));

    expect(getAnalyticsConsent()).toBe("denied");
    expect(screen.queryByRole("button", { name: "Accept analytics" })).toBeNull();
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
  });

  it("records the current page immediately after opt-in", () => {
    render(
      <MemoryRouter>
        <AnalyticsConsentControl isProduction />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Accept analytics" }));

    expect(getAnalyticsConsent()).toBe("granted");
    expect(window.dataLayer?.some((entry) => (
      entry[0] === "event"
      && entry[1] === "page_view"
      && entry[2]?.page_path === window.location.pathname + window.location.search
    ))).toBe(true);
  });

  it("reopens the persistent preference control after a prior choice", () => {
    setAnalyticsConsent("denied");
    render(
      <MemoryRouter>
        <AnalyticsConsentControl />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("dialog", { name: "Optional website analytics" })).toBeNull();

    act(() => {
      window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_OPEN_EVENT));
    });

    expect(screen.getByRole("dialog", { name: "Optional website analytics" })).not.toBeNull();
    expect(screen.getByText(/Current choice: analytics declined/i)).not.toBeNull();
  });

  it("restores focus to an external preferences trigger", () => {
    setAnalyticsConsent("denied");
    const trigger = document.createElement("button");
    trigger.textContent = "Privacy & analytics";
    document.body.appendChild(trigger);
    render(
      <MemoryRouter>
        <AnalyticsConsentControl />
      </MemoryRouter>,
    );
    trigger.focus();

    act(() => {
      window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_OPEN_EVENT));
    });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Accept analytics" }));

    fireEvent.keyDown(window, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("keeps a standalone preference opener available on showcase routes", () => {
    setAnalyticsConsent("denied");
    render(
      <MemoryRouter>
        <AnalyticsConsentControl showPersistentButton />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Analytics choices" }));

    expect(screen.getByRole("dialog", { name: "Optional website analytics" })).not.toBeNull();
  });

  it("moves focus into the dialog and restores it after Escape", () => {
    setAnalyticsConsent("denied");
    render(
      <MemoryRouter>
        <AnalyticsConsentControl showPersistentButton />
      </MemoryRouter>,
    );
    const opener = screen.getByRole("button", { name: "Analytics choices" });
    opener.focus();

    fireEvent.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Optional website analytics" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Accept analytics" }));

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Optional website analytics" })).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Analytics choices" }));
  });
});

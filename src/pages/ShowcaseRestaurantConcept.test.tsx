/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ShowcaseRestaurantConcept from "./ShowcaseRestaurantConcept";
import { ANALYTICS_PREFERENCES_OPEN_EVENT, trackContactIntent, trackEvent } from "../lib/analytics";

vi.mock("../lib/analytics", () => ({
  ANALYTICS_PREFERENCES_OPEN_EVENT: "horizon:analytics-preferences-open",
  trackContactIntent: vi.fn(),
  trackEvent: vi.fn(),
}));

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <ShowcaseRestaurantConcept />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("restaurant website study", () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("classifies the work truthfully and exposes one clear H1", () => {
    renderPage();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.queryByRole("main")).toBeNull();
    expect(screen.getByText(/Island Table · original website study/i)).not.toBeNull();
    expect(screen.getByText(/Original restaurant website study · not commissioned client work/i)).not.toBeNull();
    expect(screen.getAllByRole("img", { name: /Illustrative/i })).toHaveLength(4);
  });

  it("routes the primary enquiry to the safe Contact prefill", () => {
    renderPage();

    const links = screen.getAllByRole("link", { name: /Discuss a restaurant website|Arrange a free first call/i });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link.getAttribute("href")).toBe("/contact?request=restaurant-concept");
    }

    links[0].click();
    expect(trackContactIntent).toHaveBeenCalledWith({
      method: "contact_form",
      source: "restaurant_concept_hero",
    });
    expect(trackEvent).toHaveBeenCalledWith("restaurant_concept_contact", { placement: "hero" });
  });

  it("keeps privacy and analytics preferences available without a floating overlay", () => {
    renderPage();
    const listener = vi.fn();
    window.addEventListener(ANALYTICS_PREFERENCES_OPEN_EVENT, listener);

    fireEvent.click(screen.getByRole("button", { name: "Privacy & analytics" }));

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(ANALYTICS_PREFERENCES_OPEN_EVENT, listener);
  });

  it("uses package-fit language without publishing exact prices or invented proof", () => {
    const { container } = renderPage();
    const copy = container.textContent ?? "";

    expect(copy).toContain("Compare website options");
    expect(copy).not.toMatch(/SCR\s*[\d,]+/i);
    expect(copy).not.toMatch(/testimonial|five[- ]star|revenue uplift|booking uplift|customers served/i);
  });
});

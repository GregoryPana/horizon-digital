import { readFileSync } from "node:fs";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import { servicePages } from "../data/site";
import AnalyticsDigitalPresenceSeychelles from "./AnalyticsDigitalPresenceSeychelles";
import SeoServicesSeychelles from "./SeoServicesSeychelles";
import WebDesignSeychelles from "./WebDesignSeychelles";

const webSource = readFileSync(
  new URL("./WebDesignSeychelles.tsx", import.meta.url),
  "utf8",
);
const sharedPillarSource = readFileSync(
  new URL("./ServicePillarPage.tsx", import.meta.url),
  "utf8",
);
const seoSource = readFileSync(
  new URL("./SeoServicesSeychelles.tsx", import.meta.url),
  "utf8",
);
const analyticsSource = readFileSync(
  new URL("./AnalyticsDigitalPresenceSeychelles.tsx", import.meta.url),
  "utf8",
);
const serviceCss = readFileSync(
  new URL("./ServicePages.css", import.meta.url),
  "utf8",
);

const renderRoute = (component: ReactElement, location: string) =>
  renderToStaticMarkup(
    createElement(
      HelmetProvider,
      null,
      createElement(StaticRouter, { location }, component),
    ),
  );

const expectInOrder = (html: string, values: readonly string[]) => {
  let previous = -1;
  for (const value of values) {
    const current = html.indexOf(value);
    expect(current, `Missing ordered content: ${value}`).toBeGreaterThan(
      previous,
    );
    previous = current;
  }
};

const expectHeadingContract = (html: string) => {
  expect(html.match(/<h1(?:\s|>)/g)).toHaveLength(1);
  expect(html).not.toContain("<main");
  const levels = Array.from(html.matchAll(/<h([1-3])(?:\s|>)/g), (match) =>
    Number(match[1]),
  );
  expect(levels[0]).toBe(1);
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }
};

const expectLink = (html: string, label: string, destination: string) => {
  const escaped = destination.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  expect(html).toMatch(
    new RegExp(`<a[^>]+href="${escaped}"[^>]*>[^<]*${label}`),
  );
};

describe("service pillar pages", () => {
  it("renders the dedicated website pillar in the exact approved section order", () => {
    const html = renderRoute(<WebDesignSeychelles />, "/web-design-seychelles");
    expectHeadingContract(html);
    expectInOrder(
      html,
      servicePages.web.sections.map((section) => section.title),
    );
    expect(html).toContain("Custom websites planned around your business.");
    expect(html).not.toMatch(/fake|dashboard|testimonial/i);
  });

  it("renders a manual, labelled, accessible two-state comparison with an honest default", () => {
    const html = renderRoute(<WebDesignSeychelles />, "/web-design-seychelles");
    expect(html).toContain('aria-label="Choose a website comparison state"');
    expect(html.match(/<button[^>]+aria-pressed=/g)).toHaveLength(2);
    expect(html).toMatch(/aria-pressed="true"[^>]*>[\s\S]*?Starting point/);
    expect(html).toMatch(
      /aria-pressed="false"[^>]*>[\s\S]*?Horizon Digital outcome/,
    );
    expect(html).toContain('data-comparison-state="starting-point"');
    expect(html).toContain(
      "A basic structure that does not yet reflect the business.",
    );
    expect(html).toContain(
      "A custom website with clearer information, a stronger visual direction and an obvious next step.",
    );
    expect(html.match(/<button[^>]+type="button"/g)).toHaveLength(2);
    expect(html).not.toMatch(/autoplay|draggable|onMouseEnter/);
    expect(serviceCss).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.service-comparison-controls button\s*\{\s*transition:\s*none;?\s*\}/,
    );
  });

  it("renders the exact four-scope package-fit progression and retained decision routes", () => {
    const html = renderRoute(<WebDesignSeychelles />, "/web-design-seychelles");
    const packageFit = servicePages.web.sections[3];
    expect(html).toContain('aria-label="Website package fit progression"');
    const progression = html.slice(
      html.indexOf('aria-label="Website package fit progression"'),
    );
    expectInOrder(progression, ["Foundation", "Starter", "Growth", "Custom"]);
    if (!("fits" in packageFit))
      throw new Error("Missing authority-backed package fits");
    for (const fit of packageFit.fits ?? [])
      expect(html).toContain(fit.description);
    expectLink(html, "View package details and starting prices", "/pricing");
    expectLink(html, "See how the project runs", "/process");
    expect(html).not.toContain("Best Value");
  });

  it("exposes restrained website next paths to truthful Work and SEO routes", () => {
    const html = renderRoute(<WebDesignSeychelles />, "/web-design-seychelles");
    expectLink(html, "View selected work", "/work");
    expectLink(html, "Explore SEO services", "/seo-services-seychelles");
    expectLink(html, "Compare website packages", "/pricing");
    expectLink(html, "Discuss a redesign", "/contact");
    expectLink(html, "Compare packages and hosting", "/pricing");
    expectLink(html, "Discuss a website project", "/contact");
  });

  it("keeps SEO sections ordered, scopes separate, and renders approved CTAs", () => {
    const html = renderRoute(
      <SeoServicesSeychelles />,
      "/seo-services-seychelles",
    );
    expectHeadingContract(html);
    expectInOrder(
      html,
      servicePages.seo.sections.map((section) => section.title),
    );
    expect(html).toContain(
      "Review and recommendations are one service. Implementation is another.",
    );
    expect(html).toContain(
      "Search positions and business outcomes are not guaranteed.",
    );
    expect(html).toContain("Google Ads management is not included");
    expectLink(html, "Explore website design", "/web-design-seychelles");
    expectLink(html, "Start with a review", "/contact");
    expectLink(html, "Discuss an SEO review", "/contact");
    expectLink(html, "Explore website services", "/web-design-seychelles");
    expectLink(html, "View all services", "/services");
  });

  it("keeps analytics sections ordered and renders both approved Contact CTAs", () => {
    const html = renderRoute(
      <AnalyticsDigitalPresenceSeychelles />,
      "/analytics-and-digital-presence-seychelles",
    );
    expectHeadingContract(html);
    expectInOrder(
      html,
      servicePages.analytics.sections.map((section) => section.title),
    );
    expect(html).toContain("Set up useful website measurement.");
    expect(html).toContain("Keep the profile accurate and under your control.");
    expect(html).toContain("does not imply an advanced dashboard");
    expect(html).toContain("this is not legal advice");
    expectLink(html, "Discuss analytics setup", "/contact");
    expectLink(html, "Discuss profile support", "/contact");
    expectLink(html, "Discuss your current setup", "/contact");
    expectLink(html, "Explore website services", "/web-design-seychelles");
    expectLink(html, "View all services", "/services");
  });

  it("projects explanatory visual and navigation labels from authority data", () => {
    const webHtml = renderRoute(
      <WebDesignSeychelles />,
      "/web-design-seychelles",
    );
    const seoHtml = renderRoute(
      <SeoServicesSeychelles />,
      "/seo-services-seychelles",
    );
    const analyticsHtml = renderRoute(
      <AnalyticsDigitalPresenceSeychelles />,
      "/analytics-and-digital-presence-seychelles",
    );

    for (const label of servicePages.web.heroVisualLabels)
      expect(webHtml).toContain(label);
    for (const item of servicePages.seo.heroVisualLabels)
      expect(seoHtml).toContain(item.label);
    for (const item of servicePages.analytics.heroVisualLabels)
      expect(analyticsHtml).toContain(item.label);
    expect(webHtml).toContain(servicePages.web.packageFitLabel);
    expect(seoHtml).toContain(servicePages.seo.relatedLinks.label);
    expect(webSource).toContain("page.heroVisualLabels.map");
    expect(sharedPillarSource).toContain("page.heroVisualLabels.map");
    expect(sharedPillarSource).toContain("page.relatedLinks.label");
  });

  it("defines Home → Services → pillar breadcrumbs for every pillar", () => {
    expect(webSource).toMatch(
      /name: "Home"[\s\S]*name: "Services"[\s\S]*name: "Website design and development"/,
    );
    expect(sharedPillarSource).toMatch(
      /name: "Home"[\s\S]*name: "Services"[\s\S]*name: breadcrumb/,
    );
    expect(seoSource).toContain('breadcrumb="SEO review and implementation"');
    expect(analyticsSource).toContain(
      'breadcrumb="Analytics and digital presence"',
    );
  });
});

import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import {
  existingWebsiteFlow,
  serviceCatalogue,
  servicePages,
  serviceScopeBoundaries,
} from "../data/site";
import Services from "./Services";

const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const servicesSource = readFileSync(
  new URL("./Services.tsx", import.meta.url),
  "utf8",
);
const serviceCss = readFileSync(
  new URL("./ServicePages.css", import.meta.url),
  "utf8",
);
const generatedKnowledge = readFileSync(
  new URL("../../knowledge/services.md", import.meta.url),
  "utf8",
);

const renderServices = () =>
  renderToStaticMarkup(
    createElement(
      HelmetProvider,
      null,
      createElement(
        StaticRouter,
        { location: "/services" },
        createElement(Services),
      ),
    ),
  );

describe("canonical standalone service catalogue", () => {
  it("publishes every approved website offer as its own canonical entry", () => {
    const websiteEntries = Object.fromEntries(
      serviceCatalogue
        .filter(
          (service) => service.pathway === "Build or improve your website",
        )
        .map((service) => [service.id, service]),
    );

    expect(Object.keys(websiteEntries)).toEqual([
      "new-custom-websites",
      "website-redesigns-rebuilds",
      "contact-enquiry-integrations",
      "managed-hosting",
      "post-launch-support",
    ]);
    expect(websiteEntries["new-custom-websites"]?.serviceType).toBe(
      "website-project",
    );
    expect(
      websiteEntries["website-redesigns-rebuilds"]?.websiteRedesignRequired,
    ).toBe(true);
    expect(websiteEntries["contact-enquiry-integrations"]?.description).toMatch(
      /Contact forms.*WhatsApp.*integrations/i,
    );
    expect(websiteEntries["managed-hosting"]?.price).toBe("SCR 2,500 per year");
    expect(websiteEntries["post-launch-support"]?.description).toMatch(
      /30, 45 or 60 days/i,
    );
  });

  it("links website project and package components to canonical package pricing", () => {
    const packageComponents = serviceCatalogue.filter(
      (service) => service.pricingPath,
    );
    expect(packageComponents.map((service) => service.id)).toEqual([
      "new-custom-websites",
      "website-redesigns-rebuilds",
      "contact-enquiry-integrations",
      "post-launch-support",
    ]);
    expect(
      packageComponents.every((service) => service.pricingPath === "/pricing"),
    ).toBe(true);
  });

  it("keeps review and implementation as separate SEO services", () => {
    const review = serviceCatalogue.find(
      (service) => service.id === "seo-review-consultation",
    );
    const implementation = serviceCatalogue.find(
      (service) => service.id === "seo-implementation",
    );

    expect(review?.serviceType).toBe("consultation-review");
    expect(implementation?.serviceType).toBe("implementation");
    expect(review?.price).toBe("Scoped after an initial discussion");
    expect(implementation?.price).toBe("Scoped after an initial discussion");
    expect(review?.websiteRedesignRequired).toBe(false);
    expect(implementation?.websiteRedesignRequired).toBe(false);
    expect(implementation?.accessRequirement).toMatch(
      /third-party access and authority/i,
    );
  });

  it("uses the approved scoping phrase for every standalone variable service", () => {
    const standalone = serviceCatalogue.filter((service) =>
      ["consultation-review", "implementation"].includes(service.serviceType),
    );
    expect(standalone).toHaveLength(4);
    expect(new Set(standalone.map((service) => service.price))).toEqual(
      new Set(["Scoped after an initial discussion"]),
    );
    expect(JSON.stringify(standalone)).not.toContain("2,200");
  });

  it("provides both required customer pathways", () => {
    expect(new Set(serviceCatalogue.map((service) => service.pathway))).toEqual(
      new Set([
        "Build or improve your website",
        "Improve visibility and measurement",
      ]),
    );
  });
});

describe("existing website support contract", () => {
  it("keeps the complete four-step review-to-handover flow in order", () => {
    expect(existingWebsiteFlow.map((step) => step.title)).toEqual([
      "Review the current setup",
      "Explain findings and priorities",
      "Choose advice or implementation",
      "Verify and hand over",
    ]);
    expect(existingWebsiteFlow[2]?.description).toMatch(
      /scope implementation separately/i,
    );
    expect(existingWebsiteFlow[3]?.description).toMatch(/verify.*hand over/i);
  });

  it("covers every required public scope boundary", () => {
    expect(serviceScopeBoundaries.map((boundary) => boundary.id)).toEqual([
      "advice-versus-implementation",
      "account-ownership-access",
      "existing-provider-coordination",
      "analytics-privacy-consent",
      "no-results-guarantees",
      "google-ads-excluded",
    ]);
    const boundaryCopy = serviceScopeBoundaries
      .map((boundary) => boundary.description)
      .join(" ");
    expect(boundaryCopy).toMatch(/not legal advice/i);
    expect(boundaryCopy).toMatch(/not guaranteed/i);
    expect(boundaryCopy).toMatch(/Google Ads.*outside/i);
  });
});

describe("Services rendered route", () => {
  it("routes the Home services CTA to the Services decision hub", () => {
    expect(homeSource).toContain(
      '<Link to="/services" className="reactive-cta',
    );
    expect(homeSource).toContain("Explore all services");
    expect(homeSource).not.toContain("Explore services and pricing");
  });

  it("is composed as a real lazy-loaded route", () => {
    expect(appSource).toContain('import("./pages/Services")');
    expect(appSource).toContain('"/services": <Services />');
  });

  it("renders the approved selector, three pillar destinations, flow and visible principles", () => {
    const html = renderServices();
    expect(html).toContain(
      "Choose the right support for your website and digital presence.",
    );
    expect(html).toContain('aria-label="Existing website support flow"');
    expect(html).toContain(
      "You do not need a redesign to get practical support.",
    );
    expect(html).toContain("Google Ads management is not included");
    expect(html).toContain('href="/web-design-seychelles"');
    expect(html).toContain('href="/seo-services-seychelles"');
    expect(html).toContain('href="/analytics-and-digital-presence-seychelles"');
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).not.toContain("<main");
  });

  it("projects route prompts, section labels and disclosure copy from authority data", () => {
    const html = renderServices();
    for (const prompt of servicePages.hub.routePrompts.items)
      expect(html).toContain(prompt.label);
    for (const label of [
      servicePages.hub.selectorEyebrow,
      servicePages.hub.existingEyebrow,
      servicePages.hub.principlesEyebrow,
      servicePages.hub.detailsLabel,
    ])
      expect(html).toContain(label);
    expect(servicesSource).toContain("page.routePrompts.items.map");
    expect(servicesSource).toContain("page.selectorEyebrow");
    expect(servicesSource).toContain("page.existingEyebrow");
    expect(servicesSource).toContain("page.principlesEyebrow");
    expect(servicesSource).toContain("page.detailsLabel");
  });

  it("renders the approved existing-site anchor used by Pricing", () => {
    const html = renderServices();
    expect(html).toContain('id="existing-website-support"');
    expect(html).not.toContain("visibility-measurement-services");
  });

  it("hides only the duplicate secondary hero action at narrow widths", () => {
    const html = renderServices();
    expect(servicesSource).toContain("service-hero-existing-action");
    expect(html.match(/href="#existing-website-support"/g)).toHaveLength(2);
    expect(serviceCss).toMatch(
      /@media\s*\(max-width:\s*639px\)[\s\S]*?\.service-hero-existing-action\s*\{\s*display:\s*none;?\s*\}/,
    );
    expect(serviceCss).not.toMatch(
      /\.service-route-prompts\s*\{[^}]*display:none/,
    );
  });
});

describe("generated Services knowledge contract", () => {
  it("contains the complete catalogue, existing-site flow and scope boundaries", () => {
    for (const service of serviceCatalogue)
      expect(generatedKnowledge).toContain(`### ${service.title}`);
    for (const [index, step] of existingWebsiteFlow.entries()) {
      expect(generatedKnowledge).toContain(`### ${index + 1}. ${step.title}`);
    }
    for (const boundary of serviceScopeBoundaries) {
      expect(generatedKnowledge).toContain(`### ${boundary.title}`);
    }
  });
});

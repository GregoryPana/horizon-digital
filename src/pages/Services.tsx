import { useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import {
  ServiceFamilyVisual,
  ServiceJourney,
} from "../components/ui/ServiceVisualStories";
import { SERVICES_SEO } from "../config/routes";
import {
  existingWebsiteFlow,
  getServiceBoundaries,
  serviceCatalogue,
  servicePages,
} from "../data/site";
import { useProceduralReveal } from "../hooks/useProceduralReveal";
import "./ServicePages.css";

const page = servicePages.hub;

export default function Services() {
  const pageRef = useRef<HTMLDivElement>(null);
  useProceduralReveal(pageRef);
  const primary = getServiceBoundaries(page.primaryBoundaryIds);
  const secondary = getServiceBoundaries([
    "existing-provider-coordination",
    "analytics-privacy-consent",
    "google-ads-excluded",
  ]);

  return (
    <div className="service-page service-hub" ref={pageRef}>
      <Seo
        {...SERVICES_SEO}
        path="/services"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Horizon Digital services",
          itemListElement: serviceCatalogue.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            description: service.description,
          })),
        }}
      />
      <header className="service-hero">
        <div className="service-container service-hero-grid">
          <div className="service-hero-copy">
            <p className="service-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="service-lead">{page.lead}</p>
            <div className="service-actions">
              <Link
                className="service-button service-button-primary"
                to={page.primary.path}
              >
                {page.primary.label}
              </Link>
              <a
                className="service-button service-button-secondary service-hero-existing-action"
                href={page.secondary.path}
              >
                {page.secondary.label}
              </a>
            </div>
          </div>
          <nav
            className="service-route-prompts"
            aria-label={page.routePrompts.label}
          >
            {page.routePrompts.items.map((item) =>
              item.path.startsWith("#") ? (
                <a key={item.path} href={item.path}>
                  <span>{item.index}</span>
                  {item.label}
                </a>
              ) : (
                <Link key={item.path} to={item.path}>
                  <span>{item.index}</span>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </header>

      <section
        className="service-section service-section-light section-reveal"
        aria-labelledby="family-title"
      >
        <div className="service-container">
          <div className="service-intro">
            <p className="service-eyebrow reveal-heading">{page.selectorEyebrow}</p>
            <h2 id="family-title" className="reveal-heading">
              {page.selectorTitle}
            </h2>
            <p className="reveal-heading">{page.selectorIntro}</p>
          </div>
          <div className="service-family-layout">
            {page.families.map((family, index) => (
              <article
                key={family.id}
                className="service-family reveal-item"
                data-featured={index === 0}
              >
                <span className="service-family-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="service-fit">{family.fit}</p>
                <h3>{family.title}</h3>
                <p>{family.body}</p>
                <ServiceFamilyVisual kind={family.id} />
                <p className="service-price-line">{family.pricing}</p>
                <Link to={family.path}>
                  {family.cta}
                  <span aria-hidden="true"> →</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="existing-website-support"
        className="service-section service-section-lagoon section-reveal"
        aria-labelledby="existing-title"
      >
        <div className="service-container">
          <div className="service-split-intro">
            <div>
              <p className="service-eyebrow reveal-heading">{page.existingEyebrow}</p>
              <h2 id="existing-title" className="reveal-heading">
                {page.existingTitle}
              </h2>
            </div>
            <p className="reveal-heading">{page.existingBody}</p>
          </div>
          <ServiceJourney
            steps={existingWebsiteFlow}
            label={page.existingFlowLabel}
            variant="review"
          />
        </div>
      </section>

      <section className="service-section section-reveal" aria-labelledby="principles-title">
        <div className="service-container">
          <div className="service-intro">
            <p className="service-eyebrow reveal-heading">{page.principlesEyebrow}</p>
            <h2 id="principles-title" className="reveal-heading">
              {page.principlesTitle}
            </h2>
          </div>
          <div className="service-principles">
            {primary.map(
              (item) =>
                item && (
                  <article key={item.id} className="reveal-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ),
            )}
          </div>
          <details className="service-details">
            <summary>{page.detailsLabel}</summary>
            {secondary.map(
              (item) =>
                item && (
                  <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ),
            )}
          </details>
        </div>
      </section>

      <section className="service-final section-reveal">
        <div className="service-container service-final-grid">
          <div>
            <p className="service-eyebrow reveal-heading">{page.final.eyebrow}</p>
            <h2 className="reveal-heading">{page.final.title}</h2>
            <p className="reveal-heading">{page.final.body}</p>
          </div>
          <div className="service-actions reveal-item">
            <Link
              className="service-button service-button-primary"
              to={page.final.primary.path}
            >
              {page.final.primary.label}
            </Link>
            <Link
              className="service-button service-button-secondary"
              to={page.final.secondary.path}
            >
              {page.final.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

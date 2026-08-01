import { useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import {
  AnalyticsMeasurementStory,
  SeoReviewStory,
  ServiceJourney,
} from "../components/ui/ServiceVisualStories";
import type { RouteSeo } from "../config/routes";
import {
  existingWebsiteFlow,
  getServiceBoundaries,
  servicePages,
} from "../data/site";
import { useProceduralReveal } from "../hooks/useProceduralReveal";
import "./ServicePages.css";

type PillarPage = typeof servicePages.seo | typeof servicePages.analytics;
type Props = {
  page: PillarPage;
  path: string;
  seo: RouteSeo;
  breadcrumb: string;
  visual: "seo" | "analytics";
};
type LinkItem = { label: string; path: string };
type ContentItem = { title: string; body: string; cta?: LinkItem };
type PillarSection = {
  eyebrow: string;
  title: string;
  body?: string;
  items?: readonly ContentItem[];
  steps?: readonly ContentItem[];
  boundaryIds?: readonly string[];
  flow?: true | readonly string[];
  note?: string;
  support?: string;
  cta?: LinkItem;
};

function RelatedLinks({ page }: { page: PillarPage }) {
  if (!("relatedLinks" in page)) return null;

  return (
    <aside className="service-related" aria-labelledby="pillar-related-title">
      <div className="reveal-heading">
        <p className="service-eyebrow">{page.relatedLinks.eyebrow}</p>
        <h2 id="pillar-related-title">{page.relatedLinks.title}</h2>
      </div>
      <nav className="reveal-item" aria-label={page.relatedLinks.label}>
        {page.relatedLinks.links.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
            <span aria-hidden="true"> →</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default function ServicePillarPage({
  page,
  path,
  seo,
  breadcrumb,
  visual,
}: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  useProceduralReveal(pageRef);

  return (
    <div className="service-page" ref={pageRef}>
      <Seo
        {...seo}
        path={path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: breadcrumb, path },
        ]}
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
              <Link
                className="service-button service-button-secondary"
                to={page.secondary.path}
              >
                {page.secondary.label}
              </Link>
            </div>
            {"boundary" in page && (
              <p className="service-note">{page.boundary}</p>
            )}
          </div>
          <div className="service-visual service-visual-story" aria-hidden="true">
            {visual === "seo" ? <SeoReviewStory /> : <AnalyticsMeasurementStory />}
            <div className="service-visual-legend">
              {page.heroVisualLabels.map((item) => (
                <span key={item.label}><b>{item.index}</b>{item.label}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {(page.sections as readonly PillarSection[]).map((section, index) => {
        const boundaries = section.boundaryIds
          ? getServiceBoundaries(section.boundaryIds)
          : [];
        const sectionClass =
          index % 2 === 0
            ? "service-section service-section-light"
            : "service-section";

        return (
          <section
            className={`${sectionClass} section-reveal`}
            key={section.title}
            aria-labelledby={`${visual}-section-${index}`}
          >
            <div className="service-container">
              <div className="service-intro">
                <p className="service-eyebrow reveal-heading">{section.eyebrow}</p>
                <h2 id={`${visual}-section-${index}`} className="reveal-heading">{section.title}</h2>
                {section.body && <p className="reveal-heading">{section.body}</p>}
              </div>

              {section.items && (
                <div className="service-editorial-list">
                  {section.items.map((item, itemIndex) => (
                    <article
                      className="service-editorial-item reveal-item"
                      key={item.title}
                    >
                      <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                        {item.cta && (
                          <Link
                            className="service-inline-link"
                            to={item.cta.path}
                          >
                            {item.cta.label}
                            <span aria-hidden="true"> →</span>
                          </Link>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {section.steps && (
                <ServiceJourney
                  steps={section.steps}
                  variant={visual === "analytics" ? "measurement" : "review"}
                />
              )}

              {section.flow === true && (
                <ServiceJourney steps={existingWebsiteFlow} variant="review" />
              )}

              {Array.isArray(section.flow) && (
                <ServiceJourney
                  steps={section.flow.map((title) => ({ title }))}
                  variant={visual === "analytics" ? "measurement" : "review"}
                />
              )}

              {boundaries.length > 0 && (
                <div className="service-principles">
                  {boundaries.map(
                    (item) =>
                      item && (
                        <article key={item.id} className="reveal-item">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </article>
                      ),
                  )}
                </div>
              )}

              {section.note && <p className="service-note reveal-item">{section.note}</p>}
              {section.support && (
                <p className="service-note reveal-item">{section.support}</p>
              )}
              {section.cta && (
                <Link className="service-inline-link reveal-item" to={section.cta.path}>
                  {section.cta.label}
                  <span aria-hidden="true"> →</span>
                </Link>
              )}
            </div>
          </section>
        );
      })}

      <div className="service-container section-reveal">
        <RelatedLinks page={page} />
      </div>

      <section className="service-final section-reveal">
        <div className="service-container service-final-grid">
          <div className="reveal-heading">
            <p className="service-eyebrow">{page.final.eyebrow}</p>
            <h2>{page.final.title}</h2>
            <p>{page.final.body}</p>
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

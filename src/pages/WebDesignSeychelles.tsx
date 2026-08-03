import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import {
  ServiceJourney,
  WebsiteBuildAtelier,
  WebsiteComparisonGraphic,
} from "../components/ui/ServiceVisualStories";
import { WEB_DESIGN_SEO } from "../config/routes";
import { servicePages } from "../data/site";
import { useProceduralReveal } from "../hooks/useProceduralReveal";
import "./ServicePages.css";
import {
  DEFAULT_WEBSITE_COMPARISON_STATE,
  selectWebsiteComparisonState,
  type WebsiteComparisonState,
} from "./websiteComparisonState";

const page = servicePages.web;
type LinkItem = { label: string; path: string };
type EditorialItem = { title: string; body: string };
type ComparisonItem = {
  id: WebsiteComparisonState;
  label: string;
  caption: string;
};

const business = page.sections[0] as {
  eyebrow: string;
  title: string;
  body: string;
  note: string;
};
const startingPoints = page.sections[1] as {
  eyebrow: string;
  title: string;
  items: Array<EditorialItem & { cta: LinkItem }>;
  comparison: ComparisonItem[];
};
const scope = page.sections[2] as {
  eyebrow: string;
  title: string;
  intro: string;
  items: EditorialItem[];
};
const packageFit = page.sections[3] as {
  eyebrow: string;
  title: string;
  body: string;
  fits: Array<{ title: string; description: string }>;
  primary: LinkItem;
  secondary: LinkItem;
};
const afterLaunch = page.sections[4] as {
  eyebrow: string;
  title: string;
  items: EditorialItem[];
  cta: LinkItem;
};

function AbstractComparison({ items }: { items: readonly ComparisonItem[] }) {
  const [selectedId, setSelectedId] = useState<WebsiteComparisonState>(
    DEFAULT_WEBSITE_COMPARISON_STATE,
  );
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <figure
      className="service-comparison reveal-item"
      aria-labelledby="website-comparison-title"
    >
      <h3 id="website-comparison-title" className="sr-only">
        Website redesign comparison
      </h3>
      <div
        className="service-comparison-controls"
        aria-label="Choose a website comparison state"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedId === item.id}
            onClick={() => setSelectedId(selectWebsiteComparisonState(item.id))}
          >
            <strong>{item.label}</strong>
            <span>{item.caption}</span>
          </button>
        ))}
      </div>
      <WebsiteComparisonGraphic state={selected.id} />
      <figcaption aria-live="polite">
        <strong>{selected.label}:</strong> {selected.caption}
      </figcaption>
    </figure>
  );
}

function RelatedLinks() {
  return (
    <aside className="service-related" aria-labelledby="web-related-title">
      <div className="reveal-heading">
        <p className="service-eyebrow">{page.relatedLinks.eyebrow}</p>
        <h2 id="web-related-title">{page.relatedLinks.title}</h2>
      </div>
      <nav className="reveal-item" aria-label="Related website service links">
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

export default function WebDesignSeychelles() {
  const pageRef = useRef<HTMLDivElement>(null);
  useProceduralReveal(pageRef);

  return (
    <div className="service-page" ref={pageRef}>
      <Seo
        {...WEB_DESIGN_SEO}
        path="/web-design-seychelles"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          {
            name: "Website design and development",
            path: "/web-design-seychelles",
          },
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
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
              {page.trust.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="service-visual service-visual-atelier" aria-hidden="true">
            <WebsiteBuildAtelier compact />
            <div className="service-visual-legend">
              {page.heroVisualLabels.map((label, index) => (
                <span key={label}><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="service-section service-section-light section-reveal">
        <div className="service-container service-two-column">
          <div>
            <p className="service-eyebrow reveal-heading">{business.eyebrow}</p>
            <h2 className="reveal-heading">{business.title}</h2>
          </div>
          <div className="reveal-item">
            <p className="service-lead !text-[#385159]">{business.body}</p>
            <p className="service-note !text-[#385159]">{business.note}</p>
          </div>
        </div>
      </section>

      <section className="service-section section-reveal">
        <div className="service-container">
          <div className="service-intro">
            <p className="service-eyebrow reveal-heading">{startingPoints.eyebrow}</p>
            <h2 className="reveal-heading">{startingPoints.title}</h2>
          </div>
          <div className="service-two-column mt-10">
            <div className="service-editorial-list">
              {startingPoints.items.map((item) => (
                <article className="service-editorial-item reveal-item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>

                  </div>
                </article>
              ))}
            </div>
            <AbstractComparison items={startingPoints.comparison} />
          </div>
          <div className="service-comparison-actions service-actions reveal-item">
            {startingPoints.items.map((item) => (
              <Link
                key={item.cta.path}
                className="service-button service-button-secondary"
                to={item.cta.path}
              >
                {item.cta.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-section-lagoon section-reveal">
        <div className="service-container">
          <div className="service-intro">
            <p className="service-eyebrow reveal-heading">{scope.eyebrow}</p>
            <h2 className="reveal-heading">{scope.title}</h2>
            <p className="reveal-heading">{scope.intro}</p>
          </div>
          <ServiceJourney
            steps={scope.items}
            label="Website project scope journey"
            variant="website"
            className="service-journey-scope"
          />
        </div>
      </section>

      <section className="service-section service-section-light section-reveal">
        <div className="service-container">
          <div className="service-two-column">
            <div>
              <p className="service-eyebrow reveal-heading">{packageFit.eyebrow}</p>
              <h2 className="reveal-heading">{packageFit.title}</h2>
            </div>
            <div className="reveal-item">
              <p className="service-lead !text-[#385159]">{packageFit.body}</p>
              <div className="service-actions">
                <Link
                  className="service-button service-button-primary"
                  to={packageFit.primary.path}
                >
                  {packageFit.primary.label}
                </Link>
                <Link
                  className="service-button service-button-secondary !text-[#173a42]"
                  to={packageFit.secondary.path}
                >
                  {packageFit.secondary.label}
                </Link>
              </div>
            </div>
          </div>
          <ul className="service-package-fit" aria-label={page.packageFitLabel}>
            {packageFit.fits.map((fit) => (
              <li key={fit.title} className="reveal-item">
                <h3>{fit.title}</h3>
                <p>{fit.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section section-reveal">
        <div className="service-container">
          <div className="service-intro">
            <p className="service-eyebrow reveal-heading">{afterLaunch.eyebrow}</p>
            <h2 className="reveal-heading">{afterLaunch.title}</h2>
          </div>
          <div className="service-editorial-list">
            {afterLaunch.items.map((item) => (
              <article className="service-editorial-item reveal-item" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <Link
            className="service-button service-button-secondary reveal-item mt-8"
            to={afterLaunch.cta.path}
          >
            {afterLaunch.cta.label}
          </Link>
          <RelatedLinks />
        </div>
      </section>

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

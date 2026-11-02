import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import {
  addOnItems,
  customPackage,
  faqs,
  foundationPackage,
  growthPackage,
  hostingPlan,
  paymentTerms,
  servicesPricingIntro,
  siteConfig,
  stabilisationPlan,
  starterPackage,
} from "../data/site";
import { trackContactIntent, trackEvent } from "../lib/analytics";
import "./Pricing.css";
import {
  PRICING_COMPARISON_GROUPS,
  PRICING_DECISIONS,
  PRICING_PACKAGE_FEATURE_ROWS,
  PRICING_PACKAGE_ORDER,
  PRICING_STARTER_PACKAGE_ID,
  createInitialPricingComparisonGroupState,
  type PricingComparisonIcon,
  type PricingComparisonGroupId,
  type PricingComparisonGroupState,
  type PricingDecisionId,
  type PricingPackageId,
  getPricingPackageComparisonDisplay,
  selectActivePricingDecision,
  togglePricingComparisonGroup,
} from "./pricingDecisionFlow";

type PackageFeature = {
  title: string;
  description: string;
};

type PricingPackage = {
  id: string;
  title: string;
  description: string;
  includes: PackageFeature[];
};

const packageById: Record<PricingPackageId, PricingPackage> = {
  foundation: foundationPackage,
  starter: starterPackage,
  growth: growthPackage,
};

const packageContactPaths: Record<PricingPackageId, string> = {
  foundation: "/contact?package=foundation",
  starter: "/contact?package=starter",
  growth: "/contact?package=growth",
};

const packageProgression: Record<PricingPackageId, string> = {
  foundation: "Focused scope · up to 3 pages",
  starter: "More content · up to 5–6 pages",
  growth: "Deeper scope · up to 10–12 pages",
};

// Shared inclusions are explained once; cards emphasise meaningful differences.
const packageHighlightIndexes: Record<PricingPackageId, number[]> = {
  foundation: [6, 5],
  starter: [8, 4, 7, 6],
  growth: [8, 4, 7, 6],
};

const addOnScopeNotes: Record<string, string> = {
  "Additional page": "Extend the agreed page range with the content your business needs.",
  "Page content writing support": "Get support with writing the agreed website pages.",
  "Custom booking or enquiry form": "Agree the fields and enquiry workflow your website needs.",
  "Google Business Profile setup": "Setup support subject to account access and verified business details.",
  "Rush delivery": "Discuss a shorter timeline, subject to availability.",
  "Content management for Foundation": "Add editing for agreed text and image fields. Included in Starter and Growth.",
};

const packageInclusions = {
  foundation: foundationPackage.includes,
  starter: starterPackage.includes,
  growth: growthPackage.includes,
};

function ComparisonCue({ kind }: { kind: PricingComparisonIcon }) {
  if (kind === "not-included") {
    return (
      <span className="pricing-comparison-cue" data-icon={kind}>
        <span aria-hidden="true">—</span>
      </span>
    );
  }

  return (
    <span className="pricing-comparison-cue" data-icon={kind}>
      <Check aria-hidden="true" />
    </span>
  );
}

export function PricingComparisonTable({
  groupState,
  onToggle,
}: {
  groupState: PricingComparisonGroupState;
  onToggle: (groupId: PricingComparisonGroupId, isExpanded: boolean) => void;
}) {
  return (
    <table className="pricing-comparison-table">
      <caption className="sr-only">Full comparison of Foundation, Starter and Growth package details</caption>
      <thead>
        <tr>
          <th scope="col">Feature</th>
          {PRICING_PACKAGE_ORDER.map((packageId) => (
            <th key={packageId} scope="col">{packageById[packageId].title}</th>
          ))}
        </tr>
      </thead>
      {PRICING_COMPARISON_GROUPS.map((group) => {
        const isExpanded = groupState[group.id];
        const groupBodyId = `pricing-comparison-group-${group.id}`;
        return (
          <tbody key={group.id} id={groupBodyId} className="pricing-comparison-group">
            <tr className="pricing-comparison-group-heading">
              <th colSpan={4} scope="rowgroup">
                <button
                  type="button"
                  className="pricing-comparison-group-toggle focus-ring"
                  aria-expanded={isExpanded}
                  aria-controls={groupBodyId}
                  onClick={() => onToggle(group.id, isExpanded)}
                >
                  <span>{group.label}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </th>
            </tr>
            {group.rowIds.map((rowId) => {
              const row = PRICING_PACKAGE_FEATURE_ROWS.find((candidate) => candidate.id === rowId);
              if (!row) return null;
              return (
                <tr key={row.label} hidden={!isExpanded}>
                  <th scope="row">
                    <span>{row.label}</span>
                    {"note" in row && row.note && <small>{row.note}</small>}
                  </th>
                  {PRICING_PACKAGE_ORDER.map((packageId) => {
                    const display = getPricingPackageComparisonDisplay(packageId, row, packageInclusions);
                    return (
                      <td key={packageId} data-empty={display.icon === "not-included"}>
                        <span className="pricing-comparison-cell">
                          <ComparisonCue kind={display.icon} />
                          {display.value && <strong aria-hidden="true">{display.value}</strong>}
                          <span className="sr-only">{display.accessibleLabel}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        );
      })}
    </table>
  );
}

function trackPricingCta(ctaName: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    page_path: window.location.pathname,
  });
}

function DecisionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="pricing-decision-heading reveal-heading">
      <span className="pricing-decision-number" aria-hidden="true">{number}</span>
      <div>
        <p className="pricing-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="pricing-decision-lead">{description}</p>
      </div>
    </header>
  );
}

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDecision, setActiveDecision] = useState<PricingDecisionId>(PRICING_DECISIONS[0].id);
  const [comparisonGroupState, setComparisonGroupState] = useState(createInitialPricingComparisonGroupState);

  useEffect(() => {
    let frame = 0;

    const updateActiveDecision = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const sectionTops = PRICING_DECISIONS.map((decision) => {
          const node = document.getElementById(decision.id);
          return node ? window.scrollY + node.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
        });
        const header = document.querySelector<HTMLElement>("[data-site-header]");
        const activationLine =
          window.scrollY + (header?.getBoundingClientRect().height ?? 72) + window.innerHeight * 0.22;

        setActiveDecision(selectActivePricingDecision(sectionTops, activationLine));
      });
    };

    updateActiveDecision();
    window.addEventListener("scroll", updateActiveDecision, { passive: true });
    window.addEventListener("resize", updateActiveDecision);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveDecision);
      window.removeEventListener("resize", updateActiveDecision);
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.slice(1);
    const decision = PRICING_DECISIONS.find((item) => item.id === hash);
    if (!decision) return;

    const timer = window.setTimeout(() => {
      document.getElementById(decision.id)?.scrollIntoView({
        block: "start",
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      setActiveDecision(decision.id);
    }, 40);

    return () => window.clearTimeout(timer);
  }, [location.hash, shouldReduceMotion]);

  const jumpToDecision = (decisionId: PricingDecisionId) => {
    const hash = `#${decisionId}`;

    if (location.hash !== hash) {
      navigate(
        { pathname: location.pathname, search: location.search, hash },
        { replace: true },
      );
      setActiveDecision(decisionId);
      return;
    }

    document.getElementById(decisionId)?.scrollIntoView({
      block: "start",
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    setActiveDecision(decisionId);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website design and development",
    name: "Custom Website Packages",
    description: servicesPricingIntro.summary,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      image: new URL("/og-image.png", siteConfig.url).toString(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mahé",
        addressCountry: "SC",
      },
      url: siteConfig.url,
      telephone: siteConfig.phone,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Mahé" },
      { "@type": "AdministrativeArea", name: "Praslin" },
      { "@type": "AdministrativeArea", name: "La Digue" },
      { "@type": "Country", name: "Seychelles" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Packages",
      itemListElement: PRICING_PACKAGE_ORDER.map((id) => ({
        "@type": "Offer",
        url: new URL(packageContactPaths[id], siteConfig.url).toString(),
        itemOffered: { "@type": "Service", name: packageById[id].title, description: packageById[id].description },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const timelineFaq = faqs.find((faq) => faq.question === "How long does a project take?");

  return (
    <div className="pricing-page">
      <Seo
        title="Custom Website Packages & Pricing in Seychelles | Horizon Digital"
        description="Compare custom website packages in Seychelles and request a free quote. Clear inclusions, optional hosting, support and payment terms."
        path="/pricing"
        keywords="custom website packages Seychelles, custom web design pricing Seychelles, bespoke website development Seychelles, tailored web solutions Seychelles"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services & Pricing", path: "/pricing" },
        ]}
        structuredData={[serviceSchema, faqSchema]}
      />

      <nav className="pricing-decision-nav" aria-label="Pricing decisions">
        <div className="pricing-decision-nav-track">
          {PRICING_DECISIONS.map((decision, index) => {
            const isActive = decision.id === activeDecision;
            return (
              <button
                key={decision.id}
                type="button"
                className="pricing-decision-nav-button focus-ring"
                data-active={isActive}
                aria-current={isActive ? "step" : undefined}
                onClick={() => jumpToDecision(decision.id)}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{decision.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <section id="packages" className="pricing-hero pricing-decision-section pricing-packages-section">
        <div className="pricing-container">
          <header className="pricing-hero-copy">
            <div>
              <p className="pricing-eyebrow">Website packages · Seychelles</p>
              <h1>A clear scope.<br /><span>A website that fits.</span></h1>
            </div>
            <div className="pricing-hero-intro">
              <p className="pricing-hero-lead">Start with a free consultation. We’ll match your pages and features to a package, then send a tailored quote.</p>
              <Link to="/contact" className="pricing-primary-action focus-ring" onClick={() => trackPricingCta("pricing_hero_free_quote")}>
                Request a free quote <ArrowRight aria-hidden="true" />
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="pricing-call-action focus-ring" onClick={() => trackContactIntent({ method: "phone", source: "pricing_hero" })}>
                Call for a free quote <span>{siteConfig.phone}</span>
              </a>
              <Link to="/process" className="pricing-process-link focus-ring">
                See how a website project runs <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </header>

          <div className="pricing-package-intro">
            <p className="pricing-eyebrow">Find your starting point</p>
            <p>Custom design, a mobile-responsive build, a contact form and WhatsApp link, and the same technical and on-page SEO foundation — in every package.</p>
          </div>

          <div className="pricing-package-grid">
            {PRICING_PACKAGE_ORDER.map((packageId) => {
              const pkg = packageById[packageId];
              const isStarter = packageId === PRICING_STARTER_PACKAGE_ID;
              return (
                <article
                  key={packageId}
                  className="pricing-package-card"
                  data-featured={isStarter}
                  aria-labelledby={`package-${packageId}`}
                >
                  <div className="pricing-package-kicker">
                    <span>{packageId === "foundation" ? "The essentials" : packageId === "starter" ? "Room to grow" : "A broader presence"}</span>
                    {isStarter && <span className="pricing-recommended">Recommended</span>}
                  </div>
                  <div className="pricing-package-head">
                    <div className="pricing-package-title-row">
                      <h2 id={`package-${packageId}`}>{pkg.title}</h2>
                    </div>
                    <p className="pricing-package-fit">{pkg.description}</p>
                    <p className="pricing-package-progression">{packageProgression[packageId]}</p>
                  </div>

                  <Link
                    to={packageContactPaths[packageId]}
                    className="pricing-package-action focus-ring"
                    data-featured={isStarter}
                    onClick={() => trackPricingCta(`pricing_${packageId}_get_started`)}
                  >
                    Request a free quote
                    <ArrowRight aria-hidden="true" />
                  </Link>

                  <p className="pricing-package-inheritance">{packageId === "foundation" ? "A focused starting scope:" : "Your scope includes:"}</p>
                  <ul className="pricing-package-highlights">
                    {packageHighlightIndexes[packageId].map((featureIndex) => {
                      const feature = pkg.includes[featureIndex];
                      return (
                        <li key={feature.title}>
                          <Check aria-hidden="true" />
                          <span>
                            {feature.title}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {isStarter && <p className="pricing-recommendation">Recommended for editable content and basic visitor measurement.</p>}
                </article>
              );
            })}
          </div>

          <p className="pricing-package-disclaimer reveal-item">
            Your quote is tailored to the project. The written proposal confirms final scope, deliverables, responsibilities, exclusions and price.
          </p>

          <div className="pricing-comparison-disclosure reveal-item">
            <div className="pricing-comparison-intro">
              <h2>Compare the details.</h2>
              <p>See exactly what changes between packages. Open or close each group below.</p>
            </div>
            <p className="pricing-comparison-scroll-cue">Scroll sideways to compare all three packages <ArrowRight aria-hidden="true" /></p>
            <div id="pricing-package-comparison" className="pricing-comparison-panel focus-ring" role="region" aria-label="Scrollable package comparison" tabIndex={0}>
              <PricingComparisonTable
                groupState={comparisonGroupState}
                onToggle={(groupId, isExpanded) => {
                  setComparisonGroupState((current) => togglePricingComparisonGroup(current, groupId));
                  trackEvent("pricing_comparison_group_toggle", {
                    page_path: window.location.pathname,
                    group: groupId,
                    action: isExpanded ? "collapse" : "expand",
                  });
                }}
              />
            </div>
            <p className="pricing-comparison-note">Analytics setup requires the necessary account access and consent setup. Google Business Profile support also requires verified business details.</p>
          </div>

          <aside className="pricing-services-bridge reveal-item" aria-labelledby="pricing-services-bridge-title">
            <div>
              <p className="pricing-eyebrow">Need help with an existing website?</p>
              <h2 id="pricing-services-bridge-title">Website packages are only one part of the offer.</h2>
              <p>
                Independent SEO review and support, analytics, and Google Business Profile help are available for existing or third-party websites and are scoped after an initial discussion.
              </p>
            </div>
            <Link to="/services#existing-website-support" className="pricing-secondary-action focus-ring">
              View independent services
              <ArrowRight aria-hidden="true" />
            </Link>
          </aside>

          <aside className="pricing-custom-scope reveal-item" aria-labelledby="custom-scope-title">
            <div>
              <p className="pricing-eyebrow">Tailored scope</p>
              <h3 id="custom-scope-title">{customPackage.title} · Built around your brief</h3>
              <p>{customPackage.description}</p>
            </div>
            <Link
              to="/contact"
              className="pricing-secondary-action focus-ring"
              onClick={() => trackPricingCta("pricing_custom_scope_request")}
            >
              Request a free quote
            </Link>
          </aside>
        </div>
      </section>

      <section id="addons" className="pricing-decision-section pricing-addons-section">
        <div className="pricing-container">
          <DecisionHeading
            number="02"
            eyebrow="Add-ons"
            title="Add only what the project needs."
            description="Extend a package where it matters. Optional work is quoted and agreed before it is added to your scope."
          />
          <div className="pricing-addon-list" role="list">
            {addOnItems.map((item) => (
              <div key={item.title} className="pricing-addon-row reveal-item" role="listitem">
                <h3>{item.title}</h3>
                <p>{("description" in item && typeof item.description === "string" ? item.description : addOnScopeNotes[item.title]) ?? "Defined and quoted in the agreed project scope."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hosting-support" className="pricing-decision-section pricing-hosting-section">
        <div className="pricing-container">
          <DecisionHeading
            number="03"
            eyebrow="Hosting and support"
            title="Keep the website available and supported after launch."
            description="Managed hosting is optional. Post-launch support is included for the period stated in the selected package."
          />

          <div className="pricing-hosting-grid">
            <article className="pricing-hosting-plan reveal-item">
              <div className="pricing-hosting-price-row">
                <div>
                  <p className="pricing-eyebrow">{hostingPlan.title}</p>
                  <h3>A home for your website.</h3>
                  <p>Optional hosting, quoted with your project.</p>
                </div>
              </div>
              <p className="pricing-hosting-summary">{hostingPlan.details[0]}</p>
              <ul className="pricing-hosting-trust-cues">
                {hostingPlan.details.slice(1).map((detail) => (
                  <li key={detail}><Check aria-hidden="true" /> {detail}</li>
                ))}
              </ul>
              <details className="pricing-hosting-disclosure">
                <summary className="focus-ring">
                  <span>What managed hosting covers</span>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div className="pricing-hosting-disclosure-content">
                  <ul>
                    {hostingPlan.features.map((feature) => (
                      <li key={feature}><Check aria-hidden="true" /> {feature}</li>
                    ))}
                  </ul>
                  <p><strong>{hostingPlan.note}</strong></p>
                </div>
              </details>
              <Link
                to="/contact"
                className="pricing-secondary-action pricing-hosting-action focus-ring"
                onClick={() => trackPricingCta("pricing_hosting_get_started")}
              >
                Discuss managed hosting
              </Link>
            </article>

            <article className="pricing-support-plan reveal-item">
              <p className="pricing-eyebrow">Post-launch support</p>
              <h3>{stabilisationPlan.title}</h3>
              <div className="pricing-support-periods" aria-label="Support periods by package">
                {PRICING_PACKAGE_ORDER.map((packageId) => {
                  const support = packageById[packageId].includes.find((item) =>
                    /post-launch support/i.test(item.title),
                  );
                  return (
                    <div key={packageId}>
                      <span>{packageById[packageId].title}</span>
                      <strong>{support?.title ?? "Defined in the package"}</strong>
                    </div>
                  );
                })}
              </div>
              <div className="pricing-support-columns">
                <div>
                  <h4>Covers</h4>
                  <ul>{stabilisationPlan.covers.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h4>Does not cover</h4>
                  <ul>{stabilisationPlan.excludes.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="payment-timeline" className="pricing-decision-section pricing-payment-section">
        <div className="pricing-container">
          <DecisionHeading
            number="04"
            eyebrow="Payment and timeline"
            title="Know the checkpoints before work begins."
            description="Payment stages are published below. The project-specific estimate is confirmed in the proposal."
          />
          <div className="pricing-payment-grid">
            <div className="pricing-payment-terms reveal-item">
              <h3>Payment terms</h3>
              <ol>
                {paymentTerms.map((term, index) => (
                  <li key={term}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <p>{term}</p>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="pricing-timeline-note reveal-item">
              <p className="pricing-eyebrow">Planning guide</p>
              <h3>Typical project timing</h3>
              <p>{timelineFaq?.answer}</p>
              <p className="pricing-proposal-note">
                Your quote reflects the agreed project. The written proposal confirms final scope, deliverables, timing and price.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section id="faq-consultation" className="pricing-decision-section pricing-faq-section">
        <div className="pricing-container">
          <DecisionHeading
            number="05"
            eyebrow="FAQ and consultation"
            title="Common questions and what happens next."
            description="Review the details, then tell us about your business, goals and preferred timeline."
          />
          <div className="pricing-faq-layout">
            <div className="pricing-faq-list">
              {faqs.map((faq) => (
                <details key={faq.question} className="pricing-faq-item reveal-item">
                  <summary className="focus-ring">
                    <span>{faq.question}</span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>

            <aside className="pricing-consultation reveal-item">
              <p className="pricing-eyebrow">Free consultation</p>
              <h2>Not sure which package fits?</h2>
              <p>
                Start with a free consultation. Horizon Digital aims to reply {siteConfig.responseTime}, then the written proposal confirms the right scope.
              </p>
              <Link
                to="/contact"
                className="pricing-primary-action consultation-attraction focus-ring"
                onClick={() => trackPricingCta("pricing_bottom_book_consult")}
              >
                Request a free quote
                <ArrowRight aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

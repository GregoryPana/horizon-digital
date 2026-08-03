import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useProceduralReveal } from "../hooks/useProceduralReveal";
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
import { trackEvent } from "../lib/analytics";
import "./Pricing.css";
import PricingPackageGraphic from "./PricingPackageGraphic";
import {
  PRICING_COMPARISON_GROUPS,
  PRICING_DECISIONS,
  PRICING_PACKAGE_FEATURE_ROWS,
  PRICING_PACKAGE_CUE_INDEXES,
  PRICING_PACKAGE_ORDER,
  PRICING_STARTER_PACKAGE_ID,
  createInitialPricingComparisonGroupState,
  type PricingComparisonIcon,
  type PricingComparisonGroupId,
  type PricingComparisonGroupState,
  type PricingDecisionId,
  type PricingPackageId,
  formatPublishedStartingPrice,
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
  price: string;
  description: string;
  includes: PackageFeature[];
};

const packageById: Record<PricingPackageId, PricingPackage> = {
  foundation: foundationPackage,
  starter: starterPackage,
  growth: growthPackage,
};

const packageContactPaths: Record<PricingPackageId, string> = {
  foundation: "/contact?budget=7500-12500",
  starter: "/contact?budget=12500-25000",
  growth: "/contact?budget=25000-plus",
};

const packageProgression: Record<PricingPackageId, string> = {
  foundation: "Focused scope · up to 3 pages",
  starter: "More content · up to 5–6 pages",
  growth: "Deeper scope · up to 10–12 pages",
};

const packageInheritanceLabel: Record<PricingPackageId, string> = {
  foundation: "Included in Foundation:",
  starter: "Everything in Foundation, plus:",
  growth: "Everything in Starter, plus:",
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
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeDecision, setActiveDecision] = useState<PricingDecisionId>(PRICING_DECISIONS[0].id);
  const [comparisonGroupState, setComparisonGroupState] = useState(createInitialPricingComparisonGroupState);
  useProceduralReveal(pageRef);

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

  const packageOffers = PRICING_PACKAGE_ORDER.map((packageId) => packageById[packageId]).map((pkg) => ({
    "@type": "Offer" as const,
    name: pkg.title,
    priceCurrency: "SCR",
    price: pkg.price.replace(/[^\d]/g, ""),
    url: new URL("/pricing", siteConfig.url).toString(),
  }));

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
      itemListElement: packageOffers.map((offer) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offer.name },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: offer.price,
          priceCurrency: offer.priceCurrency,
        },
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
    <div className="pricing-page" ref={pageRef}>
      <Seo
        title="Custom Website Packages & Pricing in Seychelles | Horizon Digital"
        description="Published SCR starting prices for custom website packages in Seychelles, with clear inclusions, hosting, support and payment terms."
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

      <section id="packages" className="pricing-hero pricing-decision-section pricing-packages-section section-reveal">
        <div className="pricing-container">
          <header className="pricing-hero-copy reveal-heading">
            <p className="pricing-eyebrow">Website packages · Seychelles</p>
            <h1>Choose the right website package.</h1>
            <p className="pricing-hero-lead">{servicesPricingIntro.subtitle}</p>
            <Link to="/process" className="pricing-process-link focus-ring">
              See how a website project runs
              <ArrowRight aria-hidden="true" />
            </Link>
          </header>

          <div className="pricing-package-grid">
            {PRICING_PACKAGE_ORDER.map((packageId) => {
              const pkg = packageById[packageId];
              const isStarter = packageId === PRICING_STARTER_PACKAGE_ID;
              return (
                <article
                  key={packageId}
                  className="pricing-package-card reveal-item"
                  data-featured={isStarter}
                  aria-labelledby={`package-${packageId}`}
                >
                  <PricingPackageGraphic tier={packageId} />
                  <div className="pricing-package-head">
                    <div className="pricing-package-title-row">
                      <h2 id={`package-${packageId}`}>{pkg.title}</h2>
                      {isStarter && <span className="pricing-best-value">Best Value</span>}
                    </div>
                    <p className="pricing-package-fit">{pkg.description}</p>
                    <p className="pricing-package-price">{formatPublishedStartingPrice(pkg.price)}</p>
                    <p className="pricing-package-progression">{packageProgression[packageId]}</p>
                  </div>

                  <Link
                    to={packageContactPaths[packageId]}
                    className="pricing-package-action focus-ring"
                    data-featured={isStarter}
                    onClick={() => trackPricingCta(`pricing_${packageId}_get_started`)}
                  >
                    Discuss {pkg.title}
                    <ArrowRight aria-hidden="true" />
                  </Link>

                  <p className="pricing-package-inheritance">{packageInheritanceLabel[packageId]}</p>
                  <ul className="pricing-package-highlights">
                    {PRICING_PACKAGE_CUE_INDEXES[packageId].map((featureIndex) => {
                      const feature = pkg.includes[featureIndex];
                      return (
                        <li key={feature.title}>
                          <Check aria-hidden="true" />
                          <span>
                            {feature.title}
                            {packageId === "growth" && featureIndex === 0 && (
                              <small>{feature.description}</small>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="pricing-package-disclaimer reveal-item">
            All prices are starting points. The written proposal confirms final scope, deliverables, responsibilities, exclusions and price.
          </p>

          <div className="pricing-comparison-disclosure reveal-item">
            <div id="pricing-package-comparison" className="pricing-comparison-panel">
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
              <h3 id="custom-scope-title">{customPackage.title} · {customPackage.price}</h3>
              <p>{customPackage.description}</p>
            </div>
            <Link
              to="/contact"
              className="pricing-secondary-action focus-ring"
              onClick={() => trackPricingCta("pricing_custom_scope_request")}
            >
              Request a custom scope
            </Link>
          </aside>
        </div>
      </section>

      <section id="addons" className="pricing-decision-section section-light pricing-addons-section section-reveal">
        <div className="pricing-container">
          <DecisionHeading
            number="02"
            eyebrow="Add-ons"
            title="Add only what the project needs."
            description="Optional work is priced clearly and agreed before it is added to the written scope."
          />
          <div className="pricing-addon-list" role="list">
            {addOnItems.map((item) => (
              <div key={item.title} className="pricing-addon-row reveal-item" role="listitem">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hosting-support" className="pricing-decision-section pricing-hosting-section section-reveal">
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
                  <h3>{hostingPlan.price}</h3>
                  <p>{hostingPlan.billing}</p>
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

      <section id="payment-timeline" className="pricing-decision-section section-lagoon pricing-payment-section section-reveal">
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
                Package prices are starting points. The written proposal confirms final scope, deliverables, timing and price.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section id="faq-consultation" className="pricing-decision-section pricing-faq-section section-reveal">
        <div className="pricing-container">
          <DecisionHeading
            number="05"
            eyebrow="FAQ and consultation"
            title="Common questions and what happens next."
            description="Review the common questions or share your business, goals, preferred timeline and approximate budget."
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
                {siteConfig.primaryCtaLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../components/Section";
import Seo from "../components/Seo";
import {
  addOnItems,
  customPackage,
  faqs,
  foundationPackage,
  growthPackage,
  hostingPlan,
  projectSteps,
  services,
  servicesPricingIntro,
  siteConfig,
  starterPackage,
  stabilisationPlan,
} from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link, useLocation } from "react-router-dom";
import MenuVertical from "../components/ui/menu-vertical";

const pricingSectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "packages", label: "Packages" },
  { id: "hosting", label: "Hosting" },
  { id: "addons", label: "Add-ons" },
  { id: "stabilisation", label: "Stabilise" },
  { id: "visibility", label: "Visibility" },
] as const;

const pricingVerticalTabs = [
  { id: "overview", label: "Overview" },
  { id: "packages", label: "Packages" },
  { id: "hosting", label: "Hosting" },
  { id: "addons", label: "Optional Add-ons" },
] as const;

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const compactDesktopSection = "md:!pt-14 md:!pb-16";
  const [activeServiceTab, setActiveServiceTab] = useState<
    "overview" | "packages" | "hosting" | "addons"
  >("overview");
  const [pricingViewMode, setPricingViewMode] = useState<"all" | "tab">("all");
  const [passedSectionIds, setPassedSectionIds] = useState<string[]>([]);
  const [isRailOpen, setIsRailOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({
    foundation: false,
    starter: false,
    growth: false,
  });

  const normalizeFeature = (value: string) => value.trim().toLowerCase();
  const foundationFeatureSet = new Set(foundationPackage.includes.map(normalizeFeature));
  const starterFeatureSet = new Set(starterPackage.includes.map(normalizeFeature));

  const starterUniqueIncludes = starterPackage.includes.filter(
    (item) => !foundationFeatureSet.has(normalizeFeature(item))
  );

  const growthUniqueIncludes = growthPackage.includes.filter(
    (item) => !starterFeatureSet.has(normalizeFeature(item))
  );

  const scrollToSectionTop = (sectionId: "overview" | "packages" | "hosting" | "addons") => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        const header = document.querySelector<HTMLElement>("[data-site-header]");
        const offset = (header?.getBoundingClientRect().height ?? 88) + 14;
        const top = window.scrollY + target.getBoundingClientRect().top - offset;
        window.scrollTo({ top, left: 0, behavior: "smooth" });
      }, 70);
    });
  };

  const jumpToSection = (sectionId: "overview" | "packages" | "hosting" | "addons") => {
    setPricingViewMode("tab");
    setActiveServiceTab(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    scrollToSectionTop(sectionId);
  };

  const showSelectedOrAll = (tabId: "overview" | "packages" | "hosting" | "addons") =>
    pricingViewMode === "all" || activeServiceTab === tabId;

  useEffect(() => {
    const syncPassedSections = () => {
      const threshold = window.innerHeight * 0.42;
      const nextPassed = pricingSectionLinks
        .filter((section) => {
          const node = document.getElementById(section.id);
          return node ? node.getBoundingClientRect().top <= threshold : false;
        })
        .map((section) => section.id);

      setPassedSectionIds((current) =>
        current.join("|") === nextPassed.join("|") ? current : nextPassed
      );
    };

    syncPassedSections();
    window.addEventListener("scroll", syncPassedSections, { passive: true });
    window.addEventListener("resize", syncPassedSections);

    return () => {
      window.removeEventListener("scroll", syncPassedSections);
      window.removeEventListener("resize", syncPassedSections);
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "overview" || hash === "packages" || hash === "hosting" || hash === "addons") {
      setActiveServiceTab(hash);
      setPricingViewMode("tab");
      scrollToSectionTop(hash);
      return;
    }
    setPricingViewMode("all");
  }, [location.hash]);

  const packageOffers = [foundationPackage, starterPackage, growthPackage]
    .map((pkg) => {
      const priceValue = pkg.price.replace(/[^\d]/g, "");
      if (!priceValue) return null;
      return {
        "@type": "Offer",
        name: pkg.title,
        priceCurrency: "SCR",
        price: priceValue,
        url: new URL("/services-pricing", siteConfig.url).toString(),
      };
    })
    .filter(Boolean) as Array<{
    "@type": "Offer";
    name: string;
    priceCurrency: string;
    price: string;
    url: string;
  }>;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website design and development",
    description: servicesPricingIntro.summary,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
    },
    areaServed: siteConfig.location,
    offers: packageOffers,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <h1 className="sr-only">Website Design Services and Packages</h1>
      <Seo
        title="Website Packages & Pricing Seychelles | Horizon Digital"
        description="Explore Horizon Digital website packages for Seychelles businesses. Clear pricing, professional design, and structured website projects optimized for Google Core Web Vitals."
        path="/services-pricing"
        keywords="website packages Seychelles, web design pricing Seychelles, website services Seychelles"
        structuredData={[serviceSchema, faqSchema]}
      />
      {passedSectionIds.length > 0 && (
        <div className="fixed left-0 top-[64%] z-40 -translate-y-1/2 md:hidden">
          <button
            type="button"
            onClick={() => setIsRailOpen((prev) => !prev)}
            aria-label={isRailOpen ? "Close section jump rail" : "Open section jump rail"}
            className="jump-rail-toggle focus-ring h-12 w-[18px] rounded-r-full border border-l-0 border-accent/40 bg-bg-elev/95 text-base leading-none text-accent shadow-[0_8px_24px_rgba(2,8,12,0.32)]"
          >
            {isRailOpen ? "‹" : "›"}
          </button>

          {isRailOpen && (
            <nav aria-label="Pricing section quick nav" className="ml-2 mt-2">
              <ul className="jump-rail-panel flex max-h-[64svh] flex-col gap-2 overflow-y-auto rounded-2xl border border-border bg-bg-elev/92 px-2 py-2 shadow-[0_8px_30px_rgba(2,8,12,0.35)] backdrop-blur">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      setIsRailOpen(false);
                    }}
                    className="jump-rail-top focus-ring rounded-full border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-text-muted"
                  >
                    Top
                  </button>
                </li>
                {pricingSectionLinks
                  .filter((section) => passedSectionIds.includes(section.id))
                  .map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setIsRailOpen(false);
                        }}
                        className="jump-rail-item focus-ring rounded-full border border-accent/35 bg-accent-soft px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-accent"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      <div className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="pointer-events-auto">
          <MenuVertical
            menuItems={pricingVerticalTabs.map((section) => ({ id: section.id, label: section.label }))}
            activeId={pricingViewMode === "tab" ? activeServiceTab : undefined}
            onSelect={(id) => jumpToSection(id as "overview" | "packages" | "hosting" | "addons")}
          />
        </div>
      </div>

      <Section
        id="overview"
        className={`${compactDesktopSection} ${showSelectedOrAll("overview") ? "lg:!block" : "lg:!hidden"}`}
        eyebrow="Services & Pricing"
        title="Website Design Services and Packages"
        description="Website design services built to help businesses communicate clearly online and convert interest into enquiries." 
      >
        <div id="panel-overview" role="tabpanel" aria-hidden={!showSelectedOrAll("overview")} className="bg-bg-panel/20 p-8 rounded-2xl border border-border">
          <p className="text-sm md:text-base text-text-muted max-w-4xl text-center mx-auto">{servicesPricingIntro.summary}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 5).map((service) => (
              <div key={service.title} className="p-6 rounded-2xl border border-border bg-[#eef4fb] dark:bg-[#0f1b2d] hover:border-accent/30 transition-colors">
                <h3 className="text-base font-semibold text-accent-2">{service.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="How it works"
        title="Website project timeline"
        description="Most projects follow a structured sequence from planning to launch."
        className={`${compactDesktopSection} ${showSelectedOrAll("overview") ? "lg:!block" : "lg:!hidden"}`}
      >
        <div className="relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-16 md:my-10 md:py-20 bg-gradient-to-r from-bg-panel/10 via-accent/5 to-bg-panel/10 border-y border-border">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-5">
          {projectSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 42 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.42, delay: index * 0.06, ease: "easeOut" }}
              className="min-w-0"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-accent/70 bg-accent/10 inline-block px-3 py-1 rounded-full border border-accent/20">Step {index + 1}</p>
              <h3 className="mt-4 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </Section>

      <Section
        id="packages"
        className={`${compactDesktopSection} ${showSelectedOrAll("packages") ? "lg:!block" : "lg:!hidden"}`}
        eyebrow="Packages"
        title="Website packages"
        description="Foundation, Starter, and Growth with clear scope and starting prices."
      >
        <div id="panel-packages" role="tabpanel" aria-hidden={!showSelectedOrAll("packages")}>
        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 pt-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="flex h-full flex-col rounded-3xl border border-border/40 bg-[#f2f8ff] dark:bg-[#152238] p-8 hover:border-accent/30 transition-all"
          >
            <h3 className="text-lg font-semibold text-accent-2">{foundationPackage.title}</h3>
            <p className="mt-4 text-3xl font-semibold text-accent">{foundationPackage.price}</p>
            <div className="mt-4 text-sm text-text-muted md:min-h-[140px]">
              <p>{foundationPackage.description}</p>
              <p className="mt-3 font-medium text-text">Includes core build essentials.</p>
            </div>
            
            <button
              type="button"
              onClick={() =>
                setMobileOpen((prev) => ({ ...prev, foundation: !prev.foundation }))
              }
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted md:hidden"
            >
              <span>View included items</span>
              <span aria-hidden="true" className="text-accent">
                {mobileOpen.foundation ? "-" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity,margin] duration-300 md:mt-6 md:block md:opacity-100 ${
                mobileOpen.foundation ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`.trim()}
            >
              <div className="space-y-3 overflow-hidden text-sm text-text-muted md:overflow-visible">
                <ul className="space-y-3 mb-8 text-text">
                  {foundationPackage.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-accent mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Not included</p>
                <ul className="mt-4 space-y-2 text-sm text-text">
                  {foundationPackage.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-border shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 md:hidden">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
                  <ul className="mt-4 space-y-2 text-sm text-text-muted">
                    {foundationPackage.paymentTerms.map((term) => (
                      <li key={term}>{term}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-center">
                    <Link to="/contact?budget=9500-15000" className="w-full">
                      <button className="w-full py-3 rounded-full border border-border hover:bg-text/5 font-semibold text-sm transition-colors text-text">
                        Discuss project
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto hidden pt-10 md:block">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {foundationPackage.paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact?budget=9500-15000">
                   <button className="w-full py-3 rounded-full border border-border hover:bg-text/5 font-semibold text-sm transition-colors text-text">
                      Discuss project
                   </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Starter (Featured) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="flex h-full flex-col rounded-3xl border border-accent/40 bg-[#eef4fb] dark:bg-[#0f1b2d] p-8 shadow-[0_0_40px_rgba(70,198,232,0.1)] relative overflow-hidden pricing-card-featured-shine"
          >
              <div className="absolute top-0 right-0 py-1 px-4 text-xs font-semibold bg-accent text-bg rounded-bl-xl tracking-wider uppercase">Most Popular</div>
              <h3 className="text-lg font-semibold text-accent-2">{starterPackage.title}</h3>
              <p className="mt-4 text-3xl font-semibold text-accent">{starterPackage.price}</p>
               <div className="mt-4 text-sm text-text-muted md:min-h-[140px]">
                 <p>{starterPackage.description}</p>
                 <p className="mt-3 font-medium text-text">Includes core build essentials.</p>
               </div>
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => ({ ...prev, starter: !prev.starter }))}
                className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-accent/20 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted md:hidden"
              >
                <span>View included items</span>
                <span aria-hidden="true" className="text-accent">
                  {mobileOpen.starter ? "-" : "+"}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 md:mt-6 md:block md:opacity-100 ${
                  mobileOpen.starter ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                }`.trim()}
              >
                <div className="space-y-3 overflow-hidden text-sm text-text-muted md:overflow-visible">
                  <p className="text-sm font-semibold text-accent-2 mb-4">Includes everything in Foundation, plus:</p>
                  <ul className="space-y-3 text-text">
                    {starterUniqueIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-accent mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 md:hidden">
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
                    <ul className="mt-4 space-y-2 text-sm text-text-muted">
                      {starterPackage.paymentTerms.map((term) => (
                        <li key={term}>{term}</li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link to="/contact?budget=15000-30000" className="w-full">
                        <ShimmerButton
                          shimmerColor="#0b1212"
                          shimmerDuration="4.2s"
                          background="#46c6e8"
                          className="w-full px-5 py-3 text-sm font-semibold tracking-wide text-black"
                        >
                          Discuss your project
                        </ShimmerButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto hidden pt-10 md:block">
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
                <ul className="mt-4 space-y-2 text-sm text-text-muted">
                  {starterPackage.paymentTerms.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/contact?budget=15000-30000">
                    <ShimmerButton
                      shimmerColor="#0b1212"
                      shimmerDuration="4.2s"
                      background="#46c6e8"
                      className="w-full px-5 py-3 text-sm font-semibold tracking-wide text-black"
                    >
                      Discuss project
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="flex h-full flex-col rounded-3xl border border-border/40 bg-[#f2f8ff] dark:bg-[#152238] p-8 hover:border-accent/30 transition-all"
          >
            <h3 className="text-lg font-semibold text-accent-2">{growthPackage.title}</h3>
            <p className="mt-4 text-3xl font-semibold text-accent">{growthPackage.price}</p>
            <div className="mt-4 text-sm text-text-muted md:min-h-[140px]">
              <p>{growthPackage.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => ({ ...prev, growth: !prev.growth }))}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted md:hidden"
            >
              <span>View included items</span>
              <span aria-hidden="true" className="text-accent">
                {mobileOpen.growth ? "-" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity,margin] duration-300 md:mt-6 md:block md:opacity-100 ${
                mobileOpen.growth ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`.trim()}
            >
              <div className="space-y-3 overflow-hidden text-sm text-text-muted md:overflow-visible">
                <p className="text-sm font-semibold text-text mb-4">Includes everything in Starter, plus:</p>
                <ul className="space-y-3 text-text">
                  {growthUniqueIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-accent mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 md:hidden">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
                  <ul className="mt-4 space-y-2 text-sm text-text-muted">
                    {growthPackage.paymentTerms.map((term) => (
                      <li key={term}>{term}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link to="/contact?budget=30000%2B">
                      <button className="w-full py-3 rounded-full border border-border hover:bg-text/5 font-semibold text-sm transition-colors text-text">
                        Discuss project
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto hidden pt-10 md:block">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {growthPackage.paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact?budget=30000%2B">
                  <button className="w-full py-3 rounded-full border border-border hover:bg-text/5 font-semibold text-sm transition-colors text-text">
                     Discuss project
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto p-10 rounded-3xl bg-bg-panel/30 border border-border backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[50px] z-0 pointer-events-none"/>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-text">{customPackage.title}</h3>
            <p className="mt-4 text-sm text-text-muted">{customPackage.description}</p>
            <p className="mt-3 text-sm text-text-muted">
              For larger businesses or advanced functionality. May include 15+ pages.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/contact">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#46c6e8"
                  className="px-6 py-3 text-sm font-semibold tracking-wide text-black mx-auto"
                >
                  Request a custom scope
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </Section>

      <Section
        id="hosting"
        className={`${compactDesktopSection} ${showSelectedOrAll("hosting") ? "lg:!block" : "lg:!hidden"}`}
        eyebrow="Managed hosting"
        title={hostingPlan.title}
        description="One clear plan to keep your website secure and running smoothly."
      >
        <div id="panel-hosting" role="tabpanel" aria-hidden={!showSelectedOrAll("hosting")}>
        <div className="mb-8 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">What hosting means</p>
          <div className="mt-4 space-y-4">
            {hostingPlan.details.map((detail) => (
              <p key={detail} className="text-sm text-text-muted max-w-3xl">
                {detail}
              </p>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-3xl border border-accent/20 bg-gradient-to-r from-bg via-accent/5 to-bg overflow-hidden shadow-lg shadow-accent/5">
            <div className="grid items-center gap-6 p-8 sm:p-12 md:grid-cols-2 md:gap-10">
              <div className="flex flex-col items-center pb-10 text-center md:pb-0 md:px-10 md:border-r md:border-border">
                <p className="mb-5 inline-flex items-center rounded-full border border-accent/45 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Annual plan
                </p>
                <h3 className="text-3xl font-semibold text-text">Hosting Plan</h3>
                <p className="mt-3 text-base text-text-muted">For Business Websites of any size</p>
                <p className="mb-4 mt-8 flex w-full justify-center items-end gap-2 text-5xl font-bold tabular-nums text-accent md:text-6xl">
                  <span className="text-2xl pb-1">SCR</span>
                  <span className="inline-block leading-none">2,500</span>
                </p>
                <p className="min-h-[1.25rem] text-sm text-text-muted">{hostingPlan.billing}</p>
                <div className="mt-10 flex justify-center">
                  <Link to="/contact">
                    <ShimmerButton
                      shimmerColor="#0b1212"
                      shimmerDuration="4.2s"
                      background="#46c6e8"
                      className="px-8 py-3.5 text-sm font-semibold text-black"
                    >
                      Get started
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
              <div className="md:px-10">
                <ul className="space-y-4 text-base text-text-muted">
                  {hostingPlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 text-accent">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-text-muted/60">{hostingPlan.note}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Section>

      <Section
        id="addons"
        className={`${compactDesktopSection} ${showSelectedOrAll("addons") ? "lg:!block" : "lg:!hidden"}`}
        eyebrow="Add-ons"
        title="Optional add-ons"
        description="All add-ons are clearly scoped before work begins, if not included in selected tier."
      >
        <div id="panel-addons" role="tabpanel" aria-hidden={!showSelectedOrAll("addons")}>
        <div className="relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16 bg-bg-panel/20 border-y border-border/40">
          <div className="mx-auto grid w-full max-w-7xl gap-x-10 gap-y-8 px-5 sm:px-8 md:grid-cols-3">
          {addOnItems.map((item) => (
            <div key={item.title} className="bg-[#eef4fb] dark:bg-[#0f1b2d] border border-border/40 p-6 rounded-2xl hover:border-accent/40 transition-colors">
              <h3 className="text-base font-semibold text-text">{item.title}</h3>
              <p className="mt-3 inline-block px-3 py-1 rounded border border-accent/20 bg-accent/5 text-sm font-medium text-accent">{item.price}</p>
            </div>
          ))}
          </div>
        </div>
        </div>
      </Section>

      <Section
        id="stabilisation"
        eyebrow="Stabilisation"
        title={stabilisationPlan.title}
        description="Included with every website build."
        className={`${compactDesktopSection} ${showSelectedOrAll("overview") ? "lg:!block" : "lg:!hidden"}`}
      >
        <div className="p-8 md:p-12 rounded-3xl border border-border bg-[#f2f8ff] dark:bg-[#152238] mt-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="bg-bg-panel/30 p-8 rounded-2xl border border-border">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent inline-block"/> Covers</p>
              <ul className="space-y-4 text-sm text-text-muted">
                {stabilisationPlan.covers.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-[1px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg-panel/30 p-8 rounded-2xl border border-border opacity-80">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-text-muted mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-border inline-block"/> Does not cover</p>
              <ul className="space-y-4 text-sm text-text-muted">
                {stabilisationPlan.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-border mt-[1px]">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="visibility"
        eyebrow="Performance & Visibility"
        title="Built to look good and be found"
        description="We focus on speed, clarity, and practical search setup so people can discover your business online."
        className={`${compactDesktopSection} ${showSelectedOrAll("overview") ? "lg:!block" : "lg:!hidden"}`}
      >
        <div className="mt-8 p-10 md:p-14 rounded-3xl bg-gradient-to-br from-bg-panel/40 to-transparent border border-border text-center">
          <p className="max-w-4xl mx-auto text-base md:text-lg leading-relaxed text-text-muted">
            A beautiful website should also be easy to find. We set up each site with clean semantic page structure, clear heading hierarchies, search-friendly page content, optimized Core Web Vitals, and technical signals that help Google seamlessly understand what your business offers. In simple terms, your website is built to perform brilliantly in lighthouse metrics, load instantly on mobile devices, and appear in front of the right local customers when they search.
          </p>
          <p className="mt-8 text-lg font-medium text-accent max-w-2xl mx-auto border-t border-accent/20 pt-8">
            Start a project that feels truly yours and is radically easier for customers to discover.
          </p>
        </div>
      </Section>

      <Section
        id="pricing-faq"
        eyebrow="Frequently Asked Questions"
        title="Common questions before starting"
        description="Straight answers on timeline, redesigns, hosting, and project scope."
        className={`${compactDesktopSection} ${showSelectedOrAll("overview") ? "lg:!block" : "lg:!hidden"}`}
      >
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {faqs.slice(0, 4).map((faq) => (
            <div key={faq.question} className="p-8 rounded-2xl bg-bg-panel/10 border border-border hover:bg-bg-panel/20 transition-colors">
              <h3 className="text-lg font-semibold text-text mb-4">{faq.question}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-bg-elev border-t border-border mt-16 text-center">
        <div className="mx-auto w-full max-w-4xl px-8 py-28 md:py-32">
           <p className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-6">Next step</p>
           <h2 className="text-3xl font-semibold text-text md:text-5xl tracking-tight mb-12">
              Ready to start? Let's define your scope.
           </h2>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#46c6e8"
              className="px-8 py-4 text-sm font-semibold tracking-widest text-black shadow-lg shadow-accent/20 inline-block"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
  servicesPricingIntro,
  siteConfig,
  starterPackage,
  stabilisationPlan,
} from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link, useLocation } from "react-router-dom";
import MenuVertical from "../components/ui/menu-vertical";
import { trackEvent } from "../lib/analytics";
import { ContainerScroll, CardSticky } from "../components/ui/cards-stack";

const pricingSectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "packages", label: "Packages" },
  { id: "hosting", label: "Hosting" },
  { id: "addons", label: "Add-ons" },
  { id: "stabilisation", label: "After launch" },
  { id: "visibility", label: "Visibility" },
  { id: "pricing-faq", label: "FAQ" },
] as const;

const pricingVerticalTabs = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "packages", label: "Packages" },
  { id: "hosting", label: "Hosting" },
  { id: "addons", label: "Add-ons" },
  { id: "stabilisation", label: "After launch" },
  { id: "visibility", label: "Visibility" },
  { id: "pricing-faq", label: "FAQ" },
] as const;

function FeatureAccordion({
  features,
}: {
  features: { title: string; description: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-4 mb-8 flex-grow">
      {features.map((item, i) => (
        <div
          key={i}
          className="border-b border-white/[0.03] pb-3 last:border-0 last:pb-0"
        >
          <button
            onClick={() => toggle(i)}
            type="button"
            className="flex w-full items-start justify-between text-left gap-3 group focus:outline-none"
          >
            <div className="flex items-start gap-3 flex-1">
              <span className="text-deep-teal mt-[2px] shrink-0 text-sm font-bold">
                ✓
              </span>
              <span className="text-sm font-medium text-text group-hover:text-white transition-colors">
                {item.title}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-300 mt-[2px] ${openIndex === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pl-[26px] pr-4 pt-2 text-[#9A9A9A] text-[13px] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const compactDesktopSection = "md:!pt-14 md:!pb-16";
  const [activeServiceTab, setActiveServiceTab] = useState<
    | "overview"
    | "process"
    | "packages"
    | "hosting"
    | "addons"
    | "stabilisation"
    | "visibility"
    | "pricing-faq"
  >("overview");
  const [passedSectionIds, setPassedSectionIds] = useState<string[]>([]);
  const [isRailOpen, setIsRailOpen] = useState(false);

  const scrollToSectionTop = (
    sectionId:
      | "overview"
      | "process"
      | "packages"
      | "hosting"
      | "addons"
      | "stabilisation"
      | "visibility"
      | "pricing-faq",
  ) => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        const header =
          document.querySelector<HTMLElement>("[data-site-header]");
        const offset = (header?.getBoundingClientRect().height ?? 88) + 14;
        const top =
          window.scrollY + target.getBoundingClientRect().top - offset;
        window.scrollTo({ top, left: 0, behavior: "smooth" });
      }, 70);
    });
  };

  const jumpToSection = (
    sectionId:
      | "overview"
      | "process"
      | "packages"
      | "hosting"
      | "addons"
      | "stabilisation"
      | "visibility"
      | "pricing-faq",
  ) => {
    setActiveServiceTab(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    scrollToSectionTop(sectionId);
  };

  useEffect(() => {
    const syncPassedSections = () => {
      window.requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.42;
        const nextPassed = pricingSectionLinks
          .filter((section) => {
            const node = document.getElementById(section.id);
            return node ? node.getBoundingClientRect().top <= threshold : false;
          })
          .map((section) => section.id);

        setPassedSectionIds((current) =>
          current.join("|") === nextPassed.join("|") ? current : nextPassed,
        );

        if (nextPassed.length > 0) {
          const lastPassed = nextPassed[nextPassed.length - 1] as any;
          setActiveServiceTab((prev) =>
            prev === lastPassed ? prev : lastPassed,
          );
        }
      });
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
    const validTabs = [
      "overview",
      "process",
      "packages",
      "hosting",
      "addons",
      "stabilisation",
      "visibility",
      "pricing-faq",
    ];
    if (validTabs.includes(hash)) {
      setActiveServiceTab(hash as any);
      scrollToSectionTop(hash as any);
      return;
    }
  }, [location.hash]);

  const packageOffers = [
    foundationPackage,
    starterPackage,
    growthPackage,
    customPackage,
  ]
    .map((pkg) => {
      const priceValue = pkg.price.replace(/[^\d]/g, "");
      if (!priceValue) return null;
      return {
        "@type": "Offer",
        name: pkg.title,
        priceCurrency: "SCR",
        price: priceValue,
        url: new URL("/pricing", siteConfig.url).toString(),
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
    serviceType: "Website design and development",
    name: "Custom Website Packages",
    description: servicesPricingIntro.summary,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      image: new URL("/logo.png", siteConfig.url).toString(),
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
        itemOffered: {
          "@type": "Service",
          name: offer.name,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: offer.price,
          priceCurrency: "SCR",
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
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <h1 className="sr-only">Custom Website Design Services and Packages</h1>
      <Seo
        title="Custom Website Packages & Pricing in Seychelles | Horizon Digital"
        description="Clear website packages for Seychelles businesses — Foundation, Starter, and Growth. Honest SCR pricing, custom design, and everything your business needs to get found online."
        path="/pricing"
        keywords="custom website packages Seychelles, custom web design pricing Seychelles, bespoke website development Seychelles, tailored web solutions Seychelles"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services & Pricing", path: "/pricing" },
        ]}
        structuredData={[serviceSchema, faqSchema]}
      />
      {passedSectionIds.length > 0 && (
        <div className="fixed left-0 top-[64%] z-40 -translate-y-1/2 lg:hidden">
          <button
            type="button"
            onClick={() => setIsRailOpen((prev) => !prev)}
            aria-label={
              isRailOpen ? "Close section jump rail" : "Open section jump rail"
            }
            aria-expanded={isRailOpen}
            className="jump-rail-toggle focus-ring h-12 w-[36px] items-center justify-center flex rounded-r-full border border-l-0 border-deep-teal/40 bg-bg-elev/95 text-base leading-none text-deep-teal shadow-[0_8px_24px_rgba(2,8,12,0.32)]"
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
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          setIsRailOpen(false);
                        }}
                        className="jump-rail-item focus-ring rounded-full border border-deep-teal/35 bg-deep-teal/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-deep-teal"
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

      <div className="pointer-events-none fixed left-4 2xl:left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="pointer-events-auto">
          <MenuVertical
            menuItems={pricingVerticalTabs.map((section) => ({
              id: section.id,
              label: section.label,
            }))}
            activeId={activeServiceTab}
            onSelect={(id) => jumpToSection(id as any)}
          />
        </div>
      </div>

      {/* ═══ WHAT WE BUILD — OVERVIEW ═══ */}
      <section
        id="overview"
        className="py-16 md:py-28 lg:pt-32 border-b border-white/[0.09]"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:pl-64 2xl:pl-8">
          {/* Split header — heading left, descriptor right */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: 32, filter: "blur(12px)" }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow mb-7">
              What We Build
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-20">
              <h2 className="font-display text-[2.75rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-semibold leading-[1.03] tracking-tight text-white max-w-2xl">
                Five disciplines.
                <br />
                <span className="text-deep-teal">Every project.</span>
              </h2>
              <div className="mt-7 md:mt-0 md:text-right md:pb-2 max-w-[18rem]">
                <p className="text-[1.0625rem] md:text-lg lg:text-xl lg:leading-relaxed text-text-muted">
                  Nothing is an extra. Every engagement draws from all five —
                  it's simply how we build.
                </p>
                <p className="mt-3 text-[11px] font-black uppercase tracking-[0.25em] text-deep-teal">
                  Five disciplines · One team
                </p>
              </div>
            </div>
          </motion.div>

          {/* Editorial service rows */}
          <div className="relative">
            {[
              {
                title: "Website build",
                desc: "We plan, design, and build your site from scratch — structured around your business from day one.",
                tag: "From scratch",
              },
              {
                title: "Design refresh",
                desc: "Modernise your existing site without losing what already works — new look, same foundation.",
                tag: "Evolve",
              },
              {
                title: "SEO & Performance",
                desc: "Built-in speed and search visibility so when customers look for what you offer, you appear.",
                tag: "Get found",
              },
              {
                title: "Mobile-friendly layout",
                desc: "Designed for the phones your customers actually use — no pinching, no squinting, no frustration.",
                tag: "Every device",
              },
              {
                title: "WhatsApp & enquiry integration",
                desc: "The tools your customers already use — WhatsApp, contact forms, and booking links — built in from day one.",
                tag: "Direct contact",
              },
            ].map((item, i) => (
              <div key={item.title}>
                {/* Separator line — draws left to right on scroll */}
                <motion.div
                  className="h-px w-full origin-left"
                  style={{ backgroundColor: "rgba(255,255,255,0.13)" }}
                  initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
                  whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true, amount: 0.9 }}
                  transition={{
                    duration: 1.05,
                    delay: i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                {/* Service row */}
                <motion.div
                  className="group relative flex items-start gap-5 md:gap-0 py-10 md:py-12 cursor-default transition-all duration-500 hover:scale-[1.005]"
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, y: 24, filter: "blur(8px)" }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.07 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Hover wash — subtle gradient from left */}
                  <div className="pointer-events-none absolute inset-0 -mx-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 bg-white/[0.02] backdrop-blur-[2px]" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-deep-teal opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-6" />

                  {/* Number — visible design element */}
                  <div className="relative z-10 shrink-0 w-14 md:w-32 flex items-center">
                    <span
                      aria-hidden="true"
                      className="font-display text-[2rem] md:text-[5rem] font-black leading-none tabular-nums select-none text-deep-teal/35 group-hover:text-deep-teal transition-all duration-700"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content — stacks on mobile, row on desktop */}
                  <div className="relative z-10 flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:gap-10 lg:gap-16">
                    {/* Title */}
                    <h3 className="text-[1.25rem] sm:text-[1.375rem] md:text-[1.25rem] lg:text-[1.45rem] font-bold text-white leading-snug md:w-[240px] lg:w-[280px] md:shrink-0">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 md:mt-0 flex-1 text-base lg:text-lg lg:leading-relaxed text-text-muted group-hover:text-text/90 transition-colors duration-700 max-w-2xl">
                      {item.desc}
                    </p>

                    {/* Tag — always faintly present; glows cyan on hover */}
                    <p className="hidden lg:block shrink-0 text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-colors duration-700 text-white/20 group-hover:text-cyan/80">
                      {item.tag}
                    </p>
                  </div>

                  {/* Arrow — desktop only, slides in on hover */}
                  <div className="hidden md:flex relative z-10 shrink-0 w-8 items-center justify-end self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    <span className="text-cyan font-black">→</span>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Final separator */}
            <motion.div
              className="h-px w-full origin-left"
              style={{ backgroundColor: "rgba(255,255,255,0.13)" }}
              initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
              whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{
                duration: 1.05,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>

          {/* Footer note */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.0, delay: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-text-muted/60">
              All five included in every package — no extras, no surprises
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-deep-teal/80">
              Explore packages below ↓
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="process"
        className="py-20 px-6 xl:pl-72 2xl:pl-12 relative z-10 border-y border-white/5 bg-[#0A0A0C]"
      >
        <div className="mx-auto max-w-[92rem] min-h-svh place-content-center text-white">
          <div className="grid md:grid-cols-2 md:gap-8 xl:gap-24">
            {/* Left side text sticky wrapper */}
            <div className="h-full w-full">
              <div className="md:sticky md:top-32 w-full max-w-xl left-0 md:py-12 z-10">
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, y: 24, filter: "blur(10px)" }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
                    How we get there
                  </span>
                  <h2 className="font-display mb-8 text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight">
                    A simple path to your <br />
                    <span className="text-cyan italic">new website.</span>
                  </h2>
                  <p className="max-w-2xl text-lg sm:text-2xl leading-relaxed text-text-muted font-normal">
                    We make the process clear, simple, and stress-free—from our
                    first chat to the day your site goes live.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right side ContainerScroll area */}
            <ContainerScroll
              className="space-y-[55vh] md:space-y-[70vh] pb-[50vh] md:pb-[60vh] pt-6 md:pt-32 z-20"
              style={
                {
                  "--sticky-increment": "32px",
                  "--sticky-top": "15vh",
                } as React.CSSProperties
              }
            >
              {projectSteps.slice(0, 5).map((step, idx) => (
                <CardSticky
                  key={step.title}
                  index={idx}
                  incrementY={32}
                  style={
                    {
                      "--sticky-increment": "32px",
                      "--sticky-top": "15vh",
                    } as React.CSSProperties
                  }
                  className="group hd-card rounded-[2rem] shadow-[0_-8px_24px_rgba(0,0,0,0.35)] w-full"
                >
                  <div className="relative overflow-hidden rounded-[2rem] bg-[#111113] border border-white/10 p-8 sm:p-12 h-full w-full">
                    <div
                      className={`absolute right-0 top-0 h-40 w-40 sm:h-64 sm:w-64 rounded-bl-full ${idx % 2 === 0 ? "bg-cyan/5" : "bg-teal/5"} pointer-events-none transition-transform duration-1000 group-hover:scale-110`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 max-w-[80%]">
                          {step.title}
                        </h2>
                        <h3 className="font-display text-4xl sm:text-6xl font-black text-cyan drop-shadow-[0_2px_10px_rgba(94,209,222,0.2)]">
                          {String(idx + 1).padStart(2, "0")}
                        </h3>
                      </div>

                      <p className="text-base sm:text-xl text-text-muted font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardSticky>
              ))}
            </ContainerScroll>
          </div>
        </div>
      </section>

      <Section
        id="packages"
        className={compactDesktopSection}
        containerClassName="max-w-7xl xl:pl-64 2xl:pl-8"
        eyebrow="Find your fit"
        title="Pick the package that's right for right now"
        description="Foundation, Starter, and Growth — each one built around a different stage of business."
      >
        <div id="panel-packages" className="max-w-[88rem] mx-auto">
          <div className="grid items-stretch gap-6 xl:gap-8 md:grid-cols-2 lg:grid-cols-3 pt-0 pb-8">
            {/* Foundation */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: 20, filter: "blur(10px)" }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0, margin: "0px 0px 100px 0px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-full flex-col rounded-3xl bg-[#111113] shadow-[0_4px_20px_rgba(0,0,0,0.45)] p-8 hover:shadow-[0_12px_48px_rgba(0,0,0,0.65),0_0_0_1px_rgba(94,209,222,0.07)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white">
                {foundationPackage.title}
              </h3>
              <p className="mt-3 text-xl font-extrabold text-cyan whitespace-nowrap">
                {foundationPackage.price}
              </p>
              <div className="mt-4 text-sm text-text-muted mb-8">
                <p>
                  Everything you need to{" "}
                  <span className="text-cyan font-semibold">
                    be seen online
                  </span>{" "}
                  — no technical hurdles or hidden extras.
                </p>
              </div>

              <FeatureAccordion features={foundationPackage.includes} />

              <div className="mt-auto pt-6">
                <Link
                  to="/contact?budget=7500-12500"
                  className="w-full"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "pricing_foundation_get_started",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <button className="w-full py-3 rounded-full border border-cyan/40 hover:bg-text/5 font-semibold text-sm transition-colors text-text">
                    Get Started →
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Starter (Featured) */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: 20, filter: "blur(10px)" }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0, margin: "0px 0px 100px 0px" }}
              transition={{
                duration: 0.8,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-full flex-col rounded-3xl bg-[#131315] featured-pkg-pulse p-8 relative overflow-hidden pricing-card-featured-shine xl:-translate-y-4 z-20"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deep-teal px-6 py-[6px] rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap ">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white">
                {starterPackage.title}
              </h3>
              <p className="mt-3 text-xl font-extrabold text-cyan whitespace-nowrap">
                {starterPackage.price}
              </p>
              <div className="mt-4 text-sm text-text-muted mb-8">
                <p>
                  The{" "}
                  <span className="text-cyan font-semibold">
                    complete setup
                  </span>{" "}
                  for growing businesses that need to compete and win online.
                </p>
              </div>

              <FeatureAccordion features={starterPackage.includes} />

              <div className="mt-auto pt-6">
                <Link
                  to="/contact?budget=12500-25000"
                  className="w-full"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "pricing_starter_get_started",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <button
                    className="w-full px-8 py-4 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center flex items-center justify-center cta-gradient-anim"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))",
                      backgroundSize: "300% 100%",
                    }}
                  >
                    Get Started →
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Growth */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: 20, filter: "blur(10px)" }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0, margin: "0px 0px 100px 0px" }}
              transition={{
                duration: 0.8,
                delay: 0.34,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-full flex-col rounded-3xl bg-[#111113] shadow-[0_4px_16px_rgba(0,0,0,0.3)] p-8 hover:shadow-[0_10px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(94,209,222,0.05)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white">
                {growthPackage.title}
              </h3>
              <p className="mt-3 text-xl font-extrabold text-cyan whitespace-nowrap">
                {growthPackage.price}
              </p>
              <div className="mt-4 text-sm text-text-muted mb-8">
                <p>
                  For established businesses ready for{" "}
                  <span className="text-cyan font-semibold">
                    aggressive growth
                  </span>{" "}
                  and complete market visibility.
                </p>
              </div>

              <FeatureAccordion features={growthPackage.includes} />

              <div className="mt-auto pt-6">
                <Link
                  to="/contact?budget=25000-plus"
                  className="w-full"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "pricing_growth_get_started",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <button className="w-full py-3 rounded-full border border-cyan/40 hover:bg-text/5 font-semibold text-sm transition-colors text-text">
                    Get Started →
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Payment terms */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-0 rounded-2xl bg-[#131315] shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden text-sm text-text-muted">
            <div className="flex items-center gap-3 px-6 py-4 flex-1">
              <span className="h-2 w-2 rounded-full bg-deep-teal/70 shrink-0" />
              <span>
                <span className="text-text font-medium">
                  Foundation &amp; Starter:
                </span>{" "}
                50% deposit to start · 50% before launch
              </span>
            </div>
            <div className="hidden sm:block h-auto w-px bg-border/60 self-stretch" />
            <div className="sm:hidden h-px w-full bg-border/60" />
            <div className="flex items-center gap-3 px-6 py-4 flex-1">
              <span className="h-2 w-2 rounded-full bg-deep-teal/70 shrink-0" />
              <span>
                <span className="text-text font-medium">Growth:</span> 40%
                deposit · 40% at design approval · 20% on launch
              </span>
            </div>
          </div>

          {/* Custom Banner */}
          <div className="mt-10 text-center max-w-2xl mx-auto p-10 rounded-3xl bg-bg-panel/30 border border-border backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[50px] z-0 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-text">
                {customPackage.title}
              </h3>
              <p className="mt-4 text-sm text-text-muted">
                {customPackage.description}
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "pricing_custom_scope_request",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <ShimmerButton
                    shimmerColor="#0A0A0C"
                    shimmerDuration="4.2s"
                    background="var(--accent)"
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
        className={compactDesktopSection}
        containerClassName="max-w-7xl xl:pl-64 2xl:pl-8"
        eyebrow="Managed hosting"
        title={hostingPlan.title}
        description={
          <>
            One clear plan to keep your website{" "}
            <span className="text-cyan font-semibold">
              secure and running smoothly
            </span>
            .
          </>
        }
      >
        <div id="panel-hosting">
          <div className="mb-8 max-w-5xl mx-auto rounded-2xl border border-border bg-bg-panel/20 p-6 md:p-8">
            <p className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
              What{" "}
              <span className="text-gradient-cyan font-bold">
                managed hosting
              </span>{" "}
              means
            </p>
            <div className="mt-4 space-y-4">
              {hostingPlan.details.map((detail) => (
                <p key={detail} className="text-sm text-text-muted max-w-3xl">
                  {detail}
                </p>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-5xl">
            <div className="rounded-3xl border border-accent/20 bg-gradient-to-r from-bg via-accent/5 to-bg overflow-hidden shadow-md shadow-accent/5">
              <div className="grid items-center gap-6 p-8 sm:p-12 md:grid-cols-2 md:gap-10">
                <div className="flex flex-col items-center pb-10 text-center md:pb-0 md:px-10 md:border-r md:border-border">
                  <p className="mb-5 inline-flex items-center rounded-full border border-deep-teal/45 bg-deep-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-deep-teal">
                    Annual plan
                  </p>
                  <h3 className="text-3xl font-semibold text-text">
                    Hosting Plan
                  </h3>
                  <p className="mt-3 text-base text-text-muted">
                    For Business Websites of any size
                  </p>
                  <p className="mb-4 mt-8 flex w-full justify-center items-end gap-2 text-5xl font-extrabold tabular-nums md:text-6xl">
                    <span className="text-2xl pb-1 text-deep-teal">SCR</span>
                    <span className="text-gradient-cyan">2,500</span>
                  </p>
                  <p className="min-h-[1.25rem] text-sm text-text-muted">
                    {hostingPlan.billing}
                  </p>
                  <div className="mt-10 flex justify-center">
                    <Link
                      to="/contact"
                      onClick={() =>
                        trackEvent("cta_click", {
                          cta_name: "pricing_hosting_get_started",
                          page_path: window.location.pathname,
                        })
                      }
                    >
                      <ShimmerButton
                        shimmerColor="#0A0A0C"
                        shimmerDuration="4.2s"
                        background="var(--accent)"
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
                        <span className="mt-0.5 text-deep-teal">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-sm text-text-dim">
                    {hostingPlan.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="addons"
        className={compactDesktopSection}
        containerClassName="max-w-7xl xl:pl-64 2xl:pl-8"
        eyebrow="Add-ons"
        title="Optional add-ons"
        description="Every add-on is quoted and agreed before any work begins. No surprises."
      >
        <div id="panel-addons">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16 bg-bg-panel/20 border-y border-border/40">
            <div className="mx-auto grid w-full max-w-7xl gap-x-10 gap-y-8 px-5 sm:px-8 md:grid-cols-3">
              {addOnItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#131315] shadow-[0_4px_16px_rgba(0,0,0,0.4)] p-6 rounded-2xl hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(94,209,222,0.06)] transition-all duration-300"
                >
                  <h3 className="text-base font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-3 inline-block px-3 py-1 rounded border border-deep-teal/20 bg-deep-teal/5 text-sm font-bold text-gradient-cyan">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="stabilisation"
        eyebrow="After launch"
        title={stabilisationPlan.title}
        description={
          <>
            Every website we build includes at least{" "}
            <span className="text-cyan font-semibold">
              30 days of hands-on support
            </span>{" "}
            after going live — at no extra cost.
          </>
        }
        className={compactDesktopSection}
        containerClassName="max-w-7xl xl:pl-64 2xl:pl-8"
      >
        <div className="p-8 md:p-12 rounded-3xl border border-border bg-bg-elev mt-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="bg-[#131315] shadow-[0_4px_16px_rgba(0,0,0,0.4)] p-8 rounded-2xl">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-deep-teal mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-deep-teal inline-block" />{" "}
                Covers
              </p>
              <ul className="space-y-4 text-sm text-text-muted">
                {stabilisationPlan.covers.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-deep-teal mt-[1px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg-panel/30 p-8 rounded-2xl border border-border opacity-80">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-text-muted mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-border inline-block" />{" "}
                Does not cover
              </p>
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
        className={compactDesktopSection}
        containerClassName="max-w-7xl xl:pl-64 2xl:pl-8"
      >
        <div className="mt-8 p-10 md:p-14 rounded-3xl bg-gradient-to-br from-bg-panel/40 to-transparent border border-border text-center">
          <p className="max-w-4xl mx-auto text-base md:text-lg leading-relaxed text-text-muted">
            Your website being beautiful is only half the job. The other half is
            making sure people can actually find it. We set up every site so{" "}
            <span className="text-cyan font-semibold">
              Google understands what your business does
            </span>
            , where you are, and who it should show your site to. That means
            when someone in Seychelles searches for what you offer, your site
            has a real chance of appearing — not buried on page five where
            nobody looks.
          </p>
          <Link
            to="/contact"
            className="mt-8 block text-lg font-medium text-cyan max-w-2xl mx-auto border-t border-cyan/20 pt-8 hover:text-white transition-colors"
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "pricing_visibility_ready_link",
                page_path: window.location.pathname,
              })
            }
          >
            Ready to have a website that both looks great and gets found? Let's
            build it →
          </Link>
        </div>
      </Section>

      <Section
        id="pricing-faq"
        eyebrow="QUESTIONS BEFORE YOU START"
        title="Straight answers to the things people ask us most"
        description="No jargon. No small print. Just honest answers."
        className={compactDesktopSection}
        containerClassName="max-w-7xl xl:pl-64 2xl:pl-8"
      >
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-8 rounded-2xl bg-[#131315] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.55)] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-text mb-4">
                {faq.question}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-bg-elev border-t border-border mt-16 text-center">
        <div className="mx-auto w-full max-w-4xl px-8 py-28 md:py-32">
          <p className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
            READY WHEN YOU ARE
          </p>
          <h2 className="text-3xl font-semibold text-text md:text-5xl tracking-tight mb-12">
            Not sure which package fits? We'll help you figure it out.
          </h2>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "pricing_bottom_book_consult",
                  page_path: window.location.pathname,
                })
              }
            >
              <button
                className="px-8 py-4 sm:px-12 sm:py-5 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center flex items-center justify-center w-full sm:w-auto sm:min-w-[280px] cta-gradient-anim"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))",
                  backgroundSize: "300% 100%",
                }}
              >
                Book a free consult
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

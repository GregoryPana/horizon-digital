import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
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
  trustStatement,
} from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [hostingBilling, setHostingBilling] = useState<"monthly" | "annual">("monthly");
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
      <h1 className="sr-only">Services & Pricing</h1>
      <Seo
        title="Website Design Pricing in Seychelles"
        description="Clear packages, add-ons, and hosting for Seychelles businesses."
        path="/services-pricing"
        keywords="website pricing Seychelles"
        structuredData={[serviceSchema, faqSchema]}
      />
      <Section
        eyebrow="Services & Pricing"
        title={servicesPricingIntro.title}
        description={servicesPricingIntro.subtitle}
      >
        <p className="text-sm text-text-muted">{servicesPricingIntro.summary}</p>
      </Section>

      <Section
        eyebrow="How it works"
        title="How your project works"
        description="A simple, structured process from start to launch."
      >
        <div className="section-band section-band-medium relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-16 md:my-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-5">
          {projectSteps.map((step, index) => (
            <div key={step.title} className="min-w-0">
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Packages"
        title="Choose the right package for your business"
        description="Foundation, Starter, and Growth side by side for a clear comparison."
      >
        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex h-full flex-col no-scroll-glow pricing-card pricing-card-foundation !p-5 md:!p-7">
            <h3 className="text-lg font-semibold text-accent-2">{foundationPackage.title}</h3>
            <p className="pricing-price mt-4 text-2xl font-semibold text-accent">{foundationPackage.price}</p>
            <div className="mt-3 text-sm text-text-muted md:min-h-[140px]">
              <p>{foundationPackage.description}</p>
              <p className="mt-3">Includes core build essentials.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setMobileOpen((prev) => ({ ...prev, foundation: !prev.foundation }))
              }
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted md:hidden"
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
                <ul className="space-y-3 mb-8">
                  {foundationPackage.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Not included</p>
                <ul className="mt-4 space-y-2 text-sm text-text-muted">
                  {foundationPackage.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
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
                  <div className="mt-6">
                    <Link to="/contact?budget=9500-15000">
                      <ShimmerButton
                        shimmerColor="#0b1212"
                        shimmerDuration="4.2s"
                        background="#2ca99b"
                        className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
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
                {foundationPackage.paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact?budget=9500-15000">
                  <ShimmerButton
                    shimmerColor="#0b1212"
                    shimmerDuration="4.2s"
                    background="#2ca99b"
                    className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                  >
                    Discuss your project
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </Card>

          <Card className="relative flex h-full flex-col overflow-visible pt-8 no-scroll-glow pricing-card pricing-card-featured pricing-card-featured-shine !p-5 md:!p-7">
              <h3 className="text-lg font-semibold text-accent-2">{starterPackage.title}</h3>
              <p className="pricing-price mt-4 text-2xl font-semibold text-accent">{starterPackage.price}</p>
               <div className="mt-3 text-sm text-text-muted md:min-h-[140px]">
                 <p>{starterPackage.description}</p>
                 <p className="mt-3">Includes core build essentials.</p>
               </div>
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => ({ ...prev, starter: !prev.starter }))}
                className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted md:hidden"
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
                  <p className="text-sm font-medium text-text">Includes everything in Foundation, plus:</p>
                  <ul className="space-y-3">
                    {starterUniqueIncludes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 md:hidden">
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
                    <ul className="mt-4 space-y-2 text-sm text-text-muted">
                      {starterPackage.paymentTerms.map((term) => (
                        <li key={term}>{term}</li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Link to="/contact?budget=15000-30000">
                        <ShimmerButton
                          shimmerColor="#0b1212"
                          shimmerDuration="4.2s"
                          background="#22f1d6"
                          className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
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
                      background="#22f1d6"
                      className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                    >
                      Discuss your project
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
          </Card>

          <Card className="flex h-full flex-col no-scroll-glow pricing-card pricing-card-growth !p-5 md:!p-7">
            <h3 className="text-lg font-semibold text-accent-2">{growthPackage.title}</h3>
            <p className="pricing-price mt-4 text-2xl font-semibold text-accent">{growthPackage.price}</p>
            <div className="mt-3 text-sm text-text-muted md:min-h-[140px]">
              <p>{growthPackage.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => ({ ...prev, growth: !prev.growth }))}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted md:hidden"
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
                <p className="text-sm font-medium text-text">Includes everything in Starter, plus:</p>
                <ul className="space-y-3">
                  {growthUniqueIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 md:hidden">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
                  <ul className="mt-4 space-y-2 text-sm text-text-muted">
                    {growthPackage.paymentTerms.map((term) => (
                      <li key={term}>{term}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link to="/contact?budget=30000%2B">
                      <ShimmerButton
                        shimmerColor="#0b1212"
                        shimmerDuration="4.2s"
                        background="#2ca99b"
                        className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
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
                {growthPackage.paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact?budget=30000%2B">
                  <ShimmerButton
                    shimmerColor="#0b1212"
                    shimmerDuration="4.2s"
                    background="#2ca99b"
                    className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                  >
                    Discuss your project
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-10 horizon-line" />
        <Card className="relative mt-10 flex h-full flex-col no-scroll-glow pricing-card pricing-card-featured-shine pricing-card-featured-shine-muted">
          <h3 className="text-lg font-semibold text-accent-2">{customPackage.title}</h3>
          <p className="mt-4 text-2xl font-semibold text-accent">Let's chat</p>
          <p className="mt-4 text-sm text-text-muted">{customPackage.description}</p>
          <p className="mt-3 text-sm text-text-muted">
            For larger businesses or advanced functionality. May include 15+ pages.
          </p>
          <p className="mt-4 text-sm text-text-muted">
            Advanced builds are scoped per project. We will clarify your requirements, then
            provide a clear proposal and timeline.
          </p>
          <div className="mt-8">
            <Link to="/contact">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#22f1d6"
                className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
              >
                Request a custom scope
              </ShimmerButton>
            </Link>
          </div>
        </Card>
      </Section>

      <Section
        eyebrow="Managed hosting"
        title={hostingPlan.title}
        description="One clear plan to keep your website secure and running smoothly."
      >
        <div className="mx-auto w-full max-w-5xl">
          <Card className="!rounded-2xl no-scroll-glow pricing-card">
            <div className="grid items-start gap-6 p-4 sm:p-7 md:grid-cols-2 md:gap-10 md:p-12">
              <div className="flex flex-col items-center pb-10 text-center md:pb-0 md:px-10 md:border-r md:border-[color:var(--split-line)]">
                <div className="relative mx-auto mb-6 grid w-full max-w-[17rem] grid-cols-2 rounded-full border border-border bg-bg-elev p-1">
                  <motion.span
                    aria-hidden="true"
                    animate={{ x: hostingBilling === "monthly" ? "0%" : "100%" }}
                    transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.7 }}
                    className="pointer-events-none absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full bg-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setHostingBilling("monthly")}
                    className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 sm:px-4 sm:text-xs sm:tracking-[0.16em] ${
                      hostingBilling === "monthly" ? "text-black" : "text-text-muted hover:text-text"
                    }`.trim()}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setHostingBilling("annual")}
                    className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 sm:px-4 sm:text-xs sm:tracking-[0.16em] ${
                      hostingBilling === "annual" ? "text-black" : "text-text-muted hover:text-text"
                    }`.trim()}
                  >
                    Annual
                  </button>
                </div>
                <div className="mb-2 min-h-[1.75rem]">
                  {hostingBilling === "annual" ? (
                    <motion.span
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="inline-flex items-center rounded-full border border-accent/45 bg-accent-soft px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent"
                    >
                      Save 16%
                    </motion.span>
                  ) : null}
                </div>
                <h3 className="text-3xl font-semibold text-accent-2">Hosting Plan</h3>
                <p className="mt-3 text-lg text-text-muted">For Business Websites of any size</p>
                <p className="mb-6 mt-10 flex w-full min-h-[4.1rem] items-end justify-center gap-2 text-[clamp(2.55rem,12vw,4.5rem)] font-bold tabular-nums text-accent sm:min-h-[5rem] md:min-h-[5.75rem] md:text-7xl">
                  <span className="text-[clamp(1.45rem,6.5vw,2.25rem)]">SCR</span>
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
                    className="inline-block leading-none"
                  >
                    {hostingBilling === "monthly" ? "250" : "2,500"}
                  </motion.span>
                </p>
                <p className="min-h-[1.25rem] text-sm text-text-muted">
                  {hostingBilling === "monthly" ? "Billed monthly" : "Billed annually"}
                </p>
                <div className="mt-8 flex justify-center">
                  <Link to="/contact">
                    <ShimmerButton
                      shimmerColor="#0b1212"
                      shimmerDuration="4.2s"
                      background="#22f1d6"
                      className="px-6 py-2.5 text-sm font-semibold text-black"
                    >
                      Get started
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
              <div className="md:px-10">
                <ul className="space-y-4 text-base text-text">
                  {hostingPlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 text-accent">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-text-muted">{hostingPlan.note}</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Add-ons"
        title="Optional add-ons"
        description="All add-ons are clearly scoped before work begins, if not included in selected tier."
      >
        <div className="section-band section-band-soft relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-x-10 gap-y-5 px-5 sm:px-8 md:grid-cols-2">
          {addOnItems.map((item) => (
            <div key={item.title}>
              <h3 className="text-base font-semibold text-accent-2">{item.title}</h3>
              <p className="mt-2 text-sm text-accent">{item.price}</p>
            </div>
          ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Stabilisation"
        title={stabilisationPlan.title}
        description="Included with every website build."
      >
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Covers</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {stabilisationPlan.covers.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Does not cover</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {stabilisationPlan.excludes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      <Section
        eyebrow="Trust"
        title="Clear scope. Clear outcomes."
        description="We keep everything transparent from day one."
      >
        <Card>
          <ul className="grid gap-4 text-sm text-text-muted sm:grid-cols-2">
            {trustStatement.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section
        eyebrow="Performance & Visibility"
        title="Built to look good and be found"
        description="We focus on speed, clarity, and helping people discover your business online."
      >
        <div className="section-band section-band-medium relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-8">
            <p className="max-w-4xl text-sm leading-7 text-text">
              A beautiful website should also be fast and easy to find. Horizon Digital prioritises
              clean structure, quick loading pages, clear page content, and strong setup for search
              visibility so customers can discover your business more easily. In simple terms, we help
              your website look professional, load smoothly, and show up better when people search.
            </p>
            <p className="mt-6 text-base font-medium text-accent-2">
              Do you want a beautiful, fast website? Are you ready to take this next step towards
              the horizon of your digital journey?
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Ready to start? Let's define your scope.
            </h2>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#22f1d6"
              className="px-7 py-3.5 text-base font-semibold tracking-[0.08em] text-black"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </section>
    </div>
  );
}

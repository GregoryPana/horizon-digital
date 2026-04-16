import React, { useMemo, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../components/Seo";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import { trackEvent } from "../lib/analytics";

import {
  foundationPackage,
  starterPackage,
  growthPackage,
  customPackage,
  siteConfig,
  projectSteps,
  workItems,
} from "../data/site";

import { TracingCard, InteractiveIcon } from '../components/ui/TracingCard';
import { AnimatedIcon } from "../components/ui/AnimatedIcon";
import { ContainerScroll, CardSticky } from "../components/ui/cards-stack";

import Hero from "../components/ui/animated-shader-hero";
import { OurServicesSlideshow } from "../components/ui/OurServicesSlideshow";
import { TrustSignalsBar } from "../components/ui/TrustSignalsBar";


const homeFaqCategories: HomeFaqCategory[] = [
  {
    key: "services",
    label: "Services",
    items: [
      {
        question: "What kind of websites do you build?",
        answer:
          "We design and develop custom business websites focused on clarity, speed, and enquiry flow. Most projects include service pages, contact capture, and SEO-ready structure from day one.",
      },
      {
        question: "Can you refresh my current website instead of starting from scratch?",
        answer:
          "Yes. We can either redesign your current site or rebuild it on a cleaner structure if performance and content flow need major improvements.",
      },
      {
        question: "Do you also help with content and structure?",
        answer:
          "Absolutely. We guide page structure, section order, and messaging so visitors understand your offer quickly and know what action to take.",
      },
    ],
  },
  {
    key: "process",
    label: "Process",
    items: [
      {
        question: "What is a typical timeline?",
        answer:
          "Most projects launch in 3 to 6 weeks, depending on scope, feedback speed, and content readiness.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Each package includes clear revision rounds tied to project milestones, so feedback stays focused and predictable.",
      },
      {
        question: "How involved do I need to be during the project?",
        answer:
          "We keep the process lightweight. You mainly review milestone drafts, approve direction, and share business details we use to shape the final site.",
      },
    ],
  },
  {
    key: "packages",
    label: "Packages",
    items: [
      {
        question: "Is pricing flexible?",
        answer:
          "Yes. Package pricing gives a clear starting range, then we adjust based on page count, content complexity, and extra functionality.",
      },
      {
        question: "How do I choose the right package?",
        answer:
          "We recommend a package after a short discovery call. The goal is to match your current business stage without overbuilding.",
      },
      {
        question: "Can I start small and expand later?",
        answer:
          "Definitely. We can launch with a focused scope and extend the site in phases as your business grows.",
      },
    ],
  },
  {
    key: "hosting",
    label: "Hosting & Ownership",
    items: [
      {
        question: "Do I own the website when the project is complete?",
        answer:
          "Yes. You own the final codebase and approved assets once the project closes.",
      },
      {
        question: "Who controls my domain name?",
        answer:
          "Your domain stays under your registrar account and renews yearly. We can assist with setup and renewals, but ownership remains with you.",
      },
      {
        question: "What is hosting and who provides it?",
        answer:
          "Hosting keeps your site live online. You can host with Horizon Digital or choose your own provider. We support both options.",
      },
    ],
  },
];

const marqueeItems = [
  "Visible on Google within weeks of launch",
  "Average project: 3-5 weeks",
  "Your site, owned by you forever",
  "Launched in under 4 weeks",
  "Zero enquiries to consistent bookings",
];


const problemCards: Array<{
  title: string;
  body: string;
  color: string;
  type: 'outdated' | 'found' | 'zero' | 'start';
  link?: { text: string; to: string };
}> = [
  {
    title: "My website looks outdated",
    body: "I'm embarrassed to share it with customers. It doesn't reflect the quality of service we provide in person.",
    color: "cyan",
    type: "outdated",
  },
  {
    title: "Customers cannot find me",
    body: "I tell people to Google us, but we don't show up. I don't know how to fix it and competitors get all the search traffic.",
    color: "cyan",
    type: "found",
  },
  {
    title: "Zero enquiries",
    body: "The site is online but has never brought a new customer. It feels like an expense, not an asset.",
    color: "cyan",
    type: "zero",
  },
  {
    title: "I don't know where to begin",
    body: "I know I probably need a website, but every time I look into it I get more confused. I don't know what's involved, what it costs, or who to trust.",
    color: "cyan",
    type: "start",
    link: { text: "Start here", to: "/what-you-need" },
  },
];

function WorkShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const showcase = useMemo(
    () => [
      {
        ...workItems[0],
        tier: "Growth Tier",
        tag: "Real client · Live site",
      },
      {
        ...workItems[2],
        tier: "Foundation Tier",
        tag: "Showcase demo",
      },
      {
        ...workItems[1],
        tier: "Foundation Tier",
        tag: "Showcase demo",
      },
    ],
    []
  );



  return (
    <section id="work" className="relative overflow-hidden bg-[#0A0A0C]">
      <div className="relative z-30 mx-auto max-w-7xl bg-[#0A0A0C] px-6 pb-10 pt-24 md:pt-28">
        <motion.div
          className="mb-20 text-center"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Real Results, Real Businesses</span>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            See what is <span className="text-cyan font-semibold">possible</span> for your business
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-text-muted">Three businesses. Three transformations. One studio that cares.</p>
        </motion.div>
      </div>

      {showcase.map((project, idx) => (
        <article key={project.title} className="relative min-h-[110vh] md:min-h-[135vh]">
          <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={idx === 0 ? project.imageWebp : project.imageWebp800}
                alt={project.title}
                width="600"
                height="400"
                className="h-full w-full scale-[1.08] object-cover opacity-66"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-transparent to-[#0A0A0C]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_112%_100%_at_center,transparent_0%,#0A0A0C_86%)] translate-y-[-1px]" />
              <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#0A0A0C]/86 via-[#0A0A0C]/34 to-[#0A0A0C]/90" />
            </div>

            <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative rounded-[2.5rem] bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 text-center backdrop-blur-[2px] md:p-12 md:text-left lg:-ml-12 xl:-ml-16">
                  <div className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-deep-teal/35 bg-deep-teal/10 px-4 py-2 md:mx-0">
                    <span className="h-2 w-2 rounded-full bg-deep-teal animate-pulse shadow-[0_0_10px_rgba(13,148,136,0.4)]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-deep-teal md:text-xs">{project.tier}</span>
                  </div>
                  <h3 className="font-display text-4xl font-bold uppercase tracking-[-0.04em] text-white md:text-7xl">
                    {project.title}
                  </h3>
                  <p className="mx-auto mt-6 max-w-xl text-lg text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] md:mx-0 md:text-2xl">{project.outcome}</p>

                  <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-x-10 md:justify-start">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-1 items-center justify-center rounded-lg border border-cyan/40 bg-transparent px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-cyan transition-all hover:border-cyan hover:bg-cyan/5 md:flex-none md:text-[11px]"
                        onClick={() =>
                          trackEvent("cta_click", {
                            cta_name: `explore_project_${project.title.toLowerCase().replace(/\s+/g, "_")}`,
                            page_path: window.location.pathname,
                          })
                        }
                      >

                        <span className="whitespace-nowrap">Explore Project</span>
                        <motion.span whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="ml-2 flex items-center">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </motion.span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className={`hidden lg:block ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className={`relative ${idx % 2 === 0 ? "rotate-3" : "-rotate-3"} rounded-2xl bg-[#131315] shadow-[0_10px_32px_rgba(0,0,0,0.45)] p-2`}
                >
                  <img src={project.image} alt={project.title} width="600" height="320" className="h-80 w-full rounded-2xl object-cover" loading="lazy" decoding="async" />
                </motion.div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default function WebDesignSeychelles() {
  const shouldReduceMotion = useReducedMotion();
  const allHomeFaqItems = homeFaqCategories.flatMap((category) => category.items);
  const handleWorkScrollTop = () => scrollToTopSmooth();

  const [activeProblem, setActiveProblem] = useState(0);

  const problemScrollRef = useRef<HTMLDivElement>(null);

  const handleProblemCardClick = (idx: number) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setActiveProblem(idx);
    }
  };

  const scrollCarouselTo = (ref: React.RefObject<HTMLDivElement>, targetIndex: number, totalSlides: number) => {
    if (!ref.current) return;
    const scrollContainer = ref.current;
    
    let index = targetIndex;
    if (index >= totalSlides) {
      index = 0;
    }
    if (index < 0) {
      index = totalSlides - 1;
    }
    
    const child = scrollContainer.children[index] as HTMLElement;
    if (child) {
      scrollContainer.scrollTo({
        left: child.offsetLeft - parseInt(getComputedStyle(scrollContainer).paddingLeft || "20", 10),
        behavior: "smooth"
      });
    }
  };

  const handleProblemScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveProblem(index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allHomeFaqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    mainEntityOfPage: new URL("/", siteConfig.url).toString(),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Web Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "email": siteConfig.email,
      "telephone": siteConfig.phone,
      "image": new URL("/og-image.png", siteConfig.url).toString(),
      "priceRange": "SCR 7,500 - SCR 25,000+",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mahé",
        "addressCountry": "SC"
      }
    },
    "description": "Expert custom web design and development services in Seychelles, focusing on speed, mobile-readiness, and SEO optimization.",
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Mahé"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Praslin"
      },
      {
        "@type": "AdministrativeArea",
        "name": "La Digue"
      },
      {
        "@type": "Country",
        "name": "Seychelles"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Foundation Package"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Package"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Package"
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#0A0A0C] text-white">
      <Seo
        title="Web Design Seychelles | Custom Websites | Horizon Digital"
        description="Horizon Digital builds premium, high-conversion custom websites for businesses in Seychelles. Grow your local brand with expert web design on Mahé."
        path="/web-design-seychelles"
        keywords="web design seychelles, web designer mahé, seychelles website development, custom web design seychelles, local web agency seychelles"
        structuredData={[faqSchema, serviceSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Web Design Seychelles", path: "/web-design-seychelles" },
        ]}
      />

      <Hero
        trustBadge={{ text: "Based on Mahé, Seychelles" }}
        headline={{
          lines: ["Premium Web Design", "For Seychelles"],
          rotatingWords: ["Businesses", "Hotels", "Restaurants", "Agencies"],
        }}
        subtitle="We build fast, bespoke websites that help local businesses look professional and capture online bookings."
        tags={[
          { text: "Fast Browsing", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )},
          { text: "Mobile Perfect", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          )},
          { text: "Google Ranked", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )},
        ]}
        buttons={{
          primary: {
            text: "Request a Quote",
            link: "/contact",
            onClick: () =>
              trackEvent("cta_click", {
                cta_name: "hero_book_call_seychelles",
                page_path: window.location.pathname,
              }),
          },
          secondary: {
            text: "View Our Work",
            link: "/work",
            onClick: () => {
              trackEvent("cta_click", {
                cta_name: "hero_see_work_seychelles",
                page_path: window.location.pathname,
              });
              handleWorkScrollTop();
            },
          },
        }}
      />
      <TrustSignalsBar />

      <section className="relative z-20 bg-[#0A0A0C] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Sound Familiar?</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Most businesses in Seychelles face the same problems <span className="text-cyan font-semibold">online.</span>
            </h2>
          </motion.div>

          <div
            ref={problemScrollRef}
            className="mb-8 md:mb-16 flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none md:pb-0 lg:grid-cols-4 scrollbar-hide touch-pan-y touch-pan-x"
            onScroll={handleProblemScroll}
          >
            {problemCards.map((card, idx) => (
              <TracingCard
                key={card.title}
                active={activeProblem === idx}
                onClick={() => handleProblemCardClick(idx)}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16, filter: 'blur(8px)' }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.05 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink self-stretch md:cursor-pointer"
              >
                <InteractiveIcon shouldReduceMotion={shouldReduceMotion || undefined}>
                  <AnimatedIcon type={card.type} active={activeProblem === idx} />
                </InteractiveIcon>

                <h3 className="font-display mb-2 text-lg semibold-underline text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted flex-1">{card.body}</p>
                {card.link && (
                  <Link
                    to={card.link.to}
                    className="group/link mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan transition-colors hover:text-white"
                  >
                    {card.link.text}
                    <motion.span
                      className="inline-flex"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <ArrowRight className="h-3 w-3" />
                    </motion.span>
                  </Link>
                )}
              </TracingCard>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mb-16 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => scrollCarouselTo(problemScrollRef, activeProblem - 1, problemCards.length)}
              className="flex items-center justify-center p-3 text-cyan transition-all bg-[#131315] shadow-[0_2px_8px_rgba(0,0,0,0.3)] rounded-full"
              aria-label="Previous problem"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex justify-center gap-3">
              {problemCards.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${activeProblem === i ? "w-8 bg-cyan" : "w-2 bg-white/20 hover:bg-white/40 cursor-pointer"}`}
                  onClick={() => scrollCarouselTo(problemScrollRef, i, problemCards.length)}
                />
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => scrollCarouselTo(problemScrollRef, activeProblem + 1, problemCards.length)}
              className="flex items-center justify-center p-3 text-cyan transition-all bg-[#131315] shadow-[0_2px_8px_rgba(0,0,0,0.3)] rounded-full"
              aria-label="Next problem"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.div
            className="text-center"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display inline-flex items-center gap-4 text-2xl font-bold uppercase tracking-[0.2em] text-cyan">
              <motion.span
                initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
                whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 1 }}
                className="h-px w-12 bg-cyan/50 block"
              />
              We fix this. Every time.
              <motion.span
                initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
                whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="h-px w-12 bg-cyan/50 block"
              />
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden border-y border-[#1a2c33] bg-[#0d1a1f] py-5 sm:py-6">
        <div className="hd-marquee-track flex items-center gap-20 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-[#8fa7b4]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-20">
              <span>{item}</span>
              <span className="h-2 w-2 rounded-full bg-[#6f8891]" />
            </span>
          ))}
        </div>
      </section>

      <section id="services" className="relative z-20 bg-[#0A0A0C] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-20 text-center"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Our Services</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Websites built around how your business <span className="text-cyan font-semibold">actually works.</span>
            </h2>
          </motion.div>

          <motion.div
            className="mt-16 w-full"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <OurServicesSlideshow />
          </motion.div>
        </div>
      </section>

      <section id="difference" className="border-t border-white/5 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >How We're Different</motion.span>
          <motion.h2 
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
          >
            A different kind of <span className="text-cyan font-semibold">digital partner.</span>
          </motion.h2>
          <div className="mt-10 md:mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10">
            {[
              {
                label: "Transparency",
                text: (<>We believe in <span className="text-gradient-cyan font-semibold">absolute transparency.</span> Every project kicks off with a clear, written brief that you approve before a single line of code is written.</>),
              },
              {
                label: "Local & honest",
                text: (<>As a team <span className="semibold-underline text-white drop-shadow-md">based locally in Seychelles</span>, we quote honestly in <span className="semibold-underline text-white">local SCR</span> with zero hidden fees — always just a WhatsApp away.</>),
              },
              {
                label: "Performance first",
                text: (<>Before anything goes live, we guarantee it scores <span className="semibold-underline text-white">90+ on Google PageSpeed</span> so your customers get the fast, premium experience they expect.</>),
              },
              {
                label: "Easy updates",
                text: (<>Change your own text and images anytime <span className="text-cyan font-semibold">without touching code.</span> We provide simple software that gives you full control over your content while keeping the professional design perfectly intact.</>),
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: 0.15 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-6 text-left"
              >
                <motion.span
                  initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
                  whileInView={shouldReduceMotion ? undefined : { scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originY: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan/40 rounded-full"
                />
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-deep-teal">{item.label}</p>
                <p className="text-text-muted leading-relaxed text-base md:text-lg font-normal md:leading-[1.8]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ─────────────────────────────────────────── */}
      <section className="border-t border-white/[0.04] bg-[#0A0A0C] py-20 md:py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
              Who we work with
            </span>
            <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              Websites built for the businesses that <span className="text-cyan font-semibold">make Seychelles run.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {[
              {
                eyebrow: "Hospitality & Tourism",
                title: "Hotels, Guesthouses & Villas",
                body: "We build websites for Seychelles accommodation businesses that need to convert browser traffic into real bookings. Fast-loading, mobile-first, and structured to drive direct enquiries — so guests reach you before they go to a third-party platform.",
                keywords: ["Hotel website Seychelles", "Guesthouse website Seychelles", "Villa rental website"],
              },
              {
                eyebrow: "Food & Beverage",
                title: "Restaurants, Cafés & Bars",
                body: "A great restaurant deserves an online presence that does it justice. We create food and beverage websites with clear menus, opening hours, reservations, and the visual quality to match your actual experience.",
                keywords: ["Restaurant website Seychelles", "Café website Seychelles", "Menu website"],
              },
              {
                eyebrow: "Services & Professional",
                title: "Trades, Clinics & Agencies",
                body: "Whether you're a local tradesperson, a professional services firm, or a growing agency — we build websites that communicate trust, answer the right questions, and convert visitors into enquiries.",
                keywords: ["Professional services website", "Business website Seychelles", "Small business web design"],
              },
            ].map((industry, idx) => (
              <motion.div
                key={industry.eyebrow}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-6"
              >
                <motion.span
                  initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
                  whileInView={shouldReduceMotion ? undefined : { scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.18 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originY: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan/30 rounded-full"
                />
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 border border-cyan/20">
                    {industry.eyebrow?.includes("Tourism") ? (
                      <svg className="h-5 w-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    ) : industry.eyebrow?.includes("Food") ? (
                      <svg className="h-5 w-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    ) : (
                      <svg className="h-5 w-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-deep-teal leading-none">{industry.eyebrow}</p>
                </div>
                <h3 className="font-display mb-4 text-xl font-semibold text-white">{industry.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted md:text-base">{industry.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {industry.keywords.map((kw) => (
                    <li key={kw} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted/70">
                      {kw}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-white/5 bg-[#0A0A0C] py-20 px-6 xl:px-12 relative z-10">
        <div className="mx-auto max-w-[92rem] min-h-svh place-content-center text-white">
          <div className="grid md:grid-cols-2 md:gap-8 xl:gap-24">
            
            {/* Left side text sticky wrapper */}
            <div className="h-full w-full">
              <div className="md:sticky md:top-32 w-full max-w-xl left-0 md:py-12 z-10">
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mb-6 block text-[12px] font-bold uppercase tracking-[0.3em] leading-none text-cyan section-eyebrow-glow">Our Process</span>
                  <h2 className="font-display mb-8 max-w-3xl text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                    Here's exactly what we do together—<span className="text-deep-teal">step by step.</span>
                  </h2>
                  <p className="max-w-prose text-base md:text-xl leading-relaxed text-text-muted font-normal">
                    Our journey begins with a deep dive into your vision. In the Discovery phase, we engage in meaningful conversations to grasp your brand identity, goals, and the essence you want to convey. This phase sets the stage for all that follows.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right side ContainerScroll area */}
            <ContainerScroll
              className="space-y-[55vh] md:space-y-[70vh] pb-[50vh] md:pb-[60vh] pt-6 md:pt-32 z-20"
              style={{
                '--sticky-increment': '32px',
                '--sticky-top': '15vh'
              } as React.CSSProperties}
            >
              {projectSteps.slice(0, 5).map((step, idx) => (
                <CardSticky
                  key={step.title}
                  index={idx}
                  incrementY={32}
                  style={{ '--sticky-increment': '32px', '--sticky-top': '15vh' } as React.CSSProperties}
                  className="group hd-card rounded-[2rem] shadow-[0_-8px_24px_rgba(0,0,0,0.35)] w-full"
                >
                  <div className="relative overflow-hidden rounded-[2rem] bg-[#111113] border border-white/10 p-8 sm:p-12 h-full w-full">
                    <div className={`absolute right-0 top-0 h-40 w-40 sm:h-64 sm:w-64 rounded-bl-full ${idx % 2 === 0 ? "bg-cyan/5" : "bg-teal/5"} pointer-events-none transition-transform duration-1000 group-hover:scale-110`} />
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

      <WorkShowcase />

      {/* ── Single Featured Testimonial ────────────────────────────────────────────────── */}
      <section id="testimonials" className="border-t border-white/[0.05] bg-[#070709] py-24 md:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <motion.div
            className="mb-12 text-center md:mb-16"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
              Client Success
            </span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Real businesses. <span className="text-cyan font-semibold">Real results.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, filter: "blur(12px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#0e1517] to-[#0A0E0F] border border-cyan/15 px-8 py-14 shadow-[0_12px_48px_rgba(0,0,0,0.6)] md:px-16 md:py-24 text-center"
          >
            {/* Cinematic subtle glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-[80px]" />
            <div className="pointer-events-none absolute right-0 top-0 h-[20rem] w-[20rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan/5 blur-[100px]" />

            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12">
              {/* Star rating */}
              <div className="flex gap-1.5" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="h-5 w-5 md:h-6 md:w-6 text-cyan drop-shadow-[0_0_8px_rgba(94,209,222,0.4)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote mark (Decorative) */}
              <div className="absolute top-8 left-6 md:top-12 md:left-12 text-[8rem] md:text-[14rem] leading-none text-cyan/[0.03] font-serif select-none pointer-events-none">
                &ldquo;
              </div>

              <blockquote className="text-xl leading-relaxed text-white md:text-3xl lg:text-[2rem] lg:leading-[1.5] font-light max-w-4xl mx-auto tracking-wide">
                "Working with Horizon Digital was a smooth experience from start to finish. Our new website has brought in more online enquiries than we ever expected — guests now book directly instead of just calling."
              </blockquote>

              <div className="flex flex-col items-center gap-3">
                <p className="text-sm md:text-base font-bold text-white tracking-wide">
                  Mrs. Danielle Panagary
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-4 border-t border-cyan/40" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-deep-teal">
                    Drake Seaside Apartments
                  </p>
                  <div className="h-[2px] w-4 border-t border-cyan/40" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="packages" className="py-24 md:py-40 bg-black border-t border-white/[0.05]">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10 lg:px-14">
          <motion.div
            className="mb-20 text-center"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Find your fit</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              A home online, built for where you are right now
            </h2>
          </motion.div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 items-stretch pt-8">
            {[
              { ...foundationPackage, featured: false, budgetParam: "7500-12500" },
              { ...starterPackage, featured: true, budgetParam: "12500-25000" },
              { ...growthPackage, featured: false, budgetParam: "25000-plus" },
              { ...customPackage, featured: false, budgetParam: "custom" }
            ].map((pkg, idx) => (
              <motion.div
                key={pkg.title}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(12px)' }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.85, delay: 0.1 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={!pkg.featured && !shouldReduceMotion ? { y: -6 } : undefined}
                className={`flex flex-col relative p-8 sm:p-10 rounded-[2rem] transition-all duration-500 ${
                  pkg.featured
                    ? "bg-[#131315] featured-pkg-pulse xl:-translate-y-4 z-20"
                    : "bg-[#111113] shadow-[0_4px_16px_rgba(0,0,0,0.3)] z-10"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan px-6 py-[6px] rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-[#0A0A0C] whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div className="mb-10">
                  <p className="mb-4 ml-0.5 inline-flex w-fit items-center rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                    {pkg.title === "Foundation" ? "Essentials" : pkg.title === "Starter" ? "Scalable" : pkg.title === "Growth" ? "Full Scale" : "One-of-a-kind"}
                  </p>
                  <h3 className="text-4xl font-bold text-white mb-4 pr-4 leading-tight tracking-tight font-display">{pkg.title}</h3>
                  <p className="text-2xl font-medium text-cyan/90 font-display mb-8 leading-tight">
                    {pkg.price}
                  </p>
                </div>

                <ul className="space-y-3 sm:space-y-5 mb-8 sm:mb-12 flex-grow">
                  {pkg.includes.map((item, includeIdx) => (
                    <li key={`${item.title}-${includeIdx}`} className="flex items-start gap-4">
                      <motion.span
                        initial={shouldReduceMotion ? undefined : { scale: 0, opacity: 0 }}
                        whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15 + includeIdx * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
                        className="mt-[3px] shrink-0 text-deep-teal"
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </motion.span>
                      <span className="text-sm text-white/80 leading-relaxed">{item.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link to={`/contact?budget=${pkg.budgetParam}`} className="block w-full">
                    <button
                      className={`w-full py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                        pkg.featured
                          ? "bg-cyan text-[#0A0A0C] hover:brightness-110"
                          : "bg-[#0A0A0C] text-cyan hover:bg-[#0e1a1f] hover:text-white"
                      }`}
                      onClick={() =>
                        trackEvent("cta_click", {
                          cta_name: `package_get_started_${pkg.title.toLowerCase()}`,
                          page_path: window.location.pathname,
                        })
                      }
                    >
                      {pkg.title === "Custom" ? "Get a quote" : "Start with " + pkg.title}
                    </button>
                  </Link>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="insights" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-3xl bg-[#131315] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            <div className="grid lg:grid-cols-12">
              <div className="relative z-20 flex flex-col justify-center p-6 sm:p-10 md:p-16 lg:col-span-7">
                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Stay in the know</span>
                <h2 className="font-display mt-4 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">The digital world, <span className="text-cyan font-semibold">explained simply.</span></h2>
                <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
                  No jargon. No fluff. Just the things worth knowing for your business.
                </p>

                <ul className="mt-8 space-y-4 text-sm text-text-muted md:text-base">
                  {[
                    { text: "Digital trends affecting small businesses", to: "/insights/digital-trends-small-businesses" },
                    { text: "Understanding AI chatbots", to: "/insights/understanding-ai-chatbots" },
                    { text: "Why data and analytics matter", to: "/insights/why-data-analytics-matter" },
                    { text: "How automation saves time", to: "/insights/automation-save-time-businesses" },
                  ].map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="group/item"
                    >
                      <Link to={item.to} className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                        <motion.span
                          whileHover={shouldReduceMotion ? undefined : { x: 2, y: -2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          className="shrink-0 text-deep-teal"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.span>
                        {item.text}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 flex justify-start">
                  <Link to="/insights">
                    <ShimmerButton shimmerColor="#0A0A0C" shimmerDuration="4.2s" background="var(--accent)" className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black">
                      Read digital insights
                    </ShimmerButton>
                  </Link>
                </div>
              </div>

              <div className="relative flex min-h-[300px] sm:min-h-[350px] items-center justify-center overflow-hidden lg:overflow-visible p-6 sm:p-8 lg:col-span-5 lg:min-h-full lg:p-12">
                <div className="absolute left-1/2 top-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[120px] lg:h-[120%] lg:w-[150%]" />

                <div className="relative z-10 flex h-full w-full max-w-[380px] items-center justify-center lg:absolute lg:-left-24 lg:top-1/2 lg:w-[160%] lg:max-w-none lg:-translate-y-1/2 lg:pr-0 pointer-events-none">
                  <motion.div className="absolute left-[0%] top-1/2 z-10 w-32 sm:w-44 -translate-y-[45%] rounded-[1.25rem] border border-cyan/20 shadow-[0_4px_16px_rgba(0,0,0,0.35)] lg:w-[15rem]" animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_1.webp" alt="Digital trends for small business" width="400" height="300" className="h-auto w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                  </motion.div>

                  <motion.div className="absolute left-[20%] sm:left-[22%] top-1/2 z-20 w-40 sm:w-52 -translate-y-[48%] rounded-[1.25rem] border border-cyan/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)] lg:left-[22%] lg:w-[18rem]" animate={shouldReduceMotion ? undefined : { y: [-8, 8, -8] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_2.webp" alt="Understanding AI chatbots" width="400" height="300" className="h-auto w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                  </motion.div>

                  <motion.div className="absolute left-[35%] sm:left-[42%] top-1/2 z-30 w-48 sm:w-56 -translate-y-[52%] rounded-[1.25rem] border border-cyan/40 shadow-[0_8px_32px_rgba(0,0,0,0.45)] lg:left-[45%] lg:w-[22rem]" animate={shouldReduceMotion ? undefined : { y: [-6, 10, -6] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_3.webp" alt="Why data and analytics matter" width="400" height="300" className="h-auto w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            className="mb-20 text-center"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">You probably have questions</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">We have answered the ones we hear most</h2>
            <p className="mx-auto mt-4 max-w-3xl text-text-muted">Honest, plain-language answers so you feel confident before we begin.</p>
          </motion.div>

          <HomeFaq categories={homeFaqCategories} />

          <motion.div
            className="mt-10 flex flex-col items-center gap-6 rounded-3xl bg-[#131315] shadow-[0_4px_24px_rgba(0,0,0,0.45)] px-6 py-8 text-center md:flex-row md:justify-between md:text-left"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm text-text-muted">Still have questions? We can walk you through it.</p>
            <Link to="/contact">
              <ShimmerButton shimmerColor="#0A0A0C" shimmerDuration="4.2s" background="var(--accent)" className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black">
                Contact us
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="ready" className="bg-gradient-to-b from-transparent to-black/20 py-24 md:py-36">
        <motion.div
          className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display mb-8 text-4xl font-semibold text-white md:text-7xl">
            Let us build something
            <br />
            <span className="text-cyan font-semibold">you are proud of</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg font-normal leading-relaxed text-text-muted md:text-2xl">
            A short, free call is all it takes to get started. No pressure. Just a conversation.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/contact"
              className="px-8 py-4 sm:px-10 sm:py-5 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center flex items-center justify-center w-full sm:w-auto sm:min-w-[240px] cta-gradient-anim"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))', backgroundSize: '300% 100%' }}
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "seychelles_bottom_discovery_call",
                  page_path: window.location.pathname,
                })
              }
            >
              Book a discovery call
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

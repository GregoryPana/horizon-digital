import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../components/Seo";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import { trackEvent } from "../lib/analytics";

import {
  siteConfig,
} from "../data/site";

import { TracingCard, InteractiveIcon } from '../components/ui/TracingCard';
import { AnimatedIcon } from "../components/ui/AnimatedIcon";

import Hero from "../components/ui/animated-shader-hero";


const homeFaqCategories: HomeFaqCategory[] = [
  {
    key: "services",
    label: "Tourism Services",
    items: [
      {
        question: "Can you integrate my existing booking system?",
        answer:
          "Yes. We can integrate major booking engines like Little Hotelier, Cloudbeds, or custom reservation forms to ensure your guest data flows directly into your management system.",
      },
      {
        question: "How do you help reduce Booking.com/OTA commissions?",
        answer:
          "We design with a 'Direct-First' approach, making it easier and more attractive for guests to book on your site rather than third-party platforms. This keeps more revenue in your business.",
      },
      {
        question: "Do you provide professional photography?",
        answer:
          "While we focus on design and code, we partner with local Seychelles photographers to ensure your property looks stunning with high-resolution, fast-loading imagery.",
      },
    ],
  },
  {
    key: "process",
    label: "Process",
    items: [
      {
        question: "What is a typical timeline for a hotel site?",
        answer:
          "A professional hospitality site typically takes 4 to 8 weeks, depending on the number of room types, activity pages, and booking system complexity.",
      },
      {
        question: "Is the site mobile-friendly for travelers?",
        answer:
          "Absolutely. Over 70% of travelers research on mobile. Every site we build is optimized for flawless performance on iPhones, Androids, and tablets.",
      },
    ],
  },
];

const marqueeItems = [
  "Direct bookings, zero commission",
  "High-resolution island storytelling",
  "Mobile-first guest experience",
  "Fast loading on island connections",
  "Integrated Seychelles booking tech",
];

const tourismProblemCards: Array<{
  title: string;
  body: string;
  color: string;
  type: 'outdated' | 'found' | 'zero' | 'start';
  link?: { text: string; to: string };
}> = [
  {
    title: "High OTA Commissions",
    body: "You're losing 15-20% of every booking to platforms like Booking.com. Your direct website should be your most profitable channel.",
    color: "cyan",
    type: "zero",
  },
  {
    title: "Invisible to Travelers",
    body: "When guests search for 'Villas in Mahé' or 'Boutique Hotels Praslin', they don't find you. Competitors are capturing your traffic.",
    color: "cyan",
    type: "found",
  },
  {
    title: "Poor Mobile Experience",
    body: "Guests trying to book on their phones find a broken, slow site and leave. You're losing bookings before they even start.",
    color: "cyan",
    type: "outdated",
  },
  {
    title: "Not Enough Enquiries",
    body: "Visitors land on your page but don't take action. Your site lacks the trust and clarity needed to close the deal.",
    color: "cyan",
    type: "start",
    link: { text: "Fix it now", to: "/contact" },
  },
];

export default function TourismWebsiteDesignSeychelles() {
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
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    
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
  };

  const tourismServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Hospitality & Tourism Web Design",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mahé",
        "addressCountry": "SC"
      }
    },
    "description": "Premium website design for Seychelles hotels, villas, and tourism operators. Custom booking integrations and SEO built for high direct revenue.",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Mahé" },
      { "@type": "AdministrativeArea", "name": "Praslin" },
      { "@type": "AdministrativeArea", "name": "La Digue" },
      { "@type": "Country", "name": "Seychelles" }
    ]
  };

  return (
    <div className="bg-[#0A0A0C] text-white">
      <Seo
        title="Tourism Website Design Seychelles | Hotel & Villa Websites"
        description="Horizon Digital creates high-conversion websites for Seychelles tourism. Custom hotel and villa web design optimized for direct bookings and local SEO."
        path="/tourism-website-design-seychelles"
        keywords="tourism website design seychelles, hotel web design mahé, villa booking website seychelles, luxury resort web design praslin, direct bookings seychelles"
        structuredData={[faqSchema, tourismServiceSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Tourism Web Design", path: "/tourism-website-design-seychelles" },
        ]}
      />

      <Hero
        trustBadge={{ text: "Direct-First Tourism Design • Seychelles" }}
        headline={{
          lines: ["STUNNING", "TOURISM WEBSITES"],
          rotatingWords: ["HOTEL", "VILLA", "CHARTER", "RESORT"],
        }}
        subtitle="We build premium websites for the Seychelles hospitality industry that turn browsing travelers into direct guests."
        tags={[
          { text: "OTA Fee Reduction", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )},
          { text: "Mobile Booking Ready", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          )},
          { text: "Island-Fast Speed", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          )},
        ]}
        buttons={{
          primary: {
            text: "Boost Your Bookings",
            link: "/contact",
            onClick: () => trackEvent("cta_click", { cta_name: "hero_tourism_cta", page_path: window.location.pathname }),
          },
          secondary: {
            text: "See Hospitality Work",
            link: "/work",
            onClick: () => { trackEvent("cta_click", { cta_name: "hero_tourism_work", page_path: window.location.pathname }); handleWorkScrollTop(); },
          },
        }}
      />

      <section className="relative z-20 bg-[#0A0A0C] py-20 md:py-32 focus-visible:outline-none">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Stop the Revenue Leak</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Is your property losing out to <span className="text-cyan font-semibold">third-party platforms?</span>
            </h2>
          </motion.div>

          <div
            ref={problemScrollRef}
            className="mb-8 md:mb-16 flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none md:pb-0 lg:grid-cols-4 scrollbar-hide touch-pan-x"
            onScroll={handleProblemScroll}
          >
            {tourismProblemCards.map((card, idx) => (
              <TracingCard
                key={card.title}
                active={activeProblem === idx}
                onClick={() => handleProblemCardClick(idx)}
                className="p-5 sm:p-6 min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink self-stretch md:cursor-pointer"
              >
                <InteractiveIcon shouldReduceMotion={shouldReduceMotion || undefined}>
                  <AnimatedIcon type={card.type} active={activeProblem === idx} />
                </InteractiveIcon>
                <h3 className="font-display mb-2 text-lg semibold-underline text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted flex-1">{card.body}</p>
              </TracingCard>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mb-16 md:hidden">
            <motion.button onClick={() => scrollCarouselTo(problemScrollRef, activeProblem - 1, tourismProblemCards.length)} className="p-3 text-cyan bg-[#131315] rounded-full"><ChevronLeft className="w-5 h-5" /></motion.button>
            <div className="flex gap-3">
              {tourismProblemCards.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${activeProblem === i ? "w-8 bg-cyan" : "w-2 bg-white/20"}`} />
              ))}
            </div>
            <motion.button onClick={() => scrollCarouselTo(problemScrollRef, activeProblem + 1, tourismProblemCards.length)} className="p-3 text-cyan bg-[#131315] rounded-full"><ChevronRight className="w-5 h-5" /></motion.button>
          </div>
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

      <section className="bg-black py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-deep-teal section-eyebrow-glow">Direct First Architecture</span>
          <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold text-white md:text-4xl">
            Websites designed to drive <span className="text-cyan font-semibold">direct revenue.</span>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { label: "OTA Independence", text: "We build systems that encourage guests to book with you directly, bypasssing high commission fees and building your own customer database." },
              { label: "Visual Narrative", text: "Your island property is beautiful. We use immersive layouts and ultra-fast media loading to ensure guests feel the magic before they arrive." },
              { label: "Frictionless Booking", text: "Whether it's a simple enquiry or a fully integrated reservation system, we make the path from 'looking' to 'booked' effortless." }
            ].map((item) => (
              <div key={item.label} className="relative pl-6 text-left border-l border-cyan/30">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-deep-teal">{item.label}</p>
                <p className="text-text-muted leading-relaxed text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A0A0C] py-20 px-6">
        <div className="mx-auto max-w-4xl rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-12 text-center">
          <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-5xl">Ready to own your bookings?</h2>
          <p className="mb-10 text-lg text-text-muted">Join the leading Seychelles properties moving away from template sites and high OTA reliance.</p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
             <Link to="/contact">
                <ShimmerButton className="px-10 py-4 font-bold uppercase tracking-widest">Start the transformation</ShimmerButton>
             </Link>
          </div>
        </div>
      </section>

      <HomeFaq categories={homeFaqCategories} />
    </div>
  );
}

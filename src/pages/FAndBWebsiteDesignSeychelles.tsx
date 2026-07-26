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


const fAndBFaqCategories: HomeFaqCategory[] = [
  {
    key: "project",
    label: "Project Questions",
    items: [
      {
        question: "Can you integrate my existing reservation system?",
        answer: "We can assess systems such as TableRequest or OpenTable and connect supported reservation or enquiry paths within the agreed scope."
      },
      {
        question: "Do you build digital QR menus?",
        answer: "Absolutely. We can create high-performance, mobile-first digital menus that are easy to update and lightning-fast to load, reducing printing costs and improving the guest experience."
      },
      {
        question: "How long does a restaurant website take?",
        answer: "Our hospitality-optimized builds typically take 3-5 weeks depending on the complexity of the menu integrations and high-fidelity photography requirements."
      }
    ]
  }
];

const fbProblemCards = [
  {
    title: "Hard-to-Read PDF Menus",
    body: "PDF menus can be awkward on phones. We can build responsive digital menus designed for common mobile and desktop screen sizes.",
    type: "outdated" as const
  },
  {
    title: "Disconnected Reservations",
    body: "Outdated contact paths can make reservations harder to manage. We can connect supported reservation systems or provide a clearer enquiry flow.",
    type: "zero" as const
  },
  {
    title: "Hidden from Search",
    body: "Incomplete business information and weak page structure can limit search visibility. We provide practical technical and on-page SEO foundations without guaranteeing rankings.",
    type: "found" as const
  },
  {
    title: "Old Visuals",
    body: "Food is visual. We design layouts that celebrate your culinary craftsmanship and turn 'browsing' into 'ordering'.",
    type: "start" as const
  }
];

const marqueeItems = [
  "MOBILE-FIRST DIGITAL MENUS",
  "RESERVATIONS INTEGRATED",
  "LOCAL SEO FOR RESTAURANTS",
  "LUXURY F&B BRANDING",
  "PERFORMANCE-AWARE DELIVERY",
  "GOOGLE BUSINESS PROFILE SUPPORT",
];

export default function FAndBWebsiteDesignSeychelles() {
  const [activeProblem, setActiveProblem] = useState(0);
  const problemScrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleWorkScrollTop = () => {
    scrollToTopSmooth();
  };

  const handleProblemScroll = () => {
    if (!problemScrollRef.current) return;
    const scrollLeft = problemScrollRef.current.scrollLeft;
    const width = problemScrollRef.current.offsetWidth;
    const newIdx = Math.round(scrollLeft / (width * 0.8));
    if (newIdx !== activeProblem && newIdx >= 0 && newIdx < fbProblemCards.length) {
      setActiveProblem(newIdx);
    }
  };

  const handleProblemCardClick = (idx: number) => {
    setActiveProblem(idx);
    if (problemScrollRef.current) {
      const cardWidth = problemScrollRef.current.children[0].clientWidth;
      const gap = 20;
      problemScrollRef.current.scrollTo({
        left: idx * (cardWidth + gap),
        behavior: "smooth"
      });
    }
  };

  const scrollCarouselTo = (ref: React.RefObject<HTMLDivElement>, idx: number, max: number) => {
    if (!ref.current) return;
    const targetIdx = Math.max(0, Math.min(idx, max - 1));
    const cardWidth = ref.current.children[0].clientWidth;
    const gap = 20;
    ref.current.scrollTo({
      left: targetIdx * (cardWidth + gap),
      behavior: "smooth"
    });
    setActiveProblem(targetIdx);
  };

  const allFaqItems = fAndBFaqCategories.flatMap(cat => cat.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const fbServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "F&B & Restaurant Web Design",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Victoria",
        "addressCountry": "SC"
      }
    },
    "description": "Premium website design for Seychelles restaurants, cafes, and bars. Mobile-first digital menus, reservation integrations, and SEO for local culinary discovery.",
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
        title="F&B Website Design Seychelles | Restaurant & Bar Websites"
        description="Custom websites for Seychelles restaurants and cafés, with responsive menus, reservation paths, and technical SEO foundations."
        path="/f-and-b-website-design-seychelles"
        keywords="restaurant website design seychelles, cafe web design mahé, digital menu seychelles, bar website design praslin, food delivery website victoria"
        structuredData={[faqSchema, fbServiceSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "F&B Web Design", path: "/f-and-b-website-design-seychelles" },
        ]}
      />

      <Hero
        trustBadge={{ text: "Digital Menus • Seychelles Restaurants" }}
        headline={{
          lines: ["STUNNING", "F&B WEBSITES"],
          rotatingWords: ["DINING", "LOUNGE", "CAFE", "BISTRO"],
        }}
        subtitle="We build appetite-inducing websites for Seychelles restaurants that turn hungry tourists into confirmed reservations."
        tags={[
          { text: "Smart Digital Menus", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          )},
          { text: "Reservation Paths", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          )},
          { text: "Local Discovery SEO", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          )},
        ]}
        buttons={{
          primary: {
            text: "Elevate Your Restaurant",
            link: "/contact",
            onClick: () => trackEvent("cta_click", { cta_name: "hero_fb_cta", page_path: window.location.pathname }),
          },
          secondary: {
            text: "See Our Work",
            link: "/work",
            onClick: () => { trackEvent("cta_click", { cta_name: "hero_fb_work", page_path: window.location.pathname }); handleWorkScrollTop(); },
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
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">The Guest Experience Starts Online</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Is your digital presence as good as your <span className="text-cyan font-semibold">cuisine?</span>
            </h2>
          </motion.div>

          <div
            ref={problemScrollRef}
            className="mb-8 md:mb-16 flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none md:pb-0 lg:grid-cols-4 scrollbar-hide touch-pan-x"
            onScroll={handleProblemScroll}
          >
            {fbProblemCards.map((card, idx) => (
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
            <motion.button onClick={() => scrollCarouselTo(problemScrollRef, activeProblem - 1, fbProblemCards.length)} className="p-3 text-cyan bg-[#131315] rounded-full"><ChevronLeft className="w-5 h-5" /></motion.button>
            <div className="flex gap-3">
              {fbProblemCards.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${activeProblem === i ? "w-8 bg-cyan" : "w-2 bg-white/20"}`} />
              ))}
            </div>
            <motion.button onClick={() => scrollCarouselTo(problemScrollRef, activeProblem + 1, fbProblemCards.length)} className="p-3 text-cyan bg-[#131315] rounded-full"><ChevronRight className="w-5 h-5" /></motion.button>
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
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-deep-teal section-eyebrow-glow">Built for Gastronomy</span>
          <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold text-white md:text-4xl">
            Experience-driven design for <span className="text-cyan font-semibold">modern dining.</span>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { label: "Responsive Menus", text: "We design menus and key information for common phone, tablet, and desktop sizes." },
              { label: "Reservation Paths", text: "We can connect supported reservation systems or provide a clear enquiry route." },
              { label: "Local Search Foundations", text: "We structure business information, metadata, and relevant page content without guaranteeing rankings." }
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
          <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-5xl">Ready to serve more guests?</h2>
          <p className="mb-10 text-lg text-text-muted">Present your menu, venue information, and reservation options clearly with a custom restaurant website.</p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
             <Link to="/contact">
                <ShimmerButton className="px-10 py-4 font-bold uppercase tracking-widest">Start the design</ShimmerButton>
             </Link>
          </div>
        </div>
      </section>

      <HomeFaq categories={fAndBFaqCategories} />
    </div>
  );
}

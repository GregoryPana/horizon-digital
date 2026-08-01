import { useRef, useState } from "react";
import {
  Code2,
  MessageSquare,
  Palette,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { siteConfig } from "../data/site";
import { trackEvent } from "../lib/analytics";
import { useProceduralReveal } from "../hooks/useProceduralReveal";
import {
  PROCESS_DETAIL_KEYS,
  PROCESS_PHASES,
  shouldShowProcessPhase,
  type ProcessIconName,
} from "./processFlow";

const iconByName: Record<ProcessIconName, LucideIcon> = {
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  ShieldCheck,
};

const detailLabels = {
  clientInput: "Your input",
  horizonActivity: "Horizon activity",
  reviewPoint: "Review point",
  deliverable: "Deliverable",
  nextStep: "What happens next",
} as const;

export default function Process() {
  const shouldReduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  useProceduralReveal(pageRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedThroughIndex, setRevealedThroughIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 70%", "end 70%"],
  });
  const connectorScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    const nextIndex = Math.max(
      0,
      Math.min(PROCESS_PHASES.length - 1, Math.floor(latest * PROCESS_PHASES.length)),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    setRevealedThroughIndex((current) => Math.max(current, nextIndex));
  });

  const visibleActiveIndex = shouldReduceMotion ? PROCESS_PHASES.length - 1 : activeIndex;

  const trackCta = (ctaName: string) => {
    trackEvent("cta_click", {
      cta_name: ctaName,
      page_path: window.location.pathname,
    });
  };

  return (
    <div className="process-page" ref={pageRef}>
      <Seo
        title="How We Build Your Website | Horizon Digital"
        description="A clear, step-by-step look at how Horizon Digital takes your website from the first chat through launch and package-based support."
        path="/process"
        keywords="website build process Seychelles, how to build a website, web design timeline, website project steps"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Our Process", path: "/process" },
        ]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Horizon Digital builds your website",
            description: "The five stages from the first chat through package-based post-launch support.",
            step: PROCESS_PHASES.map((phase, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: phase.title,
              text: phase.description,
            })),
          },
        ]}
      />

      <section className="process-hero" aria-labelledby="process-title">
        <div className="process-shell process-hero-grid">
          <motion.div
            className="process-hero-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="process-eyebrow">How we get there</p>
            <h1 id="process-title" style={{fontSize: 'var(--text-h1)', fontWeight: 700, lineHeight: 1.03, letterSpacing: '-0.04em', textWrap: 'balance'}}>A clear path to your new website.</h1>
            <p className="process-hero-lead">
              Five stages, with a clear review before the project moves forward.
            </p>
            <Link
              className="process-primary-cta consultation-attraction"
              to="/contact"
              onClick={() => trackCta("process_hero_consult")}
            >
              {siteConfig.primaryCtaLabel}
            </Link>
          </motion.div>

          <div className="process-map section-reveal" aria-label="The five website project phases">
            <div className="process-map-heading reveal-heading">
              <span>Project map</span>
              <span>01—05</span>
            </div>
            <ol>
              {PROCESS_PHASES.map((phase, index) => {
                const Icon = iconByName[phase.icon];
                return (
                  <li key={phase.id} className={`reveal-item${index === PROCESS_PHASES.length - 1 ? " is-support" : ""}`}>
                    <span className="process-map-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="process-map-icon" aria-hidden="true">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span>{phase.title}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="process-body" ref={processRef} aria-labelledby="process-body-title">
        <div className="process-shell">
          <div className="process-body-intro section-reveal">
            <p className="process-eyebrow reveal-heading">One connected process</p>
             <h2 id="process-body-title" className="reveal-heading" style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance'}}>Know what each stage asks of you.</h2>
             <p className="reveal-item">
              The process runs from the first conversation through launch and the support included with your package.
            </p>
          </div>

          <div className="process-spine-layout">
            <aside className="process-phase-index" aria-label="Current project phase">
              <p>Phase index</p>
              <ol>
                {PROCESS_PHASES.map((phase, index) => {
                  const Icon = iconByName[phase.icon];
                  const state = index < visibleActiveIndex ? "complete" : index === visibleActiveIndex ? "current" : "upcoming";
                  return (
                    <li key={phase.id} data-state={state} aria-current={state === "current" ? "step" : undefined}>
                      <span aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
                      <span>{phase.title}</span>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </li>
                  );
                })}
              </ol>
            </aside>

            <div className="process-phase-list-wrap">
              <div className="process-connector-base" aria-hidden="true" />
              <motion.div
                className="process-connector-progress"
                aria-hidden="true"
                style={{ scaleY: shouldReduceMotion ? 1 : connectorScale }}
              />
              <ol className="process-phase-list">
                {PROCESS_PHASES.map((phase, index) => {
                  const Icon = iconByName[phase.icon];
                  const state = index < visibleActiveIndex ? "complete" : index === visibleActiveIndex ? "current" : "upcoming";
                  return (
                    <li key={phase.id} id={phase.id} data-state={state}>
                      <span className="process-phase-node" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <motion.article
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                        animate={shouldShowProcessPhase(index, revealedThroughIndex, shouldReduceMotion === true)
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onViewportEnter={() => {
                          setRevealedThroughIndex((current) => Math.max(current, index));
                        }}
                        viewport={{ once: true, amount: 0.22 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <header>
                          <span>Phase {String(index + 1).padStart(2, "0")}</span>
                          <h3>{phase.title}</h3>
                          <p>{phase.description}</p>
                        </header>
                        <dl>
                          {PROCESS_DETAIL_KEYS.map((key) => (
                            <div key={key}>
                              <dt>{detailLabels[key]}</dt>
                              <dd>{phase.details[key]}</dd>
                            </div>
                          ))}
                        </dl>
                      </motion.article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="process-consultation section-reveal" aria-labelledby="process-cta-title">
      <div className="process-shell">
      <p className="process-eyebrow reveal-heading">Ready to begin?</p>
       <h2 id="process-cta-title" className="reveal-heading" style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance'}}>Start with a clear first conversation.</h2>
       <p className="reveal-item">Tell us about your business, customers and what the website needs to do.</p>
          <Link
            className="process-cta-link reveal-item"
            to="/contact"
            onClick={() => trackCta("process_bottom_start_project")}
          >
            <ShimmerButton
              as="span"
              background="var(--accent)"
              foreground="#071216"
              className="process-primary-cta consultation-attraction"
            >
              {siteConfig.primaryCtaLabel}
            </ShimmerButton>
          </Link>
        </div>
      </section>
    </div>
  );
}

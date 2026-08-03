import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  applySectionReveals,
  loadScrollTrigger as loadSharedScrollTrigger,
  type ScrollTriggerPlugin,
} from "../hooks/useProceduralReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import "./ServicePages.css";
import { InteractiveSvgIcon } from "../components/ui/InteractiveSvgIcon";
import { ServiceFamilyVisual } from "../components/ui/ServiceVisualStories";
import { getHomeProcessActiveIndex } from "../components/ui/homeProcessFlow";
import HomeFaq from "../components/ui/home-faq";
import Hero from "../components/ui/animated-shader-hero";
import { ScrollRevealText } from "../components/ui/ScrollRevealText";
import { FloatingCarousel } from "../components/ui/FloatingCarousel";
import { WorkMarquee } from "../components/ui/WorkMarquee";
import { MagneticButton } from "../components/ui/MagneticButton";
import { updateSiteAtmospherePointer } from "../components/ui/siteAtmosphere";
import { trackContactIntent, trackEvent } from "../lib/analytics";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import {
  HOME_SCROLL_PRELOAD_MARGIN,
  shouldLoadHomeScrollMotion,
} from "./homeScrollMotionPolicy";
import {
  foundationPackage,
  growthPackage,
  homeFaqCategories,
  homeProofPoints,
  projectSteps,
  servicePages,
  siteConfig,
  starterPackage,
  workItems,
} from "../data/site";

type HomeProps = {
  seoPath?: string;
  seoTitle?: string;
  seoDescription?: string;
};

gsap.registerPlugin(useGSAP);

const buyerFits = [
  {
    icon: "refresh" as const,
    effect: "trace" as const,
    title: "Your website feels out of date",
    body: "Your business has moved on, but the website is still difficult to share or use on a phone.",
  },
  {
    icon: "compass" as const,
    effect: "glow" as const,
    title: "You are not sure where to start",
    body: "We can help you work out the pages, content, cost and next steps before anything is built.",
  },
  {
    icon: "expand" as const,
    effect: "pop" as const,
    title: "Your business has outgrown the website",
    body: "You now have more to explain, more people to reach or better ways for customers to get in touch.",
  },
];

const packages = [foundationPackage, starterPackage, growthPackage];
const processIcons = ["message", "palette", "code", "launch", "support"] as const;
const processEffects = ["trace", "colour", "trace", "pop", "glow"] as const;
const trustProofDetails = [
  "See the live client project in our Work.",
  "Local planning, design and direct communication.",
  "Follow the path from first chat to launch.",
  "Included after handover on website packages.",
] as const;
const trustProofVisualKinds = ["live", "local", "process", "support"] as const;

type TrustProofVisualKind = "live" | "local" | "process" | "support";

function TrustProofVisual({ kind, value }: { kind: TrustProofVisualKind; value: string }) {
  if (kind === "live") {
    return (
      <div className="home-trust-proof-visual" data-proof-visual="live" aria-hidden="true">
        <span className="home-trust-live-browser">
          <span className="home-trust-live-toolbar"><i /><i /><i /></span>
          <span className="home-trust-live-canvas"><i /><i /><i /></span>
          <span className="home-trust-live-status"><i /> Live</span>
        </span>
      </div>
    );
  }

  if (kind === "local") {
    return (
      <div className="home-trust-proof-visual" data-proof-visual="local" aria-hidden="true">
        <span className="home-trust-local-signal">
          <i className="home-trust-local-marker"><i /></i>
          <span>
            <strong>{value.split(",")[0]}</strong>
            <i>Seychelles</i>
          </span>
        </span>
      </div>
    );
  }

  if (kind === "process") {
    const stageCount = Math.min(Number.parseInt(value, 10) || 5, 6);
    return (
      <div className="home-trust-proof-visual" data-proof-visual="process" aria-hidden="true">
        <span className="home-trust-process-nodes">
          {Array.from({ length: stageCount }, (_, index) => index + 1).map((step) => <i key={step}>{step}</i>)}
        </span>
      </div>
    );
  }

  return (
    <div className="home-trust-proof-visual" data-proof-visual="support" aria-hidden="true">
      <span className="home-trust-support-calendar">
        <i className="home-trust-support-rings" />
        <strong>{value.replace(/\s*days$/i, "")}</strong>
        <span>days</span>
      </span>
    </div>
  );
}

function replayTouchIconEffect(event: ReactPointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "touch") return;

  const target = (event.target as HTMLElement).closest<HTMLElement>(".group, .reactive-cta");
  const hasReplayableEffect = target?.querySelector(
    ".interactive-svg-icon, .cta-shine",
  );
  if (!target || !hasReplayableEffect) return;

  target.classList.remove("is-tap-animating");
  void target.offsetWidth;
  target.classList.add("is-tap-animating");
  window.setTimeout(() => target.classList.remove("is-tap-animating"), 720);
}

function SectionArt({ tone = "light", side = "right" }: { tone?: "light" | "dark" | "lagoon"; side?: "left" | "right" }) {
  return (
    <div className={`section-art section-art-${tone} section-art-${side}`} aria-hidden="true">
      <svg viewBox="0 0 360 360" fill="none">
        <path className="section-art-path" d="M18 246C76 130 137 309 202 170C249 68 298 115 346 38" />
        <path className="section-art-path section-art-path-fine" d="M7 288C88 179 140 336 222 222C273 151 315 165 360 103" />
        <circle className="section-art-ring" cx="226" cy="132" r="82" />
        <circle className="section-art-ring section-art-ring-small" cx="226" cy="132" r="48" />
      </svg>
      <span className="section-art-node section-art-node-a" />
      <span className="section-art-node section-art-node-b" />
      <span className="section-art-node section-art-node-c" />
    </div>
  );
}

function ProjectLink({
  url,
  children,
  className,
  onClick,
}: {
  url?: string;
  children: ReactNode;
  className: string;
  onClick?: () => void;
}) {
  if (url?.startsWith("http")) {
    return (
      <a href={url} target="_blank" rel="noreferrer noopener" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={url || "/work"} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Home({
  seoPath = "/",
  seoTitle = "Custom Website Design Seychelles | Horizon Digital",
  seoDescription = "Custom-built websites for Seychelles businesses, with responsive design, clear contact paths and technical SEO foundations.",
}: HomeProps = {}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const firstMotionSectionRef = useRef<HTMLElement>(null);
  const [scrollTriggerPlugin, setScrollTriggerPlugin] = useState<ScrollTriggerPlugin | null>(null);
  const allHomeFaqItems = homeFaqCategories.flatMap((category) => category.items);
  const navigate = useNavigate();

  useEffect(() => {
    const firstMotionSection = firstMotionSectionRef.current;
    if (!firstMotionSection) return;

    let active = true;
    let observer: IntersectionObserver | null = null;
    let hasStartedLoading = false;
    const loadScrollTrigger = () => {
      if (hasStartedLoading) return;
      hasStartedLoading = true;
      observer?.disconnect();
      void loadSharedScrollTrigger()
        .then((plugin) => {
          if (!active) return;
          gsap.registerPlugin(plugin);
          setScrollTriggerPlugin(() => plugin);
        })
        .catch((error: unknown) => {
          if (active) console.error("Unable to load homepage scroll motion", error);
        });
    };

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      loadScrollTrigger();
    } else {
      const isAtOrPastPreloadBoundary = (sectionTop: number) => shouldLoadHomeScrollMotion({
        sectionTop,
        viewportHeight: window.innerHeight,
        preloadMargin: HOME_SCROLL_PRELOAD_MARGIN,
      });
      observer = new window.IntersectionObserver(
        (entries) => {
          if (entries.some((entry) =>
            entry.isIntersecting || isAtOrPastPreloadBoundary(entry.boundingClientRect.top))) {
            loadScrollTrigger();
          }
        },
        { rootMargin: `${HOME_SCROLL_PRELOAD_MARGIN}px 0px`, threshold: 0.01 },
      );
      if (isAtOrPastPreloadBoundary(firstMotionSection.getBoundingClientRect().top)) {
        loadScrollTrigger();
      } else {
        observer.observe(firstMotionSection);
      }
    }

    return () => {
      active = false;
      observer?.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      if (!scrollTriggerPlugin) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { motionOk, isDesktop } = context.conditions as {
            motionOk: boolean;
            isDesktop: boolean;
          };
          if (!motionOk) return;

          applySectionReveals(pageRef.current ?? document, isDesktop);

          gsap.utils.toArray<HTMLElement>(".work-reveal-card").forEach((card) => {
            const fromX = card.dataset.revealSide === "right" ? 72 : -72;
            gsap.from(card, {
              x: isDesktop ? fromX : fromX * 0.6,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            });
          });

          const processItems = gsap.utils.toArray<HTMLElement>(".home-process-step");
        const processPath = pageRef.current?.querySelector<SVGLineElement>(
          ".home-process-flow-path",
        );

        if (processPath && processItems.length > 1) {
          const setFlowProgress = (progress: number) => {
            const activeIndex = getHomeProcessActiveIndex(
              progress,
              processItems.length,
            );
            processItems.forEach((item, index) => {
              item.classList.toggle("is-flow-active", index <= activeIndex);
            });
          };

          gsap.set(processPath, { scaleY: 0, opacity: 1 });
          setFlowProgress(0);

          const flowTween = gsap.to(processPath, {
            scaleY: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".home-process-flow-wrap",
              start: "top 82%",
              end: "bottom 60%",
              scrub: true,
              onUpdate: (self) => setFlowProgress(self.progress),
              onLeaveBack: () => setFlowProgress(-1),
            },
          });

          return () => {
            flowTween.scrollTrigger?.kill();
            flowTween.kill();
            processItems.forEach((item) => item.classList.remove("is-flow-active"));
          };
        }
      });

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".ambient-blob").forEach((blob, index) => {
          gsap.to(blob, {
            xPercent: index % 2 === 0 ? 16 : -14,
            yPercent: index % 3 === 0 ? -12 : 14,
            scale: index % 2 === 0 ? 1.12 : 0.92,
            duration: 9 + index * 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        gsap.utils.toArray<HTMLElement>(".section-art").forEach((art, index) => {
          const paths = art.querySelectorAll(".section-art-path");
          gsap.from(paths, {
            opacity: 0,
            strokeDashoffset: 110,
            duration: 1.4,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: art.parentElement,
              start: "top 84%",
              once: true,
            },
          });
          gsap.to(art, {
            xPercent: index % 2 === 0 ? 2.5 : -2.5,
            yPercent: index % 2 === 0 ? -3 : 3,
            rotation: index % 2 === 0 ? 1.5 : -1.5,
            duration: 7 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".home-process-flow-path", { scaleY: 1, opacity: 1 });
        gsap.utils
          .toArray<HTMLElement>(".home-process-step")
          .forEach((item) => item.classList.add("is-flow-active"));
      });

      return () => mm.revert();
    },
    { scope: pageRef, dependencies: [scrollTriggerPlugin], revertOnUpdate: true }
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allHomeFaqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
    mainEntityOfPage: new URL(seoPath, siteConfig.url).toString(),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom Web Development",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      image: new URL("/og-image.png", siteConfig.url).toString(),
    },
    description: "Custom web design and development for Seychelles businesses, with responsive layouts and technical SEO foundations.",
    areaServed: { "@type": "Country", name: "Seychelles" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Packages",
      itemListElement: packages.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${item.title} Package` },
      })),
    },
  };

  const trackCta = (name: string) =>
    trackEvent("cta_click", { cta_name: name, page_path: window.location.pathname });

  return (
    <div
      ref={pageRef}
      className="site-atmosphere home-neutral-prototype bg-bg text-text"
      onPointerMove={updateSiteAtmospherePointer}
      onPointerUpCapture={replayTouchIconEffect}
    >
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={seoPath}
        keywords="custom website Seychelles, custom web design Seychelles, custom web development Seychelles, website design Seychelles, bespoke websites Seychelles"
        structuredData={[faqSchema, serviceSchema]}
      />

      <Hero
        websiteBuildStory
        trustBadge={{ text: "Web design in Mahé, Seychelles" }}
        headline={{
          lines: ["Your Web Designer of Choice in Seychelles"],
        }}
        subtitle="Built with you, in Seychelles — made custom for your business, not a template."
        tags={[
          {
            text: "Made for your business",
            icon: <InteractiveSvgIcon kind="check" effect="trace" className="h-4 w-4" strokeWidth={2.4} />,
          },
          {
            text: "Works on mobile",
            icon: <InteractiveSvgIcon kind="devices" effect="pop" className="h-4 w-4" />,
          },
          {
            text: "Ready for search",
            icon: <InteractiveSvgIcon kind="search" effect="glow" className="h-4 w-4" />,
          },
        ]}
        buttons={{
          primary: {
            text: siteConfig.primaryCtaLabel,
            link: "/contact",
            onClick: () => trackCta("hero_book_call"),
          },
          secondary: {
            text: "See our work",
            link: "/work",
            onClick: () => trackCta("hero_see_work"),
          },
        }}
      />

      <section className="trust-ribbon home-trust-section section-reveal border-b border-white/10" aria-labelledby="home-trust-title">
        <div className="home-trust-shell container-wide">
          <header className="home-trust-intro reveal-heading">
            <p className="home-trust-eyebrow">What you can verify</p>
            <h2 id="home-trust-title">Clear proof, before a sales call.</h2>
            <p>See live work, know who you are working with and follow the route from first chat through after-launch support.</p>
          </header>
          <div className="home-trust-grid">
          {homeProofPoints.map((item, index) => {
            const proof = (
              <>
                <TrustProofVisual kind={trustProofVisualKinds[index] ?? "support"} value={item.value} />
                <span className="home-trust-proof-copy">
                  <span className="home-trust-proof-label">{item.label}</span>
                  <strong className="home-trust-proof-value">{item.value}</strong>
                  <span className="home-trust-proof-detail">{trustProofDetails[index]}</span>
                </span>
              </>
            );
            if (item.href) {
              return (
                <ProjectLink
                  key={item.label}
                  url={item.href}
                  onClick={() => trackCta("proof_rail_drake_seaside")}
                  className="home-trust-proof focus-ring"
                >
                  {proof}
                </ProjectLink>
              );
            }
            return (
              <div key={item.label} className="home-trust-proof">
                {proof}
              </div>
            );
          })}
          </div>
        </div>
      </section>

      <section ref={firstMotionSectionRef} className="section-light section-reveal section-space relative overflow-hidden border-b border-border" id="fit">
        <div className="ambient-blob absolute -right-24 top-12 h-80 w-80 rounded-full bg-cyan-300/25 blur-[90px]" aria-hidden="true" />
        <SectionArt tone="light" side="right" />
        <div className="ambient-blob absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-[95px]" aria-hidden="true" />
        <div className="container-standard relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <header className="reveal-heading lg:col-span-5">
              <h2 className="text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
                Bring your website <span className="text-gradient-deep">up to date.</span>
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
                If your site feels dated or hard to use on mobile, we will help you work out what to change.
              </p>
              <Link
                to="/what-you-need"
                className="reactive-cta focus-ring group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0b2830] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(10,51,61,0.16)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#0f3a42] hover:shadow-[0_16px_38px_rgba(10,51,61,0.24)]"
              >
                Work out what you need
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </header>

            <div className="grid gap-4 lg:col-span-6 lg:col-start-7">
              {buyerFits.map((item) => (
                <article key={item.title} className="reveal-item group grid gap-4 rounded-2xl border border-border bg-white/70 p-5 shadow-[0_12px_40px_rgba(15,61,68,0.07)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-cyan-600/25 hover:shadow-[0_18px_46px_rgba(15,61,68,0.12)] sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:p-6">
                  <div className="reactive-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d7f7f5] to-[#cbe9f5] text-[#0c6973] shadow-inner" aria-hidden="true">
                    <InteractiveSvgIcon kind={item.icon} effect={item.effect} className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="mt-2 text-balance text-xl font-semibold tracking-[-0.02em] text-text sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-text-muted sm:text-base">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-reveal section-space relative overflow-hidden border-b border-border bg-[#0b161b]" id="featured-work">
        <div className="ambient-blob absolute -left-36 top-1/3 h-96 w-96 rounded-full bg-cyan-600/10 blur-[110px]" aria-hidden="true" />
        <SectionArt tone="dark" side="left" />
        <div className="container-wide relative">
          <header className="reveal-heading max-w-2xl">
            <ScrollRevealText
              as="h2"
              text="Work you can explore."
              className="text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            />
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              Each project is marked as live client work, a concept or a demonstration.
            </p>
          </header>

          <div className="reveal-item mt-12">
            <WorkMarquee label="Selected work">
              {workItems.slice(0, 3).map((project) => (
                <div key={project.id} className="home-work-card card flex h-full flex-col overflow-hidden p-0">
                  <picture className="home-work-card-media block">
                    <source srcSet={project.imageAvifSrcSet} sizes={project.imageSizes} type="image/avif" />
                    <source srcSet={project.imageSrcSet} sizes={project.imageSizes} type="image/webp" />
                    <img
                      src={project.image}
                      alt={`${project.title} website preview`}
                      width="560"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                      style={{ objectPosition: project.imagePosition }}
                    />
                  </picture>
                  <div className="home-work-card-copy flex flex-1 flex-col justify-between p-7">
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-2">{project.status}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-text">{project.title}</h3>
                      <p className="home-work-card-outcome mt-2 text-sm leading-relaxed text-text-muted">{project.outcome}</p>
                    </div>
                    <ProjectLink
                      url={project.url}
                      onClick={() => trackCta(`selected_work_${project.id}`)}
                      className="home-work-card-link focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-accent"
                    >
                      {project.url?.startsWith("http") ? "Visit the live website" : "Explore project"}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </ProjectLink>
                  </div>
                </div>
              ))}
            </WorkMarquee>
          </div>
        </div>
      </section>

      <section className="section-light section-reveal section-space relative overflow-hidden border-b border-border" id="services">
        <div className="ambient-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-200/40 blur-[120px]" aria-hidden="true" />
        <SectionArt tone="light" side="right" />
        <div className="container-wide relative">
          <header className="reveal-heading max-w-2xl">
            <h2 className="text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
              How we can <span className="text-gradient-deep">help.</span>
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              Build something new, refresh what you have or improve search and measurement.
            </p>
            <Link to="/services" className="reactive-cta focus-ring group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#0e6671] to-[#128f89] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(14,102,113,0.2)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_18px_38px_rgba(14,102,113,0.28)]">
              Explore all services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
            </Link>
          </header>

          <div className="reveal-item mt-12">
            <FloatingCarousel
              label="Services"
              className="services-floating-carousel"
              tabs={["Website", "SEO", "Analytics"]}
            >
              {servicePages.hub.families.map((family) => (
                <div key={family.id} className="service-carousel-item">
                  <ServiceFamilyVisual kind={family.id} />
                  <div className="service-carousel-copy">
                    <p className="service-carousel-fit">{family.fit}</p>
                    <h3 className="service-carousel-title">{family.title}</h3>
                    <p className="service-carousel-body">{family.body}</p>
                    <p className="service-carousel-pricing">{family.pricing}</p>
                    <Link
                      to={family.path}
                      onClick={() => trackCta(`service_family_${family.id}`)}
                      className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-accent"
                    >
                      {family.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </FloatingCarousel>
          </div>
        </div>
      </section>

      <section className="section-lagoon section-reveal section-space relative overflow-hidden border-b border-white/10" id="process">
        <div className="ambient-blob absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-200/18 blur-[100px]" aria-hidden="true" />
        <div className="ambient-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-200/16 blur-[110px]" aria-hidden="true" />
        <SectionArt tone="lagoon" side="left" />
        <div className="container-standard relative">
          <header className="reveal-heading max-w-3xl">
            <h2 className="text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
              From first chat <span className="text-gradient-lagoon">to launch.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              You will always know what happens next.
            </p>
          </header>

          <div className="home-process-flow-wrap reveal-item relative mt-12">
            <svg className="home-process-flow" viewBox="0 0 48 100" preserveAspectRatio="none" aria-hidden="true">
              <line className="home-process-flow-base" x1="24" y1="0" x2="24" y2="100" pathLength="100" />
              <line className="home-process-flow-path" x1="24" y1="0" x2="24" y2="100" pathLength="100" />
            </svg>
            <ol className="relative border-t border-white/14">
              {projectSteps.map((step, index) => {
                const icon = processIcons[index] || "message";
                const effect = processEffects[index] || "trace";
                return (
                  <li key={step.title} className="home-process-step group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-white/14 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] lg:grid-cols-12 lg:items-center lg:gap-8">
                    <div className="reactive-icon relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/14 bg-[#12333a] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_22px_rgba(88,213,227,0.08)]" aria-hidden="true">
                      <InteractiveSvgIcon kind={icon} effect={effect} className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="col-start-2 text-xl font-semibold tracking-[-0.02em] text-white lg:col-span-3 lg:col-start-auto">
                      <span className="mr-3 font-mono text-[0.65rem] font-normal text-cyan-100/70">0{index + 1}</span>
                      {step.title}
                    </h3>
                    <p className="col-start-2 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base lg:col-span-6 lg:col-start-6">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="pricing-section home-pricing-compact section-space section-reveal relative overflow-hidden border-b border-white/10" id="packages">
        <div className="ambient-blob absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-500/14 blur-[120px]" aria-hidden="true" />
        <div className="ambient-blob absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-emerald-400/12 blur-[130px]" aria-hidden="true" />
        <div className="container-wide relative">
          <header className="reveal-heading grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
                Find the right <span className="text-gradient-tropical">starting point.</span>
              </h2>
            </div>
            <p className="max-w-lg text-pretty leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
              Starting prices. Your proposal confirms the final cost.
            </p>
          </header>

          <div className="pricing-grid mt-16 grid items-stretch gap-6 lg:mt-10 lg:grid-cols-[0.9fr_1.18fr_0.9fr] lg:gap-5 lg:pt-6">
            {packages.map((pkg, index) => {
              const featured = pkg.id === "starter";
              return (
                <article
                  key={pkg.id}
                  className={`home-pricing-card package-card reveal-item group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 transition-[border-color,box-shadow,transform,filter] duration-500 sm:p-9 lg:p-6 ${
                    featured
                      ? "home-pricing-card-featured featured-package border-cyan-100/55 bg-[#102b31] shadow-[0_38px_120px_rgba(39,208,218,0.32)] sm:p-9 lg:p-7"
                      : "package-card-muted border-white/9 bg-white/[0.035] shadow-[0_16px_48px_rgba(0,0,0,0.22)] hover:-translate-y-2 hover:border-cyan-200/25 hover:bg-white/[0.06]"
                  }`}
                >
                  {featured ? (
                    <>
                      <div className="featured-package-border absolute inset-0 z-20 rounded-[inherit]" aria-hidden="true" />
                      <div className="featured-package-aura absolute inset-0 z-0" aria-hidden="true" />
                      <div className="featured-package-shine absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden="true" />
                      <div className="featured-package-glint featured-package-glint-a absolute" aria-hidden="true" />
                      <div className="featured-package-glint featured-package-glint-b absolute" aria-hidden="true" />
                      <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 items-center gap-2 rounded-b-2xl bg-gradient-to-r from-[#8cf1ed] via-[#61dce6] to-[#78dfa9] px-6 py-2.5 text-[0.68rem] font-black uppercase tracking-[0.17em] text-[#061518] shadow-[0_12px_34px_rgba(88,213,227,0.38)]">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                        Best Value
                      </div>
                    </>
                  ) : null}

                  <div className={`relative z-10 flex items-center justify-between gap-4 ${featured ? "pt-9 lg:pt-7" : "pt-2"}`}>
                    <p className={`font-mono uppercase tracking-[0.16em] ${featured ? "text-[0.76rem] font-bold text-cyan-50" : "text-[0.68rem] text-accent"}`}>{pkg.title}</p>
                    <span className="font-mono text-[0.65rem] text-text-dim">0{index + 1}</span>
                  </div>
                  <p className={`relative z-10 mt-7 font-display font-bold tabular-nums tracking-[-0.045em] lg:mt-5 ${featured ? "text-gradient-tropical text-[2.75rem] sm:text-[3.4rem] lg:text-[3rem]" : "text-3xl text-text sm:text-[2rem]"}`}>{pkg.price}</p>
                  <p className={`relative z-10 mt-4 text-sm leading-relaxed text-text-muted sm:text-base lg:min-h-[3.75rem] lg:text-sm ${featured ? "min-h-[4.75rem] text-white/78" : "min-h-[4.5rem]"}`}>{pkg.description}</p>
                  <ul className={`relative z-10 mt-7 grid border-t pt-6 lg:mt-5 lg:pt-4 ${featured ? "gap-4 border-cyan-100/20 lg:gap-3" : "gap-3.5 border-white/10 lg:gap-3"}`}>
                    {pkg.includes.slice(0, featured ? 6 : 4).map((item) => (
                      <li key={item.title} className="pricing-feature flex gap-3 text-sm text-text-muted">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${featured ? "featured-check bg-cyan-100/18 text-cyan-50 shadow-[0_0_16px_rgba(108,230,232,0.18)]" : "bg-white/7 text-accent"}`} aria-hidden="true">
                          <InteractiveSvgIcon kind="check" effect="trace" className="h-3.5 w-3.5" strokeWidth={2.6} />
                        </span>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?package=${pkg.id}`}
                    onClick={() => trackCta(`package_${pkg.id}`)}
                    className={`reactive-cta focus-ring group/cta relative z-10 mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-black uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color,border-color,filter] duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] lg:mt-6 ${
                      featured
                        ? "featured-package-cta min-h-14 bg-gradient-to-r from-[#8cf1ed] via-[#5edbe5] to-[#78dfa9] text-sm text-[#061518] shadow-[0_16px_44px_rgba(72,210,214,0.36)] hover:brightness-105 hover:shadow-[0_22px_58px_rgba(72,210,214,0.5)]"
                        : "min-h-12 border border-white/14 bg-white/[0.055] text-xs text-white hover:border-cyan-200/35 hover:bg-white/[0.09]"
                    }`}
                  >
                    Discuss {pkg.title}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="reveal-item mt-10 text-center">
            <Link to="/pricing" className="reactive-cta focus-ring group inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold text-cyan-100 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]">
              Compare full package details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-light section-reveal section-space relative overflow-hidden border-b border-border" id="faq">
        <div className="ambient-blob absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px]" aria-hidden="true" />
        <SectionArt tone="light" side="right" />
        <div className="container-standard relative">
          <header className="reveal-heading mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
              A few <span className="text-gradient-deep">useful answers.</span>
            </h2>
          </header>
          <div className="reveal-item mt-10">
            <HomeFaq categories={homeFaqCategories} />
          </div>
        </div>
      </section>

      <section className="final-cta-section section-reveal section-space relative overflow-hidden" id="ready">
        <div className="ambient-blob absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-400/16 blur-[110px]" aria-hidden="true" />
        <div className="ambient-blob absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-emerald-400/14 blur-[120px]" aria-hidden="true" />
        <div className="hero-cinematic-grid absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="container-standard relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="reveal-heading lg:col-span-8">
            <ScrollRevealText
              as="h2"
              text="Tell us what you need."
              className="text-balance text-[clamp(2.6rem,5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.045em]"
            />
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              We aim to reply {siteConfig.responseTime}.
            </p>
          </div>
          <div className="reveal-item flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <MagneticButton
              type="button"
              onClick={() => {
                trackCta("final_book_call");
                navigate("/contact");
              }}
              className="reactive-cta focus-ring group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#70e5e7] to-[#69d9ae] px-7 py-4 text-center text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#071518] shadow-[0_16px_42px_rgba(72,210,214,0.26)] transition-[transform,box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_22px_52px_rgba(72,210,214,0.38)] active:scale-[0.98]"
            >
              <span className="cta-shine" aria-hidden="true" />
              <span className="relative z-10 flex items-center gap-2">
                {siteConfig.primaryCtaLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </MagneticButton>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackContactIntent({ method: "whatsapp", source: "home_final_cta" })}
              className="reactive-cta focus-ring group inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.055] px-7 py-4 text-center text-[0.72rem] font-black uppercase tracking-[0.18em] text-white transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-[#56de8a]/60 hover:bg-[#25D366]/10 active:translate-y-0 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

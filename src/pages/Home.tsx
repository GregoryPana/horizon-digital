import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { InteractiveSvgIcon } from "../components/ui/InteractiveSvgIcon";
import { SectorStoryMark, type SectorStoryKind } from "../components/ui/SectorStoryMark";
import { buildHomeProcessFlowStages } from "../components/ui/homeProcessFlow";
import HomeFaq from "../components/ui/home-faq";
import Hero from "../components/ui/animated-shader-hero";
import { trackContactIntent, trackEvent } from "../lib/analytics";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import {
  businessFacts,
  foundationPackage,
  growthPackage,
  homeFaqCategories,
  homeProofPoints,
  projectSteps,
  services,
  siteConfig,
  starterPackage,
  workItems,
} from "../data/site";

type HomeProps = {
  seoPath?: string;
  seoTitle?: string;
  seoDescription?: string;
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

const buyerFits = [
  {
    number: "01",
    icon: "refresh" as const,
    effect: "trace" as const,
    title: "Your website feels out of date",
    body: "Your business has moved on, but the website is still difficult to share or use on a phone.",
  },
  {
    number: "02",
    icon: "compass" as const,
    effect: "glow" as const,
    title: "You are not sure where to start",
    body: "We can help you work out the pages, content, cost and next steps before anything is built.",
  },
  {
    number: "03",
    icon: "expand" as const,
    effect: "pop" as const,
    title: "Your business has outgrown the website",
    body: "You now have more to explain, more people to reach or better ways for customers to get in touch.",
  },
];

const packages = [foundationPackage, starterPackage, growthPackage];
const serviceIcons = ["browser", "refresh", "search", "devices", "message"] as const;
const serviceEffects = ["trace", "colour", "glow", "pop", "glow"] as const;
const processIcons = ["message", "palette", "code", "launch", "support"] as const;
const processEffects = ["trace", "colour", "trace", "pop", "glow"] as const;
const sectorKinds: SectorStoryKind[] = [
  "hospitality",
  "food",
  "retail",
  "professional",
  "wellness",
  "tours",
  "creative",
];

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
  const allHomeFaqItems = homeFaqCategories.flatMap((category) => category.items);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
          const items = section.querySelectorAll(".reveal-item");
          gsap.from(items.length ? items : section, {
            opacity: 0,
            y: 42,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          });
        });

        gsap.from(".package-card", {
          opacity: 0,
          y: 55,
          scale: 0.96,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".featured-package .pricing-feature", {
          opacity: 0,
          x: -14,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".featured-package",
            start: "top 75%",
            once: true,
          },
        });

        const processItems = gsap.utils.toArray<HTMLElement>(".home-process-step");
        const processPath = pageRef.current?.querySelector<SVGLineElement>(
          ".home-process-flow-path",
        );

        if (processPath && processItems.length > 1) {
          const stages = buildHomeProcessFlowStages(processItems.length);
          const setActiveStep = (activeIndex: number) => {
            processItems.forEach((item, index) => {
              item.classList.toggle("is-flow-active", index === activeIndex);
            });
          };
          const flowTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.55 });

          flowTimeline
            .set(processPath, { scaleY: 0, opacity: 1 })
            .call(() => setActiveStep(0))
            .to({}, { duration: 0.65 });

          stages.slice(1).forEach((stage) => {
            flowTimeline
              .to(processPath, {
                scaleY: stage.progress,
                duration: 0.72,
                ease: "power1.inOut",
              })
              .call(() => setActiveStep(stage.index))
              .to({}, { duration: 0.62 });
          });

          flowTimeline
            .to(processPath, { opacity: 0.18, duration: 0.28, ease: "power1.out" })
            .call(() => setActiveStep(-1))
            .set(processPath, { scaleY: 0 })
            .to(processPath, { opacity: 1, duration: 0.22 })
            .to({}, { duration: 0.35 })
            .pause(0);

          const resetFlow = () => {
            flowTimeline.pause(0);
            gsap.set(processPath, { scaleY: 0, opacity: 1 });
            setActiveStep(-1);
          };
          const processTrigger = ScrollTrigger.create({
            trigger: ".home-process-flow-wrap",
            start: "top 92%",
            end: "bottom 8%",
            onEnter: () => flowTimeline.restart(),
            onEnterBack: () => flowTimeline.restart(),
            onLeave: resetFlow,
            onLeaveBack: resetFlow,
          });

          return () => {
            processTrigger.kill();
            flowTimeline.kill();
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
          .forEach((item) => item.classList.remove("is-flow-active"));
      });

      return () => mm.revert();
    },
    { scope: pageRef }
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
      className="bg-bg text-text"
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
          lines: ["CUSTOM STUNNING WEBSITES"],
          rotatingWords: ["STUNNING", "PROFESSIONAL", "FAST", "MOBILE-READY"],
        }}
        subtitle="We plan, design and build your site with you, so you know what is happening, what it costs and what comes next."
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

      <section className="trust-ribbon border-b border-white/10" aria-label="What you can verify">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-4">
          {homeProofPoints.map((item, index) => {
            const row = (
              <>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] text-cyan-100">0{index + 1}</span>
                <span className="flex flex-col">
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white/55">{item.label}</span>
                  <span className="text-sm font-semibold text-white/90">{item.value}</span>
                </span>
              </>
            );
            const rowClassName =
              "flex min-h-20 items-center gap-4 border-b border-white/10 py-5 text-white sm:border-r sm:px-5 lg:border-b-0 lg:px-6 first:pl-0 last:border-r-0 last:pr-0";
            if (item.href) {
              return (
                <ProjectLink
                  key={item.label}
                  url={item.href}
                  onClick={() => trackCta("proof_rail_drake_seaside")}
                  className={`${rowClassName} focus-ring transition-colors duration-200 hover:text-cyan-100`}
                >
                  {row}
                </ProjectLink>
              );
            }
            return (
              <div key={item.label} className={rowClassName}>
                {row}
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-light section-reveal section-space relative overflow-hidden border-b border-border" id="fit">
        <div className="ambient-blob absolute -right-24 top-12 h-80 w-80 rounded-full bg-cyan-300/25 blur-[90px]" aria-hidden="true" />
        <SectionArt tone="light" side="right" />
        <div className="ambient-blob absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-[95px]" aria-hidden="true" />
        <div className="container-standard relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <header className="reveal-item lg:col-span-5">
              <p className="section-eyebrow">When your website feels behind</p>
              <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
                Bring your website <span className="text-gradient-deep">up to date.</span>
              </h2>
              <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
                If your current site feels dated, hard to use on mobile or no longer matches the business, we can help you work out what to change.
              </p>
              <Link
                to="/what-you-need"
                className="reactive-cta focus-ring group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0b2830] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(10,51,61,0.16)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#0f3a42] hover:shadow-[0_16px_38px_rgba(10,51,61,0.24)]"
              >
                Work out what you need
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </header>

            <div className="reveal-item grid gap-4 lg:col-span-6 lg:col-start-7">
              {buyerFits.map((item) => (
                <article key={item.number} className="group grid gap-4 rounded-2xl border border-border bg-white/70 p-5 shadow-[0_12px_40px_rgba(15,61,68,0.07)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-cyan-600/25 hover:shadow-[0_18px_46px_rgba(15,61,68,0.12)] sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:p-6">
                  <div className="reactive-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d7f7f5] to-[#cbe9f5] text-[#0c6973] shadow-inner" aria-hidden="true">
                    <InteractiveSvgIcon kind={item.icon} effect={item.effect} className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.66rem] tracking-[0.14em] text-accent-strong">{item.number}</span>
                    <h3 className="mt-2 text-balance text-xl font-semibold tracking-[-0.02em] text-text sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-text-muted sm:text-base">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="sector-trust-band reveal-item mt-16">
            <p className="sr-only">Businesses we design for</p>
            <div className="sector-marquee" role="region" aria-label="Businesses we design for">
              <div className="sector-marquee-track">
                {[false, true].map((duplicate) => (
                  <ul key={duplicate ? "duplicate" : "primary"} className="sector-marquee-group" aria-hidden={duplicate || undefined}>
                    <li className="sector-marquee-label">
                      <span className="sector-marquee-signal" aria-hidden="true" />
                      Businesses we design for
                    </li>
                    {businessFacts.business.industries.map((industry, index) => (
                      <li key={`${duplicate ? "duplicate-" : ""}${industry}`} className="sector-marquee-item">
                        <span className="sector-marquee-icon" aria-hidden="true">
                          <SectorStoryMark kind={sectorKinds[index]} className="h-9 w-12" />
                        </span>
                        <span>{industry}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-reveal section-space relative overflow-hidden border-b border-border bg-[#0b161b]" id="featured-work">
        <div className="ambient-blob absolute -left-36 top-1/3 h-96 w-96 rounded-full bg-cyan-600/10 blur-[110px]" aria-hidden="true" />
        <SectionArt tone="dark" side="left" />
        <div className="container-wide relative">
          <header className="reveal-item grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="section-eyebrow">Selected work</p>
              <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
                Work you can <span className="text-gradient-tropical">explore.</span>
              </h2>
            </div>
            <p className="max-w-lg text-pretty text-base leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
              Each project is marked as live client work, a concept or a demonstration.
            </p>
          </header>

          <article className="reveal-item group mt-12 grid overflow-hidden rounded-[1.4rem] border border-border bg-bg-panel shadow-[0_24px_70px_rgba(0,0,0,0.26)] lg:grid-cols-12">
            <div className="relative min-h-[320px] lg:col-span-7 lg:min-h-[520px]">
              <img
                src={workItems[0].imageWebp800 || workItems[0].imageWebp || workItems[0].image}
                alt={`${workItems[0].title} website preview`}
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-5 lg:p-12">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">{workItems[0].status}</p>
                <h3 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.035em] text-text sm:text-4xl">{workItems[0].title}</h3>
                <p className="mt-5 text-pretty leading-relaxed text-text-muted">{workItems[0].outcome}</p>
              </div>
              <ProjectLink
                url={workItems[0].url}
                onClick={() => trackCta("selected_work_drake_seaside")}
                className="focus-ring group mt-10 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-accent"
              >
                Visit the live website
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </ProjectLink>
            </div>
          </article>

          <div className="reveal-item mt-5 grid gap-5 md:grid-cols-2">
            {workItems.slice(1, 3).map((project) => (
              <article key={project.id} className="group grid gap-6 rounded-[1.1rem] border border-border bg-bg-panel p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_18px_42px_rgba(0,0,0,0.22)] sm:grid-cols-[9rem_1fr] sm:items-center">
                <img
                  src={project.imageWebp800 || project.imageWebp || project.image}
                  alt={`${project.title} website preview`}
                  width="360"
                  height="260"
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  style={{ objectPosition: project.imagePosition }}
                />
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-2">{project.status}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.outcome}</p>
                  <ProjectLink
                    url={project.url}
                    onClick={() => trackCta(`selected_work_${project.id}`)}
                    className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-accent"
                  >
                    Explore project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ProjectLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light section-reveal section-space relative overflow-hidden border-b border-border" id="services">
        <div className="ambient-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-200/40 blur-[120px]" aria-hidden="true" />
        <SectionArt tone="light" side="right" />
        <div className="container-standard relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <header className="reveal-item lg:col-span-5">
            <p className="section-eyebrow">Services</p>
            <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
              How we can <span className="text-gradient-deep">help.</span>
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              Build something new, refresh what you have or add the search and contact tools your customers need.
            </p>
            <Link to="/pricing" className="reactive-cta focus-ring group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#0e6671] to-[#128f89] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(14,102,113,0.2)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_18px_38px_rgba(14,102,113,0.28)]">
              Explore services and pricing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
            </Link>
          </header>

          <div className="reveal-item grid gap-3 lg:col-span-6 lg:col-start-7">
            {services.map((service, index) => {
              const icon = serviceIcons[index] || "browser";
              const effect = serviceEffects[index] || "trace";
              return (
                <article key={service.title} className="group grid gap-4 rounded-2xl border border-transparent p-4 transition-[background-color,border-color,transform] duration-300 hover:translate-x-1 hover:border-cyan-700/15 hover:bg-white/70 sm:grid-cols-[3.5rem_1fr] sm:gap-5 sm:p-5">
                  <div className="reactive-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d2f4f1] to-[#dbeafa] text-[#0a6872] shadow-[0_8px_24px_rgba(20,106,117,0.12)]" aria-hidden="true">
                    <InteractiveSvgIcon kind={icon} effect={effect} className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.66rem] text-accent-strong">0{index + 1}</span>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-text">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">{service.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-lagoon section-reveal section-space relative overflow-hidden border-b border-white/10" id="process">
        <div className="ambient-blob absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-200/18 blur-[100px]" aria-hidden="true" />
        <div className="ambient-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-200/16 blur-[110px]" aria-hidden="true" />
        <SectionArt tone="lagoon" side="left" />
        <div className="container-standard relative">
          <header className="reveal-item max-w-3xl">
            <p className="section-eyebrow">How it works</p>
            <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
              From first chat <span className="text-gradient-lagoon">to launch.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              You will know what we are working on, what we need from you and what comes next.
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

      <section className="pricing-section section-space relative overflow-hidden border-b border-white/10" id="packages">
        <div className="ambient-blob absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-500/14 blur-[120px]" aria-hidden="true" />
        <div className="ambient-blob absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-emerald-400/12 blur-[130px]" aria-hidden="true" />
        <div className="container-wide relative">
          <header className="section-reveal grid gap-5 lg:grid-cols-12">
            <div className="reveal-item lg:col-span-7">
              <p className="section-eyebrow">Starting prices</p>
              <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
                Find the right <span className="text-gradient-tropical">starting point.</span>
              </h2>
            </div>
            <p className="reveal-item max-w-lg text-pretty leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
              These are starting prices. Your proposal will confirm the work, final cost and anything not included.
            </p>
          </header>

          <div className="pricing-grid mt-16 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.18fr_0.9fr] lg:gap-5 lg:pt-10">
            {packages.map((pkg, index) => {
              const featured = pkg.id === "starter";
              return (
                <article
                  key={pkg.id}
                  className={`package-card group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 transition-[border-color,box-shadow,transform,filter] duration-500 sm:p-9 ${
                    featured
                      ? "featured-package border-cyan-100/55 bg-[#102b31] shadow-[0_38px_120px_rgba(39,208,218,0.32)] sm:p-10"
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

                  <div className={`relative z-10 flex items-center justify-between gap-4 ${featured ? "pt-9" : "pt-2"}`}>
                    <p className={`font-mono uppercase tracking-[0.16em] ${featured ? "text-[0.76rem] font-bold text-cyan-50" : "text-[0.68rem] text-accent"}`}>{pkg.title}</p>
                    <span className="font-mono text-[0.65rem] text-text-dim">0{index + 1}</span>
                  </div>
                  <p className={`relative z-10 mt-7 font-display font-bold tabular-nums tracking-[-0.045em] ${featured ? "text-gradient-tropical text-[2.75rem] sm:text-[3.4rem]" : "text-3xl text-text sm:text-[2rem]"}`}>{pkg.price}</p>
                  <p className={`relative z-10 mt-4 text-sm leading-relaxed text-text-muted sm:text-base ${featured ? "min-h-[4.75rem] text-white/78" : "min-h-[4.5rem]"}`}>{pkg.description}</p>
                  <ul className={`relative z-10 mt-7 grid border-t pt-6 ${featured ? "gap-4 border-cyan-100/20" : "gap-3.5 border-white/10"}`}>
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
                    className={`reactive-cta focus-ring group/cta relative z-10 mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-black uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color,border-color,filter] duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] ${
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

          <div className="mt-10 text-center">
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
          <header className="reveal-item mx-auto max-w-3xl text-center">
            <p className="section-eyebrow">Before you decide</p>
            <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.04em]">
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
          <div className="reveal-item lg:col-span-8">
            <p className="section-eyebrow">Start a conversation</p>
            <h2 className="mt-5 text-balance text-[clamp(2.6rem,5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              Tell us <span className="text-gradient-tropical">what you need.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              Share a little about your business, your current website and when you would like to start. We aim to reply {siteConfig.responseTime}.
            </p>
          </div>
          <div className="reveal-item flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <Link
              to="/contact"
              onClick={() => trackCta("final_book_call")}
              className="reactive-cta focus-ring group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#70e5e7] to-[#69d9ae] px-7 py-4 text-center text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#071518] shadow-[0_16px_42px_rgba(72,210,214,0.26)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_22px_52px_rgba(72,210,214,0.38)] active:translate-y-0 active:scale-[0.98]"
            >
              <span className="cta-shine" aria-hidden="true" />
              <span className="relative z-10 flex items-center gap-2">
                {siteConfig.primaryCtaLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </Link>
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

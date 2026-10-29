import { motion, useReducedMotion } from "framer-motion";
import { fetchPortfolioProjects } from "../lib/portfolioApi";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { trackEvent } from "../lib/analytics";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import businessFacts from "../data/businessFacts.json";
import { mergePortfolioProjects, normalizePortfolioProject, type LocalPortfolioProject, type NormalizedPortfolioProject } from "../lib/portfolioProject";
import { InertDiv } from "../components/ui/InertDiv";
import { PortfolioDeviceShowcase, type PortfolioDeviceId } from "../components/ui/PortfolioDeviceShowcase";
import { getActiveWorkProjectAtTime, getWorkProjectAccessibility } from "../lib/workPresentation";
import "./Work.css";

gsap.registerPlugin(ScrollTrigger);
interface WorkProject extends LocalPortfolioProject { mediaId: PortfolioDeviceId; }
type RenderableWorkProject = NormalizedPortfolioProject<WorkProject>;
const order = ["drake", "horizon-auto", "takamaka", "forma", "beauty"] as const;
const factIds = { drake: "drake-seaside", "horizon-auto": "horizon-auto", takamaka: "takamaka-house", forma: "forma-studio", beauty: "beauty-demo" } as const;
const backgrounds = { drake: "rgba(16, 63, 76, 0.85)", "horizon-auto": "rgba(72, 66, 58, 0.92)", takamaka: "rgba(10, 72, 81, 0.85)", forma: "rgba(64, 51, 40, 0.90)", beauty: "rgba(94, 47, 49, 0.85)" };
const fallbackProjects: WorkProject[] = order.map((id, index) => {
  const facts = businessFacts.portfolio.find(item => item.id === factIds[id])!;
  return {
    id, mediaId: id, title: id === "drake" ? "Drake Seaside" : facts.title,
    status: facts.status, tier: id === "drake" || id === "horizon-auto" ? "Growth Tier" : "Foundation Tier",
    body: facts.portfolioDescription, link: id === "drake" ? "https://thedrake-seaside.com/?utm_source=horizondigitalsey.com&utm_medium=referral&utm_campaign=portfolio_showcase" : facts.url,
    cta: id === "drake" ? "View live site →" : id === "horizon-auto" ? "View demo →" : id === "beauty" ? "View demonstration →" : "View showcase →",
    reqCta: "Request similar site", bgColor: backgrounds[id], align: index % 2 === 0 ? "left" : "right",
    altText: `${facts.title} laptop and mobile website previews`,
  };
});

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  const staticPresentation = Boolean(shouldReduceMotion);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(0);
  const [activeProject, setActiveProject] = useState(0);
  const warmThroughRef = useRef(0);
  const [warmThrough, setWarmThrough] = useState(0);

  const [projects, setProjects] = useState<RenderableWorkProject[]>(
    fallbackProjects.map(normalizePortfolioProject)
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      const data = await fetchPortfolioProjects();
      if (cancelled) return;

      if (data && data.length > 0) {
        const formattedData = mergePortfolioProjects(data, fallbackProjects).map(project => {
          const local = fallbackProjects.find(item => item.id === project.id)!;
          return { ...project, title: local.title, body: local.body, link: local.link, bgColor: local.bgColor };
        });
        if (formattedData.length > 0) setProjects(formattedData);
      } else if (import.meta.env.DEV) {
        console.info("Portfolio API returned no content; showing local fallback projects.");
      }

    }

    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const fadeIn = {
    initial: staticPresentation ? undefined : { opacity: 0, y: 24 },
    whileInView: staticPresentation ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  useGSAP(() => {
    if (staticPresentation || !containerRef.current || !pinRef.current || !bgRef.current || projects.length === 0) return;
    
    // The first project is the initial scene, not a reveal waiting for scroll.
    gsap.set(bgRef.current, { backgroundColor: projects[0].bgColor });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', // One edge-to-edge scene on every viewport, including phones.
        end: `+=${projects.length * 130}%`, // Extend scrollable area to allow deep scrolling
        pin: pinRef.current,
        scrub: 2, // Slower, more liquid catch-up
        anticipatePin: 1,
      }
    });

    projects.forEach((proj, i) => {
      const revealLabel = `reveal-${i}`;
      const activationLabel = `activate-${i}`;

      // This explicit boundary starts the incoming presentation only after the
      // preceding project's exit has completed. It is also the semantic handoff.
      tl.addLabel(revealLabel);
      tl.addLabel(activationLabel, revealLabel);

      // Ensure specific elements are explicitly interactive only when active
      if (i > 0) {
        tl.fromTo(`.project-text-${i}, .project-actions-${i}`,
          { y: 30, opacity: 0, pointerEvents: 'none' },
          { 
            y: 0, 
            opacity: 1, 
            pointerEvents: 'auto',
            duration: 2.2, 
            ease: 'expo.out', 
            onStart: () => { gsap.set(`.project-text-${i}, .project-actions-${i}`, { zIndex: 10 }) }
          },
          revealLabel
        );
      } else {
        gsap.set(`.project-text-0, .project-actions-0`, { opacity: 1, y: 0, pointerEvents: 'auto', zIndex: 10 });
      }

      tl.fromTo(`.project-visual-${i}`,
        { y: i === 0 ? '0vh' : '60vh', scale: i === 0 ? 1 : 0.85, opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? 'auto' : 'none' },
        { 
          y: '0vh', 
          scale: 1, 
          opacity: 1, 
          pointerEvents: 'auto',
          duration: 3.2, 
          ease: 'expo.out', 
          onStart: () => { gsap.set(`.project-visual-${i}`, { zIndex: 10 }) }
        },
        `${revealLabel}+=0.5`
      );
      
      tl.fromTo(`.project-visual-${i} .portfolio-laptop`,
        { rotateY: i === 0 ? 0 : -3, scale: i === 0 ? 1 : 0.92 },
        { rotateY: 0, scale: 1, duration: 3.8, ease: 'expo.out' },
        "<"
      );

      // Tilt the screen around its hinge, not the laptop base. Positive X puts
      // the top edge farther away, matching an open laptop on every viewport.
      tl.fromTo(`.project-visual-${i} .portfolio-laptop-lid`,
        { "--lid-angle": i === 0 ? "10deg" : "20deg" },
        { "--lid-angle": "10deg", duration: 3.8, ease: 'expo.out' },
        "<"
      );

      tl.fromTo(`.project-visual-${i} .portfolio-phone`,
        { y: i === 0 ? 0 : 18, rotateX: i === 0 ? 0 : -6, rotateY: i === 0 ? 0 : 8, scale: i === 0 ? 1 : 0.92 },
        { y: 0, rotateX: 0, rotateY: 0, scale: 1, duration: 3.8, ease: 'expo.out' },
        "<"
      );

      tl.to(bgRef.current, {
        backgroundColor: proj.bgColor,
        duration: 2,
        ease: 'power2.out'
      }, "<");

      tl.to({}, { duration: 1.5 });

      if (i < projects.length - 1) {
        tl.to(`.project-visual-${i}`, 
          { 
            y: '-60vh', 
            scale: 0.92, 
            opacity: 0, 
            pointerEvents: 'none',
            duration: 3.5, 
            ease: 'power1.inOut',
            onComplete: () => { gsap.set(`.project-visual-${i}`, { zIndex: 1 }) }
          }, 
          `exit-${i}`
        );
        tl.to(`.project-text-${i}, .project-actions-${i}`,
          { 
            y: -20, 
            opacity: 0, 
            scale: 0.95, 
            pointerEvents: 'none',
            duration: 3.0, 
            ease: 'power1.inOut',
            onComplete: () => { gsap.set(`.project-text-${i}, .project-actions-${i}`, { zIndex: 1 }) }
          }, 
          `exit-${i}+=0.1`
        );
      }
    });

    const activationBoundaries = projects.map((_, index) => tl.labels[`activate-${index}`]);
    const syncActiveProject = () => {
      const nextProject = getActiveWorkProjectAtTime(tl.time(), activationBoundaries);
      // Warm the next pair only after browsing begins, never all ten images
      // during the first paint. Previously visited media stays cached on reverse.
      const toWarm = Math.min(projects.length - 1, nextProject + 1);
      if (tl.time() > 0.05 && toWarm > warmThroughRef.current) {
        warmThroughRef.current = toWarm;
        setWarmThrough(toWarm);
      }
      if (nextProject === activeProjectRef.current) return;

      activeProjectRef.current = nextProject;
      setActiveProject(nextProject);
    };

    // Timeline time follows GSAP's scrubbed playhead in both directions; scroll
    // progress does not correspond to these unequal reveal/hold/exit segments.
    tl.eventCallback("onUpdate", syncActiveProject);
    syncActiveProject();

  }, { scope: containerRef, dependencies: [staticPresentation, projects], revertOnUpdate: true });

  return (
    <div className="work-page overflow-hidden bg-bg-main relative" data-work-static={staticPresentation}>
      <Seo
        title="Custom Website Portfolio Seychelles | Horizon Digital"
        description="Explore the Horizon Digital website portfolio. We build custom websites designed to communicate clearly, perform fast, and support real business needs in Seychelles."
        path="/work"
        keywords="custom website portfolio Seychelles, bespoke web design examples Seychelles, custom-built business websites Seychelles, tailored web development showcase"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/work" },
        ]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Horizon Digital Portfolio",
            "description": "Showcase of custom-built websites for businesses in Seychelles.",
            "itemListElement": Array.isArray(projects) ? projects.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "CreativeWork",
                "name": p.title,
                "description": p.body,
                "url": `https://horizondigitalsey.com/work#${p.id}`
              }
            })) : []
          }
        ]}
      />

      <section className="sr-only" aria-label="Portfolio introduction">
        <div className="mb-8 text-center">
          <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.2em] leading-none text-cyan section-eyebrow-glow">Selected work and concepts</span>
          <h1 style={{fontSize: 'var(--text-h1)', fontWeight: 700, lineHeight: 1.03, letterSpacing: '-0.04em', textWrap: 'balance'}}>
            A live client project, concepts, and demonstrations.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] text-text-muted md:text-xl font-normal leading-relaxed">
            Each entry is labelled so you can distinguish commissioned work from a concept or demonstration.
          </p>
        </div>
      </section>

      {/* PINNED MASTER CONTINER */}
      <div ref={containerRef} className="relative w-full z-10">
        <div ref={pinRef} className={staticPresentation
          ? "w-full relative z-10"
          : "work-stage w-full relative overflow-hidden z-10"}>
          <div ref={bgRef} style={{ backgroundColor: projects[0].bgColor }} className={`absolute inset-0 w-full h-full pointer-events-none -z-10 ${staticPresentation ? "hidden" : ""}`} />
          <div className={staticPresentation
            ? "work-static-projects relative w-full"
            : "work-presentation relative w-full h-full mx-auto max-w-7xl"}>
            {projects.map((proj, i) => {
              const accessibility = getWorkProjectAccessibility(i, activeProject, Boolean(staticPresentation));
              return (
              <InertDiv
                key={proj.id}
                data-align={proj.align}
                aria-hidden={accessibility.ariaHidden}
                inert={accessibility.inert}
                className={staticPresentation
                  ? "work-project work-project-static relative w-full"
                  : "work-project absolute inset-0 w-full h-full pointer-events-none"}
                style={staticPresentation ? { backgroundColor: proj.bgColor } : undefined}
              >
                
                <div className={`work-copy project-text-${i} flex flex-col text-left ${staticPresentation ? "pointer-events-auto opacity-100" : "pointer-events-none"} ${!staticPresentation && i !== 0 ? 'opacity-0' : 'opacity-100'}`}>
                  <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-cyan mb-3 md:mb-5 bg-cyan/10 inline-block px-3 py-1.5 rounded-full border border-cyan/20 self-start">
                    {proj.status} · {proj.tier}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-medium text-white mb-4 lg:mb-6 leading-[1.05] tracking-tight">
                    {proj.title}
                  </h2>
                  <p className="text-base md:text-[1.15rem] text-text-muted mb-6 lg:mb-10 leading-relaxed max-w-md font-normal">
                    {proj.body}
                  </p>
                  {proj.id === "horizon-auto" && <p className="mb-5 text-xs text-text-muted">Fictional dealership concept. Enquiries are simulated.</p>}
                </div>

                <div className={`work-visual project-visual-${i} flex flex-col justify-center pointer-events-auto ${staticPresentation || i === 0 ? "opacity-100" : "opacity-0"} w-full`}>
                  <PortfolioDeviceShowcase
                    id={proj.mediaId}
                    title={proj.title}
                    href={proj.link}
                    active={Boolean(staticPresentation) || activeProject === i}
                    preload={!staticPresentation && i <= warmThrough}
                    reducedMotion={Boolean(shouldReduceMotion)}
                    onVisit={() => trackEvent("cta_click", { cta_name: `work_visual_click_${proj.id}`, page_path: window.location.pathname })}
                  />
                </div>

                  <div className={`work-actions project-actions-${i} ${staticPresentation || i === 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                    <a 
                      href={proj.link}
                      target="_blank" 
                      rel="noreferrer" 
                      tabIndex={accessibility.tabIndex}
                      className="group relative flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-cyan/50 hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-hidden pointer-events-auto"
                      onClick={() => trackEvent("cta_click", { cta_name: `work_view_live_${proj.id}`, page_path: window.location.pathname })}
                    >
                      <span className="relative z-10">{proj.cta.replace(' →', '')}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 via-cyan/5 to-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </a>

                    <Link 
                      to={`/contact?request=${encodeURIComponent(proj.title)}`}
                      tabIndex={accessibility.tabIndex}
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-cyan transition-colors pointer-events-auto border-b border-transparent hover:border-cyan/30 pb-0.5"
                      onClick={() => trackEvent("cta_click", { cta_name: `work_request_similar_${proj.id}`, page_path: window.location.pathname })}
                    >
                      {proj.reqCta}
                    </Link>
                  </div>
                
              </InertDiv>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-bg-elev border-t border-accent/10 py-24 md:py-32 relative overflow-hidden text-center relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,209,222,0.04)_0%,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 relative z-10">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.2em] leading-none text-cyan section-eyebrow-glow">What we believe</span>
            <h2 style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance'}}>
              A good website makes the business easy to understand and the next step easy to find.
            </h2>
            <p className="text-[1.1rem] md:text-xl text-text-muted mb-12 font-normal max-w-2xl mx-auto mt-6">
              We design for clear information, responsive use, and straightforward contact paths across common devices.
            </p>
            <Link 
              to="/contact" 
              className="px-8 py-4 sm:px-12 sm:py-5 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center flex items-center justify-center w-full sm:w-auto sm:min-w-[280px] cta-gradient-anim mx-auto"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))', backgroundSize: '300% 100%' }}
              onClick={() => trackEvent("cta_click", { cta_name: "work_start_project", page_path: window.location.pathname })}
            >
              Start your project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

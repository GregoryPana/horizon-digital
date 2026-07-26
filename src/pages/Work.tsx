import { motion, useReducedMotion } from "framer-motion";
import { sanityClient } from "../lib/sanity";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { trackEvent } from "../lib/analytics";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

gsap.registerPlugin(ScrollTrigger);

// Image Imports
import drakeMain from "../assets/work/drake-seaside/drake-seaside.png";
import drakeAltOne from "../assets/work/drake-seaside/drake-seaside 2.png";
import drakeMainWebp from "../assets/work/drake-seaside/drake-seaside.webp";
import drakeAltOneWebp from "../assets/work/drake-seaside/drake-seaside 2.webp";

import seykelzMain from "../assets/work/demo-beauty/demo-beauty.jpg";
import seykelzMainWebp from "../assets/work/demo-beauty/demo-beauty.webp";
import seykelzAltOne from "../assets/work/demo-beauty/demo-beauty 2.png";
import seykelzAltOneWebp from "../assets/work/demo-beauty/demo-beauty 2.webp";

import formaMain from "../assets/work/forma studio/forma studio.png";
import formaMainWebp from "../assets/work/forma studio/forma studio.webp";
import formaAltOne from "../assets/work/forma studio/forma studio 2.png";
import formaAltOneWebp from "../assets/work/forma studio/forma studio 2.webp";

import takamakaMain from "../assets/work/takamaka-house/takamaka house.png";
import takamakaMainWebp from "../assets/work/takamaka-house/takamaka house.webp";
import takamakaAltOne from "../assets/work/takamaka-house/takamaka house 2.png";
import takamakaAltOneWebp from "../assets/work/takamaka-house/takamaka house 2.webp";
import drakeVideo from "../assets/DRAKE_SEASIDE_DESKTOP_OPTIMIZED.mp4";

const fallbackProjects = [
  {
    id: "drake",
    title: "Drake Seaside",
    status: "Live client project",
    tier: "Growth Tier",
    body: "A live redesign with new pages, updated content, and a faster-loading structure.",
    link: "https://thedrake-seaside.com/?utm_source=horizondigitalsey.com&utm_medium=referral&utm_campaign=portfolio_showcase",
    cta: "View live site →",
    reqCta: "Request similar site",
    videoSrc: drakeVideo,
    fallbackSrc: drakeMain,
    webpSrc: drakeMainWebp,
    altSrc: drakeAltOne,
    altWebpSrc: drakeAltOneWebp,
    altText: "Drake Seaside booking detail interface",
    align: "left",
    isEager: true,
    bgColor: "rgba(10, 40, 80, 0.45)" // deep blue with transparency
  },
  {
    id: "takamaka",
    title: "Takamaka House",
    status: "Concept showcase",
    tier: "Foundation Tier",
    body: "A hospitality concept focused on accommodation details, visual storytelling, and direct booking intent.",
    link: "https://horizondigitalsey.com/showcase/takamaka-house",
    cta: "View showcase →",
    reqCta: "Request similar site",
    fallbackSrc: takamakaMain,
    webpSrc: takamakaMainWebp,
    altSrc: takamakaAltOne,
    altWebpSrc: takamakaAltOneWebp,
    altText: "Takamaka House detail interface",
    align: "right",
    bgColor: "rgba(0, 160, 180, 0.15)" // sea blue/cyan with transparency
  },
  {
    id: "forma",
    title: "Forma Studio",
    status: "Concept showcase",
    tier: "Foundation Tier",
    body: "A portfolio-led concept with an editorial layout and a clear enquiry path.",
    link: "https://horizondigitalsey.com/showcase/forma-studio",
    cta: "View showcase →",
    reqCta: "Request similar site",
    fallbackSrc: formaMain,
    webpSrc: formaMainWebp,
    altSrc: formaAltOne,
    altWebpSrc: formaAltOneWebp,
    altText: "Forma Studio gallery interface",
    align: "left",
    bgColor: "rgba(210, 180, 140, 0.15)" // beige with transparency
  },
  {
    id: "beauty",
    title: "Beauty Demo",
    status: "Demonstration site",
    tier: "Foundation Tier",
    body: "A demonstration of a focused service-business website with clear services, pricing, and contact paths.",
    link: "https://demo-beauty.horizondigitalsey.com/",
    cta: "View demonstration →",
    reqCta: "Request similar site",
    fallbackSrc: seykelzMain,
    webpSrc: seykelzMainWebp,
    altSrc: seykelzAltOne,
    altWebpSrc: seykelzAltOneWebp,
    altText: "Beauty demo services detail interface",
    align: "right",
    bgColor: "rgba(255, 182, 193, 0.15)" // pastel pink with transparency
  }
];

const projectStatusByTitle: Record<string, string> = {
  "Drake Seaside": "Live client project",
  "Drake Seaside Apartments": "Live client project",
  "Takamaka House": "Concept showcase",
  "Forma Studio": "Concept showcase",
  "Beauty Demo": "Demonstration site",
};

function LaptopMockupVisual({ 
  webpSrc, fallbackSrc, alt, isEager = false, videoSrc, altSrc, altWebpSrc, altText, index 
}: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, [videoSrc]);

  return (
    <div className="w-full max-w-[340px] sm:max-w-[460px] lg:max-w-none mx-auto pb-2 lg:pb-16 pt-2 group relative pointer-events-auto">
      <div 
        className={`laptop-model-${index} relative w-full mx-auto will-change-transform pointer-events-auto`}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom center', perspective: '1400px' }}
      >
        <div style={{ transformStyle: 'preserve-3d' }} className="relative rounded-t-lg lg:rounded-t-[1.5rem] bg-[#0a0a0a] border-4 lg:border-[0.6rem] border-[#0a0a0a] shadow-xl overflow-hidden ring-1 ring-white/10 z-20">
           <div className="absolute top-1 lg:top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 lg:w-2 lg:h-2 bg-black rounded-full z-20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
           <div className="relative w-full overflow-hidden bg-zinc-900 rounded-sm lg:rounded-[0.5rem] translate-z-0" style={{aspectRatio: '16/10'}}>
             {videoSrc ? (
               <video 
                 ref={videoRef}
                 src={videoSrc} 
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 className="w-full h-full object-cover object-top" 
               />
             ) : (
               <picture className="block w-full h-full">
                 <source srcSet={webpSrc} type="image/webp" />
                 <img src={fallbackSrc} alt={alt} width={800} height={500} loading={isEager ? 'eager' : 'lazy'} fetchPriority={isEager ? 'high' : 'auto'} decoding="async" className="w-full h-full object-cover object-top" />
               </picture>
             )}
           </div>
        </div>
        <div style={{ transform: 'rotateX(88deg)', transformOrigin: 'top center', transformStyle: 'preserve-3d' }} className="absolute top-[99%] left-[0%] w-[100%] aspect-[2.4] bg-[#1a1a1a] rounded-b-md lg:rounded-b-2xl border-t border-[#333] border-b-[6px] lg:border-b-[8px] border-b-[#050505] shadow-[0_32px_48px_rgba(0,0,0,0.6)] z-10 flex flex-col items-center justify-between py-[4%]">
          <div className="w-[85%] h-[50%] bg-[#0a0a0a] rounded-sm lg:rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,1)] ring-1 ring-white/5 opacity-80"></div>
          <div className="w-[20%] h-[25%] bg-[#0f0f0f] rounded-sm lg:rounded-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] ring-1 ring-white/5 opacity-80"></div>
        </div>
      </div>
      
      {altSrc && (
        <div className={`hidden md:flex w-full justify-center ${index % 2 === 0 ? 'xl:justify-end xl:-ml-12' : 'xl:justify-start xl:ml-12'} -mt-10 sm:-mt-24 relative z-20 pointer-events-none px-4 sm:px-8 xl:px-0`}>
          <picture className="block rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.45)] w-[80%] md:w-[62%]">
            <source srcSet={altWebpSrc} type="image/webp" />
            <img src={altSrc} alt={altText} width={600} height={400} loading="lazy" decoding="async" className="w-full h-auto" />
          </picture>
        </div>
      )}
    </div>
  );
}

function WorkSkeleton() {
  return (
    <div className="absolute inset-0 w-full h-full px-5 sm:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-20 items-center justify-start lg:justify-center pt-0 sm:pt-12 lg:pt-0">
      <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-start lg:justify-center text-left w-full">
        <Skeleton className="h-6 w-32 rounded-full mb-5" />
        <Skeleton className="h-12 w-full max-w-md rounded-lg mb-6" />
        <Skeleton className="h-4 w-full max-w-sm rounded-md mb-3" />
        <Skeleton className="h-4 w-3/4 max-w-sm rounded-md mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-24 rounded-full" />
        </div>
      </div>
      <div className="lg:col-span-12 xl:col-span-7 w-full aspect-[16/10] max-w-[600px]">
        <Skeleton className="w-full h-full rounded-tr-[1.5rem] rounded-tl-[1.5rem] bg-zinc-900/50" />
      </div>
    </div>
  );
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const [dataLoaded, setDataLoaded] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const query = `*[_type == "portfolio"] | order(_createdAt asc) {
          "id": _id,
          title,
          "tier": category,
          "body": short_desc,
          link,
          cta,
          reqCta,
          bgColor,
          align,
          "fallbackSrc": cover_image.asset->url,
          "altSrc": alt_image.asset->url,
          "videoSrc": videoFile.asset->url,
          "altText": cover_image.altText
        }`;
        const data = await sanityClient.fetch(query);
        if (data && data.length > 0) {
          // Format sanity data to have webp fallback strings if needed
          const formattedData = data.map((p: any) => ({
            ...p,
            status: projectStatusByTitle[p.title] ?? "Unclassified showcase",
            cta:
              (projectStatusByTitle[p.title] ?? "Unclassified showcase") === "Live client project"
                ? "View live site →"
                : (projectStatusByTitle[p.title] ?? "Unclassified showcase") === "Demonstration site"
                  ? "View demonstration →"
                  : "View showcase →",
            fallbackSrc: p.fallbackSrc ? `${p.fallbackSrc}?auto=format` : null,
            webpSrc: p.fallbackSrc ? `${p.fallbackSrc}?fm=webp` : null,
            altSrc: p.altSrc ? `${p.altSrc}?auto=format` : null,
            altWebpSrc: p.altSrc ? `${p.altSrc}?fm=webp` : null,
          }));
          setProjects(formattedData);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error("Failed to fetch projects from Sanity", err);
        setProjects(fallbackProjects);
      } finally {
        setDataLoaded(true);
      }
    }
    fetchProjects();
  }, []);

  const fadeIn = {
    initial: shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(8px)' },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as any },
  };

  useGSAP(() => {
    if (shouldReduceMotion || !containerRef.current || !pinRef.current || !bgRef.current || !dataLoaded || projects.length === 0) return;
    
    // Set initial transparent bg
    gsap.set(bgRef.current, { backgroundColor: 'transparent' });

    // Create master timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 5%', // Start pinning when top of container hits near top of viewport
        end: `+=${projects.length * 130}%`, // Extend scrollable area to allow deep scrolling
        pin: pinRef.current,
        scrub: 2, // Slower, more liquid catch-up
        anticipatePin: 1
      }
    });

    projects.forEach((proj: any, i: number) => {
      // Ensure specific elements are explicitly interactive only when active
      if (i > 0) {
        tl.fromTo(`.project-text-${i}`,
          { y: 30, opacity: 0, pointerEvents: 'none' },
          { 
            y: 0, 
            opacity: 1, 
            pointerEvents: 'auto',
            duration: 2.2, 
            ease: 'expo.out', 
            onStart: () => { gsap.set(`.project-text-${i}`, { zIndex: 10 }) }
          },
          `reveal-${i}`
        );
      } else {
        gsap.set(`.project-text-0`, { opacity: 1, y: 0, pointerEvents: 'auto', zIndex: 10 });
      }

      tl.fromTo(`.project-visual-${i}`,
        { y: '60vh', scale: 0.85, opacity: 0, pointerEvents: 'none' },
        { 
          y: '0vh', 
          scale: 1, 
          opacity: 1, 
          pointerEvents: 'auto',
          duration: 3.2, 
          ease: 'expo.out', 
          onStart: () => { gsap.set(`.project-visual-${i}`, { zIndex: 10 }) }
        },
        `reveal-${i}+=0.5` 
      );
      
      tl.fromTo(`.laptop-model-${i}`,
        { rotateX: -22, rotateY: -3, scale: 0.92 },
        { rotateX: -12, rotateY: 0, scale: 1, duration: 3.8, ease: 'expo.out' },
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
        tl.to(`.project-text-${i}`, 
          { 
            y: -20, 
            opacity: 0, 
            scale: 0.95, 
            pointerEvents: 'none',
            duration: 3.0, 
            ease: 'power1.inOut',
            onComplete: () => { gsap.set(`.project-text-${i}`, { zIndex: 1 }) }
          }, 
          `exit-${i}+=0.1`
        );
      }
    });

  }, { scope: containerRef, dependencies: [shouldReduceMotion, dataLoaded, projects] });

  return (
    <div className="overflow-hidden bg-gradient-to-b from-bg-main to-bg-panel/20 relative">
      <h1 className="sr-only">Custom Website Design Portfolio Horizon Digital</h1>
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

      <section className="pt-12 pb-8 md:pt-24 md:pb-16 text-center px-5 sm:px-8 max-w-5xl mx-auto relative z-20 bg-bg-main/80 backdrop-blur-sm">
        <motion.div {...fadeIn} className="mb-8 text-center">
          <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.2em] leading-none text-cyan section-eyebrow-glow">Selected work and concepts</span>
          <h2 className="font-display mx-auto max-w-4xl text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            A live client project, concepts, and demonstrations.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] text-text-muted md:text-xl font-normal leading-relaxed">
            Each entry is labelled so you can distinguish commissioned work from a concept or demonstration.
          </p>
        </motion.div>
      </section>

      {/* PINNED MASTER CONTINER */}
      <div ref={containerRef} className="relative w-full z-10">
        <div ref={pinRef} className="h-[100dvh] w-full relative flex flex-col justify-center overflow-hidden z-10 pt-16 sm:pt-20">
          <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />
          <div className="relative w-full h-[85vh] min-h-[600px] flex mx-auto max-w-7xl items-center justify-center">
            {!dataLoaded ? (
              <WorkSkeleton />
            ) : (
              projects.map((proj: any, i: number) => (
              <div key={proj.id} className="absolute inset-0 w-full h-full px-5 sm:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-20 items-center justify-start lg:justify-center pointer-events-none pt-0 sm:pt-12 lg:pt-0">
                
                <div className={`project-text-${i} lg:col-span-12 xl:col-span-5 flex flex-col justify-start lg:justify-center text-left pointer-events-none ${proj.align === 'right' ? 'xl:order-2' : 'xl:order-1'} ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-cyan mb-3 md:mb-5 bg-cyan/10 inline-block px-3 py-1.5 rounded-full border border-cyan/20 self-start">
                    {proj.status} · {proj.tier}
                  </p>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-medium text-white mb-4 lg:mb-6 leading-[1.05] tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="text-base md:text-[1.15rem] text-text-muted mb-6 lg:mb-10 leading-relaxed max-w-md font-normal">
                    {proj.body}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 lg:gap-8 justify-start mt-2">
                    <a 
                      href={proj.link}
                      target="_blank" 
                      rel="noreferrer" 
                      className="group relative flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-cyan/50 hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-hidden pointer-events-auto"
                      onClick={() => trackEvent("cta_click", { cta_name: `work_view_live_${proj.id}`, page_path: window.location.pathname })}
                    >
                      <span className="relative z-10">{proj.cta.replace(' →', '')}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 via-cyan/5 to-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </a>

                    <Link 
                      to={`/contact?request=${encodeURIComponent(proj.title)}`}
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-cyan transition-colors pointer-events-auto border-b border-transparent hover:border-cyan/30 pb-0.5"
                      onClick={() => trackEvent("cta_click", { cta_name: `work_request_similar_${proj.id}`, page_path: window.location.pathname })}
                    >
                      {proj.reqCta}
                    </Link>
                  </div>
                </div>
                
                <div className={`project-visual-${i} lg:col-span-12 xl:col-span-7 flex flex-col justify-center pointer-events-none opacity-0 ${proj.align === 'right' ? 'xl:order-1' : 'xl:order-2'} w-full mt-4 lg:mt-0`}>
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block w-full pointer-events-auto cursor-pointer"
                    onClick={() => trackEvent("cta_click", { cta_name: `work_visual_click_${proj.id}`, page_path: window.location.pathname })}
                  >
                    <LaptopMockupVisual {...proj} index={i} />
                  </a>
                </div>
                
              </div>
            ))
          )}
          </div>
        </div>
      </div>

      <section className="bg-bg-elev border-t border-accent/10 py-24 md:py-32 relative overflow-hidden text-center relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,209,222,0.04)_0%,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 relative z-10">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.2em] leading-none text-cyan section-eyebrow-glow">What we believe</span>
            <h2 className="font-display mx-auto max-w-4xl text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Great websites feel effortless — for you and your customers.
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

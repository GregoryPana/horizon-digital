import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";
import { trackEvent } from "../lib/analytics";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
import horizonVideo from "../assets/Horizon Mockup-1.mp4";
import drakeVideo from "../assets/DRAKE_SEASIDE_DESKTOP_OPTIMIZED.mp4";

const projects = [
  {
    id: "drake",
    title: "Drake Seaside",
    tier: "Growth Tier",
    body: "A complete redesign with new pages, faster loading, and a layout that turns visitors into bookings.",
    link: "https://drakeseaside.com",
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
    tier: "Foundation Tier",
    body: "A calm, immersive site designed to let the beauty of Takamaka House do the talking – and make guests excited to book before they even arrive.",
    link: "https://horizondigitalsey.com/showcase/takamaka-house",
    cta: "View live site →",
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
    tier: "Foundation Tier",
    body: "A clean, editorial showcase for a creative studio – designed to let their work breathe and make enquiries feel natural.",
    link: "https://horizondigitalsey.com/showcase/forma-studio",
    cta: "View live site →",
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
    tier: "Foundation Tier",
    body: "A fast, focused site for a service business - clear pricing, easy contact, and a layout that turns curious visitors into real clients.",
    link: "https://demo-beauty.horizondigitalsey.com/",
    cta: "View live site →",
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

function LaptopMockupVisual({ 
  webpSrc, fallbackSrc, alt, isEager = false, videoSrc, altSrc, altWebpSrc, altText, index 
}: any) {
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
               <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover object-top" />
             ) : (
               <picture className="block w-full h-full">
                 <source srcSet={webpSrc} type="image/webp" />
                 <img src={fallbackSrc} alt={alt} width={800} height={500} loading={isEager ? 'eager' : 'lazy'} fetchPriority={isEager ? 'high' : 'auto'} className="w-full h-full object-cover object-top" />
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
            <img src={altSrc} alt={altText} width={600} height={400} loading="lazy" className="w-full h-auto" />
          </picture>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const fadeIn = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
  };

  useGSAP(() => {
    if (shouldReduceMotion || !containerRef.current || !pinRef.current || !bgRef.current) return;

    // Set initial transparent bg
    gsap.set(bgRef.current, { backgroundColor: 'transparent' });

    // Create master timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 5%', // Start pinning when top of container hits near top of viewport
        end: `+=${projects.length * 130}%`, // Extend scrollable area to allow deep scrolling
        pin: pinRef.current,
        scrub: 1,
        anticipatePin: 1
      }
    });

    projects.forEach((proj, i) => {
      // 1. Text is already at opacity 0 via class, so we fade it in FIRST (except item 0 which starts visible)
      if (i > 0) {
        tl.fromTo(`.project-text-${i}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
          `reveal-${i}`
        );
      } else {
        // Ensure first item text is fully visible immediately
        gsap.set(`.project-text-0`, { opacity: 1, y: 0 });
      }

      // 2. ONLY THEN, device flows up from bottom
      // Adding a dynamic delay gap between text arriving and device arriving
      tl.fromTo(`.project-visual-${i}`,
        { y: '100vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 2, ease: 'power2.out' },
        `+=${0.5}` 
      );
      
      // Inside visual, tilt the laptop dynamically adding cinematic isometric flair
      tl.fromTo(`.laptop-model-${i}`,
        { rotateX: -25, scale: 0.95 },
        { rotateX: -12, scale: 1, duration: 2, ease: 'power2.out' },
        "<" // concurrent with visual ascending
      );

      // Transition the background color
      tl.to(bgRef.current, {
        backgroundColor: proj.bgColor,
        duration: 2,
        ease: 'power2.out'
      }, "<");

      // 3. Locked in position pause (the user scrolls but nothing moves)
      tl.to({}, { duration: 1.5 });

      // 4. Move everything out to make way for next project (if not the last project)
      if (i < projects.length - 1) {
        // Visual flows out to the TOP
        tl.to(`.project-visual-${i}`, 
          { y: '-100vh', opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 
          `exit-${i}`
        );
        // Text fades out gently in place
        tl.to(`.project-text-${i}`, 
          { opacity: 0, scale: 0.98, duration: 1.5, ease: 'power2.inOut' }, 
          `exit-${i}`
        );
      }
    });

  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <div className="overflow-hidden bg-gradient-to-b from-bg-main to-bg-panel/20 relative">
      <h1 className="sr-only">Custom Website Design Portfolio Horizon Digital</h1>
      <Seo
        title="Custom Website Portfolio Seychelles | Horizon Digital"
        description="Explore the Horizon Digital website portfolio. We build custom websites designed to communicate clearly, perform fast, and support real business needs in Seychelles."
        path="/work"
        keywords="custom website portfolio Seychelles, bespoke web design examples Seychelles, custom-built business websites Seychelles, tailored web development showcase"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
            { "@type": "ListItem", position: 2, name: "Our Work", item: `${siteConfig.url}/work` },
          ],
        }}
      />

      <section className="pt-12 pb-8 md:pt-24 md:pb-16 text-center px-5 sm:px-8 max-w-5xl mx-auto relative z-20 bg-bg-main/80 backdrop-blur-sm">
        <motion.div {...fadeIn} className="mb-8 text-center">
          <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.2em] leading-none text-cyan section-eyebrow-glow">Real work, real businesses</span>
          <h2 className="font-display mx-auto max-w-4xl text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            Custom websites we've built with care.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] text-text-muted md:text-xl font-normal leading-relaxed">
            Every site you see here was built for a real business, with real goals. Take a look and imagine what we could do with our custom approach for yours.
          </p>
        </motion.div>
      </section>

      {/* PINNED MASTER CONTINER */}
      <div ref={containerRef} className="relative w-full z-10">
        <div ref={pinRef} className="h-[100dvh] w-full relative flex flex-col justify-center overflow-hidden z-10 pt-16 sm:pt-20">
          <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />
          <div className="relative w-full h-[85vh] min-h-[600px] flex mx-auto max-w-7xl items-center justify-center">
            {projects.map((proj, i) => (
              <div key={proj.id} className="absolute inset-0 w-full h-full px-5 sm:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-20 items-center justify-start lg:justify-center pointer-events-none pt-0 sm:pt-12 lg:pt-0">
                
                <div className={`project-text-${i} lg:col-span-12 xl:col-span-5 flex flex-col justify-start lg:justify-center text-left pointer-events-auto ${proj.align === 'right' ? 'xl:order-2' : 'xl:order-1'} ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-cyan mb-3 md:mb-5 bg-cyan/10 inline-block px-3 py-1.5 rounded-full border border-cyan/20 self-start">
                    {proj.tier}
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
                      className="text-xs md:text-sm font-medium uppercase tracking-widest text-white hover:text-cyan transition-colors underline decoration-cyan/40 hover:decoration-cyan underline-offset-[10px]"
                      onClick={() => trackEvent("cta_click", { cta_name: `work_view_live_${proj.id}`, page_path: window.location.pathname })}
                    >
                      {proj.cta}
                    </a>
                  </div>
                </div>
                
                <div className={`project-visual-${i} lg:col-span-12 xl:col-span-7 flex flex-col justify-center pointer-events-auto opacity-0 ${proj.align === 'right' ? 'xl:order-1' : 'xl:order-2'} w-full mt-4 lg:mt-0`}>
                  <LaptopMockupVisual {...proj} index={i} />
                </div>
                
              </div>
            ))}
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
              We build every site to look great, load fast, and feel natural to use — on any device, at any time.
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

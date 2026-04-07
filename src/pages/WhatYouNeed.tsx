import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { MessageSquare, Navigation, Layout, MessageCircle, Briefcase, ShoppingBag, Bed } from "lucide-react";
import Seo from "../components/Seo";
import { ScenarioIcon } from "../components/ui/symbol-icons";
import { useCmsContent } from "../content/cms-content";
import { trackEvent } from "../lib/analytics";


export default function WhatYouNeed() {
  const { siteConfig } = useCmsContent();
  const shouldReduceMotion = useReducedMotion();
  const [activeCarousel, setActiveCarousel] = useState(0);
  const carouselScrollRef = useRef<HTMLDivElement>(null);

  const scrollCarouselTo = (targetIndex: number, totalSlides: number) => {
    if (!carouselScrollRef.current) return;
    const scrollContainer = carouselScrollRef.current;
    
    let index = targetIndex;
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    
    // Calculate the left position to center the item
    // On mobile, the item is calc(100vw - 40px), container padding is 20px (px-5)
    // So centering the item means its left edge should be at 20px from container start
    const child = scrollContainer.children[index] as HTMLElement;
    if (child) {
      scrollContainer.scrollTo({
        left: child.offsetLeft - 20,
        behavior: "smooth"
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    // Account for the 20px offset
    const index = Math.round(scrollLeft / (width - 40));
    setActiveCarousel(index);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `What Does a Website Actually Involve? | ${siteConfig.name}`,
    description: `A plain-English guide for Seychelles business owners — what a domain, build, and hosting actually mean, what type of website suits your business, and how to get started with ${siteConfig.name}.`,
    url: new URL("/what-you-need", siteConfig.url).toString(),
  };

  const fadeInUp = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">What Custom Website Does Your Business Need?</h1>
      <Seo
        title={`Choosing the Right Custom Website | ${siteConfig.name}`}
        description="A guide to understanding custom website options for your Seychelles business. Learn about domains, hosting, and finding the perfect custom web solution."
        path="/what-you-need"
        keywords="what custom website do I need, bespoke business website types Seychelles, custom web design guidance"
        structuredData={serviceSchema}
      />

      {/* Hero Intro */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 text-center px-5 sm:px-8 max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="mb-20 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">YOUR GUIDE TO GETTING STARTED</span>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-8 text-balance">
            Not sure where to start? Good — <span className="text-cyan font-semibold">most people aren't.</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            This page explains <span className="text-cyan font-semibold">everything simply</span> — what a website involves, what type suits your business, and how we work together. <span className="text-cyan font-semibold">No jargon, no pressure.</span>
          </p>
        </motion.div>
      </section>

      {/* 3 Columns - Website Types */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-panel/10 to-transparent pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl relative z-10 px-5 sm:px-8">
          <motion.div className="mb-12 md:mb-16 text-center" {...fadeInUp}>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow text-center">WHAT KIND OF BUSINESS DO YOU HAVE?</span>
            <h2 className="font-display mx-auto max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">Most businesses in Seychelles fall into one of these three types</h2>
          </motion.div>

          {/* Swipeable Carousel on Mobile, Grid on Desktop */}
          <div 
            ref={carouselScrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 gap-6 md:gap-8 -mx-5 px-5 md:mx-0 md:px-0 pb-8 md:pb-0"
          >
            
            <motion.div 
              className="flex-shrink-0 min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] md:min-w-0 md:w-auto md:max-w-none snap-center rounded-2xl border border-border bg-[#121214] backdrop-blur pb-10 pt-12 px-8 text-center hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.1 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-deep-teal/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Briefcase className="h-8 w-8 text-deep-teal" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Service Business</h3>
              <p className="text-sm text-text-muted/90 leading-relaxed">
                You offer a service — like a salon, a clinic, a repair shop, or a consultancy. Your website's job is to explain <span className="text-cyan font-semibold">what you do clearly</span> and make it easy for customers to get in touch.
              </p>
            </motion.div>

            <motion.div 
              className="flex-shrink-0 min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] md:min-w-0 md:w-auto md:max-w-none snap-center rounded-2xl border border-border bg-[#121214] backdrop-blur pb-10 pt-12 px-8 text-center hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.2 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-deep-teal/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <ShoppingBag className="h-8 w-8 text-deep-teal" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Retail Showcase</h3>
              <p className="text-sm text-text-muted/90 leading-relaxed">
                You sell physical products — like a boutique, a bakery, or a gift shop. Your website should show what you stock, <span className="text-cyan font-semibold">at what price</span>, and make it simple for customers to order or visit.
              </p>
            </motion.div>

            <motion.div 
              className="flex-shrink-0 min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] md:min-w-0 md:w-auto md:max-w-none snap-center rounded-2xl border border-border bg-[#121214] backdrop-blur pb-10 pt-12 px-8 text-center hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.3 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-deep-teal/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Bed className="h-8 w-8 text-deep-teal" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Hospitality</h3>
              <p className="text-sm text-text-muted/90 leading-relaxed">
                You run a guesthouse, villa, restaurant, or tour operation. Your website should make guests <span className="text-cyan font-semibold">feel the experience</span> before they arrive — and make booking as easy as one tap.
              </p>
            </motion.div>

          </div>

          {/* Carousel Navigation UI - Mobile Only */}
          <div className="flex justify-center items-center gap-4 mt-6 md:hidden">
            <button 
              onClick={() => scrollCarouselTo(activeCarousel - 1, 3)} 
              className="flex items-center justify-center p-3 text-cyan hover:text-cyan-400 transition-colors bg-[#1A1A1C] border border-white/5 shadow-sm rounded-full active:scale-95"
              aria-label="Previous type"
            >
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${activeCarousel === i ? "w-8 bg-cyan" : "w-2 bg-gray-700 hover:bg-gray-500 cursor-pointer"}`}
                  onClick={() => scrollCarouselTo(i, 3)}
                />
              ))}
            </div>
            <button 
              onClick={() => scrollCarouselTo(activeCarousel + 1, 3)} 
              className="flex items-center justify-center p-3 text-cyan hover:text-cyan-400 transition-colors bg-[#1A1A1C] border border-white/5 shadow-sm rounded-full active:scale-95"
              aria-label="Next type"
            >
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 md:py-24 border-y border-border relative">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
           <motion.div className="mb-12 md:mb-16 text-center" {...fadeInUp}>
              <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-4 text-balance">What <span className="text-cyan font-semibold">every</span> website comes with</h2>
              <p className="text-text-muted/90 max-w-2xl mx-auto">No matter which package you choose, these essentials are always <span className="semibold-underline text-white">part of the build.</span></p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                 { 
                   name: "Contact form", 
                   benefit: <>Customers can <span className="text-cyan font-semibold">message you directly</span> from any page</>, 
                   icon: MessageSquare 
                 },
                 { 
                   name: "Enquiry flow", 
                   benefit: <>Visitors are <span className="text-cyan font-semibold">guided naturally</span> toward reaching out</>, 
                   icon: Navigation 
                 },
                 { 
                   name: "Product or service display", 
                   benefit: <>What you offer is shown <span className="text-cyan font-semibold">clearly</span> with photos and details</>, 
                   icon: Layout 
                 },
                 { 
                   name: "Booking or WhatsApp link", 
                   benefit: <><span className="text-cyan font-semibold">One tap</span> connects a customer straight to you</>, 
                   icon: MessageCircle 
                 },
               ].map((item, i) => (
                <motion.div 
                  key={item.name} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 md:gap-5"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal/5 border border-deep-teal/20">
                    <item.icon className="h-5 w-5 text-deep-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text text-base md:text-lg leading-snug mb-1">{item.name}</h4>
                    <p className="text-sm text-text-muted/80 leading-relaxed">{item.benefit}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Educational Basics Section */}
      <section className="py-24 md:py-32 relative bg-gradient-to-b from-transparent to-bg-panel/20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 relative z-10">
          <motion.div className="mb-16 md:mb-20 text-center" {...fadeInUp}>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow text-center">HOW IT WORKS</span>
            <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-6">Three things every website on the internet needs</h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              Whether you build with us or anyone else, these three things are <span className="text-cyan font-semibold">always required.</span> Understanding them helps you make <span className="text-gradient-cyan font-semibold">confident decisions.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                num: "1", 
                title: "What is a domain name?", 
                desc: (
                  <>
                    Your domain is your address online — for example, <span className="text-cyan font-semibold">yourbusiness.sc</span>. It legally belongs to you, and is registered for a small annual fee.
                  </>
                )
              },
              { 
                num: "2", 
                title: "What is design and build?", 
                desc: (
                  <>
                    Designing how your site looks and building it for all devices. This is a one-time project — once done, you <span className="text-gradient-cyan font-semibold">own the finished files.</span>
                  </>
                )
              },
              { 
                num: "3", 
                title: "What is website hosting?", 
                desc: (
                  <>
                    Your built site needs a server to live on 24/7. Think of it like rent for the <span className="semibold-underline text-white">digital space</span> your website occupies.
                  </>
                )
              }
            ].map((card, i) => (
              <motion.div 
                key={card.num}
                className="bg-bg-panel/60 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-border group hover:!border-[#00E5FF] transition-all flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6"
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <div className="md:w-1/3 flex items-center justify-center">
                  <span className="text-7xl md:text-8xl font-bold text-deep-teal opacity-80 group-hover:opacity-100 transition-opacity leading-none">
                    {card.num}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-text mb-3">{card.title}</h3>
                  <p className="text-sm text-text-muted/80 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Fit / Scenario Banners */}
      <section className="pt-24 md:pt-32 pb-0 relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.05)_0%,transparent_50%)] pointer-events-none"/>
         <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
             <motion.div className="mb-16 md:mb-20 text-center" {...fadeInUp}>
                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">TWO WAYS WE CAN WORK TOGETHER</span>
                <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-6">Both paths lead to the same result — a <span className="text-cyan font-semibold">great website</span></h2>
                <p className="text-lg text-text-muted">The only difference is <span className="text-white font-medium">who looks after the hosting</span> once your site is live. Here is what each option means in practice.</p>
             </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {/* Option 1 */}
               <motion.div 
                 className="group relative overflow-hidden rounded-3xl border border-border bg-bg-elev p-8 md:p-12 hover:!border-[#00E5FF] transition-all duration-300"
                 {...fadeInUp}
               >
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-8">
                     <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-semibold bg-deep-teal/10 text-deep-teal rounded-full">Option 1</span>
                     <ScenarioIcon className="w-12 h-12 text-deep-teal opacity-20 group-hover:opacity-40 transition-opacity"/>
                   </div>
                   <h3 className="text-2xl font-semibold text-text mb-8">We build it — you choose where it lives</h3>
                   <ul className="space-y-5 text-sm md:text-[15px] text-text-muted">
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-teal" />
                        <span>We handle <span className="text-cyan font-semibold">everything</span> — design, build, and launch.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-teal" />
                        <span>Once live, your site is hosted by a provider you choose — such as Netlify or a local host.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-teal" />
                        <span>Your domain name <span className="text-cyan font-semibold">always stays</span> registered in your name.</span>
                      </li>
                   </ul>
                 </div>
               </motion.div>

               {/* Option 2 */}
               <motion.div 
                 className="group relative overflow-hidden rounded-3xl border border-accent/30 bg-bg-panel bg-gradient-to-b from-accent/5 to-transparent p-8 md:p-12 hover:!border-[#00E5FF] transition-all duration-300"
                 {...fadeInUp} transition={{ delay: 0.2 }}
               >
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-8">
                     <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-semibold bg-cyan border border-cyan text-black rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]">Option 2 (Recommended)</span>
                     <ScenarioIcon className="w-12 h-12 text-deep-teal opacity-20 group-hover:opacity-40 transition-opacity"/>
                   </div>
                   <h3 className="text-2xl font-semibold text-text mb-8">We build it and keep it running for you</h3>
                   <ul className="space-y-5 text-sm md:text-[15px] text-text-muted">
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-teal" />
                        <span>We handle design, build, launch, and all hosting — you <span className="text-cyan font-semibold">don't need to think</span> about the technical side.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-teal" />
                        <span><span className="text-cyan font-semibold">One person to call</span> or WhatsApp if anything ever needs attention.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-teal" />
                        <span>Your domain name stays registered in your name — we never hold it on your behalf.</span>
                      </li>
                   </ul>
                 </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Prepare CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center px-5 sm:px-8">
           <motion.div {...fadeInUp} className="w-full">
             <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Before we start</span>
             <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-8">A few things that help us <span className="text-cyan font-semibold">hit the ground running</span></h2>
             <p className="text-base md:text-lg text-text-muted/80 mb-12 max-w-2xl mx-auto">
               Before we begin, it helps to have a few things ready — your list of services or products, your contact details, any logo or branding you already have, and links to your social media if you use them. <span className="text-cyan font-semibold">Don't worry</span> if you're missing some of these. We'll tell you exactly what we need and help you get it together.
             </p>
              <Link 
                to="/contact" 
                className="w-full max-w-md mx-auto block hover:scale-[1.02] transition-transform duration-300"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "what_you_need_start_conversation",
                    page_path: window.location.pathname,
                  })
                }
              >
                <button 
                  className="w-full py-5 rounded-full text-black font-black tracking-[0.2em] uppercase text-sm shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 flex items-center justify-center cta-gradient-anim"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00E5FF, #38B2F5, #0C7CC4, #00E5FF)', backgroundSize: '300% 100%' }}
                >
                  Start a conversation
                </button>
              </Link>
           </motion.div>
        </div>
      </section>

    </div>
  );
}

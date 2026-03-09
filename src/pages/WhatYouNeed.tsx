import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { BuildIcon, DomainIcon, HostingIcon, ScenarioIcon } from "../components/ui/symbol-icons";
import { siteConfig } from "../data/site";
import WordReveal from "../components/ui/word-reveal";

export default function WhatYouNeed() {
  const shouldReduceMotion = useReducedMotion();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "What You Need | Horizon Digital",
    description: "Understand the essentials: website build, domain, and hosting packages tailored for Seychelles businesses.",
    url: new URL("/what-you-need", siteConfig.url).toString(),
  };

  const fadeInUp = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">What Website Does Your Business Need?</h1>
      <Seo
        title="What Website Does Your Business Need? | Horizon Digital"
        description="A clear guide for Seychelles businesses choosing the right website type, features, and package. Learn about service, retail, and hospitality web design."
        path="/what-you-need"
        keywords="what website do I need, business website types Seychelles, website package guidance, web design hosting"
        structuredData={serviceSchema}
      />

      {/* Hero Intro */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 text-center px-5 sm:px-8 max-w-5xl mx-auto">
        <motion.div {...fadeInUp}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow mb-6">
            Guidance
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text mb-8">
            <WordReveal staggerDelay={0.06}>What website does your business actually need?</WordReveal>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Many businesses know they need a website but are unsure which type is right. This guide helps you choose with clarity and confidence.
          </p>
        </motion.div>
      </section>

      {/* 3 Columns - Website Types */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-panel/20 to-transparent pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <motion.div 
              className="md:col-span-4 rounded-2xl border border-white/[0.05] bg-bg-elev/50 backdrop-blur pb-10 pt-12 px-8 text-center hover:border-accent/30 hover:bg-bg-elev/80 transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.1 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <BuildIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Service Business</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Best for consultants, agencies, and service providers that need clear service pages, high authority, and a strong enquiry flow.
              </p>
            </motion.div>

            <motion.div 
              className="md:col-span-4 rounded-2xl border border-white/[0.05] bg-bg-elev/50 backdrop-blur pb-10 pt-12 px-8 text-center hover:border-accent-2/30 hover:bg-bg-elev/80 transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.2 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <DomainIcon className="h-8 w-8 text-accent-2" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Retail Showcase</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Useful for product-based businesses that need to display items clearly and guide customers toward contact or order requests.
              </p>
            </motion.div>

            <motion.div 
              className="md:col-span-4 rounded-2xl border border-white/[0.05] bg-bg-elev/50 backdrop-blur pb-10 pt-12 px-8 text-center hover:border-accent/30 hover:bg-bg-elev/80 transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.3 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <HostingIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Hospitality</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Designed to highlight accommodation, facilities, local trust signals, and simplified booking enquiries.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-24 border-y border-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <motion.div className="text-center mb-16" {...fadeInUp}>
             <h2 className="text-3xl md:text-5xl font-semibold text-text tracking-tight mb-4">Built-in Features</h2>
             <p className="text-text-muted max-w-2xl mx-auto">Most business websites rely on a clear core feature set before adding complex tools.</p>
           </motion.div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
                "Contact forms",
                "Enquiry flows",
                "Product displays",
                "Booking links",
              ].map((feature, i) => (
                <motion.div 
                  key={feature} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-white/10 bg-gradient-to-tr from-white/[0.02] to-transparent p-6 text-center shadow-lg hover:border-accent/40 transition-colors"
                >
                  <span className="font-semibold text-text text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Package Fit / Scenario Banners */}
      <section className="py-24 md:py-32 relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(70,198,232,0.05)_0%,transparent_50%)] pointer-events-none"/>
         <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
            <motion.div className="mb-16 md:w-2/3" {...fadeInUp}>
               <p className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-4">Package Fit</p>
               <h2 className="text-3xl md:text-5xl font-semibold text-text mb-6 tracking-tight">Choosing the right approach</h2>
               <p className="text-lg text-text-muted">Simple needs usually fit Foundation, while businesses needing flexibility often prefer Starter or Growth.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
               {/* Option 1 */}
               <motion.div 
                 className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-elev p-8 md:p-12 hover:border-white/20 transition-colors"
                 {...fadeInUp}
               >
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                   <ScenarioIcon className="w-24 h-24 text-accent border border-accent rounded-full p-4"/>
                 </div>
                 <div className="relative z-10">
                   <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-semibold bg-accent/10 text-accent rounded-full mb-6">Option 1</span>
                   <h3 className="text-2xl font-semibold text-text mb-6 max-w-[80%]">Website by Horizon, hosting elsewhere</h3>
                   <ul className="space-y-4 text-sm md:text-base text-text-muted">
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        We design, engineer, and build your fully-optimised website.
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        Hosting is managed by your preferred external provider.
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        Your domain remains registered entirely with you.
                      </li>
                   </ul>
                 </div>
               </motion.div>

               {/* Option 2 */}
               <motion.div 
                 className="group relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/5 to-bg-elev p-8 md:p-12 shadow-[0_0_40px_rgba(70,198,232,0.05)]"
                 {...fadeInUp} transition={{ delay: 0.2 }}
               >
                 <div className="absolute top-0 right-0 p-8 opacity-30 group-hover:opacity-60 transition-opacity">
                   <ScenarioIcon className="w-24 h-24 text-accent fill-accent/20"/>
                 </div>
                 <div className="relative z-10">
                   <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-semibold bg-accent border border-accent text-bg rounded-full mb-6 shadow-[0_0_15px_rgba(70,198,232,0.5)]">Option 2 (Recommended)</span>
                   <h3 className="text-2xl font-semibold text-text mb-6 max-w-[80%]">Website and hosting by Horizon Digital</h3>
                   <ul className="space-y-4 text-sm md:text-base text-text-muted">
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        We design, build, launch, and securely manage all hosting.
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        You get one point of contact for build and technical support.
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        Your domain is still handled by you at your registrar for safety.
                      </li>
                   </ul>
                 </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Prepare CTA */}
      <section className="bg-bg-panel/40 py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-5 sm:px-8">
           <motion.div {...fadeInUp}>
             <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4">Project Prep</p>
             <h2 className="text-3xl md:text-5xl font-semibold text-text mb-8">Preparing for your website build</h2>
             <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto">
               A few basics help your project move faster and launch cleaner. Gather your service list, contact details, any branding/logos, and existing social links. If you are not sure where to start, we guide you through each item.
             </p>
             <Link to="/contact" className="inline-block hover:scale-105 transition-transform duration-300">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#46c6e8"
                  className="px-8 py-4 text-sm font-semibold tracking-[0.08em] text-black shadow-lg shadow-accent/20"
                >
                  Start a conversation
                </ShimmerButton>
              </Link>
           </motion.div>
        </div>
      </section>

    </div>
  );
}

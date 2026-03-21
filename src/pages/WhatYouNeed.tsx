import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { BuildIcon, DomainIcon, HostingIcon, ScenarioIcon } from "../components/ui/symbol-icons";
import { siteConfig } from "../data/site";

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
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, ease: "easeOut" as const },
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
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow mb-6">
            Not sure where to start?
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-text mb-8">
            Let's find the right website for where you are right now
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            You don't need to know the answers yet. This guide will help you figure it out in minutes.
          </p>
        </motion.div>
      </section>

      {/* 3 Columns - Website Types */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-panel/20 to-transparent pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <motion.div 
              className="md:col-span-4 rounded-2xl border border-border bg-[#121214] backdrop-blur pb-10 pt-12 px-8 text-center hover:border-accent/30 transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.1 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <BuildIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Service Business</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Perfect if you offer a service and want customers to understand what you do, feel confident, and reach out easily.
              </p>
            </motion.div>

            <motion.div 
              className="md:col-span-4 rounded-2xl border border-border bg-[#121214] backdrop-blur pb-10 pt-12 px-8 text-center hover:border-accent-2/30 transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.2 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <DomainIcon className="h-8 w-8 text-accent-2" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Retail Showcase</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Great for product-based businesses that want to display items clearly and guide customers toward contact or a purchase request.
              </p>
            </motion.div>

            <motion.div 
              className="md:col-span-4 rounded-2xl border border-border bg-[#121214] backdrop-blur pb-10 pt-12 px-8 text-center hover:border-accent/30 transition-all duration-500 group"
              {...fadeInUp} transition={{ delay: 0.3 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <HostingIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Hospitality</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Designed to highlight accommodation, facilities, and local trust, with a simple booking enquiry path that makes guests want to say yes.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-24 border-y border-border">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <motion.div className="text-center mb-16" {...fadeInUp}>
             <h2 className="font-display text-3xl md:text-5xl font-semibold text-text tracking-tight mb-4">What comes included</h2>
             <p className="text-text-muted max-w-2xl mx-auto">Every business website starts with the same core building blocks — here's what those look like.</p>
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
                  className="rounded-xl border border-border bg-gradient-to-tr from-white/[0.02] to-transparent p-6 text-center shadow-lg hover:border-accent/40 transition-colors"
                >
                  <span className="font-semibold text-text text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Educational Basics Section */}
      <section className="py-24 md:py-32 relative bg-gradient-to-b from-transparent to-bg-panel/20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
          <motion.div className="mb-16 max-w-3xl mx-auto text-center" {...fadeInUp}>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow mb-4">How it works</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-text mb-6 tracking-tight">Three things every website needs</h2>
            <p className="text-lg text-text-muted">
              Whether you build with us or someone else, every website needs three things to exist on the internet. Here's what they are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-bg-panel p-8 rounded-3xl border border-border shadow-lg flex flex-col items-center text-center hover:border-accent/40 transition-colors"
              {...fadeInUp}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">The Domain Name</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                This is your address on the internet (like <span className="text-text font-medium">yourbusiness.sc</span>). You rent this name from a domain registrar annually. It is best practice to register this yourself so you always legally own your name.
              </p>
            </motion.div>

            <motion.div 
              className="bg-bg-panel p-8 rounded-3xl border border-border shadow-lg flex flex-col items-center text-center hover:border-accent/40 transition-colors relative overflow-hidden"
              {...fadeInUp} transition={{ delay: 0.1 }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">Design & Build</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                This is the actual work of creating the visual layouts, formatting your content, and writing the code. This is a one-off project that creates your website files (what we specialize in).
              </p>
            </motion.div>

            <motion.div 
              className="bg-bg-panel p-8 rounded-3xl border border-border shadow-lg flex flex-col items-center text-center hover:border-accent/40 transition-colors"
              {...fadeInUp} transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-4">The Hosting</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Once built, your website files need somewhere to "live" online 24/7. Hosting is the server space where your website runs. This can be securely managed by us, or a provider of your choice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Package Fit / Scenario Banners */}
      <section className="py-24 md:py-32 relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.05)_0%,transparent_50%)] pointer-events-none"/>
         <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
             <motion.div className="mb-16 max-w-3xl mx-auto text-center" {...fadeInUp}>
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow mb-4">Find your fit</p>
               <h2 className="font-display text-3xl md:text-5xl font-semibold text-text mb-6 tracking-tight">How would you like to work with us?</h2>
               <p className="text-lg text-text-muted">Both options give you a great result. The difference is just who handles the hosting side.</p>
             </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
               {/* Option 1 */}
               <motion.div 
                 className="group relative overflow-hidden rounded-3xl border border-border/40 bg-bg-elev p-8 md:p-12 hover:border-border/80 transition-colors"
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
                 className="group relative overflow-hidden rounded-3xl border border-accent/30 bg-bg-panel bg-gradient-to-b from-accent/5 to-transparent p-8 md:p-12 shadow-[0_0_40px_rgba(0,229,255,0.05)]"
                 {...fadeInUp} transition={{ delay: 0.2 }}
               >
                 <div className="absolute top-0 right-0 p-8 opacity-30 group-hover:opacity-60 transition-opacity">
                   <ScenarioIcon className="w-24 h-24 text-accent fill-accent/20"/>
                 </div>
                 <div className="relative z-10">
                   <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-semibold bg-accent border border-accent text-bg rounded-full mb-6 shadow-[0_0_15px_rgba(0,229,255,0.5)]">Option 2 (Recommended)</span>
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
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow mb-4">Before we start</p>
             <h2 className="font-display text-3xl md:text-5xl font-semibold text-text mb-8 tracking-tight">A few things that help us hit the ground running</h2>
             <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto">
               Gathering a few basics before we start keeps things moving and the launch clean. Think: your service list, contact details, any logos or branding, and your social links. Not sure what you have? We'll walk you through it.
             </p>
             <Link to="/contact" className="inline-block hover:scale-105 transition-transform duration-300">
                <ShimmerButton
                  shimmerColor="#0A0A0C"
                  shimmerDuration="4.2s"
                  background="#00E5FF"
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

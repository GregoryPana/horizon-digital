import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";
import { trackContactIntent, trackEvent } from "../lib/analytics";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";


export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    initial: shouldReduceMotion ? undefined : { opacity: 0, y: 22, filter: 'blur(8px)' },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">About Horizon Digital - Custom Website Design studio</h1>
      <Seo
        title="Custom Website Design Studio Seychelles | About Horizon Digital"
        description="Horizon Digital is a Mahé-based studio that plans, designs and builds custom websites for Seychelles businesses."
        path="/about"
        keywords="about Horizon Digital, custom web design studio Seychelles, bespoke website designer Seychelles, custom web development"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": siteConfig.name,
              "url": siteConfig.url,
              "logo": `${siteConfig.url}/og-image.png`,
              "description": "Horizon Digital is a web design and development studio based on Mahé, Seychelles.",
              "areaServed": { "@type": "Country", "name": "Seychelles" }
            }
          }
        ]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />


      {/* Section 1 — Opening: The Person, Not the Business */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative">
        <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
          <motion.div {...fadeInUp} className="mb-12">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">WHO WE ARE</span>
            <h2 className="font-display max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              A Seychelles studio built on one belief — your website should <span className="text-cyan font-semibold">work as hard as you do</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <motion.div 
              className="lg:col-span-6 order-1 lg:order-1" 
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/5] lg:aspect-[16/10] rounded-3xl overflow-hidden border border-border shadow-2xl">
                <motion.picture
                  initial={shouldReduceMotion ? undefined : { scale: 1.1, opacity: 0 }}
                  whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <source media="(min-width: 1024px)" srcSet="/studio-desktop.webp" />
                  <img 
                    src="/studio-mobile.webp" 
                    alt="Horizon Digital workspace in Seychelles"
                    className="w-full h-full object-cover object-bottom lg:object-center"
                    loading="lazy"
                  />
                </motion.picture>
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-40" />
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-6 order-2 lg:order-2 space-y-8"
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-6 text-lg text-text-muted leading-relaxed">
                <p>
                  We started Horizon Digital because we kept seeing the same problem — good Seychelles businesses with <span className="semibold-underline text-white">bad websites.</span> Guesthouses that looked worse online than they were in person. Restaurants with no online presence at all. Shops that couldn't be found on Google.
                </p>
                <p>
                  We build websites for local businesses that look <span className="text-gradient-cyan font-semibold">genuinely professional</span>, work across common screen sizes, and make the business easier to understand and contact. Not templates with your name dropped in. Custom sites, built around how your business works.
                </p>
                <p>
                  We're <span className="semibold-underline text-white">based on Mahé.</span> We speak to every client directly. And we're <span className="text-cyan font-semibold">available on WhatsApp</span> when you need us.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] font-black uppercase tracking-[0.2em]">
                 <div className="flex items-center gap-2.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-cyan" />
                   <span className="text-cyan">Based on Mahé</span>
                 </div>
                 <div className="flex items-center gap-2.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-cyan" />
                   <span className="text-cyan">Available on WhatsApp</span>
                 </div>
                 <div className="flex items-center gap-2.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-cyan" />
                   <span className="text-cyan">Personal Service</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 — The Local Difference */}
      <section className="py-24 bg-bg-panel/30 border-y border-border relative">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">WHY LOCAL MATTERS</span>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-8">
              Most web agencies don't know what <span className="text-white">"guesthouse seychelles"</span> means to someone searching from abroad
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-16">
              <span className="text-gradient-cyan font-bold uppercase">WE do.</span> We understand the search terms your customers use, the platforms they book through, and what Seychelles travellers and locals are <span className="semibold-underline text-white">actually looking for</span> when they find your site. An overseas agency builds a generic website. We build a website for your <span className="text-white">specific business</span>, in your specific market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            
            <motion.div
              className="space-y-8"
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: -24, filter: 'blur(8px)' }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-red-400/60">Any agency</h3>
               <ul className="space-y-5 text-base text-text-dim leading-relaxed">
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>Generic layouts built for <span className="text-text-dim">any market</span></span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>No understanding of Seychelles search behaviour</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>Communication across time zones for foreign studios</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>No accountability once the project closes</span>
                  </li>
               </ul>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: 24, filter: 'blur(8px)' }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-deep-teal">Horizon Digital</h3>
               <ul className="space-y-5 text-base text-text-muted leading-relaxed">
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Custom high quality layouts built <span className="text-cyan font-semibold">around your business</span></span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Designed for how Seychelles customers search and browse</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Same timezone, <span className="text-cyan font-semibold">available on WhatsApp</span></span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Ongoing support from the <span className="semibold-underline text-white">person who built your site</span></span>
                  </li>
               </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 — What We Actually Do (Values in Practice) */}
      <section className="py-24 md:py-32 relative">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div className="mb-16 md:mb-24 text-center" {...fadeInUp}>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow text-center">HOW WE WORK</span>
            <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">A few things we believe about building websites</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Values Section with Variety */}
            {[
              {
                num: "01",
                title: "Your website should explain your business in seconds, not paragraphs",
                desc: (
                  <>
                    When someone lands on your site they decide within a few seconds whether to stay or leave. We design every page so the most important thing — <span className="text-gradient-cyan font-semibold">what you do and why to choose you</span> — is impossible to miss.
                  </>
                )
              },
              {
                num: "02",
                title: "A beautiful website that nobody can find is a waste of your money",
                desc: (
                  <>
                    We set up every site so Google understands what your business is and where you are. That means when someone searches for what you offer in Seychelles, your site has a <span className="text-gradient-cyan font-semibold">real chance of appearing.</span>
                  </>
                )
              },
              {
                num: "03",
                title: "You should always own your personal website completely",
                desc: (
                  <>
                    When your project closes, the finished site <span className="text-gradient-cyan font-semibold">belongs to you.</span> Not us. If you ever want to move to a different host or work with someone else, there is nothing stopping you. We believe that's how it should be.
                  </>
                )
              },
              {
                num: "04",
                title: "You shouldn't need a degree to understand the process",
                desc: (
                  <>
                    We explain everything in <span className="text-gradient-cyan font-semibold">plain language.</span> No jargon, no acronyms you have to Google, no decisions you feel unprepared to make. If something is confusing, that's our failure, not yours.
                  </>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className="flex flex-col gap-6"
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: i % 2 === 0 ? -28 : 28, filter: 'blur(8px)' }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-4xl md:text-5xl font-black text-deep-teal opacity-80 leading-none">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text mb-4 leading-tight">{item.title}</h3>
                  <p className="text-base text-text-muted leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — The Work as Trust Evidence */}
      <section className="py-24 border-t border-border bg-bg-panel/10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <motion.div className="mb-16 md:mb-20 text-center" {...fadeInUp}>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">WHAT THIS LOOKS LIKE IN PRACTICE</span>
              <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">One live client project, alongside two concept showcases.</h2>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Drake Seaside Apartments",
                  tier: "LIVE CLIENT PROJECT · GROWTH TIER",
                  outcome: "A live redesign with new pages, updated content, and a faster-loading structure.",
                  url: "https://thedrake-seaside.com/"
                },
                {
                  name: "Takamaka House",
                  tier: "CONCEPT SHOWCASE · FOUNDATION TIER",
                  outcome: "A hospitality concept focused on accommodation details, visual storytelling, and direct booking intent.",
                  url: "https://horizondigitalsey.com/showcase/takamaka-house"
                },
                {
                  name: "Forma Studio",
                  tier: "CONCEPT SHOWCASE · FOUNDATION TIER",
                  outcome: "A portfolio-led concept with an editorial layout and a clear enquiry path.",
                  url: "https://horizondigitalsey.com/showcase/forma-studio"
                }
              ].map((project, i) => (
                <motion.div 
                  key={project.name}
                  className="bg-bg-panel p-8 md:p-10 rounded-3xl border border-border flex flex-col h-full hover:border-accent/50 transition-colors group"
                  {...fadeInUp}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                   <div className="mb-6">
                      <span className="px-3 py-1 rounded-full border border-deep-teal/30 bg-deep-teal/5 text-[11px] font-black tracking-widest text-deep-teal uppercase">
                        {project.tier}
                      </span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-6 font-display">{project.name}</h3>
                   <p className="text-sm text-text-muted leading-relaxed mb-8 flex-grow">
                     {project.outcome}
                   </p>
                   <a 
                     href={project.url} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan hover:text-white transition-colors"
                     onClick={() =>
                       trackEvent("cta_click", {
                         cta_name: `about_view_site_${project.name.toLowerCase().replace(/\s+/g, "_")}`,
                         page_path: window.location.pathname,
                       })
                     }
                   >
                     View project <ExternalLink className="w-3 h-3" />
                   </a>
                </motion.div>
              ))}
           </div>

           <motion.div
             className="text-center"
             initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
             whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.15 }}
             transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
           >
              <Link to="/work" className="text-sm font-bold uppercase tracking-widest text-cyan hover:text-white transition-colors underline decoration-cyan/30 underline-offset-8">
                See the full portfolio →
              </Link>
           </motion.div>
        </div>
      </section>

      {/* Section 5 — Specificity Strip (The Trust Mechanics) */}
      <section className="py-10 md:py-12 border-y border-border bg-bg-panel/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 items-center">
              {[
                "Performance tested before launch",
                "Starting prices published in SCR",
                "Built for Seychelles — in Seychelles",
                "Structured for Google to understand"
              ].map((text, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left h-full"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16, filter: 'blur(6px)' }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="hidden lg:block w-px h-8 bg-border/50" />
                  <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] text-cyan text-balance leading-relaxed">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Section 6 — Closing CTA */}
      <section className="py-24 md:py-32 relative">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
           <motion.div {...fadeInUp} className="space-y-12">
             <div>
               <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">LET'S TALK</span>
               <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl mb-8">
                 Ready to find out what the right website could do for your business?
               </h2>
               <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                 You will speak directly with the person who will build your site — not a sales team, not an account manager. Just an honest conversation about what your business needs.
               </p>
             </div>

             <div className="flex flex-col items-center gap-8">
                <a 
                  href={siteConfig.whatsappUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full max-w-md"
                  onClick={() =>
                    trackContactIntent({ method: "whatsapp", source: "about_page" })
                  }
                >
                  <button
                    className="w-full py-5 rounded-full text-black font-black tracking-[0.2em] uppercase text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 flex items-center justify-center gap-3 cta-gradient-anim"
                    style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))', backgroundSize: '300% 100%' }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </button>
                </a>

                <Link 
                  to="/contact" 
                  className="text-sm font-bold uppercase tracking-widest text-cyan hover:text-white transition-colors underline decoration-cyan/30 underline-offset-8"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "about_contact_form_link",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  Or fill in the contact form →
                </Link>

             </div>
           </motion.div>
        </div>
      </section>

    </div>
  );
}

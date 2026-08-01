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
    viewport: { once: false, amount: 0.15 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">About Horizon Digital - Custom Website Design studio</h1>
      <h1 id="about-title" style={{fontSize: 'var(--text-h1)', fontWeight: 700, lineHeight: 1.03, letterSpacing: '-0.04em', textWrap: 'balance', position: 'absolute', width: 1, height: 1, padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0}}>About Horizon Digital — Custom Website Design Studio</h1>
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
            <h2 style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance'}}>
              A Seychelles studio building websites around <span className="text-cyan font-semibold">how local businesses work.</span>
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
                  viewport={{ once: false, amount: 0.3 }}
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
                  Horizon Digital plans, designs and builds custom websites for Seychelles businesses. We started the studio to offer a more considered alternative to generic website packages.
                </p>
                <p>
                  We focus on <span className="text-gradient-cyan font-semibold">clear information and custom design</span>, with layouts that work across common screen sizes and make the business easier to understand and contact.
                </p>
                <p>
                  We're <span className="semibold-underline text-white">based on Mahé.</span> Clients speak directly with the person responsible for the work, and we remain <span className="text-cyan font-semibold">available on WhatsApp</span> throughout the project.
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
                   <span className="text-cyan">Direct communication</span>
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
            <h2 style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: '2rem', textWrap: 'balance'}}>
              Local context helps us ask <span className="text-white">better questions.</span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-16">
              Being based in Seychelles does not replace research. It gives us useful context when we discuss your customers, services, booking or enquiry process and the practical constraints around content, access and timing. The website is still planned around your <span className="text-white">specific business</span>, not assumptions about the market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            
            <motion.div
              className="space-y-8"
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: -24, filter: 'blur(8px)' }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-red-400/60">What we learn</h3>
               <ul className="space-y-5 text-base text-text-dim leading-relaxed">
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>Who the website needs to serve</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>What customers need to understand before they contact you</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>How bookings, enquiries or other contact paths currently work</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                     <span>Which content, accounts and approvals the project depends on</span>
                  </li>
               </ul>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: 24, filter: 'blur(8px)' }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-deep-teal">Horizon Digital</h3>
               <ul className="space-y-5 text-base text-text-muted leading-relaxed">
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Custom layouts built <span className="text-cyan font-semibold">around your business</span></span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Responsive design for common phones, tablets and desktop screens</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Direct communication in the same timezone, including <span className="text-cyan font-semibold">WhatsApp</span></span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-deep-teal" />
                     <span>Clear ownership and package-based support after launch</span>
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
            <h2 style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance'}}>A few things we believe about building websites</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Values Section with Variety */}
            {[
              {
                num: "01",
                title: "Make the business clear quickly",
                desc: (
                  <>
                    We organise each page around the information people need first: <span className="text-gradient-cyan font-semibold">what the business offers, who it is for and how to make contact.</span>
                  </>
                )
              },
              {
                num: "02",
                title: "Give search engines a clear structure",
                desc: (
                  <>
                    Website packages include page-level metadata, internal structure, crawlable pages and sitemap setup. These foundations help search engines understand the site, but <span className="text-gradient-cyan font-semibold">rankings are not guaranteed.</span>
                  </>
                )
              },
              {
                num: "03",
                title: "Keep ownership clear",
                desc: (
                  <>
                    The domain remains in your registrar account. Final approved website files and assets transfer as agreed when the project closes, while third-party services remain subject to <span className="text-gradient-cyan font-semibold">their own terms.</span>
                  </>
                )
              },
              {
                num: "04",
                title: "Explain decisions in plain language",
                desc: (
                  <>
                    We explain the scope, review points and technical choices in <span className="text-gradient-cyan font-semibold">plain language.</span> If something is unclear, we pause and explain it before the work moves forward.
                  </>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className="flex flex-col gap-6"
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: i % 2 === 0 ? -28 : 28, filter: 'blur(8px)' }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-4xl md:text-5xl font-black text-deep-teal opacity-80 leading-none">
                  {item.num}
                </span>
                <div>
                  <h3 style={{fontSize: 'var(--text-h3)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem'}}>{item.title}</h3>
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
                       <h2 style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance'}}>One live client project, alongside two concept showcases.</h2>
                     </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Drake Seaside Apartments",
                  tier: "LIVE CLIENT PROJECT · GROWTH TIER",
                  outcome: "A live redesign with updated pages, clearer property information, and responsive layouts.",
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
             viewport={{ once: false, amount: 0.15 }}
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
                  viewport={{ once: false, amount: 0.15 }}
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
               <h2 style={{fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', textWrap: 'balance', marginBottom: '2rem'}}>
                 Discuss what your website needs to do.
               </h2>
               <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                 You will speak directly with the person responsible for the work. We can discuss your current website, the information customers need and a suitable starting scope.
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

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { ADDONS, ADDONS_NOTE, PRICING, SECTION_CONTENT } from '@/lib/content'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import ReactiveButton from '@/components/ui/ReactiveButton'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.price-card', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        ease: 'cinematic',
        scrollTrigger: {
          trigger: '.pricing-grid',
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="pricing" ref={sectionRef} className="relative bg-white dark:bg-black py-cinematic overflow-hidden" aria-labelledby="pricing-title">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-teal/[0.03] -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      
      <Container>
        <div className="mb-24 text-center">
          <Eyebrow className="mb-6 text-teal">{SECTION_CONTENT.pricing.eyebrow}</Eyebrow>
          <h2 id="pricing-title" className="font-syne text-display-hero text-black dark:text-white uppercase leading-[0.85]">
            {SECTION_CONTENT.pricing.titleStart} <span className="text-teal">{SECTION_CONTENT.pricing.titleEm}</span>
          </h2>
        </div>

        <div className="pricing-grid grid grid-cols-1 gap-12 lg:grid-cols-3">
          {PRICING.map((item) => (
            <article
              key={item.name}
              className={cn(
                'price-card relative p-12 flex flex-col border border-black/5 dark:border-white/5 transition-all duration-500 hover:border-teal/50',
                item.isFeatured ? 'bg-cream/30 dark:bg-card shadow-2xl scale-105 z-10' : 'bg-transparent'
              )}
            >
              {item.isFeatured && (
                <div className="absolute top-0 left-0 w-full h-1 bg-teal" />
              )}

              <h3 className="font-syne text-3xl text-black dark:text-white uppercase mb-4">{item.name}</h3>
              <p className="font-dm text-muted-2 dark:text-muted mb-8 italic">{item.tagline}</p>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-teal font-syne text-sm">SCR</span>
                <span className="text-6xl font-syne text-black dark:text-white">{item.priceFormatted}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-teal mb-8">Starting Investment</p>

              <div className="space-y-4 mb-12 flex-grow">
                {item.features.map((feature) => (
                  <div key={feature} className="flex gap-3 text-sm text-black/70 dark:text-white/70">
                    <Check size={16} className="text-teal shrink-0" />
                    {feature}
                  </div>
                ))}
                {item.exclusions?.map((exclusion) => (
                  <div key={exclusion} className="flex gap-3 text-sm text-black/30 dark:text-white/30 italic">
                    <X size={16} className="shrink-0" />
                    {exclusion}
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <ReactiveButton className="w-full">
                  {item.isFeatured ? 'Secure This Plan' : 'Get Started'}
                </ReactiveButton>
                <p className="mt-4 text-center text-[10px] text-muted-2 dark:text-muted uppercase tracking-wider">
                  {item.paymentTerms}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Managed Hosting & Add-ons as a Bento Grid */}
        <div className="mt-32">
          <div className="mb-12">
            <Eyebrow className="mb-4 text-teal">Optional Services</Eyebrow>
            <h3 className="font-syne text-4xl text-black dark:text-white uppercase">Managed Hosting & Add-ons</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map((addon) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={addon.name} 
                className="p-8 border border-black/5 dark:border-white/5 bg-cream/10 dark:bg-card/50 flex flex-col justify-between"
              >
                <p className="text-xs font-syne uppercase tracking-widest text-teal mb-4">{addon.name}</p>
                <p className="text-2xl font-syne text-black dark:text-white">{addon.price}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 p-8 bg-teal/5 border border-teal/10 rounded-2xl">
            <p className="font-dm text-sm italic text-muted-2 dark:text-muted leading-relaxed">
              <span className="text-teal font-bold not-italic mr-2">Note:</span>
              {ADDONS_NOTE}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import OrganicDivider from '@/components/ui/OrganicDivider'
import { REDESIGN_CTA, SECTION_CONTENT, SERVICES } from '@/lib/content'
import { gsap, useGSAP } from '@/lib/gsap'
import { motion } from 'framer-motion'
import { Sparkles, Code, Globe, MessageSquare, Megaphone, Palette } from 'lucide-react'

const icons = [Sparkles, Palette, Code, Globe, Megaphone, MessageSquare]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.bento-item', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        ease: 'cinematic',
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="services" ref={sectionRef} className="relative z-10 bg-white dark:bg-black py-sec overflow-hidden">
      <OrganicDivider type="wave" className="absolute top-0 left-0 text-white dark:text-black -translate-y-[99%]" />
      
      <Container>
        <div className="mb-20 text-center">
          <Eyebrow className="mb-4 text-teal">{SECTION_CONTENT.services.eyebrow}</Eyebrow>
          <h2 className="font-display text-display-hero text-black dark:text-white uppercase">
            {SECTION_CONTENT.services.titleStart} <span className="text-teal">{SECTION_CONTENT.services.titleEm}</span>
          </h2>
          <p className="mt-6 mx-auto max-w-[600px] text-lg text-muted-2 dark:text-muted">
            Breaking the standard grid with interactive box navigation for fluid service exploration.
          </p>
        </div>

        <div className="bento-grid">
          {SERVICES.map((service, idx) => {
            const Icon = icons[idx % icons.length]
            const isLarge = idx === 0 || idx === 3
            
            return (
              <article 
                key={service.number} 
                className={`bento-item relative p-8 group overflow-hidden border border-black/5 dark:border-white/5 bg-cream/30 dark:bg-card
                  ${isLarge ? 'col-span-12 md:col-span-7 row-span-2' : 'col-span-12 md:col-span-5'}
                `}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon size={isLarge ? 120 : 80} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-sm font-display tracking-widest text-teal mb-4">{service.number}</span>
                  <h3 className="font-display text-3xl text-black dark:text-white uppercase mb-4">{service.name}</h3>
                  <p className="text-muted-2 dark:text-muted mb-6 line-clamp-3">{service.description}</p>
                  
                  {isLarge && (
                    <div className="mt-auto grid grid-cols-2 gap-4">
                      {service.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!isLarge && (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="mt-auto flex items-center gap-2 text-teal font-display text-sm uppercase cursor-pointer"
                    >
                      Explore Deeply
                      <div className="w-8 h-[1px] bg-teal" />
                    </motion.div>
                  )}
                </div>
                
                {/* Reactive Texture Overlay */}
                <div className="absolute inset-0 texture-noise opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </article>
            )
          })}
        </div>

        <div className="mt-20 p-12 rounded-bento bg-teal text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-[600px]">
            <h3 className="font-display text-4xl uppercase mb-4">{REDESIGN_CTA.headline}</h3>
            <p className="text-white/80">{REDESIGN_CTA.body}</p>
          </div>
          <Button 
            variant="ghost" 
            href="#cta" 
            className="bg-white text-teal hover:bg-white/90 border-transparent rounded-full px-12 py-5"
          >
            {REDESIGN_CTA.cta}
          </Button>
        </div>
      </Container>
      
      <OrganicDivider type="curve" className="absolute bottom-0 left-0 text-white dark:text-black translate-y-[99%]" flip />
    </section>
  )
}

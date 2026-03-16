import { useRef, useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { FAQ as FAQ_ITEMS, SECTION_CONTENT } from '@/lib/content'
import { gsap, useGSAP } from '@/lib/gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useGSAP(
    () => {
      gsap.from('.faq-item', {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        ease: 'cinematic',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="faq" ref={sectionRef} className="relative bg-white dark:bg-black py-cinematic border-t border-black/5 dark:border-white/5" aria-labelledby="faq-title">
      <Container>
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0">
             <Eyebrow className="mb-6 text-teal">{SECTION_CONTENT.faq.eyebrow}</Eyebrow>
             <h2 id="faq-title" className="font-syne text-display-hero text-black dark:text-white uppercase leading-[0.85] mb-8">
               {SECTION_CONTENT.faq.titleStart} <span className="text-teal">{SECTION_CONTENT.faq.titleEm}</span>
             </h2>
             <p className="font-dm text-xl text-muted-2 dark:text-muted max-w-sm italic leading-relaxed">
               Clarifying the unknowns. Simple, direct answers to common queries about our digital storytelling process.
             </p>
          </div>

          <div className="faq-list col-span-12 lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <article 
                key={item.q} 
                className={`faq-item group border border-black/5 dark:border-white/5 bg-cream/10 dark:bg-card/50 transition-all duration-500 rounded-2xl
                  ${openIndex === index ? 'bg-cream/30 dark:bg-card' : ''}
                `}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-8 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-syne text-xl text-black dark:text-white uppercase pr-8">{item.q}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    className="shrink-0 text-teal"
                  >
                    <Plus size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 font-dm text-lg text-muted-2 dark:text-muted leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

import { FormEvent, useRef, useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { CTA_SECTION } from '@/lib/content'
import { TextScramble } from '@/lib/textScramble'
import { prefersReduced, ScrollTrigger, useGSAP } from '@/lib/gsap'
import ReactiveButton from '@/components/ui/ReactiveButton'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '#cta',
        start: 'top 72%',
        once: true,
        onEnter: () => {
          const element = document.querySelector('.cta-scramble')
          if (!(element instanceof HTMLElement) || prefersReduced()) {
            return
          }

          const scramble = new TextScramble(element)
          void scramble.setText(CTA_SECTION.headline)
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="cta" ref={sectionRef} className="relative bg-white dark:bg-black py-cinematic overflow-hidden" aria-labelledby="cta-title">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(70,198,232,0.05)_0,transparent_70%)]" />
        <div className="absolute inset-0 texture-noise opacity-5" />
      </div>

      <Container>
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <Eyebrow centered className="mb-8 text-teal">
            {CTA_SECTION.eyebrow}
          </Eyebrow>

          <h2 id="cta-title" className="cta-scramble font-display text-display-hero text-black dark:text-white text-center uppercase leading-[0.85] mb-12">
            {CTA_SECTION.headline}
          </h2>

          <p className="font-sans text-2xl text-muted-2 dark:text-muted text-center max-w-3xl mb-20 leading-relaxed italic">
            {CTA_SECTION.body}
          </p>

          <div className="w-full bg-cream/30 dark:bg-card border border-black/5 dark:border-white/5 p-8 md:p-16 rounded-bento">
            <form className="space-y-8" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-xs font-display uppercase tracking-widest text-teal transition-colors group-focus-within:text-black dark:group-focus-within:text-white" htmlFor="name">Full Name</label>
                  <input 
                    id="name" 
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 font-sans text-xl focus:outline-none focus:border-teal transition-colors"
                    type="text" 
                    placeholder="e.g. Marie Dupont" 
                    required 
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-display uppercase tracking-widest text-teal transition-colors group-focus-within:text-black dark:group-focus-within:text-white" htmlFor="email">Email Address</label>
                  <input 
                    id="email" 
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 font-sans text-xl focus:outline-none focus:border-teal transition-colors"
                    type="email" 
                    placeholder="you@yourbusiness.sc" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-display uppercase tracking-widest text-teal transition-colors group-focus-within:text-black dark:group-focus-within:text-white" htmlFor="description">Tell us about your project</label>
                <textarea 
                  id="description" 
                  rows={4}
                  className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 font-sans text-xl focus:outline-none focus:border-teal transition-colors resize-none"
                  placeholder="Tell us what your website needs to do..."
                  required 
                />
              </div>

              <div className="flex flex-col items-center">
                <ReactiveButton className="w-full md:w-auto min-w-[300px] h-[72px]">
                  {isSubmitted ? (
                    <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <CheckCircle size={24} /> Message Sent
                    </motion.span>
                  ) : (
                    <span className="flex items-center gap-2">
                       Enquire Now <Send size={20} />
                    </span>
                  )}
                </ReactiveButton>
                <p className="mt-6 text-sm font-sans text-muted-2 dark:text-muted italic">{CTA_SECTION.formNote}</p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

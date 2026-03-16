import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { PROCESS, SECTION_CONTENT } from '@/lib/content'
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { revealSectionTitle } from '@/lib/animations'

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) {
        return
      }

      const title = section.querySelector('h2')
      if (title instanceof HTMLElement) {
        revealSectionTitle(title)
      }

      if (prefersReduced()) {
        gsap.set('.process-step-num, .process-step-content', { opacity: 1, x: 0, y: 0 })
        section.querySelector('.process-list')?.setAttribute('style', '--line-progress: 1')
        return
      }

      ScrollTrigger.create({
        trigger: '.process-list',
        start: 'top 65%',
        end: 'bottom 75%',
        scrub: 0.6,
        onUpdate: (self) => {
          const list = section.querySelector('.process-list') as HTMLElement | null
          list?.style.setProperty('--line-progress', String(self.progress))
        },
      })

      section.querySelectorAll<HTMLElement>('.process-step-num').forEach((element) => {
        const target = Number.parseInt(element.dataset.num ?? '1', 10)

        ScrollTrigger.create({
          trigger: element,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            const value = { current: 0 }

            gsap.to(value, {
              current: target,
              duration: 0.7,
              ease: 'power2.out',
              onUpdate: () => {
                element.textContent = String(Math.round(value.current)).padStart(2, '0')
              },
            })
          },
        })
      })

      section.querySelectorAll<HTMLElement>('.process-step').forEach((step) => {
        const num = step.querySelector('.process-step-num')
        const content = step.querySelector('.process-step-content')
        if (!num || !content) {
          return
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 87%',
            toggleActions: 'play none none none',
          },
        })

        timeline
          .fromTo(num, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
          .fromTo(content, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.38')
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="process" ref={sectionRef} className="bg-dark py-sec-sm md:py-sec" aria-labelledby="process-title">
      <Container>
        <div className="mb-header-gap">
          <Eyebrow className="mb-3">{SECTION_CONTENT.process.eyebrow}</Eyebrow>
          <h2 id="process-title" className="font-display text-display-lg text-white">
            {SECTION_CONTENT.process.titleStart}
            <br />
            <em>{SECTION_CONTENT.process.titleEm}</em>
          </h2>
        </div>

        <div className="process-list">
          {PROCESS.map((step) => (
            <div key={step.number} className="process-step group border-b border-border py-7 first:border-t sm:py-8 lg:grid lg:grid-cols-12 lg:gap-x-col-gap lg:py-10">
              <div
                className="process-step-num mb-2 font-display text-5xl leading-none text-teal/10 transition-colors duration-300 group-hover:text-teal/30 sm:text-[58px] lg:col-span-2 lg:mb-0 lg:pt-1 lg:text-right lg:text-num-lg"
                data-num={step.number}
              >
                {step.number}
              </div>

              <div className="process-step-content lg:col-start-3 lg:col-span-10">
                <h3 className="mb-2 font-display text-title-sm text-white">{step.title}</h3>
                <p className="max-w-process-desc font-sans text-body-base text-muted">{step.description}</p>
                <Eyebrow className="mt-3 text-ui-badge">{step.timeline}</Eyebrow>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

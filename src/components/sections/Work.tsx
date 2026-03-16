import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { revealSectionTitle } from '@/lib/animations'
import { WORK, SECTION_CONTENT } from '@/lib/content'
import { gsap, prefersReduced, useGSAP } from '@/lib/gsap'
import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) {
        return
      }

      const heading = section.querySelector('h2')
      if (heading instanceof HTMLElement) {
        revealSectionTitle(heading)
      }

      if (prefersReduced()) {
        gsap.set('.work-curtain', { scaleX: 0 })
        gsap.set('.work-thumb-inner', { scale: 1, opacity: 1 })
        return
      }

      const cards = Array.from(section.querySelectorAll<HTMLElement>('.work-card'))
      cards.forEach((card, index) => {
        const curtain = card.querySelector<HTMLElement>('.work-curtain')
        const inner = card.querySelector<HTMLElement>('.work-thumb-inner')

        if (!curtain || !inner) {
          return
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        })

        timeline
          .fromTo(
            curtain,
            { scaleX: 1, transformOrigin: 'right center' },
            { scaleX: 0, duration: 0.88, ease: 'power3.inOut', delay: index * 0.06 },
          )
          .fromTo(inner, { scale: 1.07 }, { scale: 1, duration: 0.88, ease: 'power3.out' }, '<')
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="work" ref={sectionRef} className="bg-black py-sec-sm md:py-sec" aria-labelledby="work-title">
      <Container>
        <div className="relative mb-header-gap">
          <span className="pointer-events-none absolute -left-6 -top-5 font-cormorant text-decor text-teal/10">01</span>
          <Eyebrow className="mb-3">{SECTION_CONTENT.work.eyebrow}</Eyebrow>
          <h2 id="work-title" className="font-cormorant text-display-lg text-white">
            {SECTION_CONTENT.work.titleStart} <em>{SECTION_CONTENT.work.titleEm}</em>
          </h2>
        </div>
      </Container>

      <Container className="!max-w-[1660px]">
        <div className="grid grid-cols-12 gap-card-gap bg-border">
          {WORK.map((item) => (
            <article key={item.id} className={cn('work-card group overflow-hidden bg-card', item.colSpan)}>
              <div className={cn('relative overflow-hidden bg-surface', item.aspect)}>
                <div className="work-curtain absolute inset-0 z-above origin-right bg-card" />
                <div className="work-thumb-inner relative h-full w-full transition-transform duration-700 group-hover:scale-105">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/15" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,201,167,0.18),transparent_42%)]" />

                  <div className="relative z-above flex h-full items-end p-6">
                    <div>
                      <p className="font-cormorant text-display-sm text-cream">{item.title}</p>
                      <p className="font-syne text-ui-badge uppercase text-cream/75">{item.url ? item.url.replace(/^https?:\/\//, '') : item.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-5">
                <div>
                  <h3 className="font-syne text-ui-btn font-bold text-white">{item.client}</h3>
                  <p className="mt-1 font-dm text-body-caption text-muted">{item.type}</p>
                  <p className="mt-1 max-w-work-desc font-dm text-body-caption text-muted">{item.description}</p>
                  {item.isDemo ? <Badge className="mt-2">Layout demo</Badge> : null}
                </div>

                <a
                  href={item.url ?? '#cta'}
                  target={item.url ? '_blank' : undefined}
                  rel={item.url ? 'noopener noreferrer' : undefined}
                  className="work-link font-syne text-ui-label text-teal"
                >
                  {item.url ? 'Visit live site →' : 'Request demo →'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

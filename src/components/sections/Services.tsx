import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { fadeUp, revealSectionTitle } from '@/lib/animations'
import { REDESIGN_CTA, SECTION_CONTENT, SERVICES } from '@/lib/content'
import { useGSAP } from '@/lib/gsap'

export default function Services() {
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

      fadeUp('.service-card', {
        stagger: 0.1,
        trigger: '.services-grid',
        start: 'top 82%',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="services" ref={sectionRef} className="bg-dark py-sec-sm md:py-sec" aria-labelledby="services-title">
      <Container>
        <div className="mb-header-gap">
          <Eyebrow className="mb-3">{SECTION_CONTENT.services.eyebrow}</Eyebrow>
          <h2 id="services-title" className="font-cormorant text-display-lg text-white">
            {SECTION_CONTENT.services.titleStart} <em>{SECTION_CONTENT.services.titleEm}</em>
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 gap-tile-gap bg-border lg:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.number} className="service-card relative overflow-hidden bg-dark px-5 py-svc-pad sm:px-6 lg:px-10">
              <span className="svc-n mb-4 block font-cormorant text-num-md text-teal/10">{service.number}</span>
              <h3 className="font-cormorant text-display-md text-white">{service.name}</h3>
              <p className="mt-2 font-syne text-ui-nav text-teal">{service.price}</p>
              <p className="mt-3 font-dm text-body-sm text-muted">{service.description}</p>

              <ul className="mt-4 space-y-1.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2 font-dm text-body-xs text-muted">
                    <span className="mt-1 text-ui-badge text-teal">-</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-tile-gap flex flex-wrap items-center justify-between gap-5 border border-border bg-surface px-5 py-6 sm:px-6 lg:px-9 lg:py-7">
          <div>
            <Eyebrow className="mb-2">{REDESIGN_CTA.eyebrow}</Eyebrow>
            <p className="font-cormorant text-display-sm text-white">{REDESIGN_CTA.headline}</p>
            <p className="mt-2 max-w-copy-sm font-dm text-body-sm text-muted">{REDESIGN_CTA.body}</p>
          </div>
          <Button variant="primary" href="#cta" className="shrink-0 max-sm:w-full max-sm:justify-center">
            {REDESIGN_CTA.cta}
          </Button>
        </div>
      </Container>
    </section>
  )
}

import { useRef, useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { FAQ as FAQ_ITEMS, SECTION_CONTENT } from '@/lib/content'
import { revealSectionTitle } from '@/lib/animations'
import { gsap, prefersReduced, useGSAP } from '@/lib/gsap'

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const answerRefs = useRef<Array<HTMLDivElement | null>>([])
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    const answer = answerRefs.current[index]
    const icon = iconRefs.current[index]
    if (!answer || !icon) {
      return
    }

    if (prefersReduced()) {
      const next = openIndex === index ? null : index
      setOpenIndex(next)

      answerRefs.current.forEach((item, itemIndex) => {
        if (!item) {
          return
        }

        const open = next === itemIndex
        item.style.height = open ? 'auto' : '0px'
        item.style.opacity = open ? '1' : '0'
      })

      iconRefs.current.forEach((item, itemIndex) => {
        if (!item) {
          return
        }

        item.style.transform = next === itemIndex ? 'rotate(45deg)' : 'rotate(0deg)'
      })

      return
    }

    if (openIndex === index) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.32,
        ease: 'power2.in',
        onComplete: () => setOpenIndex(null),
      })

      gsap.to(icon, { rotation: 0, duration: 0.3, ease: 'power2.out' })
      return
    }

    if (openIndex !== null) {
      const previousAnswer = answerRefs.current[openIndex]
      const previousIcon = iconRefs.current[openIndex]

      if (previousAnswer) {
        gsap.to(previousAnswer, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
      }

      if (previousIcon) {
        gsap.to(previousIcon, { rotation: 0, duration: 0.25, ease: 'power2.out' })
      }
    }

    setOpenIndex(index)

    gsap.fromTo(answer, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' })
    gsap.to(icon, { rotation: 45, duration: 0.3, ease: 'power2.out' })
  }

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
        gsap.set('.faq-item', { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.58,
          ease: 'power2.out',
          stagger: { each: 0.055, from: 'start' },
          scrollTrigger: {
            trigger: '.faq-grid',
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section id="faq" ref={sectionRef} className="bg-dark py-sec-sm md:py-sec" aria-labelledby="faq-title">
      <Container>
        <div className="mb-header-gap">
          <Eyebrow className="mb-3">{SECTION_CONTENT.faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="font-cormorant text-display-lg text-white">
            {SECTION_CONTENT.faq.titleStart}
            <br />
            <em>{SECTION_CONTENT.faq.titleEm}</em>
          </h2>
        </div>

        <div className="faq-grid grid grid-cols-1 gap-card-gap bg-border lg:grid-cols-2">
          {FAQ_ITEMS.map((item, index) => (
            <article key={item.q} className="faq-item bg-dark px-5 py-faq-pad transition-colors duration-200 hover:bg-card sm:px-6 lg:px-8">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 text-left"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-syne text-body-sm font-semibold leading-relaxed text-white">{item.q}</h3>
                <span
                  ref={(element) => {
                    iconRefs.current[index] = element
                  }}
                  className="-mt-0.5 shrink-0 text-icon-lg text-teal transition-transform duration-300"
                >
                  +
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                ref={(element) => {
                  answerRefs.current[index] = element
                }}
                style={{ height: 0, overflow: 'hidden', opacity: 0 }}
              >
                <p className="pt-3 font-dm text-body-sm text-muted">{item.a}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

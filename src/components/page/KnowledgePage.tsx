import { motion, useReducedMotion } from 'framer-motion'
import CTA from '@/components/sections/CTA'
import SeoMeta from '@/components/SeoMeta'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import type { KnowledgePage as KnowledgePageContent } from '@/lib/content'
import { cn } from '@/lib/utils'

type KnowledgePageProps = {
  page: KnowledgePageContent
}

export default function KnowledgePage({ page }: KnowledgePageProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <SeoMeta title={page.seoTitle} description={page.seoDescription} path={page.seoPath} keywords={page.seoKeywords} />

      <main className="overflow-hidden">
        <section className="relative border-b border-border bg-black pb-[clamp(44px,7vw,86px)] pt-page-top-sm md:pt-page-top">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(0,201,167,0.15),transparent_34%)]" />

          <Container>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: 'easeOut' }}
              className="relative z-above max-w-content-lg"
            >
              <Eyebrow className="mb-4">{page.eyebrow}</Eyebrow>
              <h1 className="font-display text-display-xl text-white">
                {page.title} <em>{page.titleEm}</em>
              </h1>
              <p className="mt-5 max-w-copy font-sans text-body-lg text-muted">{page.lead}</p>
            </motion.div>

            <div className="relative z-above mt-8 grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              {page.blocks.slice(0, 8).map((block, index) => (
                <motion.div
                  key={block.heading}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.12 + index * 0.06, ease: 'easeOut' }}
                  className="border border-border bg-card px-4 py-4"
                >
                  <p className="font-display text-ui-label uppercase text-muted-2">Section {String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-1 font-display text-title-sm text-white">{block.heading}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative bg-dark py-sec-sm md:py-sec">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_0%,rgba(255,255,255,0.05),transparent_35%)]" />

          <Container>
            <div className={cn('space-y-3', page.columns === 2 && 'space-y-0 grid grid-cols-1 md:grid-cols-2 gap-3')}>
              {page.blocks.map((block, index) => {
                const isEven = index % 2 === 0

                return (
                  <motion.article
                    key={block.heading}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.24 }}
                    transition={{ duration: 0.56, ease: 'easeOut' }}
                    className={cn('group relative overflow-hidden border border-border', isEven ? 'bg-card' : 'bg-black')}
                  >
                    <div className={cn('pointer-events-none absolute inset-0', isEven ? 'bg-[radial-gradient(circle_at_0%_22%,rgba(0,201,167,0.14),transparent_38%)]' : 'bg-[radial-gradient(circle_at_100%_12%,rgba(255,255,255,0.09),transparent_35%)]')} />
                    <div className={cn('pointer-events-none absolute inset-y-0 w-[2px] bg-teal/70', isEven ? 'left-0' : 'right-0')} />

                    <div className="relative grid grid-cols-1 gap-x-col-gap lg:grid-cols-12">
                      <div className={cn('px-5 py-6 sm:px-6 lg:px-8 lg:py-8', isEven ? 'lg:col-span-8' : 'lg:col-start-5 lg:col-span-8')}>
                        <h2 className="font-display text-display-md text-white">{block.heading}</h2>

                        <div className="mt-4 space-y-3">
                          {block.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="font-sans text-body-base text-muted">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {block.bullets ? (
                          <ul className="mt-5 space-y-2.5">
                            {block.bullets.map((item) => (
                              <li key={item} className="flex gap-2.5 font-sans text-body-base text-muted">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      <div className={cn('hidden px-8 pb-8 lg:flex', isEven ? 'lg:col-span-4 items-end justify-end' : 'lg:col-span-4 items-end justify-start')}>
                        <span className="font-display text-num-md leading-none text-teal/15">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </Container>
        </section>

        <CTA />
      </main>
    </>
  )
}

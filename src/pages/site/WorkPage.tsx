import { motion } from 'framer-motion'
import CTA from '@/components/sections/CTA'
import SeoMeta from '@/components/SeoMeta'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { KNOWLEDGE_PAGES, WORK } from '@/lib/content'
import { cn } from '@/lib/utils'
import ReactiveButton from '@/components/ui/ReactiveButton'
import { ArrowUpRight } from 'lucide-react'

export default function WorkPage() {
  const page = KNOWLEDGE_PAGES.work

  return (
    <>
      <SeoMeta title={page.seoTitle} description={page.seoDescription} path={page.seoPath} keywords={page.seoKeywords} />

      <main className="bg-white dark:bg-black pt-nav overflow-hidden">
        {/* Cinematic Header */}
        <section className="relative py-cinematic border-b border-black/5 dark:border-white/5 overflow-hidden">
          <div className="absolute top-0 right-[-10%] w-[60%] h-full bg-teal/[0.03] -skew-x-12 transform pointer-events-none" />
          <Container>
            <div className="max-w-4xl">
              <Eyebrow className="mb-6 text-teal">{page.eyebrow}</Eyebrow>
              <h1 className="font-syne text-display-hero text-black dark:text-white uppercase leading-[0.85] mb-8">
                {page.title} <span className="text-teal">{page.titleEm}</span>
              </h1>
              <p className="font-dm text-2xl text-muted-2 dark:text-muted max-w-2xl leading-relaxed italic">
                {page.lead}
              </p>
            </div>
          </Container>
        </section>

        {/* Work Grid */}
        <section className="py-cinematic">
          <Container>
            <div className="space-y-32">
              {WORK.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <div className="grid grid-cols-12 gap-gutter items-center">
                    {/* Image Column */}
                    <div className={cn(
                      "col-span-12 lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-bento cursor-pointer",
                      index % 2 !== 0 ? "lg:order-2" : ""
                    )}>
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        src={item.image} 
                        alt={item.imageAlt} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* Content Column */}
                    <div className={cn(
                      "col-span-12 lg:col-span-5",
                      index % 2 !== 0 ? "lg:order-1 lg:pr-20" : "lg:pl-20"
                    )}>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <span className="font-syne text-xs uppercase tracking-widest text-teal">0{index + 1}</span>
                          <span className="h-px w-8 bg-black/10 dark:bg-white/10" />
                          <span className="font-syne text-xs uppercase tracking-widest text-muted-2 dark:text-muted">{item.type}</span>
                        </div>
                        
                        <h2 className="font-syne text-5xl text-black dark:text-white uppercase leading-none tracking-tighter">
                          {item.client}
                        </h2>
                        
                        <p className="font-dm text-xl text-muted-2 dark:text-muted leading-relaxed italic">
                          {item.description}
                        </p>

                        <div className="pt-8 flex flex-wrap gap-4">
                          {item.url && (
                             <a href={item.url} target="_blank" rel="noopener noreferrer">
                               <ReactiveButton className="h-16 px-10">
                                 Visit Site <ArrowUpRight size={20} />
                               </ReactiveButton>
                             </a>
                          )}
                          <ReactiveButton variant="secondary" className="h-16 px-10">
                             Case Study
                          </ReactiveButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        <CTA />
      </main>
    </>
  )
}

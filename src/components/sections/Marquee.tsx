import { MARQUEE } from '@/lib/content'

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]

  return (
    <section id="marquee" aria-label="Trusted by" className="relative overflow-hidden border-y border-border py-3 sm:py-4">
      <div className="marquee-label">Trusted by</div>
      <div className="flex w-max animate-marquee pl-[clamp(92px,20vw,190px)]">
        {items.map((item, index) => (
          <div key={`${item.type}-${item.name}-${index}`} className="whitespace-nowrap border-r border-border px-5 font-syne text-ui-nav font-medium text-muted sm:px-7 lg:px-9">
            <span className="mr-2 text-ui-badge uppercase text-muted-2">{item.type}</span>
            {item.name}
          </div>
        ))}
      </div>
    </section>
  )
}

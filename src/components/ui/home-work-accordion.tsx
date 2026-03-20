import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

type WorkItem = {
  label: string;
  title: string;
  outcome: string;
  image: string;
  imageWebp: string;
  imageWebp800: string;
  url?: string;
};

type HomeWorkAccordionProps = {
  items: WorkItem[];
  onPreview: (item: WorkItem) => void;
};

type WorkShowcaseCardProps = {
  item: WorkItem;
  index: number;
  shouldReduceMotion: boolean | null;
  onPreview: (item: WorkItem) => void;
  layoutClassName: string;
};

function WorkShowcaseCard({ item, index, shouldReduceMotion, onPreview, layoutClassName }: WorkShowcaseCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-34, 34]
  );
  const actionButtonClassName =
    "focus-ring inline-flex h-12 w-12 items-center justify-center border border-white/16 bg-black/46 text-white transition hover:border-accent/70 hover:bg-accent hover:text-black active:scale-95";

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: "easeOut",
      }}
      className={`group relative h-full overflow-hidden rounded-lg border border-border/20 bg-[#121214] ${layoutClassName}`.trim()}
    >
      <div className="grid h-full grid-rows-[1fr_auto]">
        <div className="relative min-h-[17.5rem] overflow-hidden md:min-h-0">
          <motion.div style={{ y: imageY }} className="absolute inset-0 h-[116%]">
            <picture>
              <source
                srcSet={`${item.imageWebp800} 800w, ${item.imageWebp} 1200w`}
                sizes="(max-width: 767px) 94vw, 34vw"
                type="image/webp"
              />
              <img
                src={item.image}
                alt={`${item.title} project preview`}
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top grayscale-[24%] transition duration-700 group-hover:scale-[1.05] group-hover:grayscale-0"
              />
            </picture>
          </motion.div>

          <div className="absolute right-3 top-3 z-30 h-14 w-14 p-1 pointer-events-none">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`${actionButtonClassName} h-full w-full pointer-events-auto touch-manipulation`.trim()}
                aria-label={`Open ${item.title} live site`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onPreview(item)}
                className={`${actionButtonClassName} h-full w-full pointer-events-auto touch-manipulation`.trim()}
                aria-label={`Open ${item.title} preview`}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#020611] px-5 py-5 md:px-6 md:py-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-accent">{item.label}</p>
          <h3 className="mt-2.5 text-xl font-semibold leading-tight text-text md:text-2xl">{item.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#d9e7f2]/82 md:text-[0.95rem]">
            {item.outcome}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomeWorkAccordion({ items, onPreview }: HomeWorkAccordionProps) {
  const shouldReduceMotion = useReducedMotion();
  const desktopLayoutClasses = [
    "md:col-span-6 md:row-span-1",
    "md:col-span-4 md:row-span-1",
    "md:col-span-5 md:row-span-1",
  ];

  return (
    <div className="grid gap-3 md:auto-rows-[34rem] md:grid-cols-10 md:gap-4">
      {items.map((item, index) => (
        <WorkShowcaseCard
          key={`${item.label}-${item.title}`}
          item={item}
          index={index}
          shouldReduceMotion={shouldReduceMotion}
          onPreview={onPreview}
          layoutClassName={desktopLayoutClasses[index] ?? "md:col-span-5 md:row-span-1"}
        />
      ))}
    </div>
  );
}

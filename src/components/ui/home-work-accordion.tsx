import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

type WorkItem = {
  label: string;
  title: string;
  outcome: string;
  image: string;
  imageWebp: string;
  imageWebp800: string;
  imagePosition?: string;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-60, 60]
  );
  const actionButtonClassName =
    "focus-ring inline-flex h-12 w-12 items-center justify-center border border-white/16 bg-black/46 text-white transition hover:border-accent/70 hover:bg-accent hover:text-black active:scale-95";

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsExpanded(!isExpanded)}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: "easeOut",
      }}
      className={`group relative h-[30rem] md:h-full overflow-hidden rounded-[1.5rem] border border-border/20 bg-[#121214] cursor-pointer ${layoutClassName}`.trim()}
    >
      <div className="relative h-full overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0 h-[125%]">
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
              style={{ objectPosition: item.imagePosition ?? "center top" }}
              className={`absolute inset-0 h-full w-full object-cover grayscale-[15%] transition duration-1000 md:group-hover:scale-[1.08] md:group-hover:grayscale-0 ${isExpanded ? "scale-[1.08] grayscale-0" : ""}`}
            />
          </picture>
        </motion.div>

        {/* Background Darkening Overlay */}
        <div className={`pointer-events-none absolute inset-0 bg-black/30 transition-colors duration-700 md:group-hover:bg-black/55 ${isExpanded ? "bg-black/55" : ""}`} />

        {/* Gradient Mask Overlay */}
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-85 transition-opacity duration-700 md:group-hover:opacity-100 ${isExpanded ? "opacity-100" : ""}`} />

        {/* Action Button */}
        <div className="absolute right-4 top-4 z-30 h-12 w-12 p-1" onClick={(e) => e.stopPropagation()}>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`${actionButtonClassName} rounded-full h-full w-full touch-manipulation`.trim()}
              aria-label={`Open ${item.title} live site`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onPreview(item)}
              className={`${actionButtonClassName} rounded-full h-full w-full touch-manipulation`.trim()}
              aria-label={`Open ${item.title} preview`}
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Text Details Overlay */}
        <div className={`absolute inset-x-0 bottom-0 z-20 p-8 md:p-10 lg:p-12 transform transition-all duration-700 ease-out ${isExpanded ? "translate-y-0" : "translate-y-[125px] md:translate-y-[135px] md:group-hover:translate-y-0"}`}>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.42em] text-accent mb-2 drop-shadow-md">
            {item.label}
          </p>
          <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl lg:text-4xl font-display tracking-tight mb-5 drop-shadow-md">
            {item.title}
          </h3>
          <p className={`max-w-xl text-sm leading-relaxed text-[#d1e1f0]/90 md:text-base transition-opacity duration-700 ${isExpanded ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}>
            {item.outcome}
          </p>
          
          <div className={`mt-8 flex items-center gap-2 text-[10.5px] font-black uppercase tracking-[0.25em] text-accent transition-all duration-700 delay-75 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"}`}>
            <span className="border-b border-accent/30 pb-0.5">View Project</span>
            <span className="text-xl leading-none">→</span>
          </div>
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
    <div className="grid grid-cols-1 gap-3 md:auto-rows-[34rem] md:grid-cols-10 md:gap-4">
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

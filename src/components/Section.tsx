import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  initialAnimate?: boolean;
  headingLevel?: "h1" | "h2";
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  initialAnimate = true,
  headingLevel = "h2",
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const skipAnimation = !initialAnimate || shouldReduceMotion;
  const Heading = headingLevel;

  return (
    <section
      id={id}
      className={`pt-8 pb-10 md:pt-20 md:pb-28 ${className ?? ""}`.trim()}
    >
      <div className={`mx-auto w-full px-5 sm:px-8 ${containerClassName ?? "max-w-7xl"}`.trim()}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: skipAnimation ? 1 : 0, y: skipAnimation ? 0 : 24, filter: skipAnimation ? 'none' : 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: skipAnimation ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 text-center"
          >
            {eyebrow && (
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
                {eyebrow}
              </span>
            )}
            {title && (
               <Heading style={{fontSize: headingLevel === "h1" ? 'var(--text-h1)' : 'var(--text-h2)', fontWeight: 700, lineHeight: headingLevel === "h1" ? 1.03 : 1.07, letterSpacing: headingLevel === "h1" ? '-0.04em' : '-0.03em', textWrap: 'balance'}}>
                {title}
              </Heading>
            )}
            {description && (
              <p className="section-description mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-text-muted md:text-[1.1rem] md:leading-[1.62]">{description}</p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: skipAnimation ? 1 : 0, y: skipAnimation ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
          transition={{ duration: skipAnimation ? 0 : 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

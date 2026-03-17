import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={`pt-12 pb-16 md:pt-20 md:pb-28 ${className ?? ""}`.trim()}
    >
      <div className={`mx-auto w-full px-5 sm:px-8 ${containerClassName ?? "max-w-7xl"}`.trim()}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -12% 0px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
          >
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="section-title mt-3 text-[1.95rem] font-semibold tracking-[-0.01em] text-text md:text-[3.15rem]">
                {title}
              </h2>
            )}
            {description && (
              <p className="section-description mt-4 text-[1.05rem] leading-[1.65] text-text-muted md:text-[1.1rem] md:leading-[1.62]">{description}</p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "0px 0px -8% 0px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.36, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

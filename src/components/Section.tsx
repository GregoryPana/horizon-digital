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
      className={`pt-8 pb-10 md:pt-20 md:pb-28 ${className ?? ""}`.trim()}
    >
      <div className={`mx-auto w-full px-5 sm:px-8 ${containerClassName ?? "max-w-7xl"}`.trim()}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -12% 0px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mb-20 text-center"
          >
            {eyebrow && (
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="section-description mt-5 text-[1.05rem] leading-[1.65] text-text-muted md:text-[1.1rem] md:leading-[1.62]">{description}</p>
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

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasNoScrollGlow = className?.includes("no-scroll-glow");
  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -8% 0px" }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
      className={`hd-card rounded-2xl bg-white/[0.025] p-6 md:p-10 active:brightness-105 ${
        hasNoScrollGlow ? "" : "scroll-glow"
      } ${className ?? ""}`.trim()}
    >
      {children}
    </motion.div>
  );
}

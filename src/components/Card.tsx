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
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease: "easeOut" }}
      className={`glass lift rounded-2xl p-6 md:p-10 active:brightness-105 active:shadow-[0_0_18px_var(--glow)] ${
        hasNoScrollGlow ? "" : "scroll-glow"
      } ${className ?? ""}`.trim()}
    >
      {children}
    </motion.div>
  );
}

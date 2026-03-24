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
      transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease: "easeOut" }}
      className={`glass lift rounded-2xl border border-border/30 p-6 md:p-10 transition-all duration-300 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] active:brightness-105 active:shadow-[0_0_18px_var(--glow)] ${
        hasNoScrollGlow ? "" : "scroll-glow"
      } ${className ?? ""}`.trim()}
    >
      {children}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { LampContainer } from "./ui/lamp";

type InsightsHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export default function InsightsHero({ eyebrow, title, description, actions }: InsightsHeroProps) {
  return (
    <LampContainer className="border-b border-border/70">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-xs font-semibold uppercase tracking-[0.34em] text-accent-2"
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.08, duration: 0.72, ease: "easeOut" }}
        className="mx-auto mt-6 max-w-4xl text-balance bg-gradient-to-br from-[#d6dee8] via-[#9fb6c8] to-[#7f96a7] bg-clip-text text-center text-4xl font-semibold tracking-[-0.02em] text-transparent md:text-6xl"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.16, duration: 0.65, ease: "easeOut" }}
        className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-text-muted md:text-base"
      >
        {description}
      </motion.p>

      {actions ? <div className="mt-8 flex items-center justify-center">{actions}</div> : null}
    </LampContainer>
  );
}

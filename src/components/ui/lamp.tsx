import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type LampContainerProps = {
  children: ReactNode;
  className?: string;
};

export function LampContainer({ children, className }: LampContainerProps) {
  return (
    <div
      className={cn(
        "relative isolate flex min-h-[58vh] w-full flex-col items-center justify-center overflow-hidden bg-bg",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-95">
        <motion.div
          initial={{ opacity: 0.35, width: "14rem" }}
          whileInView={{ opacity: 1, width: "36rem" }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.35 }}
          className="absolute right-1/2 top-8 h-64 [--conic-position:from_72deg_at_center_top]"
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), color-mix(in srgb, var(--accent-2) 72%, white 8%), transparent 46%)",
          }}
        >
          <div className="absolute bottom-0 left-0 h-44 w-full bg-bg [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 h-full w-44 bg-bg [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.35, width: "14rem" }}
          whileInView={{ opacity: 1, width: "36rem" }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.35 }}
          className="absolute left-1/2 top-8 h-64 [--conic-position:from_288deg_at_center_top]"
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), transparent 54%, color-mix(in srgb, var(--accent-2) 72%, white 8%))",
          }}
        >
          <div className="absolute bottom-0 right-0 h-44 w-full bg-bg [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 right-0 h-full w-44 bg-bg [mask-image:linear-gradient(to_left,white,transparent)]" />
        </motion.div>

        <div className="absolute left-1/2 top-1/2 h-44 w-[120%] -translate-x-1/2 -translate-y-10 bg-bg blur-2xl" />
        <div className="absolute left-1/2 top-[43%] h-40 w-[30rem] -translate-x-1/2 rounded-full bg-accent-2/40 blur-3xl" />
        <div className="absolute left-1/2 top-[39%] h-20 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-2xl" />
        <div className="absolute left-1/2 top-[37%] h-px w-[30rem] -translate-x-1/2 bg-accent-2/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-8 md:pt-32">{children}</div>
    </div>
  );
}

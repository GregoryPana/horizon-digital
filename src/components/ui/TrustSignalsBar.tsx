import { motion, useReducedMotion } from "framer-motion";

const signals = [
  {
    label: "Performance",
    value: "A-Grade Speed",
    description: "Fast-loading pages",
  },
  {
    label: "Mobile First",
    value: "100% Responsive",
    description: "Perfect on every phone",
  },
  {
    label: "Local Support",
    value: "Direct Access",
    description: "Help when you need it",
  },
  {
    label: "Total Ownership",
    value: "Zero Lock-ins",
    description: "You own your website",
  },
];

export function TrustSignalsBar() {
  const shouldReduceMotion = useReducedMotion();

  // Create an array with two copies of the signals to create a seamless loop
  const marqueeSignals = [...signals, ...signals];

  return (
    <div className="relative z-30 -mt-10 mb-10 w-full px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/5 bg-[#0D0D0F]/80 backdrop-blur-xl relative">
        {/* Left and right fade-out gradients for seamless loop effect on large screens */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-[#0D0D0F] to-transparent lg:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-[#0D0D0F] to-transparent lg:hidden" />

        {/* The scrolling container. On very large screens where all 4 fit, we can slow it down or keep it moving. 
            On desktop LG we let them be a grid, on mobile we scroll. Actually, user asked for infinite marquee loop, let's use it everywhere but styled appropriately. */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex w-max"
        >
          {marqueeSignals.map((signal, idx) => (
            <div
              key={`${signal.label}-${idx}`}
              className="group relative flex w-[250px] shrink-0 sm:w-[300px] lg:w-[320px] flex-col items-center p-6 text-center border-r border-white/5 transition-colors hover:bg-white/[0.02]"
            >
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-deep-teal/70">
                {signal.label}
              </span>
              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl whitespace-nowrap">
                {signal.value}
              </span>
              <span className="mt-1 text-[11px] font-medium text-text-muted/60 uppercase tracking-widest whitespace-nowrap">
                {signal.description}
              </span>

              {/* Subtle hover effect light */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

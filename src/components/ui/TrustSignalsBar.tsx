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

  return (
    <div className="relative z-30 -mt-10 mb-10 w-full px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/5 bg-[#0D0D0F]/80 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {signals.map((signal, idx) => (
            <motion.div
              key={signal.label}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className={`relative flex flex-col items-center p-6 text-center ${
                idx !== signals.length - 1 ? "lg:border-r lg:border-white/5" : ""
              } ${idx % 2 === 0 ? "border-r border-white/5 lg:border-r-0" : ""} ${
                idx < 2 ? "border-b border-white/5 lg:border-b-0" : ""
              }`}
            >
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-deep-teal/70">
                {signal.label}
              </span>
              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {signal.value}
              </span>
              <span className="mt-1 text-[11px] font-medium text-text-muted/60 uppercase tracking-widest">
                {signal.description}
              </span>

              {/* Subtle hover effect light */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

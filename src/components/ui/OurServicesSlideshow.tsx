
// Images kept in /public/services/ as fallback:
//   /services/custom_design.png
//   /services/perfect_on_mobile.png
//   /services/found_on_google.png
//   /services/fast_and_reliable.png

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HoverSlider,
  TextStaggerHover,
  useHoverSliderContext,
} from "./animated-slideshow";

const SLIDES = [
  {
    id: "slide-1",
    title: "Custom Design",
    description: "Every page designed around your specific services, your customers, and how you want to be found. No common templates.",
  },
  {
    id: "slide-2",
    title: "Perfect on Mobile",
    description: "Over 70% of customers browse on phones. Your site works beautifully on the phones your customers use — no pinching, no squinting.",
  },
  {
    id: "slide-3",
    title: "Found on Google",
    description: "We build every page so Google understands your business and shows you when locals are searching.",
  },
  {
    id: "slide-4",
    title: "Fast & Reliable",
    description: "Fast-loading pages keep visitors on your site — and slow sites send them straight to your competitors.",
  },
];

// ── Illustration 1: Custom Design ──────────────────────────────────────────
function CustomDesignIllustration({ active }: { active: boolean }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      <rect width="480" height="360" fill="#111113" />
      {/* Browser frame */}
      <rect x="20" y="20" width="440" height="320" rx="14" fill="#161618" stroke="#252528" strokeWidth="1.5" />
      {/* Top bar */}
      <rect x="20" y="20" width="440" height="46" rx="14" fill="#1A1A1C" />
      <rect x="20" y="54" width="440" height="12" fill="#1A1A1C" />
      <rect x="20" y="65" width="440" height="1" fill="#252528" />
      {/* Traffic lights */}
      <circle cx="48" cy="43" r="7" fill="#FF5F57" opacity="0.85" />
      <circle cx="68" cy="43" r="7" fill="#FFBD2E" opacity="0.85" />
      <circle cx="88" cy="43" r="7" fill="#28C940" opacity="0.85" />
      {/* URL bar */}
      <rect x="108" y="35" width="200" height="16" rx="8" fill="#0A0A0C" opacity="0.8" />
      <text x="208" y="47" fill="#5C6B7A" fontSize="8" textAnchor="middle" fontFamily="monospace" letterSpacing="1">horizondigital.sc</text>

      {/* Hero image block */}
      <motion.rect x="32" y="78" width="210" height="130" rx="8" fill="#1A1A1C"
        initial={{ scaleY: 0 }} animate={active ? { scaleY: 1 } : { scaleY: 0 }}
        style={{ transformOrigin: "32px 78px" }}
        transition={{ duration: 0.45, delay: active ? 0.15 : 0, ease }}
      />
      <motion.rect x="32" y="78" width="210" height="130" rx="8"
        fill="url(#heroGrad1)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: active ? 0.45 : 0 }}
      />

      {/* Right column – header */}
      <motion.rect x="254" y="78" width="194" height="12" rx="4" fill="#5ED1DE" opacity="0.25"
        initial={{ scaleX: 0 }} animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        style={{ transformOrigin: "254px 84px" }}
        transition={{ duration: 0.4, delay: active ? 0.22 : 0, ease }}
      />
      {/* Right column – text lines */}
      {[98, 112, 126].map((y, i) => (
        <motion.rect key={y} x="254" y={y} width={[160, 180, 140][i]} height="6" rx="3" fill="#2A2A2D"
          initial={{ opacity: 0, x: 12 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
          transition={{ duration: 0.35, delay: active ? 0.3 + i * 0.07 : 0 }}
        />
      ))}
      {/* Right column – CTA */}
      <motion.rect x="254" y="146" width="84" height="22" rx="11" fill="#5ED1DE"
        initial={{ opacity: 0, scale: 0.7 }} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        style={{ transformOrigin: "296px 157px" }}
        transition={{ type: "spring", stiffness: 220, delay: active ? 0.5 : 0 }}
      />
      <motion.text x="296" y="162" fill="#000000" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif"
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: active ? 0.58 : 0 }}
      >Get in touch →</motion.text>

      {/* Two feature cards below */}
      {[0, 1].map((i) => (
        <motion.rect key={i} x={32 + i * 214} y="220" width="200" height="56" rx="8" fill="#1A1A1C"
          initial={{ opacity: 0, y: 14 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.4, delay: active ? 0.38 + i * 0.1 : 0 }}
        />
      ))}
      {/* Feature card lines */}
      {[0, 1].map((i) => (
        <motion.g key={i} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.5 + i * 0.1 : 0 }}>
          <rect x={44 + i * 214} y="232" width={[80, 70][i]} height="6" rx="3" fill="#5ED1DE" opacity="0.5" />
          <rect x={44 + i * 214} y="244" width={[140, 130][i]} height="4" rx="2" fill="#2A2A2D" />
          <rect x={44 + i * 214} y="253" width={[120, 110][i]} height="4" rx="2" fill="#252528" />
        </motion.g>
      ))}

      {/* Right third card */}
      <motion.rect x="460" y="220" width="0" height="0" rx="8" fill="none" />

      {/* Color palette dots */}
      {["#5ED1DE", "#7B3FE4", "#F59E0B", "#EF4444", "#10B981"].map((color, i) => (
        <motion.circle key={color} cx={268 + i * 26} cy={300} r="10" fill={color}
          initial={{ scale: 0 }} animate={active ? { scale: 1 } : { scale: 0 }}
          style={{ transformOrigin: `${268 + i * 26}px 300px` }}
          transition={{ type: "spring", stiffness: 280, delay: active ? 0.55 + i * 0.07 : 0 }}
        />
      ))}

      {/* Selection dashes on hero image */}
      <motion.rect x="32" y="78" width="210" height="130" rx="8"
        fill="none" stroke="#5ED1DE" strokeWidth="1.5" strokeDasharray="6 4"
        animate={active ? { opacity: 1, strokeDashoffset: [0, -20] } : { opacity: 0 }}
        transition={{ strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }, opacity: { delay: active ? 0.6 : 0 } }}
      />

      <defs>
        <linearGradient id="heroGrad1" x1="32" y1="78" x2="242" y2="208" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5ED1DE" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7B3FE4" stopOpacity="0.08" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Illustration 2: Perfect on Mobile ──────────────────────────────────────
function MobileIllustration({ active }: { active: boolean }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      <rect width="480" height="360" fill="#111113" />

      {/* Desktop browser — left, faded */}
      <motion.g animate={active ? { opacity: 0.35 } : { opacity: 0 }} transition={{ delay: active ? 0.6 : 0 }}>
        <rect x="20" y="48" width="220" height="270" rx="10" fill="#161618" stroke="#252528" strokeWidth="1" />
        <rect x="20" y="48" width="220" height="30" rx="10" fill="#1A1A1C" />
        <circle cx="38" cy="63" r="4" fill="#FF5F57" opacity="0.6" />
        <circle cx="52" cy="63" r="4" fill="#FFBD2E" opacity="0.6" />
        <circle cx="66" cy="63" r="4" fill="#28C940" opacity="0.6" />
        <rect x="32" y="88" width="180" height="60" rx="6" fill="#1A1A1C" />
        <rect x="32" y="156" width="120" height="8" rx="3" fill="#252528" />
        <rect x="32" y="170" width="96" height="8" rx="3" fill="#252528" />
        <rect x="32" y="184" width="60" height="16" rx="8" fill="#5ED1DE" opacity="0.3" />
        <rect x="32" y="210" width="84" height="50" rx="6" fill="#1A1A1C" />
        <rect x="126" y="210" width="84" height="50" rx="6" fill="#1A1A1C" />
      </motion.g>

      {/* Arrow → */}
      <motion.text x="256" y="188" fill="#5ED1DE" fontSize="28" fontFamily="monospace" opacity="0"
        animate={active ? { opacity: 1, x: [252, 258, 252] } : { opacity: 0 }}
        transition={{ opacity: { delay: active ? 0.45 : 0 }, x: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
      >→</motion.text>

      {/* Phone frame */}
      <motion.rect x="288" y="18" width="172" height="324" rx="30" fill="#161618" stroke="#2A2A2D" strokeWidth="2"
        initial={{ opacity: 0, scale: 0.9 }} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        style={{ transformOrigin: "374px 180px" }}
        transition={{ duration: 0.4, delay: active ? 0.1 : 0, ease }}
      />
      {/* Screen */}
      <motion.rect x="296" y="48" width="156" height="264" rx="4" fill="#0A0A0C"
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: active ? 0.2 : 0 }}
      />
      {/* Notch */}
      <rect x="338" y="26" width="68" height="14" rx="7" fill="#0A0A0C" />
      {/* Home bar */}
      <rect x="338" y="330" width="68" height="4" rx="2" fill="#2A2A2D" />

      {/* Phone nav */}
      <motion.rect x="296" y="48" width="156" height="24" fill="#161618"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.25 : 0 }} />
      <motion.rect x="304" y="57" width="44" height="6" rx="3" fill="#5ED1DE" opacity="0.7"
        animate={active ? { opacity: 0.7 } : { opacity: 0 }} transition={{ delay: active ? 0.3 : 0 }} />
      <motion.rect x="402" y="57" width="42" height="6" rx="3" fill="#252528"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.3 : 0 }} />

      {/* Hero image */}
      <motion.rect x="296" y="72" width="156" height="72" fill="#1A1A1C"
        initial={{ scaleY: 0 }} animate={active ? { scaleY: 1 } : { scaleY: 0 }}
        style={{ transformOrigin: "296px 72px" }}
        transition={{ duration: 0.4, delay: active ? 0.28 : 0, ease }}
      />
      <motion.rect x="296" y="72" width="156" height="72" fill="url(#phoneGrad)"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.45 : 0 }} />
      <motion.rect x="308" y="84" width="80" height="8" rx="4" fill="#5ED1DE" opacity="0.6"
        animate={active ? { opacity: 0.6 } : { opacity: 0 }} transition={{ delay: active ? 0.48 : 0 }} />
      <motion.rect x="308" y="98" width="116" height="5" rx="2.5" fill="#2A2A2D"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.52 : 0 }} />
      <motion.rect x="308" y="108" width="96" height="5" rx="2.5" fill="#252528"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.55 : 0 }} />
      <motion.rect x="308" y="124" width="64" height="14" rx="7" fill="#5ED1DE"
        initial={{ scale: 0 }} animate={active ? { scale: 1 } : { scale: 0 }}
        style={{ transformOrigin: "340px 131px" }}
        transition={{ type: "spring", stiffness: 240, delay: active ? 0.6 : 0 }}
      />

      {/* Content rows */}
      {[152, 196, 240].map((y, i) => (
        <motion.g key={y}
          initial={{ opacity: 0, x: 12 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
          transition={{ duration: 0.35, delay: active ? 0.38 + i * 0.1 : 0 }}
        >
          <rect x="296" y={y} width="156" height="38" fill={i % 2 === 0 ? "#161618" : "#1A1A1C"} />
          <rect x="308" y={y + 8} width={[72, 88, 60][i]} height="6" rx="3" fill="#5ED1DE" opacity="0.45" />
          <rect x="308" y={y + 20} width={[100, 90, 80][i]} height="5" rx="2.5" fill="#2A2A2D" />
        </motion.g>
      ))}

      {/* Touch ripple */}
      <motion.circle cx="374" cy="285" r="20" fill="#5ED1DE" opacity="0"
        animate={active ? { opacity: [0, 0.25, 0], scale: [0.4, 1.8, 2.4] } : { opacity: 0 }}
        style={{ transformOrigin: "374px 285px" }}
        transition={{ duration: 1.6, delay: active ? 1.4 : 0, repeat: Infinity, repeatDelay: 1.8 }}
      />
      <motion.circle cx="374" cy="285" r="5" fill="white" opacity="0"
        animate={active ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
        transition={{ duration: 1.6, delay: active ? 1.4 : 0, repeat: Infinity, repeatDelay: 1.8 }}
      />

      <defs>
        <linearGradient id="phoneGrad" x1="296" y1="72" x2="452" y2="144" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5ED1DE" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0D4F58" stopOpacity="0.08" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Illustration 3: Found on Google ────────────────────────────────────────
function GoogleIllustration({ active }: { active: boolean }) {
  const results = [
    { url: "horizondigital.sc / your-business", titleW: 220, badge: true },
    { url: "example-agency.com / seychelles-web", titleW: 180, badge: false },
    { url: "tourism.sc / find-services", titleW: 200, badge: false },
  ];
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      <rect width="480" height="360" fill="#111113" />

      {/* Browser chrome */}
      <rect x="20" y="20" width="440" height="320" rx="12" fill="#161618" stroke="#252528" strokeWidth="1.5" />
      <rect x="20" y="20" width="440" height="44" rx="12" fill="#1A1A1C" />
      <rect x="20" y="52" width="440" height="12" fill="#1A1A1C" />
      <rect x="20" y="63" width="440" height="1" fill="#252528" />
      <circle cx="44" cy="42" r="6" fill="#FF5F57" opacity="0.85" />
      <circle cx="62" cy="42" r="6" fill="#FFBD2E" opacity="0.85" />
      <circle cx="80" cy="42" r="6" fill="#28C940" opacity="0.85" />

      {/* Search bar */}
      <motion.rect x="64" y="72" width="352" height="34" rx="17" fill="#0A0A0C" stroke="#2A2A2D" strokeWidth="1"
        animate={active ? { opacity: 1 } : { opacity: 0.4 }} transition={{ delay: active ? 0.1 : 0 }}
      />
      {/* Magnifying glass */}
      <motion.circle cx="88" cy="89" r="7" fill="none" stroke="#5C6B7A" strokeWidth="1.5"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.2 : 0 }} />
      <motion.line x1="93" y1="94" x2="99" y2="100" stroke="#5C6B7A" strokeWidth="1.5" strokeLinecap="round"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.2 : 0 }} />
      {/* Search query */}
      <motion.text x="108" y="94" fill="#8B9AB0" fontSize="10" fontFamily="monospace" letterSpacing="0.5"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.3 : 0 }}
      >guesthouse seychelles booking</motion.text>

      {/* Result count */}
      <motion.text x="72" y="125" fill="#5C6B7A" fontSize="8" fontFamily="sans-serif"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.45 : 0 }}
      >About 12,400 results (0.42 seconds)</motion.text>

      {/* Search results */}
      {results.map((r, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: active ? 0.42 + i * 0.14 : 0 }}
        >
          <rect x="64" y={136 + i * 72} width="352" height="60" rx="8"
            fill={i === 0 ? "#0F1E1A" : "#161618"}
            stroke={i === 0 ? "#5ED1DE" : "#252528"}
            strokeWidth={i === 0 ? "1.5" : "1"}
          />
          {/* #1 badge */}
          {i === 0 && (
            <>
              <rect x="66" y="138" width="30" height="12" rx="4" fill="#5ED1DE" />
              <text x="81" y="148" fill="#000" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">#1</text>
            </>
          )}
          {/* URL */}
          <text x="80" y={153 + i * 72} fill={i === 0 ? "#5ED1DE" : "#5C6B7A"} fontSize="8" fontFamily="sans-serif" opacity={i === 0 ? 1 : 0.7}>
            {r.url}
          </text>
          {/* Title bar */}
          <rect x="72" y={158 + i * 72} width={r.titleW} height="8" rx="3"
            fill={i === 0 ? "#5ED1DE" : "#3A3A3F"} opacity={i === 0 ? 0.85 : 0.6} />
          {/* Description lines */}
          <rect x="72" y={172 + i * 72} width="310" height="5" rx="2.5" fill="#252528" />
          <rect x="72" y={181 + i * 72} width="260" height="5" rx="2.5" fill="#1E1E20" />
        </motion.g>
      ))}
    </svg>
  );
}

// ── Illustration 4: Fast & Reliable (PageSpeed gauge) ─────────────────────
function FastIllustration({ active }: { active: boolean }) {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const score = 96;
  const dashOffset = circumference * (1 - score / 100);

  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    if (!active) { setDisplayScore(0); return; }
    const timeout = setTimeout(() => {
      let n = 0;
      const step = () => {
        n = Math.min(n + 3, score);
        setDisplayScore(n);
        if (n < score) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 400);
    return () => clearTimeout(timeout);
  }, [active]);

  const metrics = [
    { label: "FCP", value: "0.8s" },
    { label: "LCP", value: "1.2s" },
    { label: "CLS", value: "0.02" },
    { label: "FID", value: "10ms" },
  ];

  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      <rect width="480" height="360" fill="#111113" />

      {/* Outer ambient ring */}
      <motion.circle cx="240" cy="168" r={radius + 28} stroke="#5ED1DE" strokeWidth="1" fill="none"
        animate={active ? { opacity: [0, 0.12, 0] } : { opacity: 0 }}
        transition={{ duration: 2.4, delay: active ? 1.6 : 0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Track ring */}
      <circle cx="240" cy="168" r={radius} stroke="#1E1E20" strokeWidth="18" fill="none" />

      {/* Score arc */}
      <motion.circle
        cx="240" cy="168" r={radius}
        stroke="#5ED1DE"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={active ? { strokeDashoffset: dashOffset } : { strokeDashoffset: circumference }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "240px 168px" }}
        transition={{ duration: 1.4, delay: active ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Score number */}
      <motion.text
        x="240" y="158"
        fill="white"
        fontSize="54"
        fontWeight="800"
        textAnchor="middle"
        fontFamily="sans-serif"
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: active ? 0.4 : 0 }}
      >{displayScore}</motion.text>

      {/* "/ 100" label */}
      <motion.text x="240" y="178" fill="#5C6B7A" fontSize="11" textAnchor="middle" fontFamily="sans-serif"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.6 : 0 }}
      >/ 100</motion.text>

      {/* PERFORMANCE label */}
      <motion.text x="240" y="198" fill="#5ED1DE" fontSize="9" textAnchor="middle" fontFamily="sans-serif" letterSpacing="3"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.7 : 0 }}
      >PERFORMANCE</motion.text>

      {/* Google PageSpeed Insights */}
      <motion.text x="240" y="222" fill="#5C6B7A" fontSize="8" textAnchor="middle" fontFamily="sans-serif"
        animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: active ? 0.9 : 0 }}
      >Google PageSpeed Insights</motion.text>

      {/* Metric chips */}
      {metrics.map((m, i) => (
        <motion.g key={m.label}
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: active ? 1.0 + i * 0.08 : 0 }}
        >
          <rect x={76 + i * 82} y="282" width="68" height="44" rx="8" fill="#161618" stroke="#252528" strokeWidth="1" />
          <text x={110 + i * 82} y="302" fill="#5C6B7A" fontSize="7" textAnchor="middle" fontFamily="monospace">{m.label}</text>
          <text x={110 + i * 82} y="318" fill="#5ED1DE" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">{m.value}</text>
        </motion.g>
      ))}
    </svg>
  );
}

// ── Illustration switcher ──────────────────────────────────────────────────
const ILLUSTRATIONS = [
  CustomDesignIllustration,
  MobileIllustration,
  GoogleIllustration,
  FastIllustration,
];

function ServiceIllustrationPanel() {
  const { activeSlide } = useHoverSliderContext();
  const ActiveIll = ILLUSTRATIONS[activeSlide];

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ActiveIll active={true} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Active slide description ───────────────────────────────────────────────
function ActiveSlideDescription() {
  const { activeSlide } = useHoverSliderContext();
  return (
    <div className="relative min-h-[4rem] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={activeSlide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-muted text-sm md:text-base leading-relaxed max-w-md"
        >
          {SLIDES[activeSlide]?.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ── Auto-advance (pauses on hover) ────────────────────────────────────────
function AutoAdvance({ total, interval = 3000, paused }: { total: number; interval?: number; paused: boolean }) {
  const { changeSlide, activeSlide } = useHoverSliderContext();
  const slideRef = useRef(activeSlide);

  // Keep ref in sync with context without re-creating the timer
  useEffect(() => {
    slideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused) {
        changeSlide((slideRef.current + 1) % total);
      }
    }, interval);
    return () => clearInterval(id);
  }, [changeSlide, total, interval, paused]);

  return null;
}

// ── Main export ────────────────────────────────────────────────────────────
export function OurServicesSlideshow() {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <HoverSlider 
      className="w-full relative z-10 bg-[#0A0A0C] touch-pan-y touch-pan-x"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AutoAdvance total={SLIDES.length} interval={3000} paused={isPaused} />

      <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-x-16">

        {/* Left Column: Interactive Titles */}
        <div className="flex flex-col space-y-3 md:space-y-6 w-full md:w-1/2 z-20 md:pt-2">
          {SLIDES.map((slide, index) => (
            <div key={slide.title} className="flex flex-col">
              <TextStaggerHover
                index={index}
                className="text-xl md:text-3xl lg:text-4xl font-display font-medium uppercase tracking-wider text-white w-fit"
                text={slide.title}
              />
            </div>
          ))}
        </div>

        {/* Right Column: SVG Illustration + description below */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 group">
          <div className="w-full aspect-[4/3] max-w-lg rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 bg-[#111113]">
            <ServiceIllustrationPanel />
          </div>

          {/* Description sits cleanly below the illustration */}
          <ActiveSlideDescription />
        </div>

      </div>
    </HoverSlider>
  );
}

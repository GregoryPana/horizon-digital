/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        "bg-panel": "var(--bg-panel)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-soft": "var(--accent-soft)",
        "accent-2-soft": "var(--accent-2-soft)",
        "deep-teal": "var(--deep-teal)",
        border: "var(--border)",
        "glow": "var(--glow)",
        cyan: "#5ED1DE",
      },
      boxShadow: {
        glow: "0 0 24px var(--glow)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.25)",
      },
      backdropBlur: {
        glass: "10px",
      },
      fontFamily: {
        sans: ["Switzer", "Inter Variable", "Inter Fallback", "Inter", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Satoshi", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "horizon": "linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent)",
        "hero-glow": "radial-gradient(60% 60% at 20% 20%, rgba(94, 209, 222, 0.18), transparent 60%)",
      },
      animation: {
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "gradient": "gradient 8s linear infinite",
      },
      keyframes: {
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" },
        },
        "shimmer-slide": {
          to: { transform: "translate(calc(100cqw - 100%), 0)" },
        },
      },
    },
  },
  plugins: [],
};

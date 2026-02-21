/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        "bg-panel": "var(--bg-panel)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-soft": "var(--accent-soft)",
        "accent-2-soft": "var(--accent-2-soft)",
        border: "var(--border)",
        "glow": "var(--glow)",
      },
      boxShadow: {
        glow: "0 0 24px var(--glow)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.25)",
      },
      backdropBlur: {
        glass: "10px",
      },
      fontFamily: {
        display: ["Sora", "Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        "horizon": "linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent)",
        "hero-glow": "radial-gradient(60% 60% at 20% 20%, rgba(13, 221, 199, 0.25), transparent 60%)",
      },
      animation: {
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      },
      keyframes: {
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

export function HeroFlowField() {
  return (
    <div className="hero-flow-field pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="hero-flow-cyan" x1="620" y1="90" x2="1560" y2="760" gradientUnits="userSpaceOnUse">
            <stop stopColor="#58d5e3" stopOpacity="0" />
            <stop offset="0.35" stopColor="#71e9ed" stopOpacity="0.62" />
            <stop offset="0.76" stopColor="#36bda9" stopOpacity="0.45" />
            <stop offset="1" stopColor="#73dca8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-flow-node" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) scale(18)">
            <stop stopColor="#d9fcff" stopOpacity="0.9" />
            <stop offset="0.35" stopColor="#68e4eb" stopOpacity="0.48" />
            <stop offset="1" stopColor="#58d5e3" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          className="hero-flow-path hero-flow-path-a"
          pathLength="1"
          d="M548 102C736 29 848 172 1010 125C1194 72 1353 58 1578 178"
          stroke="url(#hero-flow-cyan)"
          strokeWidth="1.25"
        />
        <path
          className="hero-flow-path hero-flow-path-b"
          pathLength="1"
          d="M610 792C772 644 927 797 1098 681C1286 553 1410 551 1608 626"
          stroke="url(#hero-flow-cyan)"
          strokeWidth="1.1"
        />
        <path
          className="hero-flow-path hero-flow-path-c"
          pathLength="1"
          d="M968 -38C886 173 1077 243 1037 421C999 590 940 705 1189 933"
          stroke="url(#hero-flow-cyan)"
          strokeWidth="0.9"
        />

        <g className="hero-flow-nodes">
          <circle className="hero-flow-node hero-flow-node-a" cx="1008" cy="125" r="18" fill="url(#hero-flow-node)" />
          <circle className="hero-flow-node hero-flow-node-b" cx="1268" cy="88" r="14" fill="url(#hero-flow-node)" />
          <circle className="hero-flow-node hero-flow-node-c" cx="1098" cy="681" r="17" fill="url(#hero-flow-node)" />
          <circle className="hero-flow-node hero-flow-node-d" cx="1037" cy="421" r="12" fill="url(#hero-flow-node)" />
        </g>
      </svg>
    </div>
  );
}

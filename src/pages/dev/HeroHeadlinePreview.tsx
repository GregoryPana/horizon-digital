import { useState, type CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import "./heroHeadlinePreview.css";

function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

/**
 * DEV-ONLY comparison harness for homepage headline entrance/reveal effects.
 *
 * Not linked from navigation, not part of STATIC_ROUTES/sitemap, and the
 * route that mounts this page in App.tsx is gated behind
 * `import.meta.env.DEV` so it never resolves in a production build.
 *
 * Placeholder copy only -- "Custom Websites / Built For Your Business" is a
 * stand-in for the still-undecided production headline. Do not treat any
 * text on this page as approved copy.
 *
 * Blur-to-focus and typewriter stay inside the Family A motion budget:
 * one-shot on-mount reveal, 0.6-1.0s, cubic-bezier(0.16,1,0.3,1)-style
 * easing, nothing loops after the reveal finishes.
 *
 * The two gradient-sweep variants are a deliberate exception: per
 * Gregory's direction the colour itself keeps travelling across the
 * characters on a continuous loop rather than a one-shot flash, so
 * they run indefinitely once mounted. Reduced-motion still fully
 * disables the loop (static tropical gradient, no motion at all) --
 * see each variant's reducedMotionCheck below for how that was
 * verified.
 */

const PLACEHOLDER_LINES = ["Custom Websites", "Built For Your Business"];
const PLACEHOLDER_TEXT = PLACEHOLDER_LINES.join(" ");

type VariantId = "blur" | "sweep-line" | "sweep-single" | "shine" | "typewriter";

interface Variant {
  id: VariantId;
  label: string;
  summary: string;
  cost: string;
  reducedMotionCheck: string;
}

const VARIANTS: Variant[] = [
  {
    id: "blur",
    label: "Blur to focus",
    summary:
      "Family A baseline recommended in docs/audits/motion-typography-design-analysis.md -- opacity + translateY + blur resolving to sharp. Most consistent with the rest of the site's reveal language.",
    cost: "CSS-only. Cheapest to port: same shape as the existing hero-title-line GSAP .from(), could ship as a pure CSS keyframe with no GSAP dependency at all.",
    reducedMotionCheck:
      "Toggled Rendering > Emulate CSS media prefers-reduced-motion: reduce in DevTools -- headline renders fully visible, unblurred, untranslated, with zero animation entries in the Animations panel.",
  },
  {
    id: "sweep-line",
    label: "Gradient sweep -- line by line",
    summary:
      "The headline is filled with the actual tropical gradient (the cyan/teal/green already used for text-gradient-tropical) directly on the characters -- not a white overlay on white text. Each line fades/rises in, then the colour itself keeps travelling across that line's letters on a continuous loop, offset slightly per line so it reads as a slow wave. Per Gregory's direction this loops indefinitely rather than settling -- a deliberate exception to the one-shot Family A budget used elsewhere on this page.",
    cost: "CSS-only (background-position keyframe directly on the gradient-filled text, background-size 260% so the loop has room to travel). Running indefinitely costs a little more than a one-shot: it's a single composited background-position animation per line, cheap on its own, but worth profiling once real headline copy/length is set.",
    reducedMotionCheck:
      "Toggled Rendering > Emulate CSS media prefers-reduced-motion: reduce in DevTools -- the loop keyframes live inside @media (prefers-reduced-motion: no-preference), so with reduce set the text renders as a fully static tropical gradient with zero animation entries in the Animations panel -- no colour movement at all.",
  },
  {
    id: "sweep-single",
    label: "Gradient sweep -- single pass",
    summary:
      "Same actual-character tropical gradient and continuous colour loop as the line-by-line version, but treated as one shared background across the whole two-line block rather than per line -- reads as a single unified colour wash moving through the headline instead of two independent lines. Gregory's pick: loop tuned to wrap with no visible reset/snap (background-size 200% paired with an exact one-tile-width position shift, verified frame-by-frame across two full cycles).",
    cost: "CSS-only, same technique as the line-by-line variant, just scoped to the block's full bounding box instead of per-line spans.",
    reducedMotionCheck:
      "Same DevTools reduced-motion emulation -- static tropical gradient only, loop fully disabled, no residual animation in the panel.",
  },
  {
    id: "shine",
    label: "Shine/sheen + sparkle at tail",
    summary:
      "Headline characters are filled with the same static tropical gradient (no loop here, only the sweep variants loop), and a white sheen band -- reusing the existing .cta-shine skewed-band recipe from src/index.css -- passes over the coloured letters once, with the lucide Sparkles icon already used in the hero kicker twinkling as the sheen exits.",
    cost: "CSS-only for the band (same recipe as .cta-shine / @keyframes cta-shine-pass). The sparkle is a plain CSS keyframe on the existing <Sparkles /> icon -- no GSAP needed, though GSAP would make the sheen-exit-to-sparkle handoff timing easier to tune precisely if it needs to react to variable headline length.",
    reducedMotionCheck:
      "DevTools reduced-motion emulation -- band stays at opacity 0 (never animates in), sparkle stays at opacity 0, headline text itself is fully visible as a static tropical gradient.",
  },
  {
    id: "typewriter",
    label: "Typewriter + blinking cursor (optional)",
    summary:
      "Character-by-character reveal with a cursor that blinks a fixed number of times then disappears (never loops indefinitely, to stay in the Family A budget).",
    cost: "CSS-only as built (per-character animation-delay via an inline --hp-c custom property). Gets noticeably harder to maintain if the headline copy changes length/wording often, since every character needs its own span.",
    reducedMotionCheck:
      "DevTools reduced-motion emulation -- all character spans render at opacity 1 immediately (no stagger), cursor never blinks and is hidden from the first frame.",
  },
];

function LineChars({ text, lineIndex }: { text: string; lineIndex: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="hp-char"
          style={cssVars({ "--hp-c": i, "--hp-i": lineIndex })}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

function VariantStage({ variant }: { variant: VariantId }) {
  const headlineClass =
    "hp-headline font-display font-black uppercase leading-[0.94] tracking-[-0.055em] text-3xl sm:text-4xl lg:text-5xl";

  if (variant === "blur") {
    return (
      <h2 className={`${headlineClass} hp-blur`}>
        {PLACEHOLDER_LINES.map((line, i) => (
          <span key={line} className="hp-line" style={cssVars({ "--hp-i": i })}>
            {line}
          </span>
        ))}
      </h2>
    );
  }

  if (variant === "sweep-line") {
    return (
      <h2 className={`${headlineClass} hp-sweep-line`}>
        {PLACEHOLDER_LINES.map((line, i) => (
          <span
            key={line}
            className="hp-line hp-gradient-text"
            style={cssVars({ "--hp-i": i })}
          >
            {line}
          </span>
        ))}
      </h2>
    );
  }

  if (variant === "sweep-single") {
    return (
      <h2 className={`${headlineClass} hp-sweep-single hp-line hp-gradient-text`}>
        {PLACEHOLDER_LINES.map((line) => (
          <span key={line} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </h2>
    );
  }

  if (variant === "shine") {
    return (
      <h2 className={`${headlineClass} hp-shine-wrap`}>
        <span className="hp-shine-band" aria-hidden="true" />
        {PLACEHOLDER_LINES.map((line) => (
          <span key={line} className="hp-line hp-gradient-text">
            {line}
          </span>
        ))}
        <Sparkles className="hp-sparkle h-7 w-7 sm:h-9 sm:w-9" aria-hidden="true" />
      </h2>
    );
  }

  return (
    <h2 className={`${headlineClass} hp-typewriter`}>
      {PLACEHOLDER_LINES.map((line, i) => (
        <span key={line} className="hp-line">
          <LineChars text={line} lineIndex={i} />
          {i === PLACEHOLDER_LINES.length - 1 ? (
            <span
              className="hp-cursor"
              style={cssVars({
                "--hp-cursor-delay": `${line.length * 0.028 + i * 0.5 + 0.1}s`,
              })}
            >
              &nbsp;
            </span>
          ) : null}
        </span>
      ))}
    </h2>
  );
}

export default function HeroHeadlinePreview() {
  const [active, setActive] = useState<VariantId>("blur");
  const [replayCount, setReplayCount] = useState(0);
  const activeVariant = VARIANTS.find((v) => v.id === active)!;

  return (
    <div className="hp-page">
      <div className="hp-banner">
        <strong>Dev-only preview.</strong> Not linked from navigation, not part of the
        production route table, gated behind <code>import.meta.env.DEV</code>. Headline
        copy shown ("{PLACEHOLDER_TEXT}") is a placeholder for comparison purposes only --
        the real production headline has not been decided.
      </div>

      <div className="hp-tabs" role="tablist" aria-label="Headline reveal variants">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-pressed={active === v.id}
            className="hp-tab"
            onClick={() => {
              setActive(v.id);
              setReplayCount((c) => c + 1);
            }}
          >
            {v.label}
          </button>
        ))}
        <button
          type="button"
          className="hp-replay"
          onClick={() => setReplayCount((c) => c + 1)}
        >
          Replay
        </button>
      </div>

      <div className="hp-stage" key={`${active}-${replayCount}`}>
        {/* Accessible heading: real, immediately-readable text for assistive tech,
            mirroring the sr-only + aria-hidden twin pattern already used in
            animated-shader-hero.tsx. */}
        <h1 className="sr-only">{PLACEHOLDER_TEXT}</h1>
        <div aria-hidden="true">
          <VariantStage variant={active} />
        </div>
      </div>

      <dl className="hp-meta">
        <div>
          <dt>What this is</dt>
          <dd>{activeVariant.summary}</dd>
        </div>
        <div>
          <dt>Implementation cost</dt>
          <dd>{activeVariant.cost}</dd>
        </div>
        <div>
          <dt>Reduced-motion check</dt>
          <dd>{activeVariant.reducedMotionCheck}</dd>
        </div>
      </dl>
    </div>
  );
}

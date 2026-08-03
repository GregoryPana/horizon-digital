import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { shouldAnimateWebsiteBuildStory } from "./websiteBuildStory";

const STORY_VIEWPORT_ROOT_MARGIN = "200px 0px";

function setCompletedState(root: HTMLElement) {
  const query = gsap.utils.selector(root);
  gsap.set(query(".story-trace"), { strokeDashoffset: 0, opacity: 1 });
  gsap.set(query(".story-portrait-trace"), { strokeDashoffset: 0, opacity: 0.72 });
  gsap.set(
    query(".story-wireframe, .story-design, .story-code, .story-device, .story-checks, .story-portrait-wireframe, .story-portrait-content, .story-portrait-cards"),
    { opacity: 1 }
  );
  gsap.set(query(".story-wireframe-block, .story-design-piece, .story-phone, .story-cursor"), {
    clearProps: "transform",
    opacity: 1,
  });
  gsap.set(query(".story-portrait-cards > *, .story-portrait-contact"), {
    clearProps: "transform",
    opacity: 1,
  });
  gsap.set(query(".story-live, .story-portrait-ready, .story-live-dot, .story-portrait-ready-dot"), {
    clearProps: "transform",
    opacity: 1,
  });
  gsap.set(query(".story-portrait-route"), { clearProps: "transform", opacity: 1 });
  gsap.set(query(".story-stage-label > text"), { opacity: 0 });
  gsap.set(query(".story-stage-live"), { opacity: 1 });
}

export function WebsiteBuildStory({
  startDelay = 0.12,
  mode = "landscape",
}: {
  startDelay?: number;
  mode?: "landscape" | "portrait";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replace(/:/g, "");
  const accentId = `story-accent-${instanceId}`;
  const panelId = `story-panel-${instanceId}`;
  const glowId = `story-glow-${instanceId}`;
  const violetId = `story-violet-${instanceId}`;
  const portraitId = `story-portrait-${instanceId}`;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      setCompletedState(root);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      let reducedMotion = false;
      let inViewport = false;
      let variant: { compact: boolean; mobile: boolean } | null = null;
      let timeline: gsap.core.Timeline | null = null;

      const stopPlayback = () => {
        if (timeline) {
          timeline.kill();
          timeline = null;
        }
        setCompletedState(root);
      };

      const sync = () => {
        if (!variant) return;
        if (shouldAnimateWebsiteBuildStory({ reducedMotion, inViewport, mobile: variant.mobile })) {
          if (!timeline) {
            if (mode === "portrait") buildPortraitTimeline();
            else buildLandscapeTimeline(variant.compact);
          }
        } else {
          stopPlayback();
        }
      };

      const mm = gsap.matchMedia();
      const buildLandscapeTimeline = (compact: boolean) => {
        const query = gsap.utils.selector(root);
        const traces = query(".story-trace");
        const groups = query(".story-design, .story-code, .story-device, .story-checks, .story-live");
        const labels = query(".story-stage-label > text");
        const code = query(".story-code");

        gsap.set(traces, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.28 });
        gsap.set(query(".story-wireframe"), { opacity: 0.42 });
        gsap.set(groups, { opacity: 0 });
        gsap.set(query(".story-design"), { opacity: 0.16 });
        gsap.set(labels, { opacity: 0, y: 5 });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.55, delay: startDelay });

        tl
          .addLabel("plan")
          .to(query(".story-stage-plan"), { opacity: 1, y: 0, duration: 0.22 })
          .to(query(".story-wireframe"), { opacity: 1, duration: 0.2 }, "-=0.08")
          .to(query(".story-wireframe .story-trace"), {
            strokeDashoffset: 0,
            opacity: 0.82,
            duration: 0.85,
            stagger: 0.06,
            ease: "power2.out",
          }, "-=0.08")
          .fromTo(
            query(".story-wireframe-block"),
            { opacity: 0, y: 10, scale: 0.96 },
            { opacity: 0.78, y: 0, scale: 1, duration: 0.42, stagger: 0.08, ease: "power2.out" }
          )
          .to({}, { duration: compact ? 0.45 : 0.75 })
          .to(query(".story-stage-plan"), { opacity: 0, y: -5, duration: 0.18 })
          .addLabel("design")
          .to(query(".story-stage-design"), { opacity: 1, y: 0, duration: 0.2 })
          .to(query(".story-design"), { opacity: 1, duration: 0.2 })
          .fromTo(
            query(".story-design-piece"),
            { opacity: 0, scale: 0.92 },
            { opacity: 0.92, scale: 1, duration: 0.38, stagger: 0.08, ease: "back.out(1.4)" }
          )
          .to(query(".story-cursor"), { x: -42, y: 34, duration: 0.55, ease: "power2.inOut" })
          .to({}, { duration: 0.42 })
          .to(query(".story-stage-design"), { opacity: 0, y: -5, duration: 0.18 });

        if (!compact) {
          tl
            .addLabel("build")
            .to(query(".story-stage-build"), { opacity: 1, y: 0, duration: 0.2 })
            .to(code, { opacity: 1, x: 0, duration: 0.32 })
            .to(query(".story-code .story-trace"), {
              strokeDashoffset: 0,
              opacity: 0.72,
              duration: 0.48,
              stagger: 0.05,
              ease: "power2.out",
            })
            .to({}, { duration: 0.45 })
            .to({}, { duration: 0.4 })
            .to(query(".story-stage-build"), { opacity: 0, y: -5, duration: 0.18 });
        } else {
          tl.to({}, { duration: 0.5 });
        }

        tl
          .addLabel("test")
          .to(query(".story-stage-test"), { opacity: 1, y: 0, duration: 0.2 })
          .to(query(".story-device"), { opacity: 1, duration: 0.2 })
          .fromTo(
            query(".story-phone"),
            { opacity: 0, scale: 0.82, x: 22 },
            { opacity: 0.9, scale: 1, x: 0, duration: 0.52, ease: "back.out(1.5)" }
          )
          .to(query(".story-checks"), { opacity: 1, duration: 0.2 })
          .to(query(".story-check-path"), {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.34,
            stagger: 0.2,
            ease: "power2.out",
          })
          .to({}, { duration: compact ? 0.72 : 1.15 })
          .to(query(".story-stage-test"), { opacity: 0, y: -5, duration: 0.18 })
          .addLabel("launch")
          .to(query(".story-stage-live"), { opacity: 1, y: 0, duration: 0.2 })
          .to(query(".story-live"), { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(1.6)" })
          .fromTo(query(".story-live-dot"), { scale: 0.5 }, { scale: 1.45, duration: 0.35, repeat: 1, yoyo: true })
          .to({}, { duration: compact ? 1.45 : 2.1 })
          .to(query(".story-stage-live"), { opacity: 0, y: -5, duration: 0.24 })
          .to(query(".story-live"), { opacity: 0, scale: 0.92, duration: 0.34, ease: "power2.in" }, "-=0.1")
          .to(query(".story-checks"), { opacity: 0, y: 8, duration: 0.32, ease: "power2.in" }, "-=0.18")
          .to(query(".story-phone"), { opacity: 0, scale: 0.86, x: 18, duration: 0.38, ease: "power2.in" }, "-=0.18")
          .to(query(".story-code .story-trace"), {
            strokeDashoffset: 1,
            opacity: 0.18,
            duration: 0.42,
            stagger: { each: 0.04, from: "end" },
            ease: "power2.inOut",
          }, "-=0.16")
          .to(code, { opacity: 0, x: 12, duration: 0.3, ease: "power2.in" }, "-=0.22")
          .to(query(".story-design-piece"), {
            opacity: 0,
            scale: 0.96,
            duration: 0.3,
            stagger: { each: 0.055, from: "end" },
            ease: "power2.in",
          }, "-=0.12")
          .to(query(".story-wireframe-block"), {
            opacity: 0,
            y: -7,
            scale: 0.97,
            duration: 0.28,
            stagger: { each: 0.045, from: "end" },
            ease: "power2.in",
          }, "-=0.15")
          .to(query(".story-wireframe .story-trace"), {
            strokeDashoffset: 1,
            opacity: 0.12,
            duration: 0.62,
            stagger: { each: 0.05, from: "end" },
            ease: "power2.inOut",
          }, "-=0.08")
          .set(groups, { opacity: 0, x: 0, y: 0, scale: 1 })
          .set(labels, { opacity: 0, y: 5 })
          .set(query(".story-wireframe-block, .story-design-piece, .story-phone"), { x: 0, y: 0, scale: 1 })
          .set(query(".story-cursor"), { x: 0, y: 0 })
          .set(query(".story-wireframe"), { opacity: 0.42 })
          .set(query(".story-design"), { opacity: 0.16 });

        timeline = tl;
      };

      const buildPortraitTimeline = () => {
        const query = gsap.utils.selector(root);
        const traces = query(".story-portrait-trace");
        const content = query(".story-portrait-content");
        const cards = query(".story-portrait-cards > *");
        const contact = query(".story-portrait-contact");
        const ready = query(".story-portrait-ready");

        gsap.set(traces, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.28 });
        gsap.set(query(".story-portrait-wireframe"), { opacity: 0.48 });
        gsap.set(content, { opacity: 0.2 });
        gsap.set([contact, ready], { opacity: 0 });
        gsap.set(cards, { opacity: 0.16, y: 10, scale: 0.98 });

        timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: startDelay })
          .to(traces, {
            strokeDashoffset: 0,
            opacity: 0.84,
            duration: 0.72,
            stagger: 0.07,
            ease: "power2.out",
          })
          .to(content, { opacity: 1, duration: 0.34 }, "-=0.18")
          .to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.32,
            stagger: 0.11,
            ease: "back.out(1.35)",
          })
          .fromTo(query(".story-portrait-route"), { scaleY: 0 }, {
            scaleY: 1,
            duration: 0.55,
            transformOrigin: "50% 0%",
            ease: "power2.inOut",
          }, "-=0.22")
          .fromTo(contact, { opacity: 0, y: 18 }, {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
          }, "-=0.12")
          .fromTo(ready, { opacity: 0, scale: 0.82 }, {
            opacity: 1,
            scale: 1,
            duration: 0.36,
            ease: "back.out(1.5)",
          })
          .to(query(".story-portrait-ready-dot"), {
            scale: 1.55,
            duration: 0.3,
            repeat: 1,
            yoyo: true,
          })
          .to({}, { duration: 1.5 })
          .to([contact, ready], { opacity: 0, duration: 0.38, ease: "power2.in" })
          .to(content, { opacity: 0.2, duration: 0.38, ease: "power2.in" }, "<")
          .set(cards, { opacity: 0.16, y: 10, scale: 0.98 })
          .set(traces, { strokeDashoffset: 1, opacity: 0.28 })
          .set(query(".story-portrait-wireframe"), { opacity: 0.48 });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        reducedMotion = true;
        sync();
        return () => {
          reducedMotion = false;
        };
      });
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        reducedMotion = false;
        variant = { compact: false, mobile: false };
        sync();
        return () => {
          stopPlayback();
          variant = null;
        };
      });
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 640px) and (max-width: 1023px)", () => {
        reducedMotion = false;
        variant = { compact: true, mobile: false };
        sync();
        return () => {
          stopPlayback();
          variant = null;
        };
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 639px)", () => {
        reducedMotion = false;
        variant = { compact: true, mobile: true };
        sync();
        return () => {
          stopPlayback();
          variant = null;
        };
      });

      let observer: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            inViewport = entries.some((entry) => entry.isIntersecting);
            sync();
          },
          { rootMargin: STORY_VIEWPORT_ROOT_MARGIN, threshold: 0.1 }
        );
        observer.observe(root);
      } else {
        inViewport = true;
        sync();
      }

      return () => {
        observer?.disconnect();
        mm.revert();
        stopPlayback();
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} data-story-mode={mode} className="website-build-story pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg viewBox={mode === "portrait" ? "0 0 360 640" : "0 0 1200 760"} preserveAspectRatio="xMidYMid meet" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id={accentId} x1="220" y1="160" x2="920" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="#71e9ed" />
            <stop offset="0.55" stopColor="#55cfe0" />
            <stop offset="1" stopColor="#73dca8" />
          </linearGradient>
          <linearGradient id={panelId} x1="360" y1="230" x2="800" y2="520" gradientUnits="userSpaceOnUse">
            <stop stopColor="#58d5e3" stopOpacity="0.24" />
            <stop offset="1" stopColor="#36bda9" stopOpacity="0.12" />
          </linearGradient>
          <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <linearGradient id={violetId} x1="620" y1="180" x2="930" y2="530" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8c7cff" stopOpacity=".72" />
            <stop offset=".55" stopColor="#58d5e3" stopOpacity=".4" />
            <stop offset="1" stopColor="#73dca8" stopOpacity=".16" />
          </linearGradient>
          <linearGradient id={portraitId} x1="48" y1="84" x2="310" y2="548" gradientUnits="userSpaceOnUse">
            <stop stopColor="#53d8e7" />
            <stop offset=".5" stopColor="#66d6c0" />
            <stop offset="1" stopColor="#8b7cf6" />
          </linearGradient>
        </defs>

        <g className="story-portrait-scene">
          <g className="story-scene-base">
            <rect x="22" y="22" width="316" height="596" rx="28" fill="#06161d" opacity=".94" />
            <circle cx="282" cy="126" r="112" fill="#765de8" opacity=".055" filter={`url(#${glowId})`} />
            <circle cx="92" cy="478" r="102" fill="#42d4cb" opacity=".045" filter={`url(#${glowId})`} />
            <path d="M54 98H306M54 156H306M54 214H306M54 272H306M54 330H306M54 388H306M54 446H306M54 504H306" stroke="rgba(142,229,232,.055)" />
            <path d="M76 66v516M134 66v516M192 66v516M250 66v516" stroke="rgba(142,229,232,.045)" />
          </g>

          <g className="story-portrait-wireframe" stroke="rgba(199,241,243,.5)" strokeWidth="1.5">
            <rect className="story-portrait-trace" pathLength="1" x="52" y="72" width="116" height="12" rx="6" />
            <rect className="story-portrait-trace" pathLength="1" x="52" y="112" width="256" height="92" rx="14" />
            <rect className="story-portrait-trace" pathLength="1" x="52" y="226" width="256" height="70" rx="12" />
            <rect className="story-portrait-trace" pathLength="1" x="52" y="312" width="256" height="70" rx="12" />
            <rect className="story-portrait-trace" pathLength="1" x="52" y="398" width="256" height="70" rx="12" />
            <rect className="story-portrait-trace" pathLength="1" x="52" y="508" width="256" height="52" rx="18" />
          </g>

          <g className="story-portrait-content">
            <rect x="52" y="72" width="74" height="12" rx="6" fill="#9bf2ef" opacity=".88" />
            <circle cx="294" cy="78" r="7" fill="#73dca8" opacity=".85" />
            <rect x="52" y="112" width="256" height="92" rx="14" fill={`url(#${portraitId})`} opacity=".16" />
            <rect x="72" y="134" width="154" height="11" rx="5.5" fill="#e8ffff" opacity=".78" />
            <rect x="72" y="156" width="194" height="7" rx="3.5" fill="#c9f5f4" opacity=".38" />
            <rect x="72" y="174" width="112" height="7" rx="3.5" fill="#c9f5f4" opacity=".26" />
          </g>

          <g className="story-portrait-cards">
            <g><rect x="52" y="226" width="256" height="70" rx="12" fill="rgba(61,203,216,.13)" stroke="rgba(108,232,235,.34)" /><circle cx="78" cy="250" r="9" fill="#58d5e3" opacity=".8" /><rect x="98" y="244" width="126" height="8" rx="4" fill="#dcfbfb" opacity=".58" /><rect x="98" y="262" width="86" height="6" rx="3" fill="#bde8e8" opacity=".25" /></g>
            <g><rect x="52" y="312" width="256" height="70" rx="12" fill="rgba(91,213,174,.11)" stroke="rgba(115,220,168,.32)" /><circle cx="78" cy="336" r="9" fill="#73dca8" opacity=".78" /><rect x="98" y="330" width="148" height="8" rx="4" fill="#dcfbeb" opacity=".56" /><rect x="98" y="348" width="102" height="6" rx="3" fill="#bde8d2" opacity=".24" /></g>
            <g><rect x="52" y="398" width="256" height="70" rx="12" fill="rgba(128,111,238,.12)" stroke="rgba(157,143,255,.34)" /><circle cx="78" cy="422" r="9" fill="#9d8fff" opacity=".8" /><rect x="98" y="416" width="132" height="8" rx="4" fill="#eeeaff" opacity=".56" /><rect x="98" y="434" width="116" height="6" rx="3" fill="#d4ccff" opacity=".24" /></g>
          </g>

          <path className="story-portrait-route" d="M34 238v222" stroke={`url(#${portraitId})`} strokeWidth="3" strokeLinecap="round" />

          <g className="story-portrait-contact">
            <rect x="52" y="508" width="256" height="52" rx="18" fill={`url(#${portraitId})`} opacity=".86" />
            <circle cx="80" cy="534" r="10" fill="#06161d" opacity=".72" />
            <path d="m76 534 3 3 6-7" stroke="#dffff8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="104" y="539" fill="#06161d" fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="800" letterSpacing="1.4">CONTACT READY</text>
          </g>

          <g transform="translate(212 580)">
            <g className="story-portrait-ready">
              <rect width="96" height="28" rx="14" fill="rgba(9,41,38,.94)" stroke="rgba(115,220,168,.58)" />
              <circle className="story-portrait-ready-dot" cx="16" cy="14" r="4" fill="#73dca8" />
              <text x="30" y="18" fill="#c9f9dc" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" letterSpacing="1.4">MOBILE</text>
            </g>
          </g>
        </g>

        <g className="story-landscape-scene">
          <g className="story-scene-base">
            <rect x="164" y="150" width="872" height="510" rx="34" fill="#06151c" opacity=".72" />
            <circle cx="850" cy="270" r="210" fill="#7662eb" opacity=".035" filter={`url(#${glowId})`} />
            <circle cx="350" cy="520" r="190" fill="#43d2c5" opacity=".03" filter={`url(#${glowId})`} />
            <path d="M188 188H1010M188 646H1010" stroke="rgba(143,230,233,.11)" />
            <path d="M184 610C320 548 402 654 548 576s254-26 440-112" stroke={`url(#${violetId})`} strokeWidth="1.5" opacity=".32" />
            <circle cx="548" cy="576" r="5" fill="#58d5e3" opacity=".7" />
            <circle cx="790" cy="508" r="5" fill="#9d8fff" opacity=".7" />
          </g>

        <g className="story-wireframe" stroke="rgba(189,231,235,.42)" strokeWidth="1.2">
          <rect className="story-wireframe-block story-trace" pathLength="1" x="206" y="212" width="246" height="18" rx="9" />
          <rect className="story-wireframe-block story-trace" pathLength="1" x="206" y="250" width="420" height="54" rx="8" />
          <rect className="story-wireframe-block story-trace" pathLength="1" x="206" y="326" width="344" height="12" rx="6" />
          <rect className="story-wireframe-block story-trace" pathLength="1" x="206" y="350" width="294" height="12" rx="6" />
          <rect className="story-wireframe-block story-trace" pathLength="1" x="206" y="392" width="142" height="42" rx="21" />
          <rect className="story-wireframe-block story-trace" pathLength="1" x="668" y="214" width="314" height="224" rx="15" />
          <rect className="story-wireframe-block story-trace" pathLength="1" x="206" y="478" width="776" height="112" rx="15" />
        </g>

        <g className="story-design story-landscape-interface">
          <g className="story-design-piece story-landscape-nav">
            <rect x="206" y="212" width="776" height="34" rx="10" fill="rgba(5,24,30,.92)" stroke="rgba(117,226,232,.22)" />
            <circle cx="226" cy="229" r="7" fill="#58d5e3" />
            <path d="M222 229h8M226 225v8" stroke="#06151c" strokeWidth="1.5" strokeLinecap="round" />
            <text x="240" y="233" fill="#dffafb" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" letterSpacing="1.2">HORIZON</text>
            <rect x="724" y="225" width="44" height="6" rx="3" fill="#d8f7f8" opacity=".28" />
            <rect x="786" y="225" width="42" height="6" rx="3" fill="#d8f7f8" opacity=".22" />
            <rect x="846" y="220" width="116" height="18" rx="9" fill={`url(#${accentId})`} opacity=".86" />
          </g>

          <g className="story-design-piece story-landscape-hero-copy">
            <text x="206" y="280" fill="#58d5e3" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" letterSpacing="1.8">CUSTOM WEBSITE · SEYCHELLES</text>
            <rect x="206" y="298" width="356" height="18" rx="6" fill="#efffff" opacity=".84" />
            <rect x="206" y="326" width="304" height="18" rx="6" fill="#efffff" opacity=".7" />
            <rect x="206" y="360" width="292" height="7" rx="3.5" fill="#c5eaeb" opacity=".34" />
            <rect x="206" y="376" width="238" height="7" rx="3.5" fill="#c5eaeb" opacity=".24" />
            <rect x="206" y="402" width="142" height="34" rx="17" fill={`url(#${accentId})`} opacity=".9" />
            <text x="234" y="423" fill="#06151c" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="800" letterSpacing="1.1">START A PROJECT</text>
          </g>

          <g className="story-design-piece story-landscape-media">
            <rect x="668" y="262" width="314" height="186" rx="18" fill={`url(#${panelId})`} stroke="rgba(111,229,234,.3)" />
            <circle cx="884" cy="316" r="64" fill={`url(#${violetId})`} opacity=".24" />
            <path d="M692 416c52-74 104-40 148-96 34-42 76-28 118-46v154H692z" fill={`url(#${accentId})`} opacity=".24" />
            <path d="M708 394c42-48 75-18 112-62 29-34 58-21 108-45" stroke="#9d8fff" strokeWidth="2" opacity=".56" />
            <circle cx="820" cy="332" r="5" fill="#58d5e3" />
            <circle cx="928" cy="287" r="5" fill="#73dca8" />
            <text x="694" y="290" fill="#dffafb" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" letterSpacing="1.2">MAHÉ · ONLINE</text>
          </g>

          <g className="story-design-piece story-landscape-services">
            <g><rect x="206" y="478" width="232" height="92" rx="14" fill="rgba(88,213,227,.1)" stroke="rgba(88,213,227,.28)" /><circle cx="232" cy="504" r="9" fill="#58d5e3" opacity=".9" /><rect x="254" y="497" width="112" height="8" rx="4" fill="#dffafb" opacity=".52" /><rect x="230" y="528" width="156" height="6" rx="3" fill="#bfeff0" opacity=".26" /><rect x="230" y="543" width="118" height="6" rx="3" fill="#bfeff0" opacity=".18" /></g>
            <g><rect x="464" y="478" width="232" height="92" rx="14" fill="rgba(115,220,168,.085)" stroke="rgba(115,220,168,.25)" /><circle cx="490" cy="504" r="9" fill="#73dca8" opacity=".9" /><rect x="512" y="497" width="98" height="8" rx="4" fill="#e0fbee" opacity=".5" /><rect x="488" y="528" width="158" height="6" rx="3" fill="#c9f2de" opacity=".24" /><rect x="488" y="543" width="132" height="6" rx="3" fill="#c9f2de" opacity=".17" /></g>
            <g><rect x="722" y="478" width="260" height="92" rx="14" fill="rgba(157,143,255,.09)" stroke="rgba(157,143,255,.26)" /><circle cx="748" cy="504" r="9" fill="#9d8fff" opacity=".9" /><rect x="770" y="497" width="126" height="8" rx="4" fill="#eeeaff" opacity=".5" /><rect x="746" y="528" width="180" height="6" rx="3" fill="#d4ccff" opacity=".24" /><rect x="746" y="543" width="142" height="6" rx="3" fill="#d4ccff" opacity=".17" /></g>
          </g>

          <g className="story-cursor" fill="#dffcff" opacity=".82">
            <path d="m870 265 4 31 8-8 8 14 7-4-8-14 11-2z" />
            <circle cx="872" cy="268" r="18" fill="#58d5e3" opacity=".12" filter={`url(#${glowId})`} />
          </g>
        </g>

        <g className="story-code" stroke="rgba(113,233,237,.58)" strokeWidth="1.25">
          <rect className="story-trace" pathLength="1" x="814" y="194" width="184" height="188" rx="13" fill="rgba(7,18,22,.78)" />
          <path className="story-trace" pathLength="1" d="m844 232-14 12 14 12M968 232l14 12-14 12M878 274h72M878 296h52M878 318h64M878 340h42" />
        </g>

        <g className="story-device" stroke="rgba(199,241,243,.64)" strokeWidth="1.3">
          <g className="story-phone">
            <rect x="920" y="356" width="92" height="178" rx="15" fill="rgba(8,27,32,.92)" />
            <path d="M948 375h36M938 405h56M938 425h44M938 455h56M938 478h36" />
            <rect x="946" y="500" width="38" height="12" rx="6" fill={`url(#${accentId})`} stroke="none" />
          </g>
        </g>

        <g className="story-checks" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="1.6" fill="rgba(216,246,247,.68)">
          <g transform="translate(208 612)"><circle cx="9" cy="9" r="9" stroke="rgba(113,233,237,.45)" /><path className="story-trace story-check-path" pathLength="1" d="m5 9 3 3 6-7" stroke="#71e9ed" strokeWidth="1.5" /><text x="26" y="13">MOBILE</text></g>
          <g transform="translate(352 612)"><circle cx="9" cy="9" r="9" stroke="rgba(113,233,237,.45)" /><path className="story-trace story-check-path" pathLength="1" d="m5 9 3 3 6-7" stroke="#71e9ed" strokeWidth="1.5" /><text x="26" y="13">SEARCH</text></g>
          <g transform="translate(496 612)"><circle cx="9" cy="9" r="9" stroke="rgba(115,220,168,.45)" /><path className="story-trace story-check-path" pathLength="1" d="m5 9 3 3 6-7" stroke="#73dca8" strokeWidth="1.5" /><text x="26" y="13">CONTACT</text></g>
        </g>

        <g transform="translate(820 608)">
          <g className="story-live">
            <rect width="162" height="32" rx="16" fill="rgba(115,220,168,.12)" stroke="rgba(115,220,168,.52)" />
            <circle className="story-live-dot" cx="20" cy="16" r="4" fill="#73dca8" />
            <text x="36" y="20" fill="#c9f9dc" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" letterSpacing="1.5">PROJECT READY</text>
          </g>
        </g>

        <g className="story-stage-label" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" letterSpacing="3" fill="#9becef">
          <text className="story-stage-plan" x="188" y="204">PLAN</text>
          <text className="story-stage-design" x="188" y="204">DESIGN</text>
          <text className="story-stage-build" x="188" y="204">BUILD</text>
          <text className="story-stage-test" x="188" y="204">TEST</text>
          <text className="story-stage-live" x="188" y="204">LIVE</text>
        </g>
        </g>

      </svg>
    </div>
  );
}

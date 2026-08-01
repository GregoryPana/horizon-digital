import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { shouldAnimateWebsiteBuildStory } from "./websiteBuildStory";

const STORY_VIEWPORT_ROOT_MARGIN = "200px 0px";

function setCompletedState(root: HTMLElement) {
  const query = gsap.utils.selector(root);
  gsap.set(query(".story-trace"), { strokeDashoffset: 0, opacity: 1 });
  gsap.set(
    query(".story-wireframe, .story-design, .story-code, .story-device, .story-checks, .story-live"),
    { opacity: 1, x: 0, y: 0, scale: 1 }
  );
  gsap.set(query(".story-stage-label > text"), { opacity: 0 });
  gsap.set(query(".story-stage-live"), { opacity: 1 });
}

export function WebsiteBuildStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      setCompletedState(root);

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
            buildTimeline(variant.compact, variant.mobile);
          }
        } else {
          stopPlayback();
        }
      };

      const mm = gsap.matchMedia();
      const buildTimeline = (compact: boolean, mobile: boolean) => {
        const query = gsap.utils.selector(root);
        const traces = query(".story-trace");
        const groups = query(
          ".story-wireframe, .story-design, .story-code, .story-device, .story-checks, .story-live"
        );
        const labels = query(".story-stage-label > text");
        const code = query(".story-code");

        gsap.set(traces, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.28 });
        gsap.set(groups, { opacity: 0 });
        gsap.set(labels, { opacity: 0, y: 5 });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.55, delay: 0.45 });

        tl
          .addLabel("plan")
          .to(query(".story-browser .story-trace"), {
            strokeDashoffset: 0,
            opacity: 0.82,
            duration: 0.85,
            stagger: 0.06,
            ease: "power2.out",
          })
          .to(query(".story-stage-plan"), { opacity: 1, y: 0, duration: 0.22 }, "-=0.35")
          .to(query(".story-wireframe"), { opacity: 1, duration: 0.2 })
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
          .to(query(".story-cursor"), { x: mobile ? -18 : -42, y: mobile ? 18 : 34, duration: 0.55, ease: "power2.inOut" })
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
            .to(query(".story-finished-page"), { opacity: 1, duration: 0.45 })
            .to({}, { duration: 0.4 })
            .to(query(".story-stage-build"), { opacity: 0, y: -5, duration: 0.18 });
        } else {
          tl.to(query(".story-finished-page"), { opacity: 1, duration: 0.5 });
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
          .to({}, { duration: mobile ? 0.65 : 1.15 })
          .to(query(".story-stage-test"), { opacity: 0, y: -5, duration: 0.18 })
          .addLabel("launch")
          .to(query(".story-stage-live"), { opacity: 1, y: 0, duration: 0.2 })
          .to(query(".story-live"), { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(1.6)" })
          .fromTo(query(".story-live-dot"), { scale: 0.5 }, { scale: 1.45, duration: 0.35, repeat: 1, yoyo: true })
          .to({}, { duration: mobile ? 1.4 : 2.1 })
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
          .to(query(".story-browser .story-trace"), {
            strokeDashoffset: 1,
            opacity: 0.12,
            duration: 0.62,
            stagger: { each: 0.05, from: "end" },
            ease: "power2.inOut",
          }, "-=0.08")
          .set(groups, { opacity: 0, x: 0, y: 0, scale: 1 })
          .set(labels, { opacity: 0, y: 5 })
          .set(query(".story-wireframe-block, .story-design-piece, .story-phone"), { x: 0, y: 0, scale: 1 })
          .set(query(".story-cursor"), { x: 0, y: 0 });

        timeline = tl;
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
    <div ref={rootRef} className="website-build-story pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid meet" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="story-accent" x1="220" y1="160" x2="920" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="#71e9ed" />
            <stop offset="0.55" stopColor="#55cfe0" />
            <stop offset="1" stopColor="#73dca8" />
          </linearGradient>
          <linearGradient id="story-panel" x1="360" y1="230" x2="800" y2="520" gradientUnits="userSpaceOnUse">
            <stop stopColor="#58d5e3" stopOpacity="0.24" />
            <stop offset="1" stopColor="#36bda9" stopOpacity="0.12" />
          </linearGradient>
          <filter id="story-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g className="story-browser" stroke="rgba(178,236,240,.62)" strokeWidth="1.35">
          <rect className="story-trace" pathLength="1" x="164" y="116" width="872" height="526" rx="24" />
          <path className="story-trace" pathLength="1" d="M164 176h872" />
          <circle className="story-trace" pathLength="1" cx="202" cy="146" r="5" />
          <circle className="story-trace" pathLength="1" cx="224" cy="146" r="5" />
          <circle className="story-trace" pathLength="1" cx="246" cy="146" r="5" />
          <rect className="story-trace" pathLength="1" x="292" y="133" width="450" height="26" rx="13" />
        </g>

        <g className="story-wireframe" stroke="rgba(189,231,235,.42)" strokeWidth="1.2">
          <rect className="story-wireframe-block" x="206" y="212" width="246" height="18" rx="9" />
          <rect className="story-wireframe-block" x="206" y="250" width="420" height="54" rx="8" />
          <rect className="story-wireframe-block" x="206" y="326" width="344" height="12" rx="6" />
          <rect className="story-wireframe-block" x="206" y="350" width="294" height="12" rx="6" />
          <rect className="story-wireframe-block" x="206" y="392" width="142" height="42" rx="21" />
          <rect className="story-wireframe-block" x="668" y="214" width="314" height="224" rx="15" />
          <rect className="story-wireframe-block" x="206" y="478" width="776" height="112" rx="15" />
        </g>

        <g className="story-design">
          <rect className="story-design-piece story-finished-page" x="206" y="250" width="420" height="54" rx="8" fill="url(#story-panel)" />
          <rect className="story-design-piece" x="206" y="392" width="142" height="42" rx="21" fill="url(#story-accent)" opacity=".8" />
          <rect className="story-design-piece" x="668" y="214" width="314" height="224" rx="15" fill="url(#story-panel)" />
          <path className="story-design-piece" d="M694 389c56-100 108-41 156-112 38-55 71-36 108-51v187H694z" fill="url(#story-accent)" opacity=".24" />
          <rect className="story-design-piece" x="228" y="500" width="216" height="68" rx="12" fill="rgba(88,213,227,.09)" />
          <rect className="story-design-piece" x="486" y="500" width="216" height="68" rx="12" fill="rgba(88,213,227,.07)" />
          <rect className="story-design-piece" x="744" y="500" width="216" height="68" rx="12" fill="rgba(54,189,169,.08)" />
          <g className="story-cursor" fill="#dffcff" opacity=".78">
            <path d="m870 265 4 31 8-8 8 14 7-4-8-14 11-2z" />
            <circle cx="872" cy="268" r="18" fill="#58d5e3" opacity=".12" filter="url(#story-glow)" />
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
            <rect x="946" y="500" width="38" height="12" rx="6" fill="url(#story-accent)" stroke="none" />
          </g>
        </g>

        <g className="story-checks" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="1.6" fill="rgba(216,246,247,.68)">
          <g transform="translate(208 612)"><circle cx="9" cy="9" r="9" stroke="rgba(113,233,237,.45)" /><path className="story-trace story-check-path" pathLength="1" d="m5 9 3 3 6-7" stroke="#71e9ed" strokeWidth="1.5" /><text x="26" y="13">MOBILE</text></g>
          <g transform="translate(352 612)"><circle cx="9" cy="9" r="9" stroke="rgba(113,233,237,.45)" /><path className="story-trace story-check-path" pathLength="1" d="m5 9 3 3 6-7" stroke="#71e9ed" strokeWidth="1.5" /><text x="26" y="13">SEARCH</text></g>
          <g transform="translate(496 612)"><circle cx="9" cy="9" r="9" stroke="rgba(115,220,168,.45)" /><path className="story-trace story-check-path" pathLength="1" d="m5 9 3 3 6-7" stroke="#73dca8" strokeWidth="1.5" /><text x="26" y="13">CONTACT</text></g>
        </g>

        <g className="story-live" transform="translate(864 608)">
          <rect width="118" height="32" rx="16" fill="rgba(115,220,168,.12)" stroke="rgba(115,220,168,.52)" />
          <circle className="story-live-dot" cx="20" cy="16" r="4" fill="#73dca8" />
          <text x="36" y="20" fill="#c9f9dc" fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700" letterSpacing="2">LIVE</text>
        </g>

        <g className="story-stage-label" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" letterSpacing="3" fill="#9becef">
          <text className="story-stage-plan" x="188" y="204">PLAN</text>
          <text className="story-stage-design" x="188" y="204">DESIGN</text>
          <text className="story-stage-build" x="188" y="204">BUILD</text>
          <text className="story-stage-test" x="188" y="204">TEST</text>
          <text className="story-stage-live" x="188" y="204">LIVE</text>
        </g>

      </svg>
    </div>
  );
}

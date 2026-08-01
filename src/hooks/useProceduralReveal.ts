import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState, type RefObject } from "react";

gsap.registerPlugin(useGSAP);

let scrollTriggerPromise: Promise<typeof import("gsap/ScrollTrigger").ScrollTrigger> | null = null;

function loadScrollTrigger() {
  if (!scrollTriggerPromise) {
    scrollTriggerPromise = import("gsap/ScrollTrigger").then((mod) => mod.ScrollTrigger);
  }
  return scrollTriggerPromise;
}

type ScrollTriggerPlugin = Awaited<ReturnType<typeof loadScrollTrigger>>;

export { loadScrollTrigger };
export type { ScrollTriggerPlugin };

/**
 * Single source of truth for the site-wide procedural scroll reveal:
 * heading leads, then `.reveal-item` cards/images cascade in, toggling
 * both ways as `.section-reveal` sections enter/leave the viewport
 * (per DESIGN.md §6). Every page — including Home.tsx's own lazily-loaded
 * ScrollTrigger setup — must call this function rather than re-implement
 * the tween values, so the reveal is identical everywhere.
 */
export function applySectionReveals(scope: HTMLElement | Document, isDesktop: boolean) {
  gsap.utils.toArray<HTMLElement>(".section-reveal", scope).forEach((section) => {
    const headings = section.querySelectorAll<HTMLElement>(".reveal-heading");
    const items = section.querySelectorAll<HTMLElement>(".reveal-item");
    if (!headings.length && !items.length) return;

    // Two mirrored timelines so the cascade direction always matches scroll
    // direction: entering forward (scrolling down) reveals top-to-bottom;
    // entering backward (scrolling up, re-entering a section from below)
    // reveals bottom-to-top. Whichever timeline last played forward is the
    // one reversed on exit, so hiding always un-cascades in the same order
    // it appeared (never a flat top-down order regardless of direction).
    // Uses fromTo() (not from()) so each timeline's start/end values are
    // explicit rather than captured from current DOM state — from() would
    // have the second-built timeline capture the first timeline's already-
    // applied hidden state as its own "end" value, making it a no-op.
    const headingY = isDesktop ? 24 : 14;
    const itemY = isDesktop ? 38 : 24;

    const buildTimeline = (from: "start" | "end") => {
      const tl = gsap.timeline({ paused: true });
      if (headings.length) {
        tl.fromTo(
          headings,
          { opacity: 0, y: headingY },
          {
            opacity: 1,
            y: 0,
            duration: isDesktop ? 0.85 : 0.56,
            stagger: { each: isDesktop ? 0.08 : 0.06, from },
            ease: "power3.out",
          },
        );
      }
      if (items.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: itemY },
          {
            opacity: 1,
            y: 0,
            duration: isDesktop ? 0.6 : 0.32,
            stagger: { each: isDesktop ? 0.1 : 0.08, from },
            ease: "power2.out",
          },
          headings.length ? ">-0.2" : undefined,
        );
      }
      return tl;
    };

    if (headings.length) gsap.set(headings, { opacity: 0, y: headingY });
    if (items.length) gsap.set(items, { opacity: 0, y: itemY });

    const forwardTl = buildTimeline("start");
    const backwardTl = buildTimeline("end");
    let activeTl = forwardTl;

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: isDesktop ? "top 72%" : "top 82%",
        end: "bottom top",
        onEnter: () => {
          activeTl = forwardTl;
          backwardTl.pause(0);
          forwardTl.play(0);
        },
        onEnterBack: () => {
          activeTl = backwardTl;
          forwardTl.pause(0);
          backwardTl.play(0);
        },
        onLeave: () => activeTl.reverse(),
        onLeaveBack: () => activeTl.reverse(),
      },
    });
  });
}

export function useProceduralReveal(scopeRef: RefObject<HTMLElement | null>) {
  const [scrollTriggerPlugin, setScrollTriggerPlugin] = useState<ScrollTriggerPlugin | null>(null);

  useEffect(() => {
    let active = true;
    loadScrollTrigger().then((plugin) => {
      if (active) setScrollTriggerPlugin(() => plugin);
    });
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      if (!scrollTriggerPlugin || !scopeRef.current) return;

      gsap.registerPlugin(scrollTriggerPlugin);
      const mm = gsap.matchMedia();
      const scope = scopeRef.current;

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { motionOk, isDesktop } = context.conditions as {
            motionOk: boolean;
            isDesktop: boolean;
          };
          if (!motionOk) return;

          applySectionReveals(scope, isDesktop);
        },
      );
    },
    { scope: scopeRef, dependencies: [scrollTriggerPlugin], revertOnUpdate: true },
  );
}

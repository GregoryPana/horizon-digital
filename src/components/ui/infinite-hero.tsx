"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { scrollToTopSmooth } from "../../lib/utils";
import { ShimmerButton } from "./shimmer-button";

const ShaderBackgroundCanvas = lazy(() => import("./shader-background-canvas"));

export default function InfiniteHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showShader, setShowShader] = useState(false);
  const handleWorkScrollTop = () => scrollToTopSmooth();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");

    const updateVisibility = () => {
      setShowShader(desktop.matches && !reduceMotion.matches);
    };

    updateVisibility();
    reduceMotion.addEventListener("change", updateVisibility);
    desktop.addEventListener("change", updateVisibility);

    return () => {
      reduceMotion.removeEventListener("change", updateVisibility);
      desktop.removeEventListener("change", updateVisibility);
    };
  }, []);

  useGSAP(
    () => {
      const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

      if (!bgRef.current || !h1Ref.current || !pRef.current) return;

      gsap.set(bgRef.current, { filter: "blur(24px)" });
      gsap.set([h1Ref.current, pRef.current], {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      });
      if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.2 }, 0)
        .to(
          h1Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
          },
          0.3
        )
        .to(
          pRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
          },
          0.5
        )
        .to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.7);
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative h-[90svh] w-full overflow-hidden bg-bg text-text md:h-svh"
    >
      <div className="absolute inset-0 brightness-110 md:brightness-100">
        <div className="absolute inset-0 hidden md:block" ref={bgRef}>
          {showShader ? (
            <Suspense
              fallback={
                <div className="h-full w-full bg-gradient-to-br from-accent/35 via-transparent to-accent-2/35" />
              }
            >
              <ShaderBackgroundCanvas className="h-full w-full" />
            </Suspense>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-accent/35 via-transparent to-accent-2/35" />
          )}
        </div>
        <div className="absolute inset-0 md:hidden">
          <div className="h-full w-full bg-gradient-to-br from-accent/45 via-transparent to-accent-2/45" />
        </div>
      </div>

      <div className="hero-veil-a pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_50%,_transparent_28%,_rgba(2,8,10,0.92)_100%)]" />
      <div className="hero-veil-b pointer-events-none absolute inset-0 [background:radial-gradient(65%_45%_at_50%_45%,_rgba(7,20,22,0.0)_0%,_rgba(7,20,22,0.35)_70%,_rgba(7,20,22,0.65)_100%)]" />
      <div className="hero-veil-c pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/70 to-bg" />

      <div className="relative z-10 flex h-[90svh] w-full items-center justify-center px-6 md:h-svh md:px-8">
        <div className="text-center">
          <p className="hero-brand-glow text-base uppercase tracking-[0.45em] text-accent">
            Horizon Digital
          </p>
          <p className="hero-subtext mt-3 text-[0.65rem] uppercase tracking-[0.35em] leading-tight md:mt-2 md:text-xs md:tracking-[0.4em]">
            Built for growing businesses in Seychelles and beyond.
          </p>
          <div className="mx-auto mt-6 h-px w-20 horizon-line md:mt-8 md:w-32" />
          <h1
            ref={h1Ref}
            className="mx-auto mt-6 max-w-3xl text-[clamp(2.35rem,5.4vw,4rem)] font-light leading-[0.98] tracking-tight md:mt-10"
          >
            <span className="hero-title-prefix block font-normal leading-[0.92] md:leading-[0.98]">
              Empowering Your
            </span>
            <span className="hero-glow-text text-accent">Digital Horizon</span>
          </h1>
          <p
            ref={pRef}
            className="mx-auto mt-6 max-w-2xl text-sm/7 md:text-base/7 font-light tracking-tight text-text/80"
          >
            <span className="block">
              <span className="hero-subline-emphasis">Modern,</span>{" "}
              <span className="hero-subline-emphasis">high-performance websites,</span>
            </span>
            <span className="hero-support-line block">built for clarity, speed, and conversion.</span>
          </p>

          <div className="mt-6 flex flex-col items-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="hero-trust-row mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.32em] text-text/70">
              <span>Fast</span>
              <span className="hero-trust-dot text-[10px] text-accent-2">•</span>
              <span>Secure</span>
              <span className="hero-trust-dot text-[10px] text-accent-2">•</span>
              <span>Optimized</span>
            </div>
          </div>

          <div ref={ctaRef} className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6">
            <Link to="/contact" className="w-full sm:w-auto">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#22f1d6"
                className="w-full px-7 py-3.5 text-base font-semibold tracking-[0.08em] text-black"
              >
                Book a free consult
              </ShimmerButton>
            </Link>
            <Button
              label="View work"
              to="/work"
              variant="primary"
              size="lg"
              onClick={handleWorkScrollTop}
              className="hero-work-cta w-full bg-accent-2 text-black shadow-none hover:bg-[#b78622] hover:text-black sm:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[0.2px]" />
    </div>
  );
}

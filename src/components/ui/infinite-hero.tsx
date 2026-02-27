"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { scrollToTopSmooth } from "../../lib/utils";
import { ShimmerButton } from "./shimmer-button";
import mobileSplash from "../../assets/hero/splash-mobile.jpg";
import mobileSplashWebp from "../../assets/hero/splash-mobile.webp";
import mobileSplashWebp720 from "../../assets/hero/splash-mobile-720.webp";

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
          <picture>
            <source
              srcSet={`${mobileSplashWebp720} 720w, ${mobileSplashWebp} 1024w`}
              sizes="100vw"
              type="image/webp"
            />
            <img
              src={mobileSplash}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      </div>

      <div className="hero-veil-a pointer-events-none absolute inset-0 hidden md:block [background:radial-gradient(120%_80%_at_50%_50%,_transparent_28%,_rgba(2,8,10,0.92)_100%)]" />
      <div className="hero-veil-b pointer-events-none absolute inset-0 hidden md:block [background:radial-gradient(65%_45%_at_50%_45%,_rgba(7,20,22,0.0)_0%,_rgba(7,20,22,0.35)_70%,_rgba(7,20,22,0.65)_100%)]" />
      <div className="hero-veil-c pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-b from-transparent via-bg/70 to-bg" />

      <div className="relative z-10 flex h-[90svh] w-full items-center justify-center px-6 md:h-svh md:px-8">
        <div className="translate-y-[5%] text-center md:translate-y-0">
          <p className="hero-brand-glow -translate-y-[5%] text-5xl font-semibold uppercase tracking-[0.14em] text-accent sm:text-6xl md:-translate-y-1/4 md:text-[clamp(2.35rem,5.4vw,4rem)] md:tracking-[0.2em]">
            <span className="block md:inline">Horizon</span>
            <span className="block md:ml-[0.35em] md:inline">Digital</span>
          </p>
          <div className="hero-horizon-line mx-auto mt-5 hidden h-[3px] w-56 horizon-line md:mt-7 md:block md:w-[30rem]" />
          <p
            ref={pRef}
            className="hero-main-subtext mx-auto mt-5 max-w-[92vw] translate-y-[2%] text-[0.82rem]/6 font-semibold tracking-tight text-text/80 md:max-w-xl md:translate-y-0 md:text-base/7 md:font-light"
          >
            <span className="md:hidden">
              Building Beautiful Custom, Mobile Ready,
              <br />
              Responsive Websites For Seychelles Businesses
            </span>
            <span className="hidden md:inline">
              Building Beautiful Custom, Mobile Ready, Responsive Websites For Seychelles Businesses
            </span>
          </p>

          <div ref={ctaRef} className="mt-10 flex w-full translate-y-[51%] flex-col items-stretch justify-center gap-4 sm:mt-12 sm:translate-y-[43%] sm:flex-row sm:items-center sm:gap-6 md:translate-y-0">
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
              className="gold-cta w-full sm:w-auto"
              />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[0.2px]" />
    </div>
  );
}

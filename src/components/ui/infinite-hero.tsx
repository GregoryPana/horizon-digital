"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { scrollToTopSmooth } from "../../lib/utils";
import { ShimmerButton } from "./shimmer-button";
import desktopSplash from "../../assets/hero/splash-desktop.jpg";
import desktopSplashWebp from "../../assets/hero/splash-desktop.webp";
import mobileSplash from "../../assets/hero/splash-mobile.jpg";
import mobileSplashWebp from "../../assets/hero/splash-mobile.webp";
import mobileSplashWebp720 from "../../assets/hero/splash-mobile-720.webp";

export default function InfiniteHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLParagraphElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const handleWorkScrollTop = () => scrollToTopSmooth();

  useGSAP(
    () => {
      const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

      if (!h1Ref.current || !pRef.current) return;

      gsap.set([h1Ref.current, pRef.current], {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      });
      if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(
          h1Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
          },
          0.15
        )
        .to(
          pRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
          },
          0.35
        )
        .to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.55);
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative h-[90svh] w-full overflow-hidden bg-bg text-text md:h-svh"
    >
      <div className="absolute inset-0 brightness-110 md:brightness-100">
        <div className="absolute inset-0 hidden md:block">
          <picture>
            <source srcSet={desktopSplashWebp} type="image/webp" />
            <img
              src={desktopSplash}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="h-full w-full object-cover object-center"
            />
          </picture>
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
              loading="eager"
              decoding="sync"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/40 md:from-black/18 md:via-black/22 md:to-black/36" />

      <div className="relative z-10 flex h-[90svh] w-full items-center justify-center px-5 md:h-svh md:px-8">
        <div className="-translate-y-[7%] text-center md:translate-y-[6%]">
          <p
            ref={h1Ref}
            className="brand-name hero-brand-glow -translate-y-[10%] text-[2.55rem] uppercase tracking-[0.13em] text-accent sm:text-6xl md:-translate-y-1/4 md:text-[clamp(2.35rem,5.4vw,4rem)] md:tracking-[0.2em]"
          >
            <span className="block md:inline">Horizon</span>
            <span className="block md:ml-[0.35em] md:inline">Digital</span>
          </p>
          <p
            ref={pRef}
            className="hero-main-subtext mx-auto mt-7 max-w-[93vw] translate-y-[30%] px-1 text-[0.97rem]/[1.62] font-medium tracking-tight text-text/80 md:mt-14 md:max-w-xl md:translate-y-0 md:px-0 md:text-base/7 md:font-light"
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

          <div ref={ctaRef} className="mt-9 flex w-full translate-y-[32%] flex-col items-stretch justify-center gap-3.5 sm:mt-12 sm:translate-y-[47%] sm:flex-row sm:items-center sm:gap-6 md:translate-y-0">
            <Link to="/contact" className="w-full sm:w-auto">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#22f1d6"
                className="hero-consult-cta w-full px-6 py-3 text-[0.95rem] font-semibold tracking-[0.08em] text-black sm:px-7 sm:py-3.5 sm:text-base"
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
              className="gold-cta hero-view-work-cta self-center sm:w-auto"
              />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[0.2px]" />
    </div>
  );
}

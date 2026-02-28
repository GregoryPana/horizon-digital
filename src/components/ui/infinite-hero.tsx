"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { scrollToTopSmooth } from "../../lib/utils";
import { ShimmerButton } from "./shimmer-button";
import desktopSplash from "../../assets/hero/splash-desktop.jpg";
import mobileSplash from "../../assets/hero/splash-mobile.jpg";
import mobileSplashWebp from "../../assets/hero/splash-mobile.webp";
import mobileSplashWebp720 from "../../assets/hero/splash-mobile-720.webp";
import heroLogo from "../../assets/logo/svg logo (1).png";

export default function InfiniteHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLParagraphElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const handleWorkScrollTop = () => scrollToTopSmooth();

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
          <img
            src={desktopSplash}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/40 md:from-black/18 md:via-black/22 md:to-black/36" />

      <div className="relative z-10 flex h-[90svh] w-full items-center justify-center px-6 md:h-svh md:px-8">
        <div className="-translate-y-[11%] text-center md:translate-y-[6%]">
          <img
            src={heroLogo}
            alt="Horizon Digital"
            className="mx-auto mb-3 h-12 w-auto object-contain sm:h-14 md:mb-4 md:h-16"
          />
          <p
            ref={h1Ref}
            className="hero-brand-glow -translate-y-[30%] text-5xl font-semibold uppercase tracking-[0.14em] text-accent sm:text-6xl md:-translate-y-1/4 md:text-[clamp(2.35rem,5.4vw,4rem)] md:tracking-[0.2em]"
          >
            <span className="block md:inline">Horizon</span>
            <span className="block md:ml-[0.35em] md:inline">Digital</span>
          </p>
          <p
            ref={pRef}
            className="hero-main-subtext mx-auto mt-8 max-w-[92vw] translate-y-[46%] text-[0.82rem]/6 font-semibold tracking-tight text-text/80 md:mt-14 md:max-w-xl md:translate-y-0 md:text-base/7 md:font-light"
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

          <div ref={ctaRef} className="mt-10 flex w-full translate-y-[55%] flex-col items-stretch justify-center gap-4 sm:mt-12 sm:translate-y-[47%] sm:flex-row sm:items-center sm:gap-6 md:translate-y-0">
            <Link to="/contact" className="w-full sm:w-auto">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#22f1d6"
                className="hero-consult-cta w-full px-7 py-3.5 text-base font-semibold tracking-[0.08em] text-black"
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

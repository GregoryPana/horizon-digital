import { Link } from "react-router-dom";
import Button from "../Button";
import { scrollToTopSmooth } from "../../lib/utils";
import { ShimmerButton } from "./shimmer-button";
import desktopSplash from "../../assets/hero/hero-desktop-tech.png";
import desktopSplashWebp from "../../assets/hero/hero-desktop-tech.webp";
import desktopSplashWebp1600 from "../../assets/hero/hero-desktop-tech-1600.webp";
import mobileSplash from "../../assets/hero/hero-mobile-tech.png";
import mobileSplashWebp from "../../assets/hero/hero-mobile-tech.webp";
import mobileSplashWebp720 from "../../assets/hero/hero-mobile-tech-720.webp";

export default function HomeHero() {
  const handleWorkScrollTop = () => scrollToTopSmooth();

  return (
    <section id="top" className="relative h-[90svh] w-full overflow-hidden bg-bg text-text md:h-svh">
      <div className="absolute inset-0 brightness-110 md:brightness-100">
        <div className="absolute inset-0 hidden md:block">
          <picture>
            <source
              srcSet={`${desktopSplashWebp1600} 1600w, ${desktopSplashWebp} 2400w`}
              sizes="100vw"
              type="image/webp"
            />
            <img
              src={desktopSplash}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain object-center"
            />
          </picture>
        </div>
        <div className="absolute inset-0 md:hidden">
          <picture>
            <source
              srcSet={`${mobileSplashWebp720} 720w, ${mobileSplashWebp} 1080w`}
              sizes="100vw"
              type="image/webp"
            />
            <img
              src={mobileSplash}
              alt=""
              aria-hidden="true"
              width={1080}
              height={1920}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/40 md:from-black/18 md:via-black/22 md:to-black/36" />

      <div className="relative z-10 flex h-[90svh] w-full items-center justify-center px-3 md:h-svh md:justify-end md:px-8">
        <aside className="hero-bento-fixed w-full max-w-[18.5rem] rounded-2xl p-3.5 sm:max-w-[21rem] sm:p-4 md:hidden">
          <p className="hero-main-subtext text-[0.8rem] leading-5 text-[#dbe7f2] sm:text-[0.85rem] sm:leading-6 md:text-[0.92rem] md:leading-7">
            Custom websites for Seychelles businesses, designed to be clear, mobile-ready, and easy
            for customers to use.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-1.5 md:mt-4 md:gap-2">
            {[
              "Custom Design",
              "Mobile Ready",
              "Fast Loading",
              "SEO Ready",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-[#6f93ac]/55 bg-[#0e202f]/66 px-2 py-1.5 md:px-2.5 md:py-2">
                <p className="text-[0.52rem] font-semibold uppercase tracking-[0.11em] text-[#a6c3d8] md:text-[0.56rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="pointer-events-none absolute bottom-[12%] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center px-5 md:bottom-[13.5rem]">
        <div className="flex w-full max-w-[28rem] flex-col items-stretch gap-3.5 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <Link to="/contact" className="pointer-events-auto w-full sm:w-auto">
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
            className="pointer-events-auto gold-cta hero-view-work-cta self-center !text-[#e9c764] hover:!text-[#f0d27a] sm:w-auto md:!text-black"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[0.2px]" />
    </section>
  );
}

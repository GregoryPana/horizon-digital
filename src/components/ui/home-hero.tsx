import { Link } from "react-router-dom";
import Button from "../Button";
import { scrollToTopSmooth } from "../../lib/utils";
import { ShimmerButton } from "./shimmer-button";
import desktopSplash from "../../assets/hero/hero-desktop-tech-v2.png";
import desktopSplashWebp from "../../assets/hero/hero-desktop-tech-v2.webp";
import desktopSplashWebp1600 from "../../assets/hero/hero-desktop-tech-v2-1600.webp";
import mobileSplash from "../../assets/hero/hero-mobile-tech-v2.png";
import mobileSplashWebp from "../../assets/hero/hero-mobile-tech-v2.webp";
import mobileSplashWebp720 from "../../assets/hero/hero-mobile-tech-v2-720.webp";

export default function HomeHero() {
  const handleWorkScrollTop = () => scrollToTopSmooth();

  return (
    <section id="top" className="relative min-h-screen h-svh w-full overflow-hidden bg-bg text-text">
      <div className="absolute inset-0 md:brightness-100">
        <div className="absolute inset-0 hidden md:block">
          <picture>
            <source
              srcSet={`${desktopSplashWebp1600} 1024w, ${desktopSplashWebp} 1536w`}
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
              className="h-full w-full object-cover object-center md:object-[50%_45%]"
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
              width={1080}
              height={1920}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-[50%_42%]"
            />
          </picture>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/34 to-[#060818] md:from-black/8 md:via-black/28 md:to-[#060818]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42svh] bg-gradient-to-t from-[#060818] via-[#060818]/92 to-transparent md:h-[34svh]" />

      <div className="relative z-10 hidden h-svh w-full items-center px-3.5 pb-14 sm:px-5 md:flex md:px-10 md:pb-32 lg:px-14">
        <div className="w-full md:ml-[5vw] md:pl-2 lg:ml-[8vw] lg:pl-6">
          <p className="section-eyebrow-glow text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Horizon Digital • Web Design Studio • Seychelles
          </p>
          <h1 className="hero-glow-text mt-4 font-display text-[clamp(2.9rem,3.6vw,4rem)] font-semibold leading-[0.92] uppercase text-text">
            Custom, Beautiful websites that
            <br />
            work as hard as you do
          </h1>
          <p className="hero-main-subtext mt-5 max-w-[58ch] text-base leading-7 text-text-muted">
            We design beautiful, one-of-a-kind websites for Seychelles businesses that turn visitors into real customers. Clear, mobile-ready, and built to help you grow.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {["Custom Design", "Mobile Ready", "Fast Loading", "SEO Ready"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-accent/30 bg-bg-elev/80 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#A8F0FF]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="relative z-10 flex h-svh w-full flex-col justify-between px-3.5 pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-[calc(env(safe-area-inset-bottom)+2.2rem)] sm:px-5 md:hidden">
        <aside className="hero-bento-fixed mt-5 w-full max-w-[20rem] self-center rounded-xl p-2.5 sm:max-w-[22rem] sm:p-3">
          <p className="section-eyebrow-glow text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[0.56rem]">
            Web Design Studio • Seychelles
          </p>
          <h1 className="hero-glow-text mt-2 font-display text-[1.28rem] font-semibold leading-[1.1] text-text sm:text-[1.46rem]">
            Custom, Beautiful websites that work as hard as you do
          </h1>
          <p className="hero-main-subtext mt-2 text-[0.74rem] leading-[1.28rem] text-text-muted sm:text-[0.8rem] sm:leading-5">
            We design beautiful, one-of-a-kind websites for Seychelles businesses that turn visitors into real customers. Clear, mobile-ready, and built to help you grow.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5 sm:gap-2">
            {["Custom Design", "Mobile Ready", "Fast Loading", "SEO Ready"].map((item) => (
              <div key={item} className="rounded-md border border-[#00E5FF]/25 bg-[#060818]/72 px-2 py-1 sm:px-2.5 sm:py-1.5">
                <p className="text-[0.48rem] font-semibold uppercase tracking-[0.1em] text-[#A8F0FF] sm:text-[0.52rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div className="mt-4 flex w-full max-w-[31rem] self-center flex-col items-stretch gap-3">
          <Link to="/contact" className="w-full">
            <ShimmerButton
              shimmerColor="#060818"
              shimmerDuration="4.2s"
              background="#00E5FF"
              className="hero-consult-cta w-full px-6 py-3 text-[0.95rem] font-semibold tracking-[0.08em] text-black"
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
            className="gold-cta hero-view-work-cta self-center !text-[#FFD97A] hover:!text-[#FFE89A]"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[10%] left-1/2 z-10 hidden w-full -translate-x-1/2 justify-center px-3.5 md:flex md:bottom-[10%]">
        <div className="pointer-events-auto flex w-full max-w-[31rem] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <Link to="/contact" className="w-full sm:w-auto">
            <ShimmerButton
              shimmerColor="#060818"
              shimmerDuration="4.2s"
              background="#00E5FF"
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
            className="gold-cta hero-view-work-cta self-center !text-[#FFD97A] hover:!text-[#FFE89A] md:!text-black"
          />
        </div>
      </div>

      <div className="hero-edge-line absolute bottom-0 left-0 right-0 h-[2px]" />
    </section>
  );
}

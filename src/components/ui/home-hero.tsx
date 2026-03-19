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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#060818] md:from-transparent md:via-black/16 md:to-[#060818]" />
      <div className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(circle_at_15%_50%,rgba(0,0,0,0.32),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 md:hidden bg-[radial-gradient(circle_at_50%_25%,rgba(0,0,0,0.52),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38svh] bg-gradient-to-t from-[#060818] via-[#060818]/82 to-transparent md:h-[30svh]" />

      <div className="relative z-10 hidden h-svh w-full items-center px-3.5 pb-24 sm:px-5 md:flex md:px-10 md:pb-32 lg:px-14 lg:pb-40">
        <div className="w-full md:ml-[5vw] md:pl-2 lg:ml-[8vw] lg:pl-6">
          <p className="section-eyebrow-glow text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Horizon Digital • Web Design Studio • Seychelles
          </p>
          <h1 className="hero-glow-text mt-4 font-display text-[clamp(3.5rem,4.5vw,5.5rem)] font-semibold leading-[0.92] uppercase tracking-[0.05em] text-text">
            Your Website
            <br />
            should bring you
            <br />
            customers
            <br />
            <span className="text-accent normal-case">and</span> look good
          </h1>
          <p className="hero-main-subtext mt-5 max-w-[58ch] text-base leading-7 text-text-muted">
             Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you're proud to serve.
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

      <div className="relative z-10 flex h-svh w-full flex-col px-3.5 pt-[4.6rem] pb-[calc(env(safe-area-inset-bottom)+3.5rem)] sm:px-5 md:hidden">
        <aside className="hero-bento-fixed bg-white/5 backdrop-blur-xl border border-white/10 mt-0 w-full max-w-[20rem] self-center rounded-xl p-4 sm:max-w-[22rem] sm:p-5">
          <p className="section-eyebrow-glow text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[0.56rem]">
            Web Design Studio • Seychelles
          </p>
          <h1 className="hero-glow-text mt-2 font-display text-[1.44rem] font-semibold leading-[1.1] tracking-[0.04em] text-text sm:text-[1.68rem]">
            Your Website
            <br />
            should bring you
            <br />
            customers
            <br />
            <span className="text-accent normal-case">and</span> look good
          </h1>
          <p className="hero-main-subtext mt-2 text-[0.74rem] leading-[1.28rem] text-text-muted sm:text-[0.8rem] sm:leading-5">
             Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you're proud to serve.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-1.5 sm:gap-2">
            {["Custom Design", "Mobile Ready", "Fast Loading", "SEO Ready"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 sm:px-2.5 sm:py-1.5 backdrop-blur-sm">
                <p className="text-[0.48rem] font-semibold uppercase tracking-[0.1em] text-[#A8F0FF] sm:text-[0.52rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1" />

        <div className="flex w-full max-w-[20rem] self-center flex-col items-stretch gap-3">
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
            className="gold-cta hero-view-work-cta w-full !text-[#FFD97A] hover:!text-[#FFE89A]"
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

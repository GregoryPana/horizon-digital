import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { HeroFlowField } from "./HeroFlowField";
import { WebsiteBuildStory } from "./WebsiteBuildStory";

interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    lines: string[];
    rotatingWords?: string[];
  };
  subtitle: string;
  tags?: {
    text: string;
    icon: React.ReactNode;
  }[];
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
      link?: string;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
      link?: string;
    };
  };
  websiteBuildStory?: boolean;
  className?: string;
}

gsap.registerPlugin(useGSAP);

export default function Hero({
  trustBadge,
  headline,
  subtitle,
  tags = [],
  buttons,
  websiteBuildStory = false,
  className = "",
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const rotatingWords = headline.rotatingWords || [];
  const hasRotatingWords = rotatingWords.length > 0;
  const firstWord = rotatingWords[0];
  const headlineText = headline.lines.join(" ");
  const [prefix = headlineText, suffix = ""] = firstWord && headlineText.includes(firstWord)
    ? headlineText.split(firstWord)
    : [headlineText, ""];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from(".hero-kicker", { opacity: 0, y: -14, duration: 0.35 })
          .from(
            ".hero-title-line",
            { opacity: 0, yPercent: 65, rotateX: -12, duration: 0.65, stagger: 0.05 },
            "-=0.3"
          )
          .from(".hero-copy", { opacity: 0, y: 18, duration: 0.45 }, "-=0.4")
          .from(
            ".hero-trust-chip",
            { opacity: 0, scale: 0.9, y: 10, duration: 0.35, stagger: 0.05 },
            "-=0.3"
          )
          .from(
            ".hero-action",
            { opacity: 0, y: 14, duration: 0.4, stagger: 0.06 },
            "-=0.3"
          )
          .from(".hero-scroll-cue", { opacity: 0, y: -6, duration: 0.35 }, "-=0.2");

        const word = wordRef.current;
        if (word && hasRotatingWords) {
          const setWord = (value: string) => {
            word.textContent = value;
            word.dataset.long = String(value.length > 9);
          };

          setWord(rotatingWords[0]);
          gsap.set(word, { yPercent: 0, autoAlpha: 1 });

          if (rotatingWords.length > 1) {
            const wordTimeline = gsap.timeline({ repeat: -1, delay: 1.8 });
            wordTimeline.to(word, { yPercent: 0, autoAlpha: 1, duration: 2.35, ease: "none" });

            rotatingWords.slice(1).forEach((nextWord) => {
              wordTimeline
                .to(word, { yPercent: -118, autoAlpha: 0, duration: 0.5, ease: "power3.inOut" })
                .call(() => setWord(nextWord))
                .fromTo(
                  word,
                  { yPercent: 118, autoAlpha: 0 },
                  { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.inOut", immediateRender: false }
                )
                .to(word, { yPercent: 0, autoAlpha: 1, duration: 2.35, ease: "none" });
            });

            wordTimeline
              .to(word, { yPercent: -118, autoAlpha: 0, duration: 0.5, ease: "power3.inOut" })
              .call(() => setWord(rotatingWords[0]))
              .fromTo(
                word,
                { yPercent: 118, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.inOut", immediateRender: false }
              );
          }
        }

        gsap.to(".hero-orb-a", {
          xPercent: 18,
          yPercent: -14,
          scale: 1.15,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".hero-orb-b", {
          xPercent: -16,
          yPercent: 18,
          scale: 0.9,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".hero-orb-c", {
          xPercent: 10,
          yPercent: 12,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = rootRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    rootRef.current.style.setProperty("--hero-pointer-x", `${x * 18}px`);
    rootRef.current.style.setProperty("--hero-pointer-y", `${y * 14}px`);
    rootRef.current.style.setProperty("--hero-flow-x", `${x * 8}px`);
    rootRef.current.style.setProperty("--hero-flow-y", `${y * 6}px`);
  };

  return (
    <section
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "hero-cinematic relative isolate flex min-h-[100svh] overflow-hidden border-b border-white/10 bg-[#071216] pt-[var(--header-height)] text-white",
        className
      )}
    >
      <div className="hero-cinematic-base absolute inset-0 -z-30" aria-hidden="true" />
      <div className="hero-orb hero-orb-a absolute -left-[15%] top-[6%] -z-20 h-[44rem] w-[44rem] rounded-full" aria-hidden="true" />
      <div className="hero-orb hero-orb-b absolute -right-[15%] top-[18%] -z-20 h-[40rem] w-[40rem] rounded-full" aria-hidden="true" />
      <div className="hero-orb hero-orb-c absolute bottom-[-35%] left-[30%] -z-20 h-[38rem] w-[38rem] rounded-full" aria-hidden="true" />
      <div className="hero-cinematic-grid absolute inset-0 -z-10" aria-hidden="true" />
      {websiteBuildStory ? <HeroFlowField /> : null}
      <div className="hero-cinematic-vignette absolute inset-0 -z-10" aria-hidden="true" />

      <div
        className={cn(
          "hero-content container-wide relative z-10 flex w-full flex-col items-center justify-center py-10 text-center sm:py-12 lg:py-14",
          websiteBuildStory && "hero-content-story"
        )}
      >
        <div className={cn("hero-copy-column w-full", websiteBuildStory && "hero-copy-column-story")}>
          {trustBadge ? (
            <div className="hero-kicker inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-200/25 bg-white/[0.07] px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-md sm:px-5 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#82edf2]" aria-hidden="true" />
              <span>{trustBadge.text}</span>
            </div>
          ) : null}

          <div className="hero-title-wrap mt-5 w-full [perspective:1000px] sm:mt-6">
            {hasRotatingWords ? (
              <>
                <h1 className="sr-only">{headlineText}</h1>
                <div
                  className="hero-display font-display font-black uppercase leading-[0.82] tracking-[-0.06em]"
                  aria-hidden="true"
                >
                  <span className="hero-title-line block bg-gradient-to-b from-white via-[#eefcff] to-[#b8d6da] bg-clip-text text-transparent">
                    {prefix.trim()}
                  </span>
                  <span className="hero-title-line relative mx-auto mt-[0.08em] block h-[0.92em] max-w-[11ch] overflow-hidden drop-shadow-[0_0_42px_rgba(74,213,227,0.24)]">
                    <span className="hero-word-stage absolute inset-0 flex items-center justify-center whitespace-nowrap">
                      <span ref={wordRef} className="hero-word-text text-gradient-tropical" data-long={String((firstWord?.length || 0) > 9)}>
                        {firstWord}
                      </span>
                    </span>
                  </span>
                  {suffix.trim() ? (
                    <span className="hero-title-line mt-[0.08em] block bg-gradient-to-b from-white via-[#eefcff] to-[#b8d6da] bg-clip-text text-transparent">
                      {suffix.trim()}
                    </span>
                  ) : null}
                </div>
              </>
            ) : (
              <h1 className="hero-display hero-static-title mx-auto max-w-[12ch] text-balance font-display font-black leading-[1.32] tracking-[-0.055em]">
                <span className="hero-title-line hero-static-title-sweep block bg-clip-text text-transparent">
                  {headlineText}
                </span>
              </h1>
            )}
          </div>

          <p className="hero-copy mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-white/78 sm:mt-6 sm:text-base lg:text-lg">
            {subtitle}
          </p>

          {tags.length ? (
            <ul className="hero-trust-list mt-5 flex max-w-4xl flex-wrap justify-center gap-2 sm:mt-6 sm:gap-2.5" aria-label="Reasons to work with Horizon Digital">
              {tags.map((tag) => (
                <li
                  key={tag.text}
                  className="hero-trust-chip group flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-left text-[0.66rem] font-bold uppercase tracking-[0.1em] text-white/82 backdrop-blur-md transition-[border-color,background-color,transform,color] duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:bg-cyan-200/10 hover:text-white sm:min-h-11 sm:text-[0.68rem]"
                >
                  <span className="text-[#78e7ed] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" aria-hidden="true">
                    {tag.icon || <Check className="h-4 w-4" />}
                  </span>
                  {tag.text}
                </li>
              ))}
            </ul>
          ) : null}

          {buttons ? (
            <div className="hero-actions mt-6 flex w-full max-w-xl flex-col gap-3 sm:mt-7 sm:flex-row sm:justify-center sm:gap-4">
              {buttons.primary ? (
                <Link
                  to={buttons.primary.link || "#"}
                  onClick={buttons.primary.onClick}
                  className="hero-action reactive-cta focus-ring group relative inline-flex min-h-14 flex-1 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#6ce6e8] via-[#45cde0] to-[#67d7b2] px-8 py-4 text-center text-xs font-black uppercase tracking-[0.17em] text-[#061316] shadow-[0_16px_44px_rgba(48,197,213,0.26)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(48,197,213,0.38)] hover:brightness-105 active:translate-y-0 active:scale-[0.98]"
                >
                  <span className="cta-shine" aria-hidden="true" />
                  <span className="relative z-10 flex items-center gap-2">
                    {buttons.primary.text}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                  </span>
                </Link>
              ) : null}

              {buttons.secondary ? (
                <Link
                  to={buttons.secondary.link || "#"}
                  onClick={buttons.secondary.onClick}
                  className="hero-action reactive-cta focus-ring group inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border border-white/22 bg-white/[0.06] px-8 py-4 text-center text-xs font-black uppercase tracking-[0.17em] text-white backdrop-blur-md transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan-100/50 hover:bg-white/[0.11] active:translate-y-0 active:scale-[0.98]"
                >
                  {buttons.secondary.text}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {websiteBuildStory ? (
          <div className="hero-story-column" aria-hidden="true">
            <WebsiteBuildStory />
          </div>
        ) : null}

        <a
          href="#fit"
          className="hero-scroll-cue focus-ring group absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 rounded-full px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-cyan-100 sm:flex"
        >
          Explore
          <ArrowDown className="h-4 w-4 animate-[hero-scroll_1.8s_ease-in-out_infinite] group-hover:text-cyan-200 motion-reduce:animate-none" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

import { Fragment, useId, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { createCharacterShineTimeline } from "./characterShine";
import { ElegantDarkPattern } from "./ElegantDarkPattern";
import { HeroBuildExtractionStory } from "./HeroBuildExtractionStory";
import { useHeroStoryMount } from "./useHeroStoryMount";
import {
  HERO_DESKTOP_HEADLINE_EFFECT,
  HERO_BUILD_EXTRACTION_POLICIES,
  type HeroBuildExtractionStageId,
} from "./heroBuildExtraction";
import "./heroBuildExtraction.css";

gsap.registerPlugin(useGSAP);

export interface BuildExtractionHeroAction {
  text: string;
  link?: string;
  onClick?: () => void;
}

export interface BuildExtractionHeroTag {
  text: string;
  icon: ReactNode;
}

export interface BuildExtractionHeroProps {
  kicker?: string;
  headline: string;
  subtitle: string;
  tags?: BuildExtractionHeroTag[];
  buttons?: {
    primary?: BuildExtractionHeroAction;
    secondary?: BuildExtractionHeroAction;
  };
  context?: "home" | "preview";
  className?: string;
}

function stage(id: HeroBuildExtractionStageId) {
  return HERO_BUILD_EXTRACTION_POLICIES.mobile.stages.find((item) => item.id === id)!;
}

function HeadlineLetters({ headline }: { headline: string }) {
  const words = headline.split(" ");
  return words.map((word, wordIndex) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="hbe-title-word">
        {Array.from(word).map((letter, letterIndex) => (
          <span className="hbe-title-letter" key={`${letter}-${letterIndex}`}>
            {letter}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function BuildExtractionHero({
  kicker,
  headline,
  subtitle,
  tags = [],
  buttons,
  context = "home",
  className,
}: BuildExtractionHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mountHeroStories = useHeroStoryMount();
  const titleId = `hbe-title-${useId().replace(/:/g, "")}`;
  const supportStage = stage("support");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      const query = gsap.utils.selector(root);
      const supportSelector = ".hbe-kicker, .hbe-copy-support, .hbe-actions, .hbe-trust-list";
      let timeline: gsap.core.Timeline | undefined;
      let shineTimeline: gsap.core.Timeline | undefined;

      const setPhase = (phase: HeroBuildExtractionStageId | "final") => {
        root.dataset.hbePhase = phase;
      };

      const setFinal = () => {
        gsap.set(query(".hbe-title-word"), {
          clearProps: "transform,opacity,visibility,filter,color,text-shadow",
        });
        gsap.set(query(".hbe-title-letter"), {
          clearProps: "transform,opacity,visibility,filter,color,text-shadow",
        });
        gsap.set(query(supportSelector), {
          clearProps: "transform,opacity,visibility",
        });
        setPhase("final");
      };

      const buildDesktopHeadlineTimeline = () => {
        const words = query<HTMLElement>(".hbe-title-word");
        if (!words.length) {
          setFinal();
          return undefined;
        }

        gsap.set(words, {
          autoAlpha: 0,
          y: 26,
          rotationX: 12,
          filter: "blur(14px)",
          transformOrigin: "50% 80%",
        });
        setPhase("headline-reveal");

        return gsap.timeline({ defaults: { ease: "power3.out" } })
          .to(words, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            filter: "blur(0px)",
            duration: HERO_DESKTOP_HEADLINE_EFFECT.wordDuration,
            stagger: { each: HERO_DESKTOP_HEADLINE_EFFECT.wordStagger },
          }, HERO_DESKTOP_HEADLINE_EFFECT.wordRevealStart)
          .set(words, {
            clearProps: "transform,opacity,visibility,filter",
          }, HERO_DESKTOP_HEADLINE_EFFECT.totalDuration)
          .call(() => setPhase("final"), [], HERO_DESKTOP_HEADLINE_EFFECT.totalDuration);
      };

      const buildMobileTimeline = () => {
        const letters = query<HTMLElement>(".hbe-title-letter");
        const supportingElements = query<HTMLElement>(supportSelector);
        if (!letters.length) {
          setFinal();
          return undefined;
        }

        const headlineStage = stage("headline-reveal");
        const letterDuration = 0.68;
        const letterStagger = letters.length > 1
          ? (headlineStage.duration - letterDuration) / (letters.length - 1)
          : 0;

        gsap.set(letters, {
          autoAlpha: 0,
          y: 10,
          filter: "blur(10px)",
          transformOrigin: "50% 70%",
        });
        // autoAlpha keeps concealed controls out of keyboard navigation.
        gsap.set(supportingElements, { autoAlpha: 0, y: 14 });
        setPhase("headline-reveal");

        return gsap.timeline({ defaults: { ease: "power2.out" } })
          .call(() => setPhase("headline-reveal"), [], headlineStage.start)
          .to(letters, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: letterDuration,
            stagger: { each: letterStagger },
            ease: "power2.out",
          }, headlineStage.start)
          .call(() => setPhase("support"), [], supportStage.start)
          .to(supportingElements, {
            autoAlpha: 1,
            y: 0,
            duration: supportStage.duration,
            stagger: 0.07,
            ease: "power3.out",
          }, supportStage.start)
          .set(letters, { clearProps: "transform,opacity,visibility,filter" }, HERO_BUILD_EXTRACTION_POLICIES.mobile.totalDuration)
          .set(supportingElements, { clearProps: "transform,opacity,visibility" }, HERO_BUILD_EXTRACTION_POLICIES.mobile.totalDuration)
          .call(() => setPhase("final"), [], HERO_BUILD_EXTRACTION_POLICIES.mobile.totalDuration);
      };

      mm.add("(prefers-reduced-motion: reduce)", setFinal);
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        timeline = buildDesktopHeadlineTimeline();
        const shineLetters = query<HTMLElement>(".hbe-title-letter");
        shineTimeline = createCharacterShineTimeline(shineLetters, {
          delay: HERO_DESKTOP_HEADLINE_EFFECT.shineDelay,
          repeatDelay: HERO_DESKTOP_HEADLINE_EFFECT.shineRepeatDelay,
          stagger: HERO_DESKTOP_HEADLINE_EFFECT.shineStagger,
          pulseDuration: HERO_DESKTOP_HEADLINE_EFFECT.shineDuration,
        });
        return () => {
          timeline?.kill();
          shineTimeline?.kill();
          timeline = undefined;
          shineTimeline = undefined;
        };
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
        timeline = buildMobileTimeline();
        return () => {
          timeline?.kill();
          timeline = undefined;
        };
      });

      return () => {
        timeline?.kill();
        shineTimeline?.kill();
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className={cn("hbe-hero", `hbe-context-${context}`, className)}
      data-hbe-phase="final"
      data-hbe-context={context}
      aria-labelledby={titleId}
    >
      {context === "preview" ? <ElegantDarkPattern className="hbe-dark-pattern" /> : null}
      <div className="hbe-preview-grid" aria-hidden="true" />
      <div className="hbe-preview-glow" aria-hidden="true" />
      <div className="hbe-preview-shell">
        <div className="hbe-copy-column">
          {kicker ? <p className="hbe-kicker">{kicker}</p> : null}
          <h1 id={titleId} className="hbe-title">
            <span className="motion-headline-accessible">{headline}</span>
            <span className="hbe-title-visual" aria-hidden="true">
              <HeadlineLetters headline={headline} />
            </span>
          </h1>
          <div className="hbe-copy-support">
            <p>{subtitle}</p>
          </div>

          {tags.length ? (
            <ul className="hbe-trust-list" aria-label="Reasons to work with Horizon Digital">
              {tags.map((tag) => (
                <li key={tag.text}>
                  <span className="hbe-trust-icon" aria-hidden="true">{tag.icon}</span>
                  {tag.text}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hbe-visual-column">
          {mountHeroStories ? (
            <div className="hbe-story-column">
              <div className="hbe-desktop-story-primary">
                <HeroBuildExtractionStory
                  variant="desktop"
                  addressLabel="desktop.build"
                  startDelay={HERO_DESKTOP_HEADLINE_EFFECT.desktopStoryStart}
                />
              </div>
              <div className="hbe-desktop-story-mobile-preview">
                <HeroBuildExtractionStory
                  variant="mobile"
                  addressLabel="mobile.build"
                  startDelay={HERO_DESKTOP_HEADLINE_EFFECT.mobileStoryStart}
                />
              </div>
            </div>
          ) : null}
          {buttons ? (
            <div className="hbe-actions">
              {buttons.primary ? (
                <Link
                  className="hbe-primary-action focus-ring"
                  to={buttons.primary.link || "#"}
                  onClick={buttons.primary.onClick}
                >
                  {buttons.primary.text} <ArrowRight aria-hidden="true" />
                </Link>
              ) : null}
              {buttons.secondary ? (
                <Link
                  className="hbe-secondary-action focus-ring"
                  to={buttons.secondary.link || "#"}
                  onClick={buttons.secondary.onClick}
                >
                  {buttons.secondary.text} <ArrowRight aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

import { Fragment, useId, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { ElegantDarkPattern } from "./ElegantDarkPattern";
import { HeroBuildExtractionStory } from "./HeroBuildExtractionStory";
import { useHeroStoryMount } from "./useHeroStoryMount";
import { HERO_DESKTOP_HEADLINE_EFFECT } from "./heroBuildExtraction";
import { enhanceHeroLines } from "./heroLineReveal";
import { HeroWebsitePlayback } from "./HeroLightWorkspace";
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

export function HeroPlaybackControl({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return <div className="hbe-playback-rail">
    <button type="button" className="hbe-preview-playback focus-ring" onClick={onToggle}
      aria-label={paused ? "Play website animation" : "Pause website animation"}
      aria-pressed={paused} title={paused ? "Play website animation" : "Pause website animation"}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M8 5 19 12 8 19Z" /> : <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></>}
      </svg>
    </button>
  </div>;
}

function HeadlineWords({ headline }: { headline: string }) {
  const words = headline.split(" ");
  return words.map((word, wordIndex) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="hbe-title-word">
        {word}
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
  const [previewPaused, setPreviewPaused] = useState(false);
  const togglePreview = () => {
    const next = !previewPaused;
    setPreviewPaused(next);
    if (rootRef.current) rootRef.current.dataset.hbePreviewPaused = String(next);
    rootRef.current?.dispatchEvent(new CustomEvent("hbe-preview-playback", { detail: next }));
  };
  const titleId = `hbe-title-${useId().replace(/:/g, "")}`;
  useGSAP(() => {
    if (rootRef.current) return enhanceHeroLines(rootRef.current);
  }, { scope: rootRef, dependencies: [headline] });

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
      <div className="hbe-mobile-guides" aria-hidden="true" />
      <div className="hbe-preview-shell">
        <div className="hbe-copy-column">
          {kicker ? <p className="hbe-kicker">{kicker}</p> : null}
          <h1 id={titleId} className="hbe-title" data-critical-render="immediate">
            <span className="motion-headline-accessible">{headline}</span>
            <span className="hbe-title-visual" aria-hidden="true">
              <HeadlineWords headline={headline} />
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
            <div className="hbe-preview-stage">
              <HeroWebsitePlayback>
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
              </HeroWebsitePlayback>
              <HeroPlaybackControl paused={previewPaused} onToggle={togglePreview} />
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
                  {buttons.primary.text} <ArrowRight aria-hidden="true" /><span className="hbe-action-resolve" aria-hidden="true" />
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

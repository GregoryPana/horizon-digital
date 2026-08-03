import { BarChart3, LayoutTemplate, SearchCheck, ArrowUpRight, type LucideIcon } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { servicePages } from "../../data/businessFacts.json";
import { ServiceFamilyVisual } from "./ServiceVisualStories";
import { useViewportAutoTabs } from "./useViewportAutoTabs";

type Family = (typeof servicePages.hub.families)[number];

type ShowcaseFamily = Family & {
  icon: LucideIcon;
  shortTitle: string;
};

const families: ShowcaseFamily[] = servicePages.hub.families.map((family) => ({
  ...family,
  icon: family.id === "website" ? LayoutTemplate : family.id === "seo" ? SearchCheck : BarChart3,
  shortTitle: family.id === "website" ? "Website" : family.id === "seo" ? "SEO" : "Analytics",
}));

export function ServicesFamilyShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFamily = families[activeIndex];
  const {
    autoplayEnabled,
    selectByUser,
    swipeHandlers,
  } = useViewportAutoTabs({
    rootRef,
    activeIndex,
    itemCount: families.length,
    onChange: setActiveIndex,
  });

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + families.length) % families.length;
    selectByUser(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="services-family-showcase"
      data-active-family={activeFamily.id}
      data-autoplay={autoplayEnabled ? "on" : "off"}
    >
      <div className="services-family-showcase-tabs" role="tablist" aria-label="Choose a service">
        {families.map((family, index) => (
          <button
            type="button"
            id={`services-family-tab-${family.id}`}
            role="tab"
            aria-controls="services-family-panel"
            aria-selected={index === activeIndex}
            onClick={() => selectByUser(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            key={family.id}
          >
            {family.shortTitle}
          </button>
        ))}
      </div>

      <div
        id="services-family-panel"
        className="services-family-showcase-visual"
        role="tabpanel"
        aria-labelledby={`services-family-tab-${activeFamily.id}`}
        aria-live="polite"
        {...swipeHandlers}
      >
        <div className="services-family-showcase-visual-meta">
          <span>Active service</span>
          <strong>{activeFamily.shortTitle}</strong>
        </div>
        <div className="services-family-showcase-visual-stage" key={activeFamily.id}>
          <ServiceFamilyVisual kind={activeFamily.id} />
        </div>
      </div>

      <ul className="services-family-showcase-steps" aria-label="Service families">
        {families.map((family, index) => {
          const Icon = family.icon;
          const isActive = index === activeIndex;
          return (
            <li key={family.id} data-active={isActive}>
              <button
                type="button"
                className="services-family-showcase-step"
                aria-pressed={isActive}
                onClick={() => selectByUser(index)}
              >
                <span className="services-family-showcase-step-rail" aria-hidden="true" />
                <span className="services-family-showcase-step-heading">
                  <Icon aria-hidden="true" />
                  <strong>{family.title}</strong>
                </span>
                <span className="services-family-showcase-step-copy">{family.body}</span>
                <span className="services-family-showcase-step-fit">{family.fit}</span>
              </button>
              <Link className="services-family-showcase-link" to={family.path}>
                {family.cta}
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="services-family-showcase-mobile-copy">
        <p>{activeFamily.fit}</p>
        <h3>{activeFamily.title}</h3>
        <p>{activeFamily.body}</p>
        <Link className="services-family-showcase-link" to={activeFamily.path}>
          {activeFamily.cta}
          <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </div>
  );
}

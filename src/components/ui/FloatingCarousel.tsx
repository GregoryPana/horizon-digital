import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useInputMotionPreferences } from "./inputMotionPreferences";
import { useViewportAutoTabs } from "./useViewportAutoTabs";
import { cn } from "../../lib/utils";

type FloatingCarouselProps = {
  children: ReactNode[];
  className?: string;
  label?: string;
  tabs?: readonly string[];
  autoSwitchInterval?: number;
};

export function clampCarouselIndex(index: number, itemCount: number): number {
  if (itemCount <= 0) return 0;
  return Math.min(itemCount - 1, Math.max(0, index));
}

/**
 * Free-flowing editorial carousel. It never pins or takes control of vertical
 * page scrolling: desktop users get explicit previous/next controls and every
 * viewport retains native horizontal drag/swipe with scroll snap.
 */
export function FloatingCarousel({
  children,
  className,
  label = "Carousel",
  tabs,
  autoSwitchInterval = 5200,
}: FloatingCarouselProps) {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = useInputMotionPreferences();

  const syncActiveIndex = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const panels = Array.from(
      viewport.querySelectorAll<HTMLElement>(".floating-carousel-panel"),
    );
    if (!panels.length) return;

    const viewportCentre = viewport.scrollLeft + viewport.clientWidth / 2;
    const nearest = panels.reduce(
      (best, panel, index) => {
        const panelCentre = panel.offsetLeft + panel.offsetWidth / 2;
        const distance = Math.abs(panelCentre - viewportCentre);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setActiveIndex(nearest.index);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onScroll = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(syncActiveIndex);
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    syncActiveIndex();
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [syncActiveIndex]);

  const moveTo = useCallback((requestedIndex: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const panels = Array.from(
      viewport.querySelectorAll<HTMLElement>(".floating-carousel-panel"),
    );
    const index = clampCarouselIndex(requestedIndex, panels.length);
    const panel = panels[index];
    if (!panel) return;

    viewport.scrollTo({
      left: panel.offsetLeft - Math.max(20, (viewport.clientWidth - panel.offsetWidth) / 2),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(index);
  }, [reducedMotion]);

  const hasNamedTabs = tabs?.length === children.length;
  const {
    autoplayEnabled,
    markUserInteraction,
    selectByUser,
  } = useViewportAutoTabs({
    rootRef,
    activeIndex,
    itemCount: hasNamedTabs ? children.length : 0,
    onChange: moveTo,
    intervalMs: autoSwitchInterval,
  });

  return (
    <section
      ref={rootRef}
      className={cn("floating-carousel", className)}
      aria-label={label}
      aria-roledescription="carousel"
      data-autoplay={autoplayEnabled ? "on" : "off"}
    >
      {hasNamedTabs ? (
        <div className="floating-carousel-tabs" role="tablist" aria-label={`Choose a service in ${label}`}>
          {tabs.map((tab, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className="floating-carousel-tab"
              onClick={() => selectByUser(index)}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </div>
      ) : null}
      <div className="floating-carousel-toolbar">
        <div className="floating-carousel-controls">
          <button
            type="button"
            onClick={() => selectByUser(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label={`Previous item in ${label}`}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div
            className="floating-carousel-pagination"
            role="group"
            aria-label={`Choose an item in ${label}`}
          >
            {children.map((_, index) => (
              <button
                type="button"
                className="floating-carousel-dot"
                onClick={() => selectByUser(index)}
                aria-label={`Show item ${index + 1} of ${children.length} in ${label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                key={index}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => selectByUser(activeIndex + 1)}
            disabled={activeIndex === children.length - 1}
            aria-label={`Next item in ${label}`}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="floating-carousel-viewport"
        onWheel={markUserInteraction}
        onKeyDown={markUserInteraction}
        onPointerDown={markUserInteraction}
      >
        <div className="floating-carousel-track" role="list">
          {children.map((child, index) => (
            <article
              className="floating-carousel-panel"
              data-active={index === activeIndex}
              data-position={index === activeIndex ? "active" : index < activeIndex ? "previous" : "next"}
              data-offset={index - activeIndex}
              aria-current={index === activeIndex ? "true" : undefined}
              role="listitem"
              aria-label={`${index + 1} of ${children.length}`}
              key={index}
            >
              {child}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

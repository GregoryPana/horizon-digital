import { ReactNode, useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { scrollToTopSmooth } from "../lib/utils";
import { siteConfig } from "../data/site";
import { trackEvent } from "../lib/analytics";

const ChatWidget = lazy(() => import("./ChatWidget"));

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
  const isHomeRoute = normalizedPath === "/";
  const isShowcaseRoute = normalizedPath.startsWith("/showcase/");
  const isInsightsThemeRoute =
    location.pathname === "/insights" ||
    location.pathname.startsWith("/insights/");
  const mainRef = useRef<HTMLElement | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(88);

  useLayoutEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    const syncHeaderHeight = () => {
      // Use requestAnimationFrame to ensure we read layout after the browser is ready
      window.requestAnimationFrame(() => {
        const height = Math.ceil(header.getBoundingClientRect().height);
        setHeaderHeight(height);
      });
    };

    // Initial sync after a short delay to avoid blocking LCP
    const initialSync = setTimeout(syncHeaderHeight, 100);

    const resizeObserver = new ResizeObserver(() => syncHeaderHeight());
    resizeObserver.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      clearTimeout(initialSync);
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    let frameId: number | null = null;
    let observer: IntersectionObserver | null = null;
    const activeCards = new Set<HTMLElement>();
    let cancelled = false;
    let mutationObserver: MutationObserver | null = null;
    let setupTimer: number | null = null;

    const cardPositions = new Map<HTMLElement, number>();

    const updateCachedPositions = () => {
      activeCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = window.scrollY + rect.top + rect.height / 2;
        cardPositions.set(card, cardCenter);
      });
    };

    const updateGlow = () => {
      frameId = null;
      const viewportCenter = window.scrollY + window.innerHeight / 2;

      activeCards.forEach((card) => {
        const cardCenter = cardPositions.get(card);
        if (cardCenter === undefined) return;

        const distance = Math.abs(cardCenter - viewportCenter);
        // Approximate height for normalization if not cached
        const maxDistance = window.innerHeight / 2 + 100; 
        const intensity = Math.max(0, 1 - distance / maxDistance) ** 1.55;

        card.style.setProperty("--glow-strength", intensity.toString());
      });
    };

    const scheduleUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateGlow);
    };

    const initObserver = () => {
      if (cancelled) return;
      const cards = Array.from(document.querySelectorAll<HTMLElement>(".scroll-glow"));
      if (!cards.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.classList.add("is-inview");
              activeCards.add(target);
              // Cache position immediately on entry
              const rect = target.getBoundingClientRect();
              cardPositions.set(target, window.scrollY + rect.top + rect.height / 2);
            } else {
              target.classList.remove("is-inview");
              target.style.setProperty("--glow-strength", "0");
              activeCards.delete(target);
              cardPositions.delete(target);
            }
          });
          scheduleUpdate();
        },
        { threshold: 0.1 }
      );

      cards.forEach((card) => observer?.observe(card));

      const handleResize = () => {
        updateCachedPositions();
        scheduleUpdate();
      };

      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
    };

    setupTimer = window.setTimeout(() => {
      if (cancelled) return;
      initObserver();

      if (mainRef.current) {
        mutationObserver = new MutationObserver(() => {
          if (!activeCards.size) initObserver();
        });
        mutationObserver.observe(mainRef.current, { childList: true, subtree: true });
      }
    }, 200);

    return () => {
      cancelled = true;
      if (setupTimer !== null) window.clearTimeout(setupTimer);
      mutationObserver?.disconnect();
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateCachedPositions);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-revealed");
          observer.unobserve(target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => {
      if (item.classList.contains("is-revealed")) return;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const offset = (header?.getBoundingClientRect().height ?? headerHeight) + 14;
      const top = window.scrollY + target.getBoundingClientRect().top - offset;
      window.scrollTo({ top, left: 0, behavior: "smooth" });
    };

    const timer = window.setTimeout(scrollToHashTarget, 30);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, headerHeight]);

  const [isTopButtonExpanded, setIsTopButtonExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsTopButtonExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsTopButtonExpanded(false);
  };

  return (
    <div
      className={`flex min-h-screen flex-col bg-bg text-text ${
        isInsightsThemeRoute ? "insights-theme-shell" : ""
      }`.trim()}
    >
      <a
        href="#main-content"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-bg focus:px-3 focus:py-2 focus:text-sm focus:text-text"
      >
        Skip to main content
      </a>
      {isShowcaseRoute ? null : <Navbar />}
      <main
        id="main-content"
        tabIndex={-1}
        ref={mainRef}
        className="flex-1 pb-[env(safe-area-inset-bottom)] min-h-[70vh]"
        style={{ paddingTop: isHomeRoute || isShowcaseRoute ? "0px" : "var(--header-height, 88px)" }}
      >
        {children}
      </main>
      {isShowcaseRoute ? null : <Footer />}
      {isShowcaseRoute ? null : (
        <button
          type="button"
          onClick={scrollToTopSmooth}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`focus-ring fixed bottom-6 left-4 z-[70] inline-flex items-center justify-center rounded-full border border-accent/40 bg-bg-elev/95 backdrop-blur-xl text-accent shadow-[0_0_15px_var(--glow)] transition-all duration-500 ease-out hover:bg-accent-soft md:bottom-10 md:left-1/2 md:right-auto md:-translate-x-1/2 ${
            showTopButton ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
          } ${isTopButtonExpanded ? "md:w-52 md:h-12 md:px-6" : "h-11 w-11"}`.trim()}
          aria-label="Back to top"
        >
          <span className="flex items-center gap-3">
            <span className="text-xl leading-none">↑</span>
            {isTopButtonExpanded && (
              <span className="hidden md:inline-block text-[11px] font-black uppercase tracking-[0.25em] whitespace-nowrap animate-in fade-in zoom-in-95 duration-300 fill-mode-forwards">
                Scroll To Top
              </span>
            )}
          </span>
        </button>
      )}
      {isShowcaseRoute ? null : (
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat on WhatsApp"
          onClick={() =>
            trackEvent("cta_click", {
              cta_name: "whatsapp_sticky",
              page_path: window.location.pathname,
            })
          }
          className="fixed bottom-6 right-4 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      )}
      {isShowcaseRoute ? null : (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  );
}

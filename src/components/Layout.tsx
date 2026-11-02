import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./EditorialFooter";
import Navbar from "./EditorialNavbar";
import AnalyticsConsent from "./AnalyticsConsent";
import "../styles/editorial-system.css";
import "../styles/analytics-consent.css";
import "../styles/footer-refinement.css";
import "../styles/menu-information.css";
import { scrollToTopSmooth } from "../lib/utils";
import { siteConfig } from "../data/site";
import { trackContactIntent } from "../lib/analytics";
import WhatsAppIcon from "./ui/WhatsAppIcon";

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
  const previousPathRef = useRef<string | null>(null);
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

    const handleResize = () => {
      updateCachedPositions();
      scheduleUpdate();
    };

    const initObserver = () => {
      if (cancelled) return;
      observer?.disconnect();
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
      window.removeEventListener("resize", handleResize);
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
    // Query-only configuration changes preserve input focus. Real page changes
    // orient keyboard/screen-reader users after the lazy destination mounts.
    const isNavigation = previousPathRef.current !== null && previousPathRef.current !== location.pathname;
    previousPathRef.current = location.pathname;
    // Do not focus the hero on first load: focus legitimately settles its
    // enhancement and would otherwise suppress the accepted entrance.
    if (!isNavigation && !location.hash) return;
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    let frame = 0;
    const focusDestination = () => {
      let id = location.hash ? location.hash.slice(1) : null;
      try { if (id) id = decodeURIComponent(id); } catch { /* A literal malformed hash is not a page error. */ }
      const target = id ? document.getElementById(id) : mainRef.current?.querySelector<HTMLElement>("h1");
      if (!target || !target.getClientRects().length) return false;
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (id) target.scrollIntoView({ block: "start", behavior: "auto" });
      return true;
    };
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (focusDestination()) observer.disconnect();
      });
    });
    if (mainRef.current) observer.observe(mainRef.current, { childList: true, subtree: true });
    frame = requestAnimationFrame(() => {
      if (focusDestination()) observer.disconnect();
    });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.getElementById("editorial-site-footer");
      const footerInView = footer && footer.getBoundingClientRect().top < window.innerHeight;
      setShowTopButton(window.scrollY > 360 && !footerInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const [isTopButtonExpanded, setIsTopButtonExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsTopButtonExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsTopButtonExpanded(false);
  };

  return (
    <div
      className={`${isShowcaseRoute ? "" : "editorial-site"} flex min-h-screen flex-col bg-bg text-text ${
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
        className={`${isShowcaseRoute ? "" : isHomeRoute ? "editorial-home-page" : "editorial-standard-page"} flex-1 pb-[env(safe-area-inset-bottom)] min-h-[70vh]`}
        style={{ paddingTop: isHomeRoute || isShowcaseRoute ? "0px" : `var(--header-height, ${headerHeight}px)` }}
      >
        {children}
      </main>
      {isShowcaseRoute ? null : <Footer />}
      <AnalyticsConsent />
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
          tabIndex={showTopButton ? 0 : -1}
          aria-hidden={!showTopButton}
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
          onClick={() => trackContactIntent({ method: "whatsapp", source: "sticky_button" })}
          className="fixed bottom-6 right-4 z-[90] hidden h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] sm:right-6 sm:flex"
        >
          <WhatsAppIcon className="h-6 w-6 text-white" />
        </a>
      )}
    </div>
  );
}

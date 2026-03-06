import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { scrollToTopSmooth } from "../lib/utils";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isInsightsThemeRoute =
    location.pathname === "/ai-digital-tools" || location.pathname.startsWith("/insights");
  const mainRef = useRef<HTMLElement | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(88);

  useLayoutEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    const syncHeaderHeight = () => {
      setHeaderHeight(Math.ceil(header.getBoundingClientRect().height));
    };

    syncHeaderHeight();

    const resizeObserver = new ResizeObserver(() => syncHeaderHeight());
    resizeObserver.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
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

    const updateGlow = () => {
      frameId = null;
      const viewportCenter = window.innerHeight / 2;

      activeCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        const maxDistance = viewportCenter + rect.height / 2;
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
      if (!cards.length) {
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.classList.add("is-inview");
              activeCards.add(target);
            } else {
              target.classList.remove("is-inview");
              target.style.setProperty("--glow-strength", "0");
              activeCards.delete(target);
            }
          });
          scheduleUpdate();
        },
        { threshold: 0.15 }
      );

      cards.forEach((card) => observer?.observe(card));
      updateGlow();

      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
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
    }, 160);

    return () => {
      cancelled = true;
      if (setupTimer !== null) window.clearTimeout(setupTimer);
      mutationObserver?.disconnect();
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
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

  return (
    <div
      className={`flex min-h-screen flex-col bg-bg text-text ${
        isInsightsThemeRoute ? "insights-theme-shell" : ""
      }`.trim()}
    >
      <Navbar />
      <main
        ref={mainRef}
        className="flex-1 pb-[env(safe-area-inset-bottom)]"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        {children}
      </main>
      <Footer />
      <button
        type="button"
        onClick={scrollToTopSmooth}
        className={`focus-ring fixed bottom-4 right-4 z-[70] inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/45 bg-bg-elev text-accent shadow-[0_0_12px_var(--glow)] transition duration-300 hover:bg-accent-soft ${
          showTopButton ? "opacity-100" : "pointer-events-none opacity-0"
        }`.trim()}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

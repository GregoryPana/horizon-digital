import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".scroll-glow"));
    if (!cards.length) return;

    const activeCards = new Set<HTMLElement>();
    let frameId: number | null = null;

    const updateGlow = () => {
      frameId = null;
      const viewportCenter = window.innerHeight / 2;

      activeCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        const maxDistance = viewportCenter + rect.height / 2;
        const intensity = Math.max(0, 1 - distance / maxDistance);

        card.style.setProperty("--glow-strength", intensity.toString());
      });
    };

    const scheduleUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateGlow);
    };

    const observer = new IntersectionObserver(
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

    cards.forEach((card) => observer.observe(card));
    updateGlow();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

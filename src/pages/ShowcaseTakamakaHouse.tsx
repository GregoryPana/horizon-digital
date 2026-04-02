import { useEffect, useRef } from "react";
import Seo from "../components/Seo";

export default function ShowcaseTakamakaHouse() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const handleFrameLoad = () => {
    try {
      frameRef.current?.contentWindow?.scrollTo(0, 0);
    } catch {
      // no-op: iframe may block access in some environments
    }
  };

  return (
    <>
      <Seo
        title="Takamaka House Showcase"
        description="Explore the Takamaka House showcase by Horizon Digital, focused on hospitality storytelling and clear booking intent."
        path="/showcase/takamaka-house"
      />
      <section className="h-[100svh] w-full bg-black">
        <iframe
          ref={frameRef}
          title="Takamaka House Showcase"
          src="/takamaka-house.html"
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
          onLoad={handleFrameLoad}
        />
      </section>
    </>
  );
}

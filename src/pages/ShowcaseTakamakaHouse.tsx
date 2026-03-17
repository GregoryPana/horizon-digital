import { useEffect, useRef } from "react";
import takamakaHouseHtml from "../../takamaka-house.html?raw";

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
    <section className="h-[100svh] w-full bg-black">
      <iframe
        ref={frameRef}
        title="Takamaka House Showcase"
        srcDoc={takamakaHouseHtml}
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={handleFrameLoad}
      />
    </section>
  );
}

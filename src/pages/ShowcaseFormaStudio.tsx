import { useEffect, useRef } from "react";
import formaStudioHtml from "../../forma-studio.html?raw";

export default function ShowcaseFormaStudio() {
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
        title="Forma Studio Showcase"
        srcDoc={formaStudioHtml}
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={handleFrameLoad}
      />
    </section>
  );
}

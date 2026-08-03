import { useEffect, useState } from "react";
import { shouldMountHeroStories } from "./heroBuildExtraction";

const HERO_STORY_MEDIA_QUERY = "(min-width: 768px)";

export function useHeroStoryMount(): boolean {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(HERO_STORY_MEDIA_QUERY);
    const sync = () => setShouldMount(shouldMountHeroStories(window.innerWidth));
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return shouldMount;
}

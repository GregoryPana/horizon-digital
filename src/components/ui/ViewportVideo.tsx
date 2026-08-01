import { useEffect, useRef, useState } from "react";
import { isMediaAllowed, shouldAttachVideoSource, shouldPlayVideo } from "./viewportMediaPolicy";

const DEFAULT_ROOT_MARGIN = "300px 0px";

type ConnectionLike = { saveData?: boolean };
type NavigatorWithConnection = { connection?: ConnectionLike };

export interface PlaybackVideo {
  playbackRate: number;
  play(): Promise<void> | void;
  pause(): void;
}

export async function applyVideoPlaybackPolicy(
  video: PlaybackVideo,
  shouldPlay: boolean,
  playbackRate: number,
  setPlaying: (playing: boolean) => void,
): Promise<void> {
  video.playbackRate = playbackRate;
  if (!shouldPlay) {
    video.pause();
    setPlaying(false);
    return;
  }

  // A policy decision to try playback is not evidence that playback started.
  // The component's `playing` event is the only path that hides the poster.
  setPlaying(false);
  try {
    await video.play();
  } catch {
    setPlaying(false);
  }
}

export function getSaveDataPreference(
  navigatorLike: NavigatorWithConnection | undefined =
    typeof navigator === "undefined" ? undefined : (navigator as NavigatorWithConnection),
): boolean {
  return Boolean(navigatorLike?.connection?.saveData);
}

type ViewportVideoProps = {
  src: string;
  poster: string;
  posterAvifSrcSet?: string;
  posterSrcSet?: string;
  sizes?: string;
  width: number;
  height: number;
  reducedMotion: boolean;
  className?: string;
  rootMargin?: string;
  playbackRate?: number;
};

export function ViewportVideo({
  src,
  poster,
  posterAvifSrcSet,
  posterSrcSet,
  sizes,
  width,
  height,
  reducedMotion,
  className,
  rootMargin = DEFAULT_ROOT_MARGIN,
  playbackRate = 1,
}: ViewportVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasBeenNearViewport, setHasBeenNearViewport] = useState(false);
  const [saveData] = useState(getSaveDataPreference);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      setHasBeenNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsNearViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenNearViewport(true);
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  const mediaAllowed = isMediaAllowed({ reducedMotion, saveData });
  const shouldAttach = shouldAttachVideoSource({ mediaAllowed, hasBeenNearViewport });
  const shouldPlay = shouldPlayVideo({ mediaAllowed, isNearViewport });
  const showPlayback = shouldAttach && shouldPlay && isPlaying;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldAttach) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    let active = true;
    void applyVideoPlaybackPolicy(video, shouldPlay, playbackRate, (playing) => {
      if (active) setIsPlaying(playing);
    });
    return () => {
      active = false;
    };
  }, [shouldAttach, shouldPlay, playbackRate]);

  return (
    <div ref={wrapperRef} className={className ? `relative ${className}` : "relative w-full h-full"}>
      <picture className="absolute inset-0 block h-full w-full">
        {posterAvifSrcSet ? (
          <source srcSet={posterAvifSrcSet} sizes={sizes} type="image/avif" />
        ) : null}
        {posterSrcSet ? (
          <source srcSet={posterSrcSet} sizes={sizes} type="image/webp" />
        ) : null}
        <img
          src={poster}
          alt=""
          width={width}
          height={height}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-top"
          style={{ opacity: showPlayback ? 0 : 1, transition: "opacity 0.4s ease" }}
        />
      </picture>
      {mediaAllowed ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          src={shouldAttach ? src : undefined}
          width={width}
          height={height}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ opacity: showPlayback ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
      ) : null}
    </div>
  );
}

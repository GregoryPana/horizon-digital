import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ViewportVideo, applyVideoPlaybackPolicy, getSaveDataPreference } from "./ViewportVideo";
import { isMediaAllowed, shouldAttachVideoSource, shouldPlayVideo } from "./viewportMediaPolicy";

describe("isMediaAllowed", () => {
  it("disallows video media when the user prefers reduced motion", () => {
    expect(isMediaAllowed({ reducedMotion: true, saveData: false })).toBe(false);
  });

  it("disallows video media when the user has requested reduced data usage", () => {
    expect(isMediaAllowed({ reducedMotion: false, saveData: true })).toBe(false);
  });

  it("allows video media under normal conditions", () => {
    expect(isMediaAllowed({ reducedMotion: false, saveData: false })).toBe(true);
  });
});

describe("shouldAttachVideoSource", () => {
  it("does not attach while off-screen even if media is allowed", () => {
    expect(shouldAttachVideoSource({ mediaAllowed: true, hasBeenNearViewport: false })).toBe(false);
  });

  it("does not attach once near viewport if media is not allowed", () => {
    expect(shouldAttachVideoSource({ mediaAllowed: false, hasBeenNearViewport: true })).toBe(false);
  });

  it("attaches only once the video has been near the viewport under normal conditions", () => {
    expect(shouldAttachVideoSource({ mediaAllowed: true, hasBeenNearViewport: true })).toBe(true);
  });
});

describe("shouldPlayVideo", () => {
  it("does not play when far outside the viewport", () => {
    expect(shouldPlayVideo({ mediaAllowed: true, isNearViewport: false })).toBe(false);
  });

  it("does not play when media is not allowed even if intersecting", () => {
    expect(shouldPlayVideo({ mediaAllowed: false, isNearViewport: true })).toBe(false);
  });

  it("plays only when near the viewport under normal conditions", () => {
    expect(shouldPlayVideo({ mediaAllowed: true, isNearViewport: true })).toBe(true);
  });
});

describe("ViewportVideo playback fallback", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps the responsive picture visible without duplicating its URL as a video poster", () => {
    const markup = renderToStaticMarkup(createElement(ViewportVideo, {
      src: "/preview.mp4",
      poster: "/poster.jpg",
      posterAvifSrcSet: "/poster-400.avif 400w, /poster-800.avif 800w",
      posterSrcSet: "/poster-400.webp 400w, /poster-800.webp 800w",
      sizes: "(min-width: 640px) 460px, 100vw",
      width: 800,
      height: 500,
      reducedMotion: false,
    }));

    expect(markup).toContain("<picture");
    expect(markup).toContain('type="image/avif"');
    expect(markup).toContain('type="image/webp"');
    expect(markup).toContain('src="/poster.jpg"');
    expect(markup).toMatch(/<img[^>]+opacity:1/);
    expect(markup).toMatch(/<video[^>]+opacity:0/);
    expect(markup).not.toMatch(/<video[^>]+poster=/);
  });

  it("evaluates Save-Data safely for SSR and on the initial client render", () => {
    expect(getSaveDataPreference(undefined)).toBe(false);
    expect(getSaveDataPreference({ connection: { saveData: true } })).toBe(true);
    expect(getSaveDataPreference({ connection: { saveData: false } })).toBe(false);

    vi.stubGlobal("navigator", { connection: { saveData: true } });
    const markup = renderToStaticMarkup(createElement(ViewportVideo, {
      src: "/preview.mp4",
      poster: "/poster.jpg",
      width: 800,
      height: 500,
      reducedMotion: false,
    }));

    expect(markup).toContain("<picture");
    expect(markup).not.toContain("<video");
  });

  it("retains poster state when autoplay rejects and restores it when paused", async () => {
    const states: boolean[] = [];
    const rejectedVideo = {
      playbackRate: 1,
      play: () => Promise.reject(new Error("autoplay blocked")),
      pause: () => undefined,
    };

    await applyVideoPlaybackPolicy(rejectedVideo, true, 0.75, (playing) => states.push(playing));
    expect(rejectedVideo.playbackRate).toBe(0.75);
    expect(states).toEqual([false, false]);

    states.push(true);
    await applyVideoPlaybackPolicy(rejectedVideo, false, 0.75, (playing) => states.push(playing));
    expect(states[states.length - 1]).toBe(false);
  });

  it("ignores a stale autoplay rejection after the playback effect is superseded", async () => {
    let rejectPlay!: (reason?: unknown) => void;
    const pendingPlay = new Promise<void>((_resolve, reject) => {
      rejectPlay = reject;
    });
    const video = {
      playbackRate: 1,
      play: () => pendingPlay,
      pause: () => undefined,
    };
    const states: boolean[] = [];
    let active = true;
    const playback = applyVideoPlaybackPolicy(video, true, 1, (playing) => {
      if (active) states.push(playing);
    });

    active = false;
    rejectPlay(new Error("superseded autoplay attempt"));
    await playback;

    expect(states).toEqual([false]);
  });
});

export const interactiveSvgIconData = {
  browser: {
    viewBox: "0 0 24 24",
    paths: ["M3 4h18v16H3z", "M3 8h18", "M6 6h.01M9 6h.01"],
  },
  palette: {
    viewBox: "0 0 24 24",
    paths: ["M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0-2-12Z", "M7.5 10h.01M10 6.5h.01M15 7.5h.01"],
  },
  code: {
    viewBox: "0 0 24 24",
    paths: ["m8 9-3 3 3 3", "m16 9 3 3-3 3", "m14 5-4 14"],
  },
  devices: {
    viewBox: "0 0 24 24",
    paths: ["M3 4h14v11H3z", "M7 19h6M10 15v4", "M18 8h3v12h-5v-3"],
  },
  search: {
    viewBox: "0 0 24 24",
    paths: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z", "m16 16 4 4", "m8.5 11 1.7 1.7 3.4-3.7"],
  },
  message: {
    viewBox: "0 0 24 24",
    paths: ["M4 5h16v12H9l-5 3z", "M8 10h.01M12 10h.01M16 10h.01"],
  },
  launch: {
    viewBox: "0 0 24 24",
    paths: ["M14 4c3-1 5-1 6-1 0 1 0 3-1 6l-5 5-4-4z", "m10 14-3 3", "M8 12H5l-2 4 5 1M12 16v3l-4 2-1-5"],
  },
  support: {
    viewBox: "0 0 24 24",
    paths: ["M12 3 5 6v5c0 4.5 2.7 7.7 7 10 4.3-2.3 7-5.5 7-10V6z", "m9 12 2 2 4-5"],
  },
  check: {
    viewBox: "0 0 24 24",
    paths: ["M4 12.5 9 17l11-11"],
  },
  refresh: {
    viewBox: "0 0 24 24",
    paths: ["M20 7v5h-5", "M4 17v-5h5", "M6.2 8A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 11.8-2"],
  },
  compass: {
    viewBox: "0 0 24 24",
    paths: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "m15.5 8.5-2 5-5 2 2-5z"],
  },
  expand: {
    viewBox: "0 0 24 24",
    paths: ["M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5", "M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"],
  },
} as const;

export type InteractiveSvgIconKind = keyof typeof interactiveSvgIconData;
export type InteractiveSvgIconEffect = "trace" | "glow" | "pop" | "colour";

export const requiredInteractiveIconKinds: InteractiveSvgIconKind[] = [
  "browser",
  "palette",
  "code",
  "devices",
  "search",
  "message",
  "launch",
  "support",
  "check",
];

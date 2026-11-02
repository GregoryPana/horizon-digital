export default class Lenis {
  constructor(options?: { lerp?: number; anchors?: boolean; prevent?: (node: HTMLElement) => boolean });
  raf(time: number): void;
  on(event: string, handler: () => void): void;
  start(): void;
  stop(): void;
  destroy(): void;
  scrollTo(target: HTMLElement | number, options?: { immediate?: boolean; force?: boolean; offset?: number; onComplete?: () => void }): void;
}

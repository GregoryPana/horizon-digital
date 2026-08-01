export interface MediaAllowedInput {
  reducedMotion: boolean;
  saveData: boolean;
}

export interface AttachVideoInput {
  mediaAllowed: boolean;
  hasBeenNearViewport: boolean;
}

export interface PlayVideoInput {
  mediaAllowed: boolean;
  isNearViewport: boolean;
}

export function isMediaAllowed(input: MediaAllowedInput): boolean {
  return !input.reducedMotion && !input.saveData;
}

export function shouldAttachVideoSource(input: AttachVideoInput): boolean {
  return input.mediaAllowed && input.hasBeenNearViewport;
}

export function shouldPlayVideo(input: PlayVideoInput): boolean {
  return input.mediaAllowed && input.isNearViewport;
}

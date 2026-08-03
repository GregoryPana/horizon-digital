import gsap from "gsap";

export interface CharacterShineOptions {
  delay?: number;
  repeatDelay?: number;
  stagger?: number;
  pulseDuration?: number;
  baseColor?: string;
  shineColor?: string;
  glow?: string;
}

export const CHARACTER_SHINE_DEFAULTS = Object.freeze({
  delay: 2.15,
  repeatDelay: 4.6,
  stagger: 0.045,
  pulseDuration: 0.36,
  baseColor: "#f7fbfc",
  shineColor: "#aef8f2",
  glow: "0 0 7px rgba(115, 232, 234, 0.34)",
});

export function createCharacterShineTimeline(
  targets: gsap.TweenTarget,
  options: CharacterShineOptions = {},
) {
  const settings = { ...CHARACTER_SHINE_DEFAULTS, ...options };

  return gsap
    .timeline({
      delay: settings.delay,
      repeat: -1,
      repeatDelay: settings.repeatDelay,
    })
    .to(targets, {
      keyframes: [
        {
          color: settings.shineColor,
          textShadow: settings.glow,
          duration: settings.pulseDuration * 0.32,
          ease: "power2.out",
        },
        {
          color: settings.baseColor,
          textShadow: "0 0 0 rgba(115, 232, 234, 0)",
          duration: settings.pulseDuration * 0.68,
          ease: "power2.inOut",
        },
      ],
      stagger: { each: settings.stagger },
    })
    .set(targets, { clearProps: "color,text-shadow" });
}

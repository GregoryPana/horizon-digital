import { Fragment, useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createCharacterShineTimeline } from "./characterShine";

gsap.registerPlugin(useGSAP);

function SegmentedServiceTitle({ title }: { title: string }) {
  return title.split(" ").map((word, wordIndex, words) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="service-hero-title-word">
        {Array.from(word).map((letter, letterIndex) => (
          <span className="service-hero-title-letter" key={`${letter}-${letterIndex}`}>
            {letter}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function ServicesHeroHeadline({ title }: { title: string }) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const titleId = `services-title-${useId().replace(/:/g, "")}`;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const query = gsap.utils.selector(root);
      const words = query<HTMLElement>(".service-hero-title-word");
      const letters = query<HTMLElement>(".service-hero-title-letter");
      const mm = gsap.matchMedia();
      let reveal: gsap.core.Timeline | undefined;
      let shine: gsap.core.Timeline | undefined;

      const setFinal = () => {
        gsap.set(words, { clearProps: "transform,opacity,visibility,filter" });
        gsap.set(letters, { clearProps: "color,text-shadow" });
      };

      mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", setFinal);
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.set(words, { autoAlpha: 0, y: 20, filter: "blur(11px)" });
        reveal = gsap.timeline({ defaults: { ease: "power3.out" } })
          .to(words, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: 0.08,
          }, 0.12)
          .set(words, { clearProps: "transform,opacity,visibility,filter" }, 1.4);
        shine = createCharacterShineTimeline(letters, {
          delay: 1.85,
          repeatDelay: 5.1,
          stagger: 0.042,
          pulseDuration: 0.36,
          glow: "0 0 7px rgba(115, 232, 234, 0.32)",
        });

        return () => {
          reveal?.kill();
          shine?.kill();
          setFinal();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <h1 ref={rootRef} id={titleId} className="service-hero-title">
      <span className="motion-headline-accessible">{title}</span>
      <span className="service-hero-title-visual" aria-hidden="true">
        <SegmentedServiceTitle title={title} />
      </span>
    </h1>
  );
}

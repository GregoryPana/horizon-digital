import { siteConfig } from "../data/site";
import primaryLogo from "../assets/logo/svg logo (1).png";

type LogoProps = {
  imageSrc?: string;
  className?: string;
  imageClassName?: string;
};

export default function Logo({ imageSrc, className, imageClassName }: LogoProps) {
  const wrapperClass = ["flex items-center gap-3", className]
    .filter(Boolean)
    .join(" ");
  const src = imageSrc ?? primaryLogo;
  const imageClasses = ["h-10 w-auto rounded-md object-contain", imageClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      {src ? (
        <img
          src={src}
          alt={`${siteConfig.name} logo`}
          width={132}
          height={40}
          className={imageClasses}
        />
      ) : (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="10" height="32" rx="2" fill="var(--text)" />
          <rect x="28" y="6" width="10" height="32" rx="2" fill="var(--text)" />
          <rect
            x="6"
            y="21"
            width="32"
            height="2"
            rx="1"
            fill="var(--accent)"
          />
        </svg>
      )}
    </div>
  );
}

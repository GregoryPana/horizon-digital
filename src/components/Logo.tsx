import { siteConfig } from "../data/site";

type LogoProps = {
  imageSrc?: string;
  className?: string;
};

export default function Logo({ imageSrc, className }: LogoProps) {
  const wrapperClass = ["flex items-center gap-3", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={wrapperClass}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${siteConfig.name} logo`}
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl object-cover"
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
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-[0.3em] text-text">
          HORIZON
        </div>
        <div className="text-xs font-semibold tracking-[0.4em] text-accent">
          DIGITAL
        </div>
      </div>
    </div>
  );
}

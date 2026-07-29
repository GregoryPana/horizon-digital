import type { ReactNode } from "react";

type SectorStoryKind =
  | "hospitality"
  | "food"
  | "retail"
  | "professional"
  | "wellness"
  | "tours"
  | "creative";

type SectorStoryMarkProps = {
  kind: SectorStoryKind;
  className?: string;
};

const colours = {
  marine: "#0a2b32",
  marineDeep: "#061c22",
  cyan: "#62dce6",
  mint: "#75d9a4",
  sand: "#e9b86d",
  ice: "#dff7f5",
  blue: "#7ebbd0",
};

function PortalShell({ children }: { children: ReactNode }) {
  return (
    <>
      <path
        d="M4 8.5C4 5.46 6.46 3 9.5 3h27C40.64 3 44 6.36 44 10.5v15c0 4.14-3.36 7.5-7.5 7.5h-27A5.5 5.5 0 0 1 4 27.5v-19Z"
        fill={colours.marine}
      />
      <path d="M4 10.5h40" stroke={colours.ice} strokeOpacity=".18" />
      <circle cx="8" cy="7" r="1" fill={colours.sand} />
      <circle cx="11.5" cy="7" r="1" fill={colours.mint} opacity=".85" />
      <path d="M16 7h8" stroke={colours.ice} strokeOpacity=".28" strokeLinecap="round" />
      {children}
    </>
  );
}

export function SectorStoryMark({ kind, className = "" }: SectorStoryMarkProps) {
  return (
    <svg
      viewBox="0 0 48 36"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <PortalShell>
        {kind === "hospitality" ? (
          <>
            <circle cx="35" cy="16" r="4.3" fill={colours.sand} opacity=".94" />
            <path d="M7 28.5c5.4-5.5 10.8-7.3 16-5.3 4 1.5 7.8 1.2 12.2-1 3.1-1.5 5.8-1.5 8.8.1V33H7v-4.5Z" fill={colours.blue} opacity=".4" />
            <path d="m11 24 6.5-6 6.5 6v7H11v-7Z" fill={colours.ice} opacity=".92" />
            <rect x="16" y="24" width="4" height="7" rx="1" fill={colours.marineDeep} />
            <path d="M27 18h5M27 21h8" stroke={colours.mint} strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="39" cy="28" r="2.3" fill={colours.cyan} />
            <path d="m38 28 1 1 1.8-2" stroke={colours.marineDeep} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : null}

        {kind === "food" ? (
          <>
            <path d="M8 29h22c0-7-4.8-12-11-12S8 22 8 29Z" fill={colours.sand} opacity=".92" />
            <path d="M7 29h24" stroke={colours.ice} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 17v-3" stroke={colours.ice} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="19" cy="13.2" r="1.4" fill={colours.mint} />
            <rect x="34" y="14" width="7" height="15" rx="2" fill={colours.ice} opacity=".94" />
            <path d="M36 18h3M36 21h3M36 24h2" stroke={colours.marine} strokeWidth="1.1" strokeLinecap="round" />
            <path d="m31.5 25.5 2.5-2" stroke={colours.cyan} strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : null}

        {kind === "retail" ? (
          <>
            <rect x="8" y="15" width="9" height="7" rx="2" fill={colours.mint} />
            <rect x="19.5" y="15" width="9" height="7" rx="2" fill={colours.sand} />
            <rect x="31" y="15" width="9" height="7" rx="2" fill={colours.blue} />
            <path d="M8 26h19" stroke={colours.ice} strokeOpacity=".55" strokeWidth="1.3" strokeLinecap="round" />
            <path d="m35 24.5 6 3.5-3 .8-1.2 3-1.8-7.3Z" fill={colours.cyan} />
            <circle cx="12.5" cy="18.5" r="1.6" fill={colours.marineDeep} opacity=".62" />
            <path d="M22 18.5h4" stroke={colours.marineDeep} strokeOpacity=".62" strokeLinecap="round" />
          </>
        ) : null}

        {kind === "professional" ? (
          <>
            <path d="M10 16h23v15H10z" fill={colours.ice} opacity=".94" />
            <path d="M13 14h23v15h-3V16H13v-2Z" fill={colours.blue} opacity=".55" />
            <path d="M14 20h9M14 23.5h14M14 27h11" stroke={colours.marine} strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="35.5" cy="25.5" r="5" fill={colours.sand} />
            <path d="m33.5 25.5 1.3 1.3 2.8-3" stroke={colours.marineDeep} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : null}

        {kind === "wellness" ? (
          <>
            <path d="M24 30c-7.5-2.2-11-7.2-10.5-13 5-.1 8.5 1.9 10.5 6 2-4.1 5.5-6.1 10.5-6 .5 5.8-3 10.8-10.5 13Z" fill={colours.mint} opacity=".95" />
            <path d="M24 23c-3.2-3.7-3.2-7.4 0-11 3.2 3.6 3.2 7.3 0 11Z" fill={colours.sand} />
            <path d="M8 28.5c5.5 0 10.5 1.2 16 4 5.5-2.8 10.5-4 16-4" stroke={colours.cyan} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="39" cy="15" r="2" fill={colours.ice} opacity=".72" />
          </>
        ) : null}

        {kind === "tours" ? (
          <>
            <path d="M7 27c5-4.8 10.3-5.2 15.8-1.1 4.3 3.2 8.4 3 12.2-.7 3-2.8 6-2.5 9 .2V33H7v-6Z" fill={colours.blue} opacity=".48" />
            <circle cx="37" cy="16" r="4.5" fill={colours.sand} />
            <path d="m12 24 4-6h7l6 6H12Z" fill={colours.ice} />
            <path d="M18.5 18v-4h5" stroke={colours.cyan} strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 15c5-3.5 10-3.5 15 0 3.5 2.4 6.5 2.2 9-.7" stroke={colours.mint} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2.8" />
            <circle cx="10" cy="15" r="1.8" fill={colours.cyan} />
          </>
        ) : null}

        {kind === "creative" ? (
          <>
            <rect x="9" y="15" width="11" height="12" rx="2.5" fill={colours.sand} />
            <circle cx="31" cy="21" r="7" fill={colours.mint} opacity=".9" />
            <path d="M13 30c5-13 12-17 24-12" stroke={colours.cyan} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="13" cy="30" r="2" fill={colours.ice} />
            <circle cx="37" cy="18" r="2" fill={colours.ice} />
            <path d="M13 30 9 25M37 18l3-4" stroke={colours.ice} strokeOpacity=".55" strokeWidth="1.1" />
            <path d="m25 16 2-3 2 3-2 3-2-3Z" fill={colours.ice} opacity=".88" />
          </>
        ) : null}
      </PortalShell>
    </svg>
  );
}

export type { SectorStoryKind };

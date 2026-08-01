import type { PricingPackageId } from "./pricingDecisionFlow";

export const PRICING_PACKAGE_GRAPHIC_DETAIL_COUNT: Record<
  PricingPackageId,
  number
> = { foundation: 4, starter: 7, growth: 11 };
type Props = Readonly<{ tier: PricingPackageId }>;

function FoundationScene() {
  return (
    <>
      <rect
        data-detail="shell"
        x="14"
        y="12"
        width="116"
        height="120"
        rx="10"
      />
      <path data-detail="chrome" d="M14 30h116M25 21h2m7 0h2m7 0h2" />
      <path data-detail="hero" d="M26 43h92v42H26zM36 55h42m-42 10h28" />
      <path
        data-detail="support"
        className="pricing-graphic-accent"
        d="M26 98h58v20H26z"
      />
    </>
  );
}
function StarterScene() {
  return (
    <>
      <rect
        data-detail="shell"
        x="14"
        y="12"
        width="116"
        height="120"
        rx="10"
      />
      <path data-detail="chrome" d="M14 30h116M25 21h2m7 0h2m7 0h2" />
      <path data-detail="hero" d="M26 42h92v32H26zM36 52h42m-42 9h29" />
      <path
        data-detail="section-one"
        className="pricing-graphic-accent"
        d="M26 84h42v19H26z"
      />
      <path
        data-detail="section-two"
        className="pricing-graphic-accent"
        d="M76 84h42v19H76z"
      />
      <path
        data-detail="section-three"
        className="pricing-graphic-depth"
        d="M26 112h64"
      />
      <path
        data-detail="contact"
        className="pricing-graphic-depth"
        d="M99 109h19v10H99z"
      />
    </>
  );
}
function GrowthScene() {
  return (
    <>
      <rect
        data-detail="shell"
        x="14"
        y="12"
        width="116"
        height="120"
        rx="10"
      />
      <path data-detail="chrome" d="M14 30h116M25 21h2m7 0h2m7 0h2" />
      <path data-detail="hero" d="M26 42h58v30H26zM34 51h30m-30 9h21" />
      <path
        data-detail="feature-one"
        className="pricing-graphic-accent"
        d="M92 42h26v13H92z"
      />
      <path
        data-detail="feature-two"
        className="pricing-graphic-accent"
        d="M92 61h26v11H92z"
      />
      <path data-detail="section-one" d="M26 82h27v20H26z" />
      <path data-detail="section-two" d="M58 82h27v20H58z" />
      <path data-detail="section-three" d="M90 82h28v20H90z" />
      <path
        data-detail="depth-one"
        className="pricing-graphic-depth"
        d="M26 112h39"
      />
      <path
        data-detail="depth-two"
        className="pricing-graphic-depth"
        d="M72 112h23"
      />
      <path
        data-detail="contact"
        className="pricing-graphic-accent"
        d="M102 108h16v11h-16z"
      />
    </>
  );
}

export default function PricingPackageGraphic({ tier }: Props) {
  return (
    <div
      className="pricing-package-graphic"
      data-pricing-graphic={tier}
      aria-hidden="true"
    >
      <svg viewBox="0 0 144 144" focusable="false">
        {tier === "foundation" && <FoundationScene />}
        {tier === "starter" && <StarterScene />}
        {tier === "growth" && <GrowthScene />}
      </svg>
    </div>
  );
}

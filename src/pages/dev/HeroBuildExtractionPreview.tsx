import { Check } from "lucide-react";
import { BuildExtractionHero } from "../../components/ui/BuildExtractionHero";

const HEADLINE = "Your Web Designer of Choice in Seychelles";
const SUBTITLE = "Built with you, in Seychelles — made custom for your business, not a template.";

export default function HeroBuildExtractionPreview() {
  return (
    <div className="hbe-preview-page">
      <BuildExtractionHero
        context="preview"
        kicker="Designed and built in Seychelles"
        headline={HEADLINE}
        subtitle={SUBTITLE}
        tags={[
          { text: "Custom code", icon: <Check /> },
          { text: "Built in Seychelles", icon: <Check /> },
          { text: "Mobile-ready", icon: <Check /> },
        ]}
        buttons={{
          primary: { text: "Request a free consult", link: "/contact" },
          secondary: { text: "See our work", link: "/work" },
        }}
      />
    </div>
  );
}

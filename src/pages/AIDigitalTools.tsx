import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import Seo from "../components/Seo";
import Card from "../components/Card";
import { ShimmerButton } from "../components/ui/shimmer-button";
import InsightsHero from "../components/InsightsHero";
import MenuVertical from "../components/ui/menu-vertical";

const technologyCards = [
  {
    title: "AI Chatbots for Customer Communication",
    text: "AI-powered chatbots can answer common questions, guide visitors, and support customer communication outside normal working hours. They can help with booking enquiries, service questions, and basic support requests.",
  },
  {
    title: "Automation Tools",
    text: "Automation tools can streamline repetitive tasks like confirmations, follow-ups, and information routing. This can reduce workload and help teams focus on customer-facing work.",
  },
  {
    title: "Understanding Customers Through Data",
    text: "Digital analytics can help businesses understand customer behaviour, popular services, and content performance. Better insights support better decisions.",
  },
  {
    title: "AI Tools for Content and Communication",
    text: "AI-assisted tools can support drafting, translation, and idea generation. They should support human judgement, not replace it.",
  },
];

export default function AIDigitalTools() {
  const insightSectionLinks = [
    { id: "awareness", label: "Awareness" },
    { id: "future-trends", label: "Future Trends" },
    { id: "key-technologies", label: "Technologies" },
    { id: "current-focus", label: "Current Focus" },
    { id: "insights-hub", label: "Insights Hub" },
  ] as const;
  const [activeSection, setActiveSection] = useState<string>("awareness");

  const jumpToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const offset = (header?.getBoundingClientRect().height ?? 88) + 14;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.history.replaceState(null, "", `#${sectionId}`);
    window.scrollTo({ top, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const nodes = insightSectionLinks
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Seo
        title="Artificial Intelligence & Digital Tools for Businesses in Seychelles"
        description="Learn how artificial intelligence, automation, and digital tools are beginning to shape businesses in Seychelles. Horizon Digital shares insights into emerging technologies and how they may benefit local companies."
        path="/ai-digital-tools"
        keywords="AI Seychelles, Artificial Intelligence Seychelles, digital tools Seychelles, automation for small businesses Seychelles, future of technology Seychelles, AI for small business"
      />

      <InsightsHero
        eyebrow="Staying informed"
        title="Plain talk about AI and digital tools"
        description="We cut through the noise so you can understand what's worth paying attention to — and what can wait."
        actions={
          <Link to="/insights">
            <ShimmerButton
              shimmerColor="rgba(0, 229, 255, 0.65)"
              shimmerDuration="4.2s"
              background="#00E5FF"
              className="px-6 py-2.5 text-sm font-semibold text-black"
            >
              Explore Digital Insights
            </ShimmerButton>
          </Link>
        }
      />

      <div className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="pointer-events-auto">
          <MenuVertical
            menuItems={insightSectionLinks.map((section) => ({ id: section.id, label: section.label }))}
            activeId={activeSection}
            onSelect={jumpToSection}
            color="var(--accent)"
          />
        </div>
      </div>

      <Section
        id="awareness"
        eyebrow="What's changing"
        title="A simple introduction to the tools everyone's talking about"
        description="Around the world, businesses are beginning to use AI and digital tools to work more efficiently and better understand their customers."
      >
        <p className="mx-auto max-w-4xl text-center text-sm text-text-muted">
          While many of these technologies are still emerging in Seychelles, they are likely to play
          an increasing role in the future of business. At Horizon Digital, we follow these
          developments closely and help businesses understand what these technologies are and how
          they may be used.
        </p>
      </Section>

      <Section
        id="future-trends"
        eyebrow="Worth keeping an eye on"
        title="The changes coming — and what they might mean for you"
        description="Awareness and understanding are practical first steps toward future adoption."
      >
        <div className="section-band section-band-medium relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-8 text-center">
            <p className="max-w-4xl text-sm leading-7 text-text">
              Digital technology continues to evolve rapidly. Artificial intelligence, automation
              tools, and data analysis are already transforming industries globally. For businesses
              in Seychelles, these technologies may create opportunities to improve efficiency,
              understand customers, and simplify daily operations. Horizon Digital follows
              developments in these areas to help local businesses stay informed.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="key-technologies"
        eyebrow="The tools in plain English"
        title="What these tools actually do"
        description="No degree required. Just honest, useful context."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {technologyCards.map((card) => (
            <Card key={card.title} className="no-scroll-glow">
              <h3 className="text-lg font-semibold text-accent-2">{card.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{card.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="current-focus" eyebrow="Honest about what we do" title="What we focus on right now" description="Clear scope and transparency.">
        <Card>
          <p className="text-sm text-text-muted">
            Horizon Digital currently focuses on building clear, fast, and professional websites for
            businesses in Seychelles. While we closely follow developments in artificial
            intelligence, automation, and emerging digital technologies, we do not currently offer
            AI development or automation services.
          </p>
        </Card>
      </Section>

      <Section
        id="insights-hub"
        eyebrow="Digital Insights"
        title="Keep up with us"
        description="We share what we're learning — so you don't have to figure it out alone."
      >
        <Card className="flex flex-col items-center text-center">
          <p className="text-sm text-text-muted">
            We regularly share insights about websites, digital tools, and emerging technologies
            that may shape the future of businesses in Seychelles.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/insights">
              <ShimmerButton
                shimmerColor="rgba(0, 229, 255, 0.65)"
                shimmerDuration="4.2s"
                background="#00E5FF"
                className="px-6 py-2.5 text-sm font-semibold text-black"
              >
                Read Our Insights
              </ShimmerButton>
            </Link>
          </div>
        </Card>
      </Section>
    </div>
  );
}

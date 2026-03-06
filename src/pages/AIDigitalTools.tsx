import { Link } from "react-router-dom";
import Section from "../components/Section";
import Seo from "../components/Seo";
import Card from "../components/Card";
import { ShimmerButton } from "../components/ui/shimmer-button";
import InsightsHero from "../components/InsightsHero";

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
  return (
    <div>
      <Seo
        title="Artificial Intelligence & Digital Tools for Businesses in Seychelles"
        description="Learn how artificial intelligence, automation, and digital tools are beginning to shape businesses in Seychelles. Horizon Digital shares insights into emerging technologies and how they may benefit local companies."
        path="/ai-digital-tools"
        keywords="AI Seychelles, Artificial Intelligence Seychelles, digital tools Seychelles, automation for small businesses Seychelles, future of technology Seychelles, AI for small business"
      />

      <InsightsHero
        eyebrow="Digital Insights"
        title="Artificial Intelligence and Digital Tools for Seychelles Businesses"
        description="A practical, friendly guide to emerging digital tools, with local use cases that help business owners understand what is useful now and what to watch next."
        actions={
          <Link to="/insights">
            <ShimmerButton
              shimmerColor="rgba(70, 198, 232, 0.65)"
              shimmerDuration="4.2s"
              background="var(--accent)"
              className="px-6 py-2.5 text-sm font-semibold text-[#071523]"
            >
              Explore Digital Insights
            </ShimmerButton>
          </Link>
        }
      />

      <Section
        id="awareness"
        eyebrow="Digital Awareness"
        title="Understanding Artificial Intelligence and Digital Tools for Businesses"
        description="Around the world, businesses are beginning to use artificial intelligence, automation, and digital tools to work more efficiently and better understand their customers."
      >
        <p className="max-w-4xl text-sm text-text-muted">
          While many of these technologies are still emerging in Seychelles, they are likely to play
          an increasing role in the future of business. At Horizon Digital, we follow these
          developments closely and help businesses understand what these technologies are and how
          they may be used.
        </p>
      </Section>

      <Section
        id="future-trends"
        eyebrow="Why this matters"
        title="The Future of Digital Technology in Seychelles"
        description="Awareness and understanding are practical first steps toward future adoption."
      >
        <div className="section-band section-band-medium relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-8">
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
        eyebrow="Key technologies"
        title="Digital Technologies Businesses Should Know About"
        description="Practical explanations for non-technical business owners."
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

      <Section id="current-focus" eyebrow="Important" title="Our Current Focus" description="Clear scope and transparency.">
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
        title="Stay informed"
        description="Read practical updates about emerging digital tools."
      >
        <Card>
          <p className="text-sm text-text-muted">
            We regularly share insights about websites, digital tools, and emerging technologies
            that may shape the future of businesses in Seychelles.
          </p>
          <div className="mt-6">
            <Link to="/insights">
              <ShimmerButton
                shimmerColor="rgba(70, 198, 232, 0.65)"
                shimmerDuration="4.2s"
                background="var(--accent)"
                className="px-6 py-2.5 text-sm font-semibold text-[#071523]"
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

import heroDesktop from "../assets/hero/hero-desktop-tech.png";
import heroDesktopWebp from "../assets/hero/hero-desktop-tech.webp";
import businessAutomationImage from "../assets/insights/business automation.png";
import aiToolsImage from "../assets/insights/ai tools.png";
import dataAnalysisImage from "../assets/insights/data analysis.png";
import chatbotImage from "../assets/insights/chatbot.png";

export type InsightArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string;
  image: string;
  imageWebp?: string;
  sections: Array<{
    heading: string;
    body: string[];
    subheading: string;
    subBody: string;
  }>;
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "ai-small-business-seychelles",
    title: "What AI means for small businesses in Seychelles",
    seoTitle: "What AI Means for Small Businesses in Seychelles",
    metaDescription:
      "A practical look at how AI awareness can help small businesses in Seychelles make better digital decisions without complex jargon.",
    excerpt:
      "Artificial intelligence can sound technical, but the first step for most businesses is simple awareness and practical understanding.",
    keywords:
      "AI Seychelles, Artificial Intelligence Seychelles, AI for small businesses Seychelles",
    image: aiToolsImage,
    sections: [
      {
        heading: "AI is already inside many tools businesses use",
        body: [
          "Small businesses in Seychelles are already seeing AI features in email platforms, booking software, social media tools, and support systems.",
          "That does not mean every business needs complex AI systems. It means owners can make better decisions by understanding what these tools do well and where human judgment is still needed.",
        ],
        subheading: "Think in terms of business outcomes",
        subBody:
          "A guesthouse may use AI-assisted drafting for listing descriptions, while a small retail shop may use AI to improve product copy. The value comes from faster, clearer communication, not from using AI for its own sake.",
      },
      {
        heading: "Local context matters when adopting AI",
        body: [
          "Seychelles businesses often run with small teams, so time and attention are limited. Tools that reduce repetitive writing, improve response consistency, or organize customer requests can have practical impact.",
          "It is also important to keep brand tone local and clear. AI output should always be reviewed so it reflects the business voice and avoids generic messaging.",
        ],
        subheading: "Start small and review regularly",
        subBody:
          "A practical first step is to choose one recurring task, test AI support for two to four weeks, and measure whether it improves speed, quality, or customer follow-up. Simple testing beats large, risky rollouts.",
      },
    ],
  },
  {
    slug: "automation-save-time-businesses",
    title: "How automation may help businesses save time",
    seoTitle: "How Automation Tools Help Businesses Save Time in Seychelles",
    metaDescription:
      "Learn where automation tools can reduce repetitive tasks and support smoother operations for local businesses in Seychelles.",
    excerpt:
      "Automation is often most useful for routine tasks that repeat every day, week, or month.",
    keywords: "automation tools for businesses, automation for small businesses Seychelles",
    image: businessAutomationImage,
    sections: [
      {
        heading: "Automation helps small teams stay consistent",
        body: [
          "For many Seychelles businesses, the biggest benefit of automation is consistency. Routine tasks happen on time even during busy periods or staff shortages.",
          "Examples include enquiry confirmations, appointment reminders, follow-up messages, and sorting website leads into clear categories.",
        ],
        subheading: "Use cases that are easy to start",
        subBody:
          "A salon can automate booking confirmations, a tour operator can send pre-trip checklists, and a property rental business can automate initial enquiry responses before human follow-up.",
      },
      {
        heading: "Good automation keeps people in control",
        body: [
          "Automation should support staff, not replace accountability. Important conversations, custom pricing, and exceptions still need human review.",
          "When workflows are clearly defined, automation reduces back-and-forth and gives teams more time for service quality and sales.",
        ],
        subheading: "Build one workflow, then expand",
        subBody:
          "Start with a single high-volume task, document the steps, and track outcomes like response time and completed enquiries. Once stable, add the next workflow. This keeps risk low and results measurable.",
      },
    ],
  },
  {
    slug: "why-data-analytics-matter",
    title: "Why data and analytics matter for modern businesses",
    seoTitle: "Why Data and Analytics Matter for Businesses in Seychelles",
    metaDescription:
      "Understand how website analytics and customer behaviour data can guide better digital decisions for businesses in Seychelles.",
    excerpt:
      "Data helps business owners replace guesses with clearer evidence when planning marketing and website improvements.",
    keywords: "digital transformation Seychelles, digital tools Seychelles, data analytics Seychelles",
    image: dataAnalysisImage,
    sections: [
      {
        heading: "Data shows what customers actually do online",
        body: [
          "Analytics can show which pages attract traffic, where visitors leave, and which content leads to calls, messages, or form submissions.",
          "For businesses in Seychelles, this helps avoid guesswork and prioritize improvements that support real customer behaviour.",
        ],
        subheading: "Metrics that matter for local businesses",
        subBody:
          "A guesthouse might track which room pages generate booking enquiries, while a service business may track whether visitors reach the contact page after viewing key services.",
      },
      {
        heading: "Analytics can improve marketing spend",
        body: [
          "Without data, marketing budgets are often spread too widely. With data, businesses can focus on channels and pages that generate quality leads.",
          "Even simple monthly reporting can reveal seasonal patterns, strong keywords, and underperforming landing pages.",
        ],
        subheading: "Review monthly, act quarterly",
        subBody:
          "A practical rhythm is to review performance every month, then make larger content or design changes every quarter. This avoids overreacting to short-term fluctuations while keeping steady progress.",
      },
    ],
  },
  {
    slug: "digital-trends-small-businesses",
    title: "Digital trends affecting small businesses",
    seoTitle: "Digital Trends Affecting Small Businesses in Seychelles",
    metaDescription:
      "A clear summary of digital trends that may shape how Seychelles businesses attract customers and manage operations.",
    excerpt:
      "Digital change is gradual for most businesses, but understanding direction early helps with better long-term planning.",
    keywords: "future of technology Seychelles, digital transformation Seychelles, AI Seychelles",
    image: heroDesktop,
    imageWebp: heroDesktopWebp,
    sections: [
      {
        heading: "Digital expectations continue to rise",
        body: [
          "Customers increasingly expect quick answers, mobile-friendly pages, and clear service details before they make contact.",
          "In Seychelles, where many customers discover businesses through search and social media, clarity and speed can strongly influence trust.",
        ],
        subheading: "Useful trends to watch",
        subBody:
          "Practical trends include better local SEO structure, lightweight websites that load quickly on mobile networks, and clearer enquiry journeys with fewer steps.",
      },
      {
        heading: "Different sectors have different opportunities",
        body: [
          "Hospitality businesses may benefit most from stronger booking paths and multilingual content support. Retail businesses may benefit from product clarity and faster customer messaging.",
          "Professional services can benefit from clearer trust signals, educational content, and better lead qualification before consultations.",
        ],
        subheading: "Adopt trends with a clear priority",
        subBody:
          "A simple priority framework helps: improve what affects customer trust first, then what improves internal efficiency, then test new tools. This keeps digital upgrades focused and sustainable.",
      },
    ],
  },
  {
    slug: "understanding-ai-chatbots",
    title: "Understanding AI chatbots",
    seoTitle: "Understanding AI Chatbots for Businesses in Seychelles",
    metaDescription:
      "Learn what AI chatbots can and cannot do, and why clarity and safeguards matter when using chatbot tools for business websites.",
    excerpt:
      "AI chatbots can improve response speed and customer guidance, but they should be designed with clear limits and reliable information.",
    keywords: "AI chatbots Seychelles, Artificial Intelligence Seychelles, AI for small business",
    image: chatbotImage,
    sections: [
      {
        heading: "Chatbots work best for structured, repeat questions",
        body: [
          "Chatbots are useful for handling frequent questions like opening hours, service categories, location details, or first-step booking guidance.",
          "For Seychelles businesses, this can improve response speed during evenings and weekends when teams are offline.",
        ],
        subheading: "Where chatbots add practical value",
        subBody:
          "A tour operator can use a chatbot to explain standard package options, while a clinic can use one to route visitors to the correct enquiry form. The strongest use cases are clear, repetitive, and easy to verify.",
      },
      {
        heading: "Trust depends on clear limits",
        body: [
          "A chatbot should clearly state what it can answer and when a human team member should take over. This protects customer confidence and reduces confusion.",
          "Response quality depends on source information. If business details are outdated, chatbot answers will also be outdated.",
        ],
        subheading: "Design for escalation and reliability",
        subBody:
          "Good chatbot setups include a clear handoff path to WhatsApp, phone, or email, plus regular content reviews. Reliable short answers are better than long uncertain responses.",
      },
    ],
  },
];

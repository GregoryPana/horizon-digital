import heroDesktop from "../assets/hero/hero-desktop-tech-v2.png";
import heroDesktopWebp from "../assets/hero/hero-desktop-tech-v2.webp";
import businessAutomationImage from "../assets/insights/business-automation-v3.png";
import aiToolsImage from "../assets/insights/ai-seychelles-v3.png";
import dataAnalysisImage from "../assets/insights/data analysis.webp";
import chatbotImage from "../assets/insights/chatbot.webp";
// import businessAutomationWebp from "../assets/insights/business automation.webp";
// import aiToolsWebp from "../assets/insights/ai tools.webp";
import trends2026Image from "../assets/insights/trends-2026.png";
import roiImage from "../assets/insights/website-roi.png";
import securityImage from "../assets/insights/cybersecurity.png";

export type InsightArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string;
  image: string;
  imageWebp?: string;
  datePublished: string;
  dateModified: string;
  sections: Array<{
    heading: string;
    body: string[];
    subheading: string;
    subBody: string;
  }>;
};

export const technologyTopics = [
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

export const insightArticles: InsightArticle[] = [
  {
    slug: "ai-small-business-seychelles",
    title: "What AI means for small businesses in Seychelles",
    seoTitle: "What AI Means for Small Businesses in Seychelles",
    datePublished: "2025-03-01",
    dateModified: "2025-03-01",
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
    datePublished: "2025-03-01",
    dateModified: "2025-03-01",
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
    datePublished: "2025-03-01",
    dateModified: "2025-03-01",
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
    datePublished: "2025-03-15",
    dateModified: "2025-03-15",
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
    datePublished: "2025-03-15",
    dateModified: "2025-03-15",
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
  {
    slug: "web-design-trends-2026-seychelles",
    title: "Web Design Trends for 2026: A Seychelles Perspective",
    seoTitle: "Web Design Trends 2026 Seychelles | Horizon Digital",
    datePublished: "2025-04-10",
    dateModified: "2025-04-10",
    metaDescription: "Explore the emerging web design trends shaped for the Seychelles business landscape in 2026, from glassmorphism to AI-driven personalization.",
    excerpt: "2026 is set to be a transformative year for digital interfaces in Seychelles, blending global aesthetics with local utility.",
    keywords: "web design trends 2026 seychelles, modern web design mahe, digital trends victoria",
    image: trends2026Image,
    sections: [
      {
        heading: "Glassmorphism and Depth in 2026",
        body: [
          "We're seeing a significant shift towards glassmorphism—using frosted-glass effects to create layers and depth. This aesthetic mirrors the clarity and vibrancy of the Seychelles environment.",
          "For local brands, this means interfaces that feel light, airy, and modern, moving away from flat, heavy designs of the past."
        ],
        subheading: "Visual Clarity as a Trust Signal",
        subBody: "Clean, high-depth interfaces aren't just about looks; they signal professional maturity and technical investment to your potential clients."
      },
      {
        heading: "AI-Driven Personalization",
        body: [
          "Websites are becoming more than static brochures; they are evolving into responsive entities that adapt to user behaviour in real-time.",
          "In 2026, we expect to see more Seychelles tourism and service sites using AI to tailor content based on whether a visitor is a returning local client or an international traveler."
        ],
        subheading: "Dynamic User Journeys",
        subBody: "The goal is to provide the most relevant information at the exact right time, reducing the steps needed for a visitor to become a customer."
      }
    ],
  },
  {
    slug: "maximizing-website-roi-seychelles",
    title: "Maximizing ROI: How a Professional Website Pays for Itself",
    seoTitle: "Maximizing Website ROI for Seychelles Businesses | Horizon Digital",
    datePublished: "2025-04-12",
    dateModified: "2025-04-12",
    metaDescription: "Understand the financial impact of a high-performance website. Learn how Seychelles businesses can track and maximize their digital return on investment.",
    excerpt: "A website is an investment, not an expense. When built correctly, it serves as your hardest-working sales representative.",
    keywords: "website ROI seychelles, business growth digital seychelles, website investment local business",
    image: roiImage,
    sections: [
      {
        heading: "Lowering Client Acquisition Costs",
        body: [
          "A high-ranking website reduces your reliance on paid advertising. By capturing organic search traffic, you lower the cost of acquiring every new lead.",
          "For Seychelles businesses, this is particularly powerful in the tourism and professional services sectors where competition for visibility is high."
        ],
        subheading: "The Power of Organic Reach",
        subBody: "A site that ranks for 'Accountant in Victoria' or 'Praslin Guesthouse' provides a continuous stream of leads without recurring ad spend."
      },
      {
        heading: "24/7 Automated Sales",
        body: [
          "Your website never sleeps. It handles initial enquiries, showcases your best work, and qualifies leads while you are offline.",
          "By automating the first 20% of the sales conversation, your team can focus on closing deals rather than answering repetitive questions."
        ],
        subheading: "Efficiency as a Growth Driver",
        subBody: "Time saved through automation is time redirected toward service quality and business strategy."
      }
    ],
  },
  {
    slug: "cybersecurity-small-business-seychelles",
    title: "Cybersecurity for Small Businesses: Keeping Your Customers Safe",
    seoTitle: "Cybersecurity Tips for Small Businesses in Seychelles | Horizon Digital",
    datePublished: "2025-04-15",
    dateModified: "2025-04-15",
    metaDescription: "Practical cybersecurity advice for Seychelles small business owners. Learn how to protect your customer data and maintain digital trust.",
    excerpt: "In an increasingly connected world, protecting your digital assets and customer data is no longer optional—it's essential.",
    keywords: "cybersecurity seychelles, small business security mahe, customer data protection seychelles",
    image: securityImage,
    sections: [
      {
        heading: "Security is the Foundation of Trust",
        body: [
          "In professional services, your clients trust you with sensitive information. A security breach doesn't just lose data; it destroys your reputation.",
          "Implementing SSL certificates, secure hosting, and encrypted contact forms are the minimum requirements for any serious Seychelles business."
        ],
        subheading: "Protecting Your Reputation",
        subBody: "Customers are more likely to buy from businesses that demonstrate a clear commitment to their data privacy and security."
      },
      {
        heading: "Simple Steps for Better Defense",
        body: [
          "You don't need a multi-million dollar budget to stay secure. Regular software updates, strong password policies, and multi-factor authentication provide significant protection.",
          "Educating your team on phishing and basic digital hygiene is often the most effective defense against common online threats."
        ],
        subheading: "Building a Culture of Security",
        subBody: "Digital security is a continuous process of awareness and improvement, not a one-time technical fix."
      }
    ],
  },
];

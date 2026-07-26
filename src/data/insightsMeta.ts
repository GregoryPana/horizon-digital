// SEO-relevant insight article fields only — no binary asset imports.
// This module must stay bundler-agnostic: it is imported by both the Vite
// client build (via ./insights.ts) and the Cloudflare Worker (via
// ../config/routes.ts), which has no loader configured for image files.
export type InsightArticleMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string;
  datePublished: string;
  dateModified: string;
};

export const insightArticlesMeta: InsightArticleMeta[] = [
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
  },
  {
    slug: "web-design-trends-2026-seychelles",
    title: "Web Design Trends for 2026: A Seychelles Perspective",
    seoTitle: "Web Design Trends 2026 Seychelles | Horizon Digital",
    datePublished: "2025-04-10",
    dateModified: "2025-04-10",
    metaDescription:
      "Explore the emerging web design trends shaped for the Seychelles business landscape in 2026, from glassmorphism to AI-driven personalization.",
    excerpt:
      "2026 is set to be a transformative year for digital interfaces in Seychelles, blending global aesthetics with local utility.",
    keywords: "web design trends 2026 seychelles, modern web design mahe, digital trends victoria",
  },
  {
    slug: "maximizing-website-roi-seychelles",
    title: "Maximizing ROI: How a Professional Website Pays for Itself",
    seoTitle: "Maximizing Website ROI for Seychelles Businesses | Horizon Digital",
    datePublished: "2025-04-12",
    dateModified: "2025-04-12",
    metaDescription:
      "Understand the financial impact of a high-performance website. Learn how Seychelles businesses can track and maximize their digital return on investment.",
    excerpt:
      "A website is an investment, not an expense. When built correctly, it serves as your hardest-working sales representative.",
    keywords: "website ROI seychelles, business growth digital seychelles, website investment local business",
  },
  {
    slug: "cybersecurity-small-business-seychelles",
    title: "Cybersecurity for Small Businesses: Keeping Your Customers Safe",
    seoTitle: "Cybersecurity Tips for Small Businesses in Seychelles | Horizon Digital",
    datePublished: "2025-04-15",
    dateModified: "2025-04-15",
    metaDescription:
      "Practical cybersecurity advice for Seychelles small business owners. Learn how to protect your customer data and maintain digital trust.",
    excerpt:
      "In an increasingly connected world, protecting your digital assets and customer data is no longer optional—it's essential.",
    keywords: "cybersecurity seychelles, small business security mahe, customer data protection seychelles",
  },
];

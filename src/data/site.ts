export const siteConfig = {
  name: "Horizon Digital",
  tagline: "Empowering Your Digital Horizon",
  taglineLong: "Empowering Your Digital Horizon - one website at a time",
  email: "horizondigital.sey@gmail.com",
  phone: "+248 2524490",
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Process", path: "/process" },
  { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const trustItems = ["Fast", "Mobile-ready", "Easy to find", "Clear calls-to-action"];

export const services = [
  {
    title: "Website build",
    description: "Structured planning, custom design, and a clean launch.",
  },
  {
    title: "Design refresh",
    description: "Modernise your site without losing what already works.",
  },
  {
    title: "Mobile-friendly layout",
    description: "Clear and easy to use on every screen size.",
  },
  {
    title: "Speed and stability",
    description: "Fast load times and a smooth experience for visitors.",
  },
  {
    title: "Search-ready setup",
    description: "Basic on-page setup so people can find you in search.",
  },
  {
    title: "Clear customer paths",
    description: "Guides visitors to contact you without confusion.",
  },
];

export const addOns = [
  "Blog or news pages",
  "Booking or enquiry systems",
  "Basic analytics setup",
  "Content transfer from an old site",
];

export const serviceLayers = [
  {
    title: "Website build",
    description: "A one-off project with clear planning, design, and launch.",
  },
  {
    title: "Managed hosting",
    description: "Required if we host the site. Covers security, backups, and monitoring.",
  },
  {
    title: "Ongoing support",
    description: "Optional monthly support for updates and improvements.",
  },
];

export const buildIncludes = [
  "Discovery and planning session",
  "Structured site planning",
  "Custom design tailored to the business",
  "Mobile-friendly layout",
  "Fast, secure build",
  "Basic on-page SEO setup",
  "Contact forms and essential integrations",
  "30-day post-launch stabilisation",
];

export const buildNotes = [
  "Hosting is not included in build packages.",
  "After 30 days, updates move to support or ad-hoc work.",
];

export const workItems = [
  {
    label: "Guesthouse",
    title: "Concept Demo",
    outcome: "Simple booking-friendly layout",
  },
  {
    label: "Restaurant",
    title: "Concept Demo",
    outcome: "Menu-first layout with clear contact buttons",
  },
  {
    label: "Wellness Studio",
    title: "Concept Demo",
    outcome: "Clear services and easy inquiry path",
  },
  {
    label: "Local Services",
    title: "Concept Demo",
    outcome: "Trust-building homepage with clear next steps",
  },
  {
    label: "Cafe",
    title: "Concept Demo",
    outcome: "Mobile-first story with location details",
  },
  {
    label: "Consulting",
    title: "Concept Demo",
    outcome: "Clear contact flow for new enquiries",
  },
];

export const processSteps = [
  {
    title: "Discovery & goals",
    description: "Clarify your goals, audience, and measurable outcomes.",
  },
  {
    title: "Design & prototype",
    description: "Design structure, visual direction, and conversion flow.",
  },
  {
    title: "Build & launch",
    description: "Develop, optimize, and launch with confidence.",
  },
  {
    title: "Support & improvement",
    description: "Continuous improvements and reliable long-term support.",
  },
];

export const pricingTiers = [
  {
    title: "Starter",
    price: "From £2,500",
    description: "Best for small businesses starting out.",
    features: [
      "Up to 5 pages",
      "Custom homepage design",
      "Internal page layout structure",
      "Contact form setup",
      "Basic SEO structure",
      "2 structured revision rounds",
      "30-day stabilisation",
    ],
    exclusions: ["Hosting", "Ongoing updates beyond stabilisation", "Advanced integrations"],
  },
  {
    title: "Growth",
    price: "From £4,000",
    description: "For growing businesses needing more content and structure.",
    badge: "Most popular",
    features: [
      "Up to 10 pages",
      "Custom homepage and internal layouts",
      "Clear service page structure",
      "Blog/news capability (if required)",
      "Basic analytics setup",
      "Enhanced SEO structure",
      "2-3 revision rounds",
      "30-day stabilisation",
    ],
    exclusions: ["Hosting", "Ongoing feature development", "Complex integrations"],
  },
  {
    title: "Custom",
    price: "From £7,000",
    description: "For businesses requiring more advanced functionality.",
    features: [
      "Custom page count (scoped per project)",
      "Advanced layouts",
      "Custom functionality (scoped clearly)",
      "Booking systems or integrations (where agreed)",
      "Structured content planning",
      "Expanded SEO configuration",
      "30-day stabilisation",
    ],
    exclusions: ["Hosting", "Ongoing feature development", "Large system integrations"],
  },
];

export const hostingPlan = {
  title: "Managed hosting",
  price: "£29 per month / £320 per year",
  description: "Required if we host your website.",
  features: [
    "Secure hosting environment",
    "SSL configuration",
    "Daily backups",
    "Security updates",
    "Core system updates",
    "Uptime monitoring",
    "Basic technical maintenance",
  ],
  exclusions: ["Content updates", "New feature development", "Redesign work"],
};

export const supportPlans = [
  {
    title: "Digital Care Plan",
    price: "£149 per month",
    description: "For businesses that want peace of mind.",
    features: [
      "Minor content updates (up to 1 hour per month)",
      "Ongoing system updates",
      "Monthly website health check",
      "Priority email support",
    ],
    note: "Unused time does not roll over.",
  },
  {
    title: "Growth Support Plan",
    price: "£299 per month",
    description: "For businesses actively improving and expanding.",
    features: [
      "Up to 3 hours of updates or improvements per month",
      "Design refinements",
      "New page additions (within allocated time)",
      "Advice and guidance",
      "Quarterly performance review",
    ],
    note: "Unused time does not roll over.",
  },
];

export const adHocRate = {
  title: "Ad-hoc work",
  price: "£85 per hour",
  description: "For clients not on a support plan. Scoped per task where needed.",
  note: "Response times are not prioritised without a support plan.",
};

export const stabilisationPeriod = {
  title: "30-day stabilisation",
  description: "Included with every build after launch.",
  covers: ["Bug fixes", "Minor content corrections", "Small adjustments"],
  exclusions: ["New features", "New pages", "Design changes", "Structural rebuilds"],
};

export const faqs = [
  {
    question: "What is a typical timeline?",
    answer: "Most projects launch in 3-6 weeks, depending on scope and content readiness.",
  },
  {
    question: "Is pricing flexible?",
    answer: "Yes. We adjust pricing based on the size and needs of your site.",
  },
  {
    question: "Do I own the website?",
    answer: "Absolutely. You own the final codebase and assets once the project closes.",
  },
  {
    question: "Can you handle updates after launch?",
    answer: "Yes. Ongoing support is available if you want it.",
  },
  {
    question: "How many revisions are included?",
    answer: "Each project includes clear revision rounds tied to milestones.",
  },
];

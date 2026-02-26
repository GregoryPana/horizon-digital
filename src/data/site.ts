import guesthousePreview from "../assets/work/drake-seaside/drake-seaside 2.png";
import guesthousePreviewWebp from "../assets/work/drake-seaside/drake-seaside 2.webp";
import guesthousePreviewWebp800 from "../assets/work/drake-seaside/drake-seaside 2-800.webp";
import ogImage from "../assets/logo/Horizon Digital crop.jpg";
import cafePreview from "../assets/work/demos/cafe.jpg";
import cafePreviewWebp from "../assets/work/demos/cafe.webp";
import cafePreviewWebp800 from "../assets/work/demos/cafe-800.webp";
import consultingPreview from "../assets/work/demos/consulting.jpg";
import consultingPreviewWebp from "../assets/work/demos/consulting.webp";
import consultingPreviewWebp800 from "../assets/work/demos/consulting-800.webp";
import seykelzPreview from "../assets/work/seykelz/seykelz.png";
import seykelzPreviewWebp from "../assets/work/seykelz/seykelz.webp";
import seykelzPreviewWebp800 from "../assets/work/seykelz/seykelz-800.webp";

export const siteConfig = {
  name: "Horizon Digital",
  tagline: "Empowering Your Digital Horizon",
  taglineLong: "Empowering Your Digital Horizon - one website at a time",
  email: "horizondigital.sey@gmail.com",
  phone: "+248 2604525",
  whatsappUrl: "https://wa.me/2482604525",
  url: "https://horizondigitalsey.com",
  location: "Seychelles",
  ogImage,
};

export const emailTemplate = {
  subject: "New Project Inquiry - [Business Name]",
  body: `Hi Horizon Digital,

 I'd like to discuss a new website project.


 Business name:
 Industry:
 Current website (if any):


 Main goal for the website:
 (e.g. more bookings, more inquiries, clearer brand presence)


 Estimated timeline:
 (e.g. ASAP, 1-2 months, flexible)


 Anything else you'd like us to know:


 Looking forward to your reply.`,
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services & Pricing", path: "/services-pricing" },
  { label: "Our Work", path: "/work" },
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
  "Additional page",
  "Content writing support",
  "Structured booking / enquiry form",
  "Google Business Profile setup",
  "Website speed & performance audit",
  "Rush delivery",
];

export const projectSteps = [
  { title: "Discovery", description: "We learn your goals and needs." },
  { title: "Proposal & Deposit", description: "Clear scope and agreed milestones." },
  { title: "Design & Build", description: "We design and build your site." },
  { title: "Review & Launch", description: "Final review and go live." },
  { title: "30-Day Stabilisation", description: "We handle small fixes after launch." },
];

export const servicesPricingIntro = {
  title: "Services & Pricing",
  subtitle: "Custom-built websites for Seychelles businesses.",
  summary:
    "Clean, fast, professional websites with no templates, no hidden extras, and a limited number of projects each month for quality.",
};

export const foundationPackage = {
  title: "Foundation",
  price: "From SCR 7,500",
  description:
    "For businesses that need a simple, professional online presence using a structured Horizon Digital layout.",
  includes: [
    "Up to 3 pages",
    "Choice of predefined Horizon Digital layout",
    "Mobile-friendly design",
    "Contact form",
    "WhatsApp integration (if required)",
    "Google Maps",
    "1 structured revision round",
    "30-day post-launch support",
  ],
  paymentTerms: ["50% deposit", "50% before launch"],
  exclusions: [
    "Layout structure cannot be modified",
    "Design customisation is limited to colours, logo, and content",
  ],
};

export const starterPackage = {
  title: "Starter",
  price: "From SCR 12,500",
  description: "For small businesses needing a professional online presence.",
  includes: [
    "Up to 5 pages",
    "Custom design (not a template)",
    "Mobile-first layout",
    "Contact form",
    "WhatsApp integration (if required)",
    "Google Maps",
    "Social media integration",
    "Google Analytics setup",
    "2 revision rounds",
    "30-day post-launch support",
  ],
  paymentTerms: ["50% deposit", "50% on launch"],
};

export const growthPackage = {
  title: "Growth",
  price: "From SCR 25,000",
  description: "For established businesses needing more structure and flexibility.",
  includes: [
    "Up to 10-12 pages",
    "Expanded service structure",
    "Testimonials",
    "Team section (if required)",
    "Portfolio/gallery",
    "Multi-step enquiry form",
    "Google Business setup assistance",
    "Sitemap submission",
    "3 revision rounds",
    "60-day post-launch support",
  ],
  paymentTerms: ["40% deposit", "40% at design approval", "20% on launch"],
};

export const customPackage = {
  title: "Custom",
  description:
    "Scoped per project for advanced requirements and custom functionality.",
};

export const addOnItems = [
  { title: "Additional page", price: "SCR 2,500 per page" },
  { title: "Content writing support", price: "SCR 600 per page" },
  { title: "Structured booking / enquiry form", price: "SCR 2,000" },
  { title: "Google Business Profile setup", price: "SCR 2,200" },
  { title: "Website speed & performance audit", price: "SCR 3,000 - 5,000" },
  { title: "Rush delivery", price: "+40% (subject to availability)" },
];

export const hostingPlan = {
  title: "Managed hosting",
  price: "SCR 250 per month / SCR 2,500 per year",
  features: [
    "Secure website (SSL) and monitoring",
    "Monthly analytics report",
    "Backups",
  ],
  note: "For advanced builds, hosting charges may differ.",
};

export const stabilisationPlan = {
  title: "30-day stabilisation",
  covers: ["Bug fixes", "Minor corrections", "Small adjustments"],
  excludes: ["New features", "Redesigns"],
};

export const carePlans = [
  {
    title: "Basic Care",
    price: "SCR 1,200 - 2,000 per month",
    features: ["Security check", "Backup monitoring", "Minor updates", "Email support"],
    note: "Does not include structural changes or search optimisation.",
  },
  {
    title: "Growth Care",
    price: "SCR 3,000 - 4,500 per month",
    features: [
      "Up to 2 hours of structured updates",
      "Search visibility improvements",
      "Google presence review",
      "Performance optimisation",
      "Simple monthly summary",
    ],
  },
  {
    title: "Full Care",
    price: "SCR 6,000 - 10,000 per month",
    features: [
      "Up to 4 hours of improvements",
      "Ongoing search optimisation",
      "Content expansion support",
      "Monthly reporting",
      "Conversion improvement suggestions",
      "Priority scheduling",
    ],
  },
];

export const carePlanNotes = ["3-month minimum commitment", "Unused time does not roll over"];

export const trustStatement = [
  "Clear scope",
  "Transparent pricing",
  "Defined revisions",
  "Direct communication",
  "No hidden extras",
];

export const workItems = [
  {
    label: "Guesthouse",
    title: "Drake Seaside Apartments",
    outcome: "Redesign with new pages, updated content, faster load times, and higher click-through conversions.",
    image: guesthousePreview,
    imageWebp: guesthousePreviewWebp,
    imageWebp800: guesthousePreviewWebp800,
    url: "https://thedrake-seaside.com/",
  },
  {
    label: "Retail",
    title: "SeyKelz",
    outcome:
      "Foundation-tier website for a Seychelles toner cartridge store selling genuine and compatible supplies for HP, Epson, and Canon printers.",
    image: seykelzPreview,
    imageWebp: seykelzPreviewWebp,
    imageWebp800: seykelzPreviewWebp800,
    url: "https://sey-kelz.horizondigitalsey.com/",
  },
  {
    label: "Cafe",
    title: "Concept Demo",
    outcome: "Mobile-first story with location details",
    image: cafePreview,
    imageWebp: cafePreviewWebp,
    imageWebp800: cafePreviewWebp800,
  },
  {
    label: "Consulting",
    title: "Concept Demo",
    outcome: "Clear contact flow for new enquiries",
    image: consultingPreview,
    imageWebp: consultingPreviewWebp,
    imageWebp800: consultingPreviewWebp800,
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
    title: "Foundation",
    price: "From SCR 7,500",
    description:
      "For businesses that need a simple, professional online presence using a structured layout.",
    features: [
      "Up to 3 pages",
      "Choice of predefined Horizon Digital layout",
      "Mobile-friendly design",
      "Contact form",
      "WhatsApp integration (if required)",
      "Google Maps",
      "1 structured revision round",
      "30-day post-launch support",
    ],
    exclusions: [
      "Layout structure cannot be modified",
      "Design customisation is limited to colours, logo, and content",
    ],
  },
  {
    title: "Starter",
    price: "From SCR 12,500",
    description: "For small businesses needing a professional online presence.",
    badge: "Most popular",
    features: [
      "Up to 5 pages",
      "Custom design (not a template)",
      "Mobile-first layout",
      "Contact form",
      "WhatsApp integration (if required)",
      "Google Maps",
      "Social media integration",
      "Google Analytics setup",
      "2 revision rounds",
      "30-day post-launch support",
    ],
    exclusions: ["Hosting", "Ongoing updates beyond support period", "Advanced integrations"],
  },
  {
    title: "Growth",
    price: "From SCR 25,000",
    description: "For established businesses needing more structure and flexibility.",
    features: [
      "Up to 10-12 pages",
      "Expanded service structure",
      "Testimonials",
      "Team section (if required)",
      "Portfolio/gallery",
      "Multi-step enquiry form",
      "Google Business setup assistance",
      "Sitemap submission",
      "3 revision rounds",
      "60-day post-launch support",
    ],
    exclusions: ["Hosting", "Ongoing feature development", "Complex integrations"],
  },
  {
    title: "Custom",
    price: "Let's chat",
    priceNote: "Final pricing depends on agreed scope and project requirements.",
    description: "Scoped per project for advanced requirements.",
    features: [
      "Custom page count",
      "Advanced layouts",
      "Custom functionality",
      "Booking systems or integrations",
      "Structured content planning",
      "Expanded search configuration",
    ],
    exclusions: ["Hosting", "Ongoing feature development", "Large system integrations"],
  },
];

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
    question: "Who controls my domain name?",
    answer:
      "Your domain name is managed through a domain registrar and renewed yearly. It is not controlled by Horizon Digital, but we can help you set it up and manage renewals.",
  },
  {
    question: "What is hosting and who provides it?",
    answer:
      "Hosting keeps your website live on the internet. You can host with Horizon Digital or use another hosting provider if you prefer.",
  },
  {
    question: "How many revisions are included?",
    answer: "Each project includes clear revision rounds tied to milestones.",
  },
];

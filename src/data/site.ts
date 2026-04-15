import guesthousePreview from "../assets/work/drake-seaside/drake-seaside.jpg";
import guesthousePreviewWebp from "../assets/work/drake-seaside/hero-bg.webp";
import guesthousePreviewWebp800 from "../assets/work/drake-seaside/hero-bg-600.webp";
import ogImage from "../assets/logo/og-image.png";
import formaStudioPreview from "../assets/work/forma studio/forma studio.webp";
import formaStudioBg from "../assets/work/forma studio/forma.webp";
import takamakaHousePreview from "../assets/work/takamaka-house/takamaka house.webp";
import takamakaHouseBg from "../assets/work/takamaka-house/takamaka.webp";
import beautyPreview from "../assets/work/demo-beauty/demo-beauty.jpg";
import beautyPreviewWebp from "../assets/work/demo-beauty/demo-beauty.webp";
import beautyPreviewWebp800 from "../assets/work/demo-beauty/demo-beauty 600.webp";

export const siteConfig = {
  name: "Horizon Digital",
  tagline: "Your business, beautifully online",
  taglineLong: "Your business, beautifully online — built for Seychelles",
  email: "horizondigital.sey@gmail.com",
  phone: "+248 2604525",
  whatsappUrl: "https://wa.me/2482604525?text=Hi+Horizon+Digital%2C+I%27d+like+to+discuss+a+website+project.",
  url: "https://horizondigitalsey.com",
  location: "Mahé, Seychelles",
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
  { label: "Services & Pricing", path: "/pricing" },
  { label: "Our Work", path: "/work" },
  { label: "What You Need", path: "/what-you-need" },
  { label: "Digital Insights", path: "/insights" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const trustItems = ["Fast Loading", "Mobile Ready", "Easy to Find", "Simple to Use"];
export const services = [
  {
    title: "New Website Build",
    description: "We plan, design, and build a beautiful website from scratch that's made specifically for your business.",
  },
  {
    title: "Website Refresh",
    description: "Give your current website a fresh, modern look and feel without losing what already works for you.",
  },
  {
    title: "Found on Google",
    description: "We set up your website so it is fast and easy for customers to find when they search for your services online.",
  },
  {
    title: "Looks Great on Phones",
    description: "Your website will look perfect on every phone your customers use—no more pinching or zooming to read.",
  },
  {
    title: "Easy Customer Contact",
    description: "We make it simple for customers to reach you through WhatsApp, contact forms, or booking links directly on your site.",
  },
];

export const addOns = [
  "Additional page",
  "Content writing support",
  "Structured booking / enquiry form",
  "Google Business Profile setup",
  "Rush delivery",
];

export const projectSteps = [
  {
    title: "Our First Chat",
    description: "We talk about your business and your goals. We'll decide exactly what your new website needs to do to help you get more customers.",
  },
  {
    title: "Design & Review",
    description: "We show you a visual plan of how your website will look and work. You can tell us what you like or what you want to change so it's just right.",
  },
  {
    title: "Building Your Site",
    description: "Once you're happy with the plan, we build it. We make sure everything is fast, clean, and works perfectly on all mobile phones.",
  },
  {
    title: "Going Live",
    description: "We turn your website on for the world to see! We check everything one last time to make sure your first impression is perfect for your customers.",
  },
  {
    title: "Support & Growth",
    description: "We don't just leave you there. We stay with you for the first month to help you with any questions and make sure everything keeps running smoothly.",
  },
];


export const servicesPricingIntro = {
  title: "Services & Pricing",
  subtitle: "Websites built around how your business actually works — not copied from a template.",
  summary:
    "Every website we build is planned around your services, your customers, and your goals. The result is a site people can find easily, feel good about, and actually use to reach you.",
};

export const foundationPackage = {
  title: "Foundation",
  price: "From SCR 7,500",
  description:
    "A professional custom website with everything you need to get started — no templates, just your business online.",
  includes: [
    "Up to 3 clear pages",
    "Professionally designed layout built for your business",
    "Works beautifully on mobile phones",
    "Easy-to-use contact form",
    "WhatsApp chat integration",
    "Set up so Google can find and understand your business",
    "30 Days Support after launch",
    "1 Revision Round",
  ],
};

export const starterPackage = {
  title: "Starter",
  price: "From SCR 12,500",
  description: "A custom design made just for you",
  includes: [
    "Up to 5-6 custom pages",
    "Works perfectly on every phone your customers use",
    "Google Analytics setup",
    "Advanced setup so Google shows you to the right local customers",
    "45 Days Support after launch",
    "2 Revision Rounds",
  ],
};

export const growthPackage = {
  title: "Growth",
  price: "From SCR 25,000",
  description:
    "A custom-built website for businesses scaling up — more depth, more pages, and a professional digital presence.",
  includes: [
    "Up to 10-12 custom tailored pages",
    "Works perfectly on every phone your customers use",
    "Google Business Profile setup",
    "Advanced setup so Google shows you to the right local customers",
    "60 Days Support after launch",
    "2 Revision Rounds",
  ],
};

export const customPackage = {
  title: "Custom",
  price: "Scoped per project",
  description:
    "Some businesses need something that doesn't fit a standard package — more pages, more complexity, or a completely different direction. If that sounds like you, let's talk through what you actually need.",
  includes: [
    "A custom plan that fits your goals",
    "Work directly with your builder",
    "A thoughtful plan for your project",
    "Everything you need to succeed",
    "Our priority support after you launch",
  ],
};

export const addOnItems = [
  { title: "Additional page", price: "SCR 2,500 per page" },
  { title: "We write your page content for you", price: "SCR 600 per page" },
  { title: "Custom booking or enquiry form", price: "SCR 2,000" },
  { title: "Google Business Profile setup", price: "SCR 2,200" },
  { title: "Rush delivery", price: "+40% of project cost · subject to availability" },
];

export const hostingPlan = {
  title: "Managed hosting",
  price: "SCR 2,500 per year",
  billing: "Billed annually",
  features: [
    "Your site stays live and loading — 24 hours a day, every day of the year",
    "Website security setup so visitors see a secure padlock",
    "Regular backups so your website can be restored if needed",
    "Ongoing updates to keep the website stable",
    "Routine checks to catch issues early",
    "Simple monthly update on website activity",
  ],
  details: [
    "Hosting is what keeps your website online all day, every day.",
    "Your domain name is the address people type. Hosting is the place where your website is stored and shown from.",
    "When someone visits your website, hosting sends your pages, images, and content to their phone or computer.",
    "With managed hosting, we handle setup, security, backups, and ongoing checks so you do not have to manage it yourself.",
    "Your website files always remain yours — we manage the server environment, not your content.",
  ],
  note: "For advanced builds, hosting charges may differ.",
};

export const stabilisationPlan = {
  title: "30 days of support after every launch",
  covers: [
    "Anything that doesn't look or work right after launch",
    "Bug fixes and visual corrections",
    "Browser and device compatibility issues",
    "Minor copy changes in the first weeks",
    "Guidance on how to share and use your new site",
  ],
  excludes: [
    "New pages or structural redesigns",
    "Third-party platform integrations not agreed in the brief",
    "Ongoing content updates after the support window",
  ],
};

export const trustStatement = [
  "Clear scope",
  "Transparent pricing",
  "Defined revisions",
  "Direct communication",
  "No hidden extras",
];

export const workItems = [
  {
    label: "Guesthouse · Growth Tier",
    title: "Drake Seaside Apartments",
    outcome: "Redesign with new pages, updated content, faster load times, and higher click-through conversions.",
    image: guesthousePreview,
    imageWebp: guesthousePreviewWebp,
    imageWebp800: guesthousePreviewWebp800,
    url: "/showcase/drake-seaside",
  },
  {
    label: "Creative Studio · Foundation Tier",
    title: "Forma Studio",
    outcome:
      "Portfolio-led website concept with a modern editorial layout, strong visual hierarchy, and a conversion-friendly enquiry path.",
    image: formaStudioPreview,
    imageWebp: formaStudioBg,
    imageWebp800: formaStudioBg,
    imagePosition: "center 40%",
    url: "/showcase/forma-studio",
  },
  {
    label: "Hospitality · Foundation Tier",
    title: "Takamaka House",
    outcome:
      "Hospitality-focused showcase concept designed for immersive storytelling, clear accommodation details, and direct booking intent.",
    image: takamakaHousePreview,
    imageWebp: takamakaHouseBg,
    imageWebp800: takamakaHouseBg,
    imagePosition: "center 55%",
    url: "/showcase/takamaka-house",
  },
  {
    label: "Wellness & Beauty · Foundation Tier",
    title: "Beauty Demo",
    outcome:
      "A streamlined foundation-tier website demo built for service-based businesses with clear service layouts and frictionless contact paths.",
    image: beautyPreview,
    imageWebp: beautyPreviewWebp,
    imageWebp800: beautyPreviewWebp800,
    url: "https://demo-beauty.horizondigitalsey.com/",
  },
];

export const testimonials = [
  {
    quote: "Working with Horizon Digital was a smooth experience from start to finish. Our new website has brought in more online enquiries than we ever expected — guests now book directly instead of just calling.",
    author: "Mrs. Danielle Panagary",
    role: "Owner, Drake Seaside Apartments",
  },
];

export const faqs = [
  {
    question: "How much does a website actually cost?",
    answer: "Our standard packages range from SCR 7,500 for foundations to SCR 25,000+ for aggressive growth tiers. We believe in total transparency—your quote covers everything from strategy to launch with no hidden fees.",
  },
  {
    question: "What exactly is included in the price?",
    answer: "Every project includes custom design (no templates), mobile optimization, basic SEO setup, direct WhatsApp integration, and at least 30 days of post-launch stabilization support.",
  },
  {
    question: "What is a typical timeline?",
    answer: "Most projects launch in 3–6 weeks. We move fast because we follow a structured sequence, ensuring quality isn't sacrificed for speed.",
  },
  {
    question: "Do I own my website and domain?",
    answer: "Always. Ownership of the codebase, assets, and domain remains 100% yours. We can manage them for you, but you hold the keys.",
  },
  {
    question: "Do you provide content writing?",
    answer: "Yes. While we can use your existing text, we offer professional copywriting as an add-on to ensure your messaging is optimized for both customers and search engines.",
  },
  {
    question: "Can I update the website myself?",
    answer: "Yes. For clients who want hands-on control, we can build using a user-friendly CMS (Content Management System) that allows you to edit text and images without touching code.",
  },
  {
    question: "Is pricing flexible for smaller projects?",
    answer: "We offer the Foundation tier specifically for startups and small practices. Beyond that, we can adjust scopes to fit specific budgets while maintaining our quality standards.",
  },
  {
    question: "How many revisions are included?",
    answer: "Every package includes dedicated revision rounds at key milestones (Design and Final Review) to ensure the end result is exactly what you envisioned.",
  },
];

import guesthousePreview from "../assets/work/drake-seaside/drake-seaside.jpg";
import guesthousePreviewWebp from "../assets/work/drake-seaside/drake-seaside.webp";
import guesthousePreviewWebp800 from "../assets/work/drake-seaside/drake-seaside-600.webp";
import ogImage from "../assets/logo/svg logo (1).png";
import formaStudioPreview from "../assets/work/forma studio/forma studio.png";
import takamakaHousePreview from "../assets/work/takamaka-house/takamaka house.png";
import beautyPreview from "../assets/work/demo-beauty/demo-beauty.jpg";
import beautyPreviewWebp from "../assets/work/demo-beauty/demo-beauty.webp";
import beautyPreviewWebp800 from "../assets/work/demo-beauty/demo-beauty 600.webp";

export const siteConfig = {
  name: "Horizon Digital",
  tagline: "Your business, beautifully online",
  taglineLong: "Your business, beautifully online — built for Seychelles",
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
  { label: "What You Need", path: "/what-you-need" },
  { label: "Digital Insights", path: "/ai-digital-tools" },
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
    description: "Modernise your site without losing what already works for you.",
  },
  {
    title: "SEO & Performance",
    description: "Built-in speed and search visibility so customers can actually find you.",
  },
  {
    title: "Mobile-friendly layout",
    description: "Clear and easy to use on every screen size.",
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
    title: "Discovery",
    description: "We dive deep into your brand, audience, and goals.",
  },
  {
    title: "Strategy",
    description: "Crafting the digital blueprint for your success.",
  },
  {
    title: "Design",
    description: "Visual storytelling that captivates and converts.",
  },
  {
    title: "Build",
    description: "Clean, efficient code that powers performance.",
  },
  {
    title: "Launch",
    description: "Optimized deployment and continuous growth.",
  },
];


export const servicesPricingIntro = {
  title: "Services & Pricing",
  subtitle: "Websites built around how your business actually works — not copied from a template.",
  summary:
    "Every website we build is planned around your services, your customers, and your goals. We combine clear design with a solid search foundation so people can find you more easily, feel good about what they see, and reach out with confidence.",
};

export const foundationPackage = {
  title: "Foundation",
  price: "From SCR 7,500",
  description:
    "Perfect for businesses looking for a simple, professional home online. We'll set you up with a beautiful, structured space that works perfectly from day one.",
  includes: [
    "Up to 3 clear pages",
    "Choice of professional Horizon layouts",
    "Works beautifully on mobile phones",
    "Easy-to-use contact form",
    "WhatsApp chat integration",
    "Professional Search and Visibility",
    "30 Days Support after launch",
    "1 Revision Round",
  ],
};

export const starterPackage = {
  title: "Starter",
  price: "From SCR 12,500",
  description:
    "Ideal for growing businesses that want to stand out. We'll create a unique, custom-made site with warm, clear messaging that helps new customers find and trust you.",
  includes: [
    "Up to 5-6 custom pages",
    "Mobile-first layout for easy browsing",
    "Google Analytics setup",
    "Advanced Search and Visibility",
    "45 Days Support after launch",
    "2 Revision Rounds",
  ],
};

export const growthPackage = {
  title: "Growth",
  price: "From SCR 25,000",
  description:
    "Designed for established businesses ready to reach the next level. We'll build a fully tailored space for your brand, with a deeper focus on telling your story.",
  includes: [
    "Up to 10-12 custom tailored pages",
    "Mobile-first layout for easy browsing",
    "Google Business setup (to help you grow)",
    "Advanced Search and Visibility",
    "60 Days Support after launch",
    "2 Revision Rounds",
  ],
};

export const customPackage = {
  title: "Custom",
  price: "Scoped per project",
  description:
    "For truly unique projects that need something purely one-of-a-kind. We'll work closely with you to bring your vision to life, building a digital home that fits your business perfectly.",
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
  { title: "Content writing support", price: "SCR 600 per page" },
  { title: "Structured booking / enquiry form", price: "SCR 2,000" },
  { title: "Google Business Profile setup", price: "SCR 2,200" },
  { title: "Rush delivery", price: "+40% (subject to availability)" },
];

export const hostingPlan = {
  title: "Managed hosting",
  price: "SCR 2,500 per year",
  billing: "Billed annually",
  features: [
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
  ],
  note: "For advanced builds, hosting charges may differ.",
};

export const stabilisationPlan = {
  title: "30-day stabilisation",
  covers: ["Bug fixes", "Minor corrections", "Small adjustments"],
  excludes: ["New features", "Redesigns"],
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
    url: "https://thedrake-seaside.com/",
  },
  {
    label: "Creative Studio · Foundation Tier",
    title: "Forma Studio",
    outcome:
      "Portfolio-led website concept with a modern editorial layout, strong visual hierarchy, and a conversion-friendly enquiry path.",
    image: formaStudioPreview,
    imageWebp: formaStudioPreview,
    imageWebp800: formaStudioPreview,
    url: "https://horizondigitalsey.com/showcase/forma-studio",
  },
  {
    label: "Hospitality · Foundation Tier",
    title: "Takamaka House",
    outcome:
      "Hospitality-focused showcase concept designed for immersive storytelling, clear accommodation details, and direct booking intent.",
    image: takamakaHousePreview,
    imageWebp: takamakaHousePreview,
    imageWebp800: takamakaHousePreview,
    url: "https://horizondigitalsey.com/showcase/takamaka-house",
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

export const faqs = [
  {
    question: "What is a typical timeline?",
    answer: "Most projects launch in 3–6 weeks, depending on scope and how quickly content is ready. We'll give you a clear estimate before anything starts.",
  },
  {
    question: "Is pricing flexible?",
    answer: "Yes. Package pricing gives a clear starting range, and we adjust based on your page count, content needs, and any extras. No surprises.",
  },
  {
    question: "Do I own the website?",
    answer: "Absolutely. Once the project closes, the final codebase and all approved assets are yours. Always.",
  },
  {
    question: "Who controls my domain name?",
    answer: "You do. Your domain lives in your registrar account and renews yearly. We can help with setup and renewals, but ownership always stays with you.",
  },
  {
    question: "What is hosting and who provides it?",
    answer: "Hosting is what keeps your website live online. You can host with us — we handle everything — or use another provider if you prefer. Either works.",
  },
  {
    question: "How many revisions are included?",
    answer: "Every package includes structured revision rounds tied to project milestones, so feedback stays focused and the process stays smooth.",
  },
];

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
import businessFacts from "./businessFacts.json";

export { businessFacts };

export const siteConfig = {
  ...businessFacts.site,
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
  { label: "Services", path: businessFacts.site.pricingPath },
  { label: "Work", path: "/work" },
  { label: "What You Need", path: "/what-you-need" },
  { label: "Insights", path: "/insights" },
  { label: "About", path: "/about" },
];

export const trustItems = businessFacts.trustItems;
export const services = businessFacts.business.services;
export const addOns = businessFacts.addOns.map((item) => item.title);
export const projectSteps = businessFacts.projectSteps;
export const servicesPricingIntro = businessFacts.servicesPricingIntro;

export const foundationPackage = businessFacts.packages.find((item) => item.id === "foundation")!;
export const starterPackage = businessFacts.packages.find((item) => item.id === "starter")!;
export const growthPackage = businessFacts.packages.find((item) => item.id === "growth")!;
export const customPackage = businessFacts.packages.find((item) => item.id === "custom")!;

export const addOnItems = businessFacts.addOns;
export const paymentTerms = businessFacts.paymentTerms;
export const hostingPlan = businessFacts.hosting;
export const stabilisationPlan = businessFacts.stabilisation;
export const faqs = businessFacts.faqs;
export const homeFaqCategories = businessFacts.homeFaqCategories;

export const trustStatement = [
  "Clear scope",
  "Published starting prices",
  "Defined revisions",
  "Direct communication",
  "Written project terms",
];

const portfolioAssets: Record<
  string,
  {
    image: string;
    imageWebp: string;
    imageWebp800: string;
    imagePosition?: string;
  }
> = {
  "drake-seaside": {
    image: guesthousePreview,
    imageWebp: guesthousePreviewWebp,
    imageWebp800: guesthousePreviewWebp800,
  },
  "forma-studio": {
    image: formaStudioPreview,
    imageWebp: formaStudioBg,
    imageWebp800: formaStudioBg,
    imagePosition: "center 40%",
  },
  "takamaka-house": {
    image: takamakaHousePreview,
    imageWebp: takamakaHouseBg,
    imageWebp800: takamakaHouseBg,
    imagePosition: "center 55%",
  },
  "beauty-demo": {
    image: beautyPreview,
    imageWebp: beautyPreviewWebp,
    imageWebp800: beautyPreviewWebp800,
  },
};

export const workItems = businessFacts.portfolio.map((item) => ({
  ...item,
  ...portfolioAssets[item.id],
}));

export const liveClientProject = workItems.find((item) => item.id === "drake-seaside")!;

const supportDaysFromPackage = (pkg: { includes: { title: string }[] }) => {
  const entry = pkg.includes.find((item) => /post-launch support/i.test(item.title));
  const days = entry ? Number(entry.title.match(/\d+/)?.[0]) : undefined;
  return days;
};

export const supportDaysRange = {
  min: supportDaysFromPackage(foundationPackage),
  max: supportDaysFromPackage(growthPackage),
};

export const homeProofPoints = [
  {
    label: "Live client work",
    value: liveClientProject.title,
    href: liveClientProject.url,
  },
  {
    label: "Published pricing",
    value: foundationPackage.price,
  },
  {
    label: "Our process",
    value: `${projectSteps.length}-stage process`,
  },
  {
    label: "Post-launch support",
    value: `${supportDaysRange.min}–${supportDaysRange.max} days`,
  },
];

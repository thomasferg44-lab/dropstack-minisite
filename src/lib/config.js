import { companyConfig } from "../../companyConfig.js";
import { content as rawContent } from "../../content.js";

// Defaults so a half-filled companyConfig.js still renders a sane page.
const configDefaults = {
  businessName: "Your Business",
  tagline: "",
  logoUrl: "",
  primaryColor: "#1F2937",
  accentColor: "#4B5563",
  whatsappNumber: "",
  phoneDisplay: "",
  email: "",
  address: "",
  mapsUrl: "",
  hours: [],
  socials: {},
  serviceAreas: [],
  leadFormEndpoint: null,
};

// Trade-neutral section copy. A client that doesn't override these still
// gets sensible headings — no landscaping wording leaking into a salon's site.
const sectionDefaults = {
  services: { eyebrow: "What we do", heading: "Our services", intro: "" },
  gallery: {
    eyebrow: "Our work",
    heading: "Recent work",
    headingCompare: "See the difference.",
    intro: "",
  },
  about: { eyebrow: "About us" },
  testimonials: { eyebrow: "What clients say", heading: "What our customers say", intro: "" },
  areas: { heading: "Areas we serve", intro: "" },
  faq: { eyebrow: "Common questions", heading: "Frequently asked questions", intro: "" },
  contact: { eyebrow: "Get in touch", heading: "Get in touch", intro: "" },
  leadForm: {
    heading: "Request a quote",
    intro: "Tell us what you need and we'll come back to you.",
    note: "Opens WhatsApp or your mail app with these details already filled in.",
  },
};

const contentDefaults = {
  hero: { headline: "", subhead: "", ctaLabel: "Get in touch", backgroundImage: "" },
  services: [],
  gallery: [],
  about: { heading: "", body: "", image: "" },
  testimonials: [],
  faq: [],
};

export const config = { ...configDefaults, ...stripEmpty(companyConfig) };
export const content = {
  ...contentDefaults,
  ...rawContent,
  hero: { ...contentDefaults.hero, ...stripEmpty(rawContent.hero) },
  about: { ...contentDefaults.about, ...stripEmpty(rawContent.about) },
  sections: Object.fromEntries(
    Object.entries(sectionDefaults).map(([key, defaults]) => [
      key,
      { ...defaults, ...stripEmpty(rawContent.sections?.[key]) },
    ]),
  ),
};

function stripEmpty(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== "" && v !== undefined && v !== null),
  );
}

/** wa.me link with a pre-filled message naming the business. */
export function whatsappUrl(message) {
  if (!config.whatsappNumber) return null;
  const text = message ?? `Hi ${config.businessName}, I'd like to get a quote.`;
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const currency = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

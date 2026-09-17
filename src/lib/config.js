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

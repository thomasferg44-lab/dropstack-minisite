// Client identity and branding. This is the ONLY place client-specific
// identity data lives. A new client deploy = swap this file + content.js.
export const companyConfig = {
  businessName: "Greenline Garden Services",
  tagline: "Gardens that look after themselves — because we do.",
  logoUrl: "/logo.svg",
  primaryColor: "#2F5233",
  accentColor: "#C98A3D",
  whatsappNumber: "27000000000", // international, no +. Test number — replace before deploy.
  phoneDisplay: "000 000 0000",
  email: "hello@example.com",
  address: "14 Umhlanga Rocks Drive, Durban North, 4051",
  mapsUrl: "https://maps.google.com/?q=Durban+North",
  hours: [
    { day: "Mon–Fri", open: "07:00", close: "17:00" },
    { day: "Sat", open: "07:00", close: "13:00" },
  ],
  socials: {
    instagram: "https://instagram.com/example",
    facebook: "https://facebook.com/example",
  },
  serviceAreas: ["Durban North", "Umhlanga", "La Lucia", "Glenashley", "Ballito"],
  leadFormEndpoint: null, // set to a URL to POST the contact form as JSON (Lead Capture tool)

  // --- SEO ---------------------------------------------------------------
  // siteUrl is required for correct link previews, canonical URLs and the
  // sitemap. Set it to the live domain before deploying; without it the
  // build falls back to relative URLs and warns.
  siteUrl: "https://greenlinegardens.co.za",
  locale: "en-ZA",
  // Search-result title. Keep it under ~60 characters or Google truncates
  // it. Lead with what you do and where. Falls back to
  // "businessName — tagline" when empty.
  metaTitle: "Garden Services in Durban North & Umhlanga | Greenline",
  // Meta description. Keep it under ~155 characters. Falls back to the
  // hero subhead when empty.
  metaDescription:
    "Garden maintenance, landscaping and irrigation in Durban North, Umhlanga and Ballito. Fixed monthly pricing, reliable crews, free quotes on WhatsApp.",
  // Link-preview image, 1200x630. Must be a raster file: WhatsApp and
  // Facebook do not render SVG previews.
  ogImage: "/og-image.jpg",
  // schema.org type. "LocalBusiness" is the safe default; a more specific
  // type (e.g. "HomeAndConstructionBusiness", "HairSalon") is better if one fits.
  schemaType: "HomeAndConstructionBusiness",
  priceRange: "R850 - R25000",
  // Structured address for JSON-LD. Leave any field empty and it is omitted;
  // `address` above is still what renders on the page.
  addressParts: {
    street: "14 Umhlanga Rocks Drive",
    locality: "Durban North",
    region: "KwaZulu-Natal",
    postalCode: "4051",
    country: "ZA",
  },
  // Optional map coordinates for the JSON-LD geo block.
  geo: { lat: -29.7852, lng: 31.0412 },
};

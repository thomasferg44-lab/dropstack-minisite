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
};

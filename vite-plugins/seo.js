import { companyConfig } from "../companyConfig.js";
import { content } from "../content.js";

// SEO is injected into index.html at BUILD time, not by React at runtime.
// The WhatsApp, Facebook and Twitter crawlers do not execute JavaScript, so
// anything set from a component is invisible to them — and link previews on
// WhatsApp are most of the point of this section of the spec.

const DAYS = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
  fri: "Friday", sat: "Saturday", sun: "Sunday",
};
const ORDER = Object.values(DAYS);

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const trimSlash = (s = "") => s.replace(/\/+$/, "");

/** "/og-image.png" -> "https://site.co.za/og-image.png" (absolute URLs required by crawlers). */
function absolute(siteUrl, path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (!siteUrl) return path;
  return `${trimSlash(siteUrl)}/${String(path).replace(/^\//, "")}`;
}

/**
 * "Mon–Fri" -> [Monday..Friday]; "Sat" -> [Saturday]; "Mon, Wed" -> [Monday, Wednesday].
 * Handles en dash, em dash and hyphen. Returns [] for anything unrecognised
 * so a malformed entry is skipped rather than emitting broken structured data.
 */
export function parseDays(label = "") {
  const key = (t) => DAYS[t.trim().slice(0, 3).toLowerCase()];
  const parts = String(label).split(",").flatMap((chunk) => {
    const range = chunk.split(/[–—-]/);
    if (range.length === 2) {
      const [a, b] = range.map(key);
      if (!a || !b) return [];
      const i = ORDER.indexOf(a), j = ORDER.indexOf(b);
      if (i < 0 || j < 0) return [];
      // Wrap around the week so "Sat–Sun" and "Fri–Mon" both work.
      const out = [];
      for (let n = 0; n <= (j - i + 7) % 7; n++) out.push(ORDER[(i + n) % 7]);
      return out;
    }
    const d = key(chunk);
    return d ? [d] : [];
  });
  return [...new Set(parts)];
}

export function buildJsonLd(config, siteUrl) {
  const { addressParts: ap = {}, geo = {} } = config;

  const address = {
    "@type": "PostalAddress",
    ...(ap.street ? { streetAddress: ap.street } : config.address ? { streetAddress: config.address } : {}),
    ...(ap.locality ? { addressLocality: ap.locality } : {}),
    ...(ap.region ? { addressRegion: ap.region } : {}),
    ...(ap.postalCode ? { postalCode: ap.postalCode } : {}),
    ...(ap.country ? { addressCountry: ap.country } : {}),
  };

  const hours = (config.hours ?? [])
    .map((h) => {
      const days = parseDays(h.day);
      if (!days.length || !h.open || !h.close) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: h.open,
        closes: h.close,
      };
    })
    .filter(Boolean);

  const socials = Object.values(config.socials ?? {}).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": config.schemaType || "LocalBusiness",
    name: config.businessName,
    ...(config.metaDescription ? { description: config.metaDescription } : {}),
    ...(siteUrl ? { url: trimSlash(siteUrl), "@id": `${trimSlash(siteUrl)}/#business` } : {}),
    ...(config.logoUrl ? { logo: absolute(siteUrl, config.logoUrl) } : {}),
    ...(config.ogImage ? { image: absolute(siteUrl, config.ogImage) } : {}),
    ...(config.whatsappNumber ? { telephone: `+${config.whatsappNumber}` } : {}),
    ...(config.email ? { email: config.email } : {}),
    ...(Object.keys(address).length > 1 ? { address } : {}),
    ...(geo.lat != null && geo.lng != null
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } }
      : {}),
    ...(config.priceRange ? { priceRange: config.priceRange } : {}),
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    ...(config.serviceAreas?.length
      ? { areaServed: config.serviceAreas.map((a) => ({ "@type": "Place", name: a })) }
      : {}),
    ...(socials.length ? { sameAs: socials } : {}),
  };

  // Services become an offer catalog so they can surface as rich results.
  if (content.services?.length) {
    data.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${config.businessName} services`,
      itemListElement: content.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, ...(s.description ? { description: s.description } : {}) },
        ...(s.priceFrom != null
          ? { priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceFrom, priceCurrency: "ZAR" } }
          : {}),
      })),
    };
  }
  return data;
}

/** FAQPage structured data — the FAQ section is explicitly SEO fuel in the spec. */
export function buildFaqJsonLd() {
  if (!content.faq?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function buildHead(config) {
  const siteUrl = trimSlash(config.siteUrl || "");
  const title =
    config.metaTitle ||
    (config.tagline ? `${config.businessName} — ${config.tagline}` : config.businessName);
  const description = config.metaDescription || content.hero?.subhead || "";
  const ogImage = absolute(siteUrl, config.ogImage);
  const logo = config.logoUrl || "";
  const areas = (config.serviceAreas ?? []).join(", ");

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    areas && `<meta name="keywords" content="${esc(areas)}" />`,
    siteUrl && `<link rel="canonical" href="${esc(siteUrl)}/" />`,
    `<meta name="theme-color" content="${esc(config.primaryColor || "#1F2937")}" />`,

    // Open Graph — this is what a WhatsApp share renders.
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(config.businessName)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    siteUrl && `<meta property="og:url" content="${esc(siteUrl)}/" />`,
    config.locale && `<meta property="og:locale" content="${esc(config.locale.replace("-", "_"))}" />`,
    ogImage && `<meta property="og:image" content="${esc(ogImage)}" />`,
    ogImage && `<meta property="og:image:width" content="1200" />`,
    ogImage && `<meta property="og:image:height" content="630" />`,
    ogImage && `<meta property="og:image:alt" content="${esc(config.businessName)}" />`,

    `<meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    ogImage && `<meta name="twitter:image" content="${esc(ogImage)}" />`,

    logo && `<link rel="icon" href="${esc(logo)}" />`,
    logo && `<link rel="apple-touch-icon" href="${esc(logo)}" />`,
  ].filter(Boolean);

  const blocks = [buildJsonLd(config, siteUrl), buildFaqJsonLd()].filter(Boolean);
  for (const b of blocks) {
    // </script> inside JSON would close the tag early; escape it.
    const json = JSON.stringify(b, null, 2).replace(/<\//g, "<\\/");
    tags.push(`<script type="application/ld+json">\n${json}\n</script>`);
  }
  return tags.join("\n    ");
}

export default function seoPlugin() {
  return {
    name: "dropstack-seo",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (!companyConfig.siteUrl) {
          this.warn?.(
            "[seo] companyConfig.siteUrl is not set — canonical, og:url, sitemap and absolute image URLs will be incomplete.",
          );
        }
        return html
          .replace(/<html lang="[^"]*"/, `<html lang="${esc(companyConfig.locale || "en")}"`)
          .replace("<!--seo-->", buildHead(companyConfig));
      },
    },
    generateBundle() {
      const siteUrl = trimSlash(companyConfig.siteUrl || "");
      const lastmod = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *
Allow: /
${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
      });
    },
  };
}

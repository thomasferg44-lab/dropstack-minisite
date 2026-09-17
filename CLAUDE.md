# CLAUDE.md — DropStack Mini-site

Read automatically by Claude Code at session start. Source of truth for this repo. Follow it over any conflicting default behavior.

## Project

**Name:** DropStack Mini-site
**Owner:** Thomas — DropStack (white-label agency for service businesses)
**Purpose:** A fast, single-page, mobile-first website for a service business that currently has no website or a bad one. One deploy per client. Entirely config-driven so a new client is a content swap, not a rebuild.

This is one of four tools sold together as a package. The others are Lead Capture, Review Engine, and Invoice Chaser. This repo is standalone — do not build integrations with the others beyond the one optional hook described below.

**Target client:** landscapers, salons, barbers, plumbers, electricians, detailers, pet groomers, physios, small clinics. Two to ten staff. Currently reachable only via a Facebook page or word of mouth.

## Tech stack — do not introduce others without asking

- React + Vite
- Tailwind CSS (utility classes only)
- No backend. No database. No auth. This tool is static.
- Netlify hosting
- Images: local files in `/public`, optimized at build time

If you think this needs a database, you've misread the spec. It doesn't.

## Non-negotiable workflow rules

- **Never push directly to main.** Branch + PR every time, no exceptions.
- **Do not deploy.** Thomas handles Netlify, domains, and DNS himself.
- **Ask before adding a dependency.** This must stay light — page weight is a feature here.
- **No client-specific data hardcoded outside config files.**

## Design tokens — shared across all four DropStack tools

This tool is **client-branded** (the whole page is the client's brand). Pull colors from `companyConfig.js`:

```js
primaryColor   // client's main brand color
accentColor    // secondary
```

Derive hover/active states from those rather than hardcoding. Provide sensible defaults so a half-filled config still renders.

Typography: one display font for headings, one sans for body. Load from Google Fonts with a real fallback stack. Do not use more than two families.

Spacing: 4px base scale. Generous vertical rhythm — this should feel airy, not cramped.

**The bar for this build:** it must look better than a Wix template a competitor threw together. That's the actual competition. Restraint and whitespace beat decoration.

## Product spec

### Content model

Two files at project root:

**`companyConfig.js`** — identity and branding:
```js
export const companyConfig = {
  businessName: "",
  tagline: "",
  logoUrl: "/logo.svg",
  primaryColor: "#000000",
  accentColor: "#000000",
  whatsappNumber: "",        // international, no +, e.g. "27821234567"
  phoneDisplay: "",          // pretty format for display
  email: "",
  address: "",
  mapsUrl: "",               // Google Maps link
  hours: [],                 // [{ day: "Mon–Fri", open: "08:00", close: "17:00" }]
  socials: {},               // { instagram, facebook }
  serviceAreas: [],          // ["Durban North", "Umhlanga", "Ballito"]
  leadFormEndpoint: null,    // optional — see "Lead form" below
};
```

**`content.js`** — page content:
```js
export const content = {
  hero: { headline, subhead, ctaLabel, backgroundImage },
  services: [{ title, description, icon, priceFrom }],
  gallery: [{ before, after, caption }],   // before optional — supports plain gallery too
  about: { heading, body, image },
  testimonials: [{ name, text, rating }],
  faq: [{ q, a }],
};
```

Any section with an empty array must not render at all. A client with no testimonials yet should get a page that looks intentional, not broken.

### Sections, in page order

1. **Sticky header** — logo, nav anchors, prominent WhatsApp button
2. **Hero** — headline, subhead, primary CTA, background image with a readability overlay
3. **Services** — cards from `content.services`, optional "from R___" pricing
4. **Gallery** — if entries have both `before` and `after`, render a draggable before/after comparison slider; if only one image, render a normal lightbox grid. Lazy-load everything.
5. **About** — short, human, with a photo. This is where a two-person operation looks legitimate.
6. **Testimonials** — simple cards, star rating
7. **Service areas** — plain text list. This is SEO fuel, don't skip it.
8. **FAQ** — accordion. Also SEO fuel.
9. **Contact** — hours, address, embedded map link, phone, email, and the lead form (below)
10. **Footer** — socials, copyright, small "Built by DropStack" credit linking to dropstack.co

### Lead form

If `leadFormEndpoint` is set in config, the contact form POSTs there as JSON (this is where the Lead Capture tool plugs in later). If it's `null`, the form falls back to building a `mailto:` and a `wa.me` link from the entered values — so the page is fully functional standalone with no backend.

Build the fallback path first. It must work with no endpoint configured.

### Floating WhatsApp button

Fixed bottom-right on mobile, always visible. Opens `wa.me/<number>` with a pre-filled message naming the business. This will be the most-clicked element on the page.

### SEO — do not treat this as optional

This is most of the value the client is paying for. Being findable *is* the product.

- Full meta title/description from config
- Open Graph + Twitter card tags with a preview image (links get shared on WhatsApp — this is how it looks when they do)
- Favicon from the client logo
- `JSON-LD` `LocalBusiness` structured data: name, address, phone, hours, service areas, price range, geo if available
- Semantic HTML — real `<h1>`/`<h2>`, real `<nav>`, real `<footer>`
- `alt` text on every image, sourced from content where possible
- `sitemap.xml` and `robots.txt`
- Target Lighthouse 90+ on mobile for Performance, Accessibility, Best Practices, SEO. State the scores you expect and why if you can't hit it.

### Performance requirements

- Images lazy-loaded below the fold, `width`/`height` set to avoid layout shift
- No render-blocking third-party scripts
- Fonts with `display: swap`
- Total initial payload under 500KB excluding images

## Build order — follow the sequence

1. Scaffold + `companyConfig.js` + `content.js` with realistic placeholder content for a fictional service business
2. Layout shell: header, footer, section scaffolding, responsive grid
3. Hero + Services
4. Gallery (comparison slider + lightbox)
5. About + Testimonials + Service areas + FAQ
6. Contact section + lead form (fallback path first, then endpoint POST)
7. Floating WhatsApp button
8. SEO pass: meta, OG, JSON-LD, sitemap, robots, alt text
9. Performance pass + mobile polish

## Definition of done

- Loads and looks right at 375px, 768px, and 1440px
- Every section renders correctly when its content array is empty
- WhatsApp button and links produce correct, working URLs from config
- Sharing the URL on WhatsApp produces a proper preview card
- Swapping `companyConfig.js` + `content.js` for a different business requires zero code changes
- Lighthouse mobile scores 90+ across all four categories
- No console errors or warnings

## What NOT to do

- No CMS, no admin panel, no database, no auth. Config files only.
- No animation libraries. CSS transitions only, used sparingly.
- No carousels for the main content. They hurt conversion and accessibility.
- No cookie banners or analytics unless explicitly asked.
- Don't deploy, and don't claim something is live.

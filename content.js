// Page content. Any section with an empty array does not render.
// Image paths are relative to /public.
export const content = {
  // Section headings. Every key is optional — anything left out falls back
  // to trade-neutral wording in src/lib/config.js.
  sections: {
    services: {
      eyebrow: "What we do",
      heading: "Straightforward services, clear prices.",
      intro: "Every job is quoted up front. If it's not on this list, ask — we probably do it.",
    },
    gallery: { eyebrow: "Our work", headingCompare: "Drag to see the difference." },
    testimonials: { eyebrow: "What clients say", heading: "Don't take our word for it." },
    faq: { eyebrow: "Common questions", heading: "Things people ask us." },
    contact: {
      eyebrow: "Get in touch",
      heading: "Let's sort your garden out.",
      intro: "Send us a message, or reach us directly — whichever suits you.",
    },
    leadForm: {
      heading: "Request a quote",
      intro: "Tell us what you need and we'll come back to you with a price.",
    },
  },

  hero: {
    headline: "A garden you're proud to come home to.",
    subhead:
      "Weekly maintenance, full landscaping and irrigation for homes across Durban North and Umhlanga. Reliable crews, fixed monthly pricing, no surprises.",
    ctaLabel: "Get a free quote",
    backgroundImage: "/images/hero.svg",
  },
  services: [
    {
      title: "Garden maintenance",
      description:
        "Weekly or fortnightly visits: mowing, edging, pruning, weeding and clean-up. Same crew every time.",
      icon: "leaf",
      priceFrom: 850,
    },
    {
      title: "Landscaping & design",
      description:
        "New beds, planting plans and full garden makeovers designed for our coastal climate and your water bill.",
      icon: "shovel",
      priceFrom: 6500,
    },
    {
      title: "Irrigation",
      description:
        "Drip and sprinkler systems installed and repaired, with timers set so your garden survives December.",
      icon: "droplet",
      priceFrom: 3200,
    },
    {
      title: "Lawn installation",
      description:
        "Instant roll-on lawn or seeded from scratch, with soil prep and levelling included in the price.",
      icon: "grid",
      priceFrom: 95,
    },
    {
      title: "Tree felling & pruning",
      description:
        "Safe removal of dead or dangerous trees, crown lifts and shaping. Rubble and branches taken away.",
      icon: "tree",
      priceFrom: 1200,
    },
    {
      title: "Once-off clean-ups",
      description:
        "Moving in, selling up, or the garden got away from you? One visit, back to baseline, no contract.",
      icon: "sun",
      priceFrom: 1500,
    },
  ],
  gallery: [
    {
      before: "/images/gallery/before-1.svg",
      after: "/images/gallery/after-1.svg",
      caption: "Front garden makeover, Glenashley — new beds, lawn and irrigation",
    },
    {
      before: "/images/gallery/before-2.svg",
      after: "/images/gallery/after-2.svg",
      caption: "Overgrown verge cleared and replanted, Umhlanga",
    },
    { after: "/images/gallery/single-1.svg", caption: "Weekly maintenance client, Durban North" },
    { after: "/images/gallery/single-2.svg", caption: "Drip irrigation on a sloped bed, La Lucia" },
    { after: "/images/gallery/single-3.svg", caption: "Instant lawn, two weeks after installation" },
  ],
  about: {
    heading: "Two brothers, one bakkie, twelve years of gardens.",
    body: "Greenline started in 2014 when Sipho and Thabo Mkhize took over their dad's maintenance round in Durban North. Today we're a crew of six, still turning up in the same bakkie, still doing the work ourselves. We know the coastal soil, the summer humidity and which plants actually survive a Durban December. You'll always speak to one of us directly, and the same crew comes back every visit.",
    image: "/images/about.svg",
  },
  testimonials: [
    {
      name: "Lindiwe M., Glenashley",
      text: "They've done our garden every second Tuesday for three years. Never missed a visit, never a surprise on the invoice.",
      rating: 5,
    },
    {
      name: "Dave and Karen P., Umhlanga",
      text: "We got three quotes for the front garden makeover. Greenline weren't the cheapest but they were the only ones who asked about our water bill. Worth it.",
      rating: 5,
    },
    {
      name: "Rajesh N., La Lucia",
      text: "Sorted out an irrigation system two other companies had given up on. Quick to reply on WhatsApp, which is rarer than it should be.",
      rating: 4,
    },
  ],
  faq: [
    {
      q: "Do you offer once-off visits or only monthly contracts?",
      a: "Both. Most of our clients are on a monthly plan because it works out cheaper, but we do once-off clean-ups and projects with no contract.",
    },
    {
      q: "How do quotes work?",
      a: "Send us a few photos on WhatsApp and we'll usually give you a ballpark the same day. For bigger jobs we'll come out and quote in person, free of charge.",
    },
    {
      q: "Do you take away the garden refuse?",
      a: "Yes. Every visit and every project includes removal of cuttings, branches and rubble. You never have to deal with a pile on the verge.",
    },
    {
      q: "Which areas do you cover?",
      a: "Durban North, Umhlanga, La Lucia, Glenashley and Ballito. If you're just outside those, ask anyway.",
    },
    {
      q: "Are you insured?",
      a: "Yes, we carry public liability cover for all work including tree felling.",
    },
  ],
};

// Page content. Any section with an empty array does not render.
// Image paths are relative to /public.
export const content = {
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
    heading: "",
    body: "",
    image: "",
  },
  testimonials: [],
  faq: [],
};

import { config, content } from "../lib/config.js";

// Plain-text list of suburbs. Deliberately simple: this is for search engines
// and for a visitor checking "do they come to my area?" in two seconds.
export default function ServiceAreas({ id }) {
  const areas = config.serviceAreas;
  const copy = content.sections.areas;
  return (
    <section id={id} className="bg-white py-16 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary text-primary-contrast px-6 py-10 sm:px-10 lg:px-14 lg:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-md">
            <h2 className="font-display text-2xl sm:text-3xl font-medium leading-tight">
              {copy.heading}
            </h2>
            <p className="mt-2 text-sm opacity-80">
              {copy.intro || `${config.businessName} works across these areas and nearby suburbs.`}
            </p>
          </div>
          <ul className="mt-6 lg:mt-0 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a} className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

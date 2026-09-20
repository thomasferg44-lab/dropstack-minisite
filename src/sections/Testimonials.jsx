import { content } from "../lib/config.js";
import Section from "../components/Section.jsx";

export default function Testimonials({ id }) {
  const items = content.testimonials;
  const copy = content.sections.testimonials;
  return (
    <Section id={id} eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} tone="soft">
      <ul className={`grid gap-5 lg:gap-6 ${items.length === 1 ? "max-w-xl" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {items.map((t, i) => (
          <li key={i} className="flex flex-col rounded-2xl bg-white border border-gray-200 p-6 lg:p-7">
            {t.rating != null && <Stars value={t.rating} />}
            <blockquote className="mt-4 text-gray-800 leading-relaxed grow">
              <p>“{t.text}”</p>
            </blockquote>
            {t.name && <p className="mt-5 text-sm font-semibold text-gray-900">{t.name}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Stars({ value }) {
  const n = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`size-5 ${i < n ? "text-accent" : "text-gray-300"}`} fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 14.9l-5.3 2.8 1.1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

import { content, currency } from "../lib/config.js";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";

export default function Services({ id }) {
  const copy = content.sections.services;
  return (
    <Section
      id={id}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      intro={copy.intro}
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {content.services.map((s) => (
          <li
            key={s.title}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 lg:p-7 transition-colors hover:border-primary/40"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary mb-5">
              <Icon name={s.icon} />
            </span>
            <h3 className="font-display text-xl font-medium text-gray-900">{s.title}</h3>
            {s.description && (
              <p className="mt-2 text-gray-600 leading-relaxed">{s.description}</p>
            )}
            {s.priceFrom != null && (
              <p className="mt-auto pt-5 text-sm font-semibold text-accent-ink">
                from {currency.format(s.priceFrom)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

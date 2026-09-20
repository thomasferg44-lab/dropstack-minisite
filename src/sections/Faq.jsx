import { content } from "../lib/config.js";
import Section from "../components/Section.jsx";

// Native <details> accordion: keyboard and screen-reader support for free,
// content stays in the DOM for search engines, no JS state.
export default function Faq({ id }) {
  const copy = content.sections.faq;
  return (
    <Section id={id} eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro}>
      <div className="max-w-3xl divide-y divide-gray-200 border-y border-gray-200">
        {content.faq.map((f, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
              <span className="text-base sm:text-lg">{f.q}</span>
              <svg
                viewBox="0 0 24 24"
                className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="mt-3 pr-9 text-gray-600 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

import { config, content } from "../lib/config.js";
import Section from "../components/Section.jsx";
import LeadForm from "../components/LeadForm.jsx";
import Icon from "../components/Icon.jsx";

// Map is a link, not an iframe: an embedded Google map is a render-blocking
// third-party payload that would cost more Lighthouse points than it earns.
export default function Contact({ id }) {
  const copy = content.sections.contact;
  const { address, mapsUrl, phoneDisplay, whatsappNumber, email, hours } = config;
  return (
    <Section
      id={id}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      intro={copy.intro}
      tone="soft"
    >
      <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12 items-start">
        <div className="space-y-8">
          <ul className="space-y-5">
            {phoneDisplay && whatsappNumber && (
              <ContactRow icon="phone" label="Phone">
                <a href={`tel:+${whatsappNumber}`} className="hover:text-primary transition-colors">
                  {phoneDisplay}
                </a>
              </ContactRow>
            )}
            {email && (
              <ContactRow icon="mail" label="Email">
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors break-words">
                  {email}
                </a>
              </ContactRow>
            )}
            {address && (
              <ContactRow icon="pin" label="Address">
                {mapsUrl ? (
                  <a
                    href={mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {address}
                    <span className="block text-sm font-medium text-primary mt-1">Get directions →</span>
                  </a>
                ) : (
                  <span>{address}</span>
                )}
              </ContactRow>
            )}
          </ul>

          {hours.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg font-medium text-gray-900">
                <Icon name="clock" className="size-5 text-primary" />
                Opening hours
              </h3>
              <dl className="mt-3 space-y-1.5 text-gray-700">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6 max-w-xs border-b border-gray-200/80 pb-1.5">
                    <dt>{h.day}</dt>
                    <dd className="font-medium tabular-nums">
                      {h.open && h.close ? `${h.open} – ${h.close}` : "Closed"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <LeadForm />
      </div>
    </Section>
  );
}

function ContactRow({ icon, label, children }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary border border-gray-200">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">{label}</p>
        <div className="mt-0.5 text-lg text-gray-800">{children}</div>
      </div>
    </li>
  );
}

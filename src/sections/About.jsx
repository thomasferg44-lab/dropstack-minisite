import { config, content } from "../lib/config.js";
import WhatsAppLink from "../components/WhatsAppLink.jsx";

export default function About({ id }) {
  const { heading, body, image } = content.about;
  const paragraphs = body.split(/\n\s*\n/).filter(Boolean);
  return (
    <section id={id} className="bg-white py-20 sm:py-24 lg:py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-10 lg:gap-16 items-center ${image ? "lg:grid-cols-[5fr_6fr]" : ""}`}>
          {image && (
            <img
              src={image}
              alt={`${config.businessName} team`}
              width="900"
              height="1100"
              loading="lazy"
              decoding="async"
              className="w-full max-w-md mx-auto lg:max-w-none aspect-[9/11] rounded-2xl object-cover bg-gray-200"
            />
          )}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">About us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-gray-900 text-balance">
              {heading}
            </h2>
            <div className="mt-6 space-y-4 text-lg text-gray-600 leading-relaxed">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8">
              <WhatsAppLink>Say hello on WhatsApp</WhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

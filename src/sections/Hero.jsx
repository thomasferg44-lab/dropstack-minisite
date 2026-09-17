import { config, content } from "../lib/config.js";
import WhatsAppLink from "../components/WhatsAppLink.jsx";

export default function Hero() {
  const { headline, subhead, ctaLabel, backgroundImage } = content.hero;
  const hasImage = Boolean(backgroundImage);
  return (
    <section className="relative isolate overflow-hidden bg-primary text-white">
      {hasImage && (
        <img
          src={backgroundImage}
          alt=""
          width="1600"
          height="1000"
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
      )}
      {/* Readability overlay: brand-tinted gradient, darker at the text edge. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/45 to-black/20" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36 lg:pt-44 lg:pb-52">
        <div className="max-w-2xl">
          {config.serviceAreas.length > 0 && (
            <p className="text-sm font-medium text-white/80 mb-5">
              Serving {config.serviceAreas.slice(0, 3).join(", ")}
              {config.serviceAreas.length > 3 ? " and surrounds" : ""}
            </p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-balance">
            {headline || config.businessName}
          </h1>
          {subhead && (
            <p className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl">{subhead}</p>
          )}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <WhatsAppLink variant="accent" size="lg" className="justify-center">
              {ctaLabel}
            </WhatsAppLink>
            {config.phoneDisplay && (
              <a
                href={`tel:+${config.whatsappNumber}`}
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 active:bg-white/20 transition-colors"
              >
                Call {config.phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

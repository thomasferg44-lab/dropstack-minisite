// Shared section wrapper: consistent container width, vertical rhythm and
// heading treatment so every section feels like the same page.
export default function Section({ id, eyebrow, heading, intro, tone = "white", children }) {
  const bg = tone === "soft" ? "bg-primary-soft" : "bg-white";
  return (
    <section id={id} className={`${bg} py-20 sm:py-24 lg:py-32 scroll-mt-20`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(heading || eyebrow) && (
          <header className="max-w-2xl mb-12 lg:mb-16">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-ink mb-3">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-gray-900 text-balance">
                {heading}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg text-gray-600 leading-relaxed">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

import { useCallback, useState } from "react";
import { content } from "../lib/config.js";
import Section from "../components/Section.jsx";
import CompareSlider from "../components/CompareSlider.jsx";
import Lightbox from "../components/Lightbox.jsx";

// Entries with both `before` and `after` become comparison sliders; entries
// with a single image become lightbox thumbnails. Both can coexist. An entry
// that has only `before` is treated as a single image.
export default function Gallery({ id }) {
  const items = content.gallery
    .map((g) => (g.before && g.after ? g : { ...g, after: g.after || g.before, before: undefined }))
    .filter((g) => g.after);
  const pairs = items.filter((g) => g.before);
  const singles = items.filter((g) => !g.before);
  const [active, setActive] = useState(null);

  const step = useCallback(
    (d) => setActive((i) => (i == null ? i : (i + d + singles.length) % singles.length)),
    [singles.length],
  );

  return (
    <Section
      id={id}
      eyebrow="Our work"
      heading={pairs.length ? "Drag to see the difference." : "Recent work."}
      tone="soft"
    >
      {pairs.length > 0 && (
        <ul className={`grid gap-6 lg:gap-8 ${pairs.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {pairs.map((g, i) => (
            <li key={g.after}>
              <figure>
                <CompareSlider before={g.before} after={g.after} caption={g.caption} eager={i === 0} />
                {g.caption && <figcaption className="mt-3 text-sm text-gray-600">{g.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      )}

      {singles.length > 0 && (
        <ul className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${pairs.length ? "mt-10 lg:mt-12" : ""}`}>
          {singles.map((g, i) => (
            <li key={g.after}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group block w-full overflow-hidden rounded-xl bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={g.caption ? `View photo: ${g.caption}` : "View photo"}
              >
                <img
                  src={g.after}
                  alt={g.caption ?? ""}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox items={singles} index={active} onClose={() => setActive(null)} onStep={step} />
    </Section>
  );
}

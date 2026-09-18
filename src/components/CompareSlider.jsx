import { useId, useState } from "react";

// Draggable before/after comparison. A full-size <input type="range"> sits on
// top and drives the divider, so drag, touch, keyboard and screen readers all
// work with no extra JS event plumbing. The "after" image is clipped to the
// slider position over the "before" image.
export default function CompareSlider({ before, after, caption, eager = false }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const loading = eager ? "eager" : "lazy";
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 select-none">
      <img
        src={before}
        alt={caption ? `Before: ${caption}` : "Before"}
        width="1200"
        height="900"
        loading={loading}
        decoding="async"
        draggable="false"
        className="absolute inset-0 size-full object-cover"
      />
      <img
        src={after}
        alt={caption ? `After: ${caption}` : "After"}
        width="1200"
        height="900"
        loading={loading}
        decoding="async"
        draggable="false"
        className="absolute inset-0 size-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Divider + handle (purely visual, follows the range input) */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)] pointer-events-none"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-md">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white pointer-events-none" aria-hidden="true">After</span>
      <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white pointer-events-none" aria-hidden="true">Before</span>

      <label htmlFor={id} className="sr-only">Drag to compare before and after</label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="compare-range absolute inset-0 size-full cursor-ew-resize opacity-0 touch-pan-y"
      />
    </div>
  );
}

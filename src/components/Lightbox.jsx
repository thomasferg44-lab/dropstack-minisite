import { useEffect, useRef } from "react";

// Native <dialog> lightbox: focus trapping, Escape and backdrop come free.
export default function Lightbox({ items, index, onClose, onStep }) {
  const ref = useRef(null);
  const open = index != null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onStep]);

  const item = open ? items[index] : null;
  const many = items.length > 1;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className="m-auto max-h-none max-w-none w-full h-full bg-transparent p-4 sm:p-8 backdrop:bg-black/85 open:flex items-center justify-center"
      aria-label="Photo viewer"
    >
      {item && (
        <figure className="relative flex flex-col items-center max-w-5xl w-full">
          <img
            src={item.after}
            alt={item.caption ?? ""}
            width="1200"
            height="900"
            className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
          />
          {item.caption && (
            <figcaption className="mt-4 text-center text-sm text-white/85">{item.caption}</figcaption>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 flex size-10 items-center justify-center rounded-full bg-white text-gray-900 shadow hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          {many && (
            <>
              <NavButton dir={-1} onClick={() => onStep(-1)} />
              <NavButton dir={1} onClick={() => onStep(1)} />
            </>
          )}
        </figure>
      )}
    </dialog>
  );
}

function NavButton({ dir, onClick }) {
  const left = dir < 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={left ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 -translate-y-1/2 ${left ? "left-2" : "right-2"} flex size-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {left ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}
      </svg>
    </button>
  );
}

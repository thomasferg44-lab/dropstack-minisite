import { config, whatsappUrl } from "../lib/config.js";

// Fixed bottom-right action button. Expected to be the most-clicked element
// on the page, so it stays put rather than appearing on scroll.
//
// Hidden from lg upwards: the sticky header's WhatsApp button is always
// visible on desktop, and two identical buttons on screen at once is clutter.
// Sits above the safe-area inset so iOS home-indicator devices don't clip it.
// The lightbox is a native <dialog>, which renders in the top layer, so it
// covers this button without any z-index coordination.
export default function FloatingWhatsApp() {
  const href = whatsappUrl();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${config.businessName} on WhatsApp`}
      className="fixed right-4 z-40 lg:hidden flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] motion-reduce:transition-none motion-reduce:hover:scale-100"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <svg viewBox="0 0 24 24" className="size-8" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.4 4.4c-.16 0-.43.06-.65.3-.23.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.13.16 1.76 2.68 4.25 3.76 2.07.82 2.49.65 2.94.61.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.38.1-.5.11-.11.25-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47Z" />
      </svg>
    </a>
  );
}

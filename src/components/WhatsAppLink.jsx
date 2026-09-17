import { whatsappUrl } from "../lib/config.js";

const styles = {
  solid:
    "bg-primary text-primary-contrast hover:bg-primary-hover active:bg-primary-active",
  accent:
    "bg-accent text-accent-contrast hover:bg-accent-hover active:bg-accent-active",
  outline:
    "border border-white/60 text-white hover:bg-white/10 active:bg-white/20",
};

/** Button-styled link to wa.me with a pre-filled message. Renders nothing if no number is configured. */
export default function WhatsAppLink({ variant = "solid", size = "md", message, children, className = "" }) {
  const href = whatsappUrl(message);
  if (!href) return null;
  const pad = size === "lg" ? "px-6 py-3.5 text-base" : "px-4 py-2.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors ${pad} ${styles[variant]} ${className}`}
    >
      <WhatsAppGlyph />
      {children ?? "WhatsApp us"}
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.4 4.4c-.16 0-.43.06-.65.3-.23.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.13.16 1.76 2.68 4.25 3.76 2.07.82 2.49.65 2.94.61.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.38.1-.5.11-.11.25-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47Z" />
    </svg>
  );
}

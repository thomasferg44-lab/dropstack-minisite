import { useState } from "react";
import { config } from "../lib/config.js";
import WhatsAppLink from "./WhatsAppLink.jsx";

export default function Header({ nav = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 min-w-0" aria-label={`${config.businessName} home`}>
          {config.logoUrl && (
            <img src={config.logoUrl} alt="" width="40" height="40" className="size-9 lg:size-10 shrink-0" />
          )}
          <span className="font-display font-semibold text-lg lg:text-xl text-gray-900 truncate">
            {config.businessName}
          </span>
        </a>

        {nav.length > 0 && (
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {nav.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                {label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WhatsAppLink />
          </div>
          {nav.length > 0 && (
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center size-10 rounded-md text-gray-700 hover:bg-gray-100"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          )}
        </div>
      </div>

      {nav.length > 0 && open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="md:hidden border-t border-gray-200/70 bg-white">
          <ul className="px-4 py-3 space-y-1">
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-800 hover:bg-primary-soft">
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <WhatsAppLink className="w-full justify-center" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

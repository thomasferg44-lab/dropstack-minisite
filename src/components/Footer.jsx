import { config } from "../lib/config.js";

const socialLabels = { instagram: "Instagram", facebook: "Facebook" };

export default function Footer() {
  const socials = Object.entries(config.socials ?? {}).filter(([, url]) => url);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1">
          <p className="font-display text-white text-lg">{config.businessName}</p>
          <p className="text-sm">© {year} {config.businessName}. All rights reserved.</p>
        </div>
        <div className="flex flex-col sm:items-end gap-3">
          {socials.length > 0 && (
            <ul className="flex gap-5">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-white transition-colors">
                    {socialLabels[key] ?? key}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs">
            Built by{" "}
            <a href="https://dropstack.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              DropStack
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Derives hover/active/tint/contrast shades from the two brand colours in
// companyConfig.js and exposes them as CSS variables. Tailwind's theme maps
// these variables to utilities (see src/index.css), so components never
// touch a hex value.

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n) || full.length !== 6) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    default: h = (r - g) / d + 4;
  }
  return [h * 60, s, l];
}

const hsl = (h, s, l) => `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
const clamp = (v) => Math.min(1, Math.max(0, v));

function luminance([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function shades(name, hex, fallback) {
  const rgb = hexToRgb(hex) ?? hexToRgb(fallback);
  const [h, s, l] = rgbToHsl(rgb);
  return {
    [`--brand-${name}`]: hsl(h, s, l),
    [`--brand-${name}-hover`]: hsl(h, s, clamp(l - 0.07)),
    [`--brand-${name}-active`]: hsl(h, s, clamp(l - 0.12)),
    [`--brand-${name}-soft`]: hsl(h, clamp(s * 0.6), 0.95),
    [`--brand-${name}-contrast`]: luminance(rgb) > 0.4 ? "#111827" : "#ffffff",
  };
}

export function applyTheme({ primaryColor, accentColor }) {
  const vars = {
    ...shades("primary", primaryColor, "#1F2937"),
    ...shades("accent", accentColor, "#4B5563"),
  };
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
}

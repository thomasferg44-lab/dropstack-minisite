// Derives hover/active/tint/contrast shades from the two brand colours in
// companyConfig.js and exposes them as CSS variables. Tailwind's theme maps
// these variables to utilities (see src/index.css), so components never
// touch a hex value.

function hexToRgb(hex) {
  const h = String(hex).replace("#", "");
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

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((v) => Math.round(v * 255));
}

const hsl = (h, s, l) => `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
const clamp = (v) => Math.min(1, Math.max(0, v));

function luminance([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Darkens a colour until it reaches `target` contrast against `bg`.
 *
 * A brand accent picked for buttons and fills is usually too light to be
 * legible as 14px text — the placeholder's #C98A3D sits at 2.92:1 on white,
 * well under the 4.5:1 WCAG AA threshold. Rather than hand-picking a second
 * colour per client, the readable variant is derived, so any accent a client
 * gives us renders accessible small text automatically.
 */
function readableOn([h, s, l], bg, target = 4.5) {
  let lightness = l;
  while (lightness > 0.02 && contrastRatio(hslToRgb(h, s, lightness), bg) < target) {
    lightness -= 0.01;
  }
  return hsl(h, s, clamp(lightness));
}

function shades(name, hex, fallback, inkBg) {
  const rgb = hexToRgb(hex) ?? hexToRgb(fallback);
  const [h, s, l] = rgbToHsl(rgb);
  return {
    [`--brand-${name}`]: hsl(h, s, l),
    [`--brand-${name}-hover`]: hsl(h, s, clamp(l - 0.07)),
    [`--brand-${name}-active`]: hsl(h, s, clamp(l - 0.12)),
    [`--brand-${name}-soft`]: hsl(h, clamp(s * 0.6), 0.95),
    [`--brand-${name}-contrast`]: luminance(rgb) > 0.4 ? "#111827" : "#ffffff",
    // Legible as small text on light backgrounds (WCAG AA, 4.5:1).
    [`--brand-${name}-ink`]: readableOn([h, s, l], inkBg),
  };
}

export function applyTheme({ primaryColor, accentColor }) {
  // Small accent text sits on both white and the primary soft tint. The
  // tint is the darker of the two, so deriving against it satisfies both.
  const primaryRgb = hexToRgb(primaryColor) ?? hexToRgb("#1F2937");
  const [ph, ps] = rgbToHsl(primaryRgb);
  const inkBg = hslToRgb(ph, clamp(ps * 0.6), 0.95);

  const vars = {
    ...shades("primary", primaryColor, "#1F2937", inkBg),
    ...shades("accent", accentColor, "#4B5563", inkBg),
  };
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
}

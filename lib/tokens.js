// Reads the brand kit tokens and the site's role tokens, and resolves var() chains,
// so the contrast test, the share card and <meta name="theme-color"> all use the same values.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
export const KIT_FILE = path.join(root, "src/assets/img/brand/spf-brand-tokens.css");
export const TOKENS_FILE = path.join(root, "src/assets/css/tokens.css");

function parse(css) {
  const out = {};
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of noComments.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

export function readTokens() {
  const kit = fs.existsSync(KIT_FILE) ? parse(fs.readFileSync(KIT_FILE, "utf8")) : {};
  const site = parse(fs.readFileSync(TOKENS_FILE, "utf8"));
  const all = { ...kit, ...site };
  const resolve = (value, depth = 0) => {
    if (depth > 10) throw new Error(`Token loop at ${value}`);
    return value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/g, (_, name, fallback) => {
      if (all[name] !== undefined) return resolve(all[name], depth + 1);
      if (fallback !== undefined) return resolve(fallback.trim(), depth + 1);
      throw new Error(`Unknown token ${name}`);
    });
  };
  const resolved = {};
  for (const [k, v] of Object.entries(all)) resolved[k] = resolve(v);
  return resolved;
}

export function hexToRgb(hex) {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Not a hex colour: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// A string containing "[[" is a placeholder (spec section 5).
export const isPlaceholder = (v) => typeof v === "string" && v.includes("[[");

// Collected during a production build; eleventy.after fails the build if any are left.
export const found = new Map();
export function record(value, where) {
  const key = String(value);
  if (!found.has(key)) found.set(key, new Set());
  found.get(key).add(where || "unknown page");
}

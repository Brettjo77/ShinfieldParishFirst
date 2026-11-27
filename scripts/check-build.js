// Runs after every build. Fails on: placeholders left in a production build, a page without the
// imprint or the "not connected with" line, and broken internal links or anchors.
import fs from "node:fs";
import { htmlFiles, urlOf, checkFooter, checkLinks } from "../lib/checks.js";

const env = ["development", "preview"].includes(process.env.ELEVENTY_ENV) ? process.env.ELEVENTY_ENV : "production";
const prefix = process.env.PATH_PREFIX || "/";
const problems = [];

for (const f of htmlFiles()) {
  const html = fs.readFileSync(f, "utf8");
  for (const p of checkFooter(html)) problems.push(`${urlOf(f)}: ${p}`);
  if (env === "production") {
    const left = [...new Set([...html.matchAll(/\[\[[^\]]*\]\]/g)].map((m) => m[0]))];
    if (left.length) problems.push(`${urlOf(f)}: placeholders left: ${left.join(", ")}`);
  }
}
problems.push(...checkLinks(prefix));

if (problems.length) {
  console.error(`Build check failed (${env}):\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`Build check passed (${env}, ${htmlFiles().length} pages).`);

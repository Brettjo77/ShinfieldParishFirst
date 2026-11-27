// Checks on the built site, shared by scripts/check-build.js and the tests.
import fs from "node:fs";
import path from "node:path";

export const SITE = path.resolve(import.meta.dirname, "../_site");
export const DISCLAIMER = "Shinfield Parish First is an independent group. It is not connected with Shinfield Parish Council or Wokingham Borough Council.";
export const IMPRINT_START = "Promoted by ";

export function htmlFiles(dir = SITE) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlFiles(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

export const urlOf = (file) => "/" + path.relative(SITE, file).replace(/index\.html$/, "").replace(/\\/g, "/");

const text = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function footerOf(html) {
  const m = html.match(/<footer[\s\S]*?<\/footer>/);
  return m ? m[0] : "";
}

export function checkFooter(html) {
  const problems = [];
  const footer = footerOf(html);
  if (!footer) return ["no <footer>"];
  const ft = text(footer);
  if (!ft.includes(DISCLAIMER)) problems.push("footer is missing the 'not connected with' line");
  const imp = footer.match(/<p class="imprint">([\s\S]*?)<\/p>/);
  if (!imp || !text(imp[1]).startsWith(IMPRINT_START) || !text(imp[1]).includes("on behalf of Shinfield Parish First"))
    problems.push("footer is missing the imprint");
  return problems;
}

// Internal links and #anchors must resolve to built files and ids.
export function checkLinks(prefix = "/") {
  const files = htmlFiles();
  const ids = new Map();
  for (const f of files) {
    const html = fs.readFileSync(f, "utf8");
    ids.set(urlOf(f), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  const problems = [];
  for (const f of files) {
    const html = fs.readFileSync(f, "utf8");
    const here = urlOf(f);
    for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      let url = m[1];
      if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
      let [p, hash] = url.split("#");
      if (p === "") p = here;
      else {
        if (!p.startsWith(prefix)) { problems.push(`${here}: link ${url} does not start with the path prefix ${prefix}`); continue; }
        p = "/" + p.slice(prefix.length);
      }
      p = p.split("?")[0];
      const target = path.join(SITE, p.endsWith("/") ? p + "index.html" : p);
      if (!fs.existsSync(target)) { problems.push(`${here}: broken link ${url}`); continue; }
      if (hash && p.endsWith("/") && !ids.get(p)?.has(hash)) problems.push(`${here}: missing anchor ${url}`);
    }
  }
  return problems;
}

// Builds the social share card (1200x630, with the imprint) and the PNG favicons from the
// current tokens and logo files, so a rebrand updates them automatically. Runs after Eleventy.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { readTokens } from "../lib/tokens.js";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "_site/assets/img");
const site = JSON.parse(fs.readFileSync(path.join(root, "src/_data/site.json"), "utf8"));
const t = readTokens();
const isPh = (v) => typeof v === "string" && v.includes("[[");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fontUrl = (f) => "data:font/woff2;base64," + fs.readFileSync(path.join(root, "src/assets/fonts", f)).toString("base64");
const svgUrl = (f) => "data:image/svg+xml;base64," + fs.readFileSync(path.join(root, "src/assets/img/brand", f)).toString("base64");

const imprint = site.imprint.sameAddress
  ? `Promoted by ${site.imprint.promoter} on behalf of Shinfield Parish First, both of ${site.imprint.address}.`
  : `Promoted by ${site.imprint.promoter}, ${site.imprint.address}, on behalf of Shinfield Parish First, ${site.imprint.spfAddress}.`;
if (process.env.ELEVENTY_ENV === "production" && isPh(imprint)) {
  console.error("Share card: the imprint still has a placeholder.");
  process.exit(1);
}

const css = `
@font-face{font-family:H;src:url(${fontUrl("bricolage-grotesque-latin-wght-normal.woff2")});font-weight:200 800}
@font-face{font-family:B;src:url(${fontUrl("atkinson-hyperlegible-latin-400-normal.woff2")});font-weight:400}
@font-face{font-family:B;src:url(${fontUrl("atkinson-hyperlegible-latin-700-normal.woff2")});font-weight:700}
html,body{margin:0}
.card{width:1200px;height:630px;box-sizing:border-box;background:${t["--color-band-bg"]};color:${t["--color-band-text"]};
  display:grid;grid-template-columns:300px 1fr;grid-template-rows:1fr auto;column-gap:56px;padding:64px 72px 0;font-family:B,sans-serif;
  border-bottom:14px solid ${t["--color-rule"]}}
.card img{width:300px;height:300px;align-self:center}
.name{font-family:H,sans-serif;font-weight:800;font-size:84px;line-height:1;letter-spacing:-1.5px;margin:0}
.tag{font-family:H,sans-serif;font-weight:700;font-size:44px;color:${t["--color-band-text"]};margin:18px 0 0;opacity:.9}
.when{font-size:30px;font-weight:700;margin:34px 0 0;padding-top:20px;border-top:4px solid ${t["--color-decoration"]};display:inline-block}
.text{align-self:center}
.imprint{grid-column:1 / -1;font-size:19px;padding:18px 0 20px;border-top:1px solid ${t["--color-rule"]};margin-top:24px}`;

const card = `<!doctype html><meta charset="utf-8"><style>${css}</style>
<div class="card"><img src="${svgUrl("spf-logo-colour-on-dark.svg")}" alt="">
<div class="text"><p class="name">${esc(site.name)}</p><p class="tag">${esc(site.tagline)}</p>
<p class="when">Shinfield Parish Council election · ${esc(site.electionDateText.replace(/^\w+day /, ""))}</p></div>
<p class="imprint">${esc(imprint)}</p></div>`;

const icon = (size) => `<!doctype html><style>html,body{margin:0;background:transparent}img{width:${size}px;height:${size}px;display:block}</style><img src="${svgUrl("spf-logo-colour.svg")}" alt="">`;

fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(card, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, "share-card.png"), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  for (const [size, name] of [[32, "favicon-32.png"], [180, "apple-touch-icon.png"]]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(icon(size), { waitUntil: "load" });
    await page.screenshot({ path: path.join(out, name), omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  }
} finally {
  await browser.close();
}
const kb = Math.round(fs.statSync(path.join(out, "share-card.png")).size / 1024);
console.log(`Images: share-card.png (${kb} KB), favicon-32.png, apple-touch-icon.png`);
if (kb > 300) { console.error("Share card is over 300 KB."); process.exit(1); }

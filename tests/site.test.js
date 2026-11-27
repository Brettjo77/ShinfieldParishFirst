// Static checks on the built site (run `npm run build:preview` or `npm run build` first).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { HtmlValidate, FileSystemConfigLoader } from "html-validate";
import { SITE, htmlFiles, urlOf, checkFooter, checkLinks } from "../lib/checks.js";
import { readTokens, contrast } from "../lib/tokens.js";

const pages = htmlFiles();
const read = (f) => fs.readFileSync(f, "utf8");
const EXPECTED = ["/", "/about/", "/what-a-councillor-does/", "/stand-with-us/", "/have-your-say/", "/contact/", "/privacy/", "/accessibility/", "/thank-you/", "/404.html"];

test("all ten pages are built", () => {
  const urls = pages.map(urlOf).sort();
  assert.deepEqual(urls, [...EXPECTED].sort());
});

test("html-validate passes on every page", async () => {
  const htmlvalidate = new HtmlValidate(new FileSystemConfigLoader());
  const failures = [];
  for (const f of pages) {
    const report = await htmlvalidate.validateFile(f);
    if (!report.valid) for (const r of report.results) for (const m of r.messages) failures.push(`${urlOf(f)}:${m.line} ${m.ruleId}: ${m.message}`);
  }
  assert.deepEqual(failures, []);
});

test("internal links and anchors resolve", () => {
  assert.deepEqual(checkLinks(process.env.PATH_PREFIX || "/"), []);
});

test("every page has the imprint and the 'not connected with' line in the footer", () => {
  const problems = pages.flatMap((f) => checkFooter(read(f)).map((p) => `${urlOf(f)}: ${p}`));
  assert.deepEqual(problems, []);
});

test("every page has a unique title, a 120-160 character description and a canonical on the primary domain", () => {
  const titles = new Set();
  for (const f of pages) {
    const html = read(f);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, `${urlOf(f)} has no title`);
    assert.ok(!titles.has(title), `${urlOf(f)} repeats title ${title}`);
    titles.add(title);
    const desc = html.match(/<meta name="description" content="([^"]+)">/)?.[1] ?? "";
    const len = desc.replace(/&#39;|&quot;|&amp;/g, "x").length;
    assert.ok(len >= 120 && len <= 160, `${urlOf(f)} description is ${len} characters`);
    assert.match(html, /<link rel="canonical" href="https:\/\/shinfieldparishfirst\.org\.uk\//, `${urlOf(f)} canonical`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${urlOf(f)} must have exactly one h1`);
  }
});

test("thank-you and 404 are noindex and left out of the sitemap", () => {
  for (const u of ["thank-you/index.html", "404.html"]) assert.match(read(path.join(SITE, u)), /<meta name="robots" content="noindex">/);
  const sitemap = read(path.join(SITE, "sitemap.xml"));
  assert.ok(!sitemap.includes("thank-you") && !sitemap.includes("404"));
  assert.ok(fs.existsSync(path.join(SITE, "robots.txt")));
});

test("colour tokens meet contrast: 4.5:1 for text, 3:1 for borders and focus", () => {
  const t = readTokens();
  const text = [
    ["--color-text", "--color-bg"], ["--color-text", "--color-surface"],
    ["--color-text-muted", "--color-bg"], ["--color-text-muted", "--color-surface"],
    ["--color-heading", "--color-bg"], ["--color-heading", "--color-surface"],
    ["--color-link", "--color-bg"], ["--color-link", "--color-surface"],
    ["--color-button-text", "--color-button-bg"], ["--color-button-secondary-text", "--color-button-secondary-bg"],
    ["--color-band-text", "--color-band-bg"], ["--color-heading", "--color-band-text"],
    ["--color-error", "--color-surface"], ["--color-error", "--color-bg"],
    ["--color-placeholder-text", "--color-placeholder-bg"], ["--color-ballot-ink", "--color-ballot-paper"],
  ];
  const ui = [
    ["--color-focus", "--color-bg"], ["--color-focus", "--color-surface"], ["--color-band-focus", "--color-band-bg"],
    ["--color-border", "--color-surface"], ["--color-error", "--color-surface"],
  ];
  const fails = [];
  for (const [a, b] of text) { const r = contrast(t[a], t[b]); if (r < 4.5) fails.push(`${a} on ${b}: ${r.toFixed(2)} (needs 4.5)`); }
  for (const [a, b] of ui) { const r = contrast(t[a], t[b]); if (r < 3) fails.push(`${a} on ${b}: ${r.toFixed(2)} (needs 3)`); }
  assert.deepEqual(fails, []);
});

test("no colour values outside the tokens file", () => {
  const dir = "src/assets/css";
  const offenders = fs.readdirSync(dir).filter((f) => f !== "tokens.css" && f.endsWith(".css"))
    .filter((f) => /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(fs.readFileSync(path.join(dir, f), "utf8")));
  assert.deepEqual(offenders, []);
});

test("no tracking: no third-party requests and no cookies", () => {
  const site = JSON.parse(fs.readFileSync("src/_data/site.json", "utf8"));
  const allowed = [site.form.action, site.surveyUrl, site.facebook].filter((u) => /^https?:/.test(u)).map((u) => new URL(u).host);
  if (site.analytics.enabled) allowed.push("gc.zgo.at", `${site.analytics.goatcounterCode}.goatcounter.com`);
  const problems = [];
  for (const f of pages) {
    const html = read(f);
    // Resources the browser loads by itself (scripts, styles, images, fonts, frames, form posts).
    for (const m of html.matchAll(/<(script|link|img|iframe|source|form)\b[^>]*\s(?:src|href|action)="(https?:\/\/[^"]+)"/g)) {
      if (m[1] === "link" && /rel="canonical"/.test(m[0])) continue;
      const host = new URL(m[2]).host;
      if (!allowed.includes(host)) problems.push(`${urlOf(f)}: ${m[1]} loads ${m[2]}`);
    }
    if (/document\.cookie/.test(html)) problems.push(`${urlOf(f)}: writes a cookie`);
    if (/fonts\.googleapis|google-analytics|googletagmanager|recaptcha|connect\.facebook/.test(html)) problems.push(`${urlOf(f)}: third-party tracker`);
  }
  const js = fs.readFileSync("src/assets/js/site.js", "utf8");
  if (/document\.cookie|fetch\(|XMLHttpRequest|localStorage/.test(js)) problems.push("site.js uses cookies, storage or network calls");
  const css = read(path.join(SITE, "assets/css/site.css"));
  if (/url\(\s*["']?https?:/.test(css)) problems.push("site.css loads a remote resource");
  assert.deepEqual(problems, []);
});

test("sign-up form: consent unticked and required, required fields labelled, privacy link, honeypot", () => {
  const html = read(path.join(SITE, "stand-with-us/index.html"));
  const form = html.match(/<form[\s\S]*?<\/form>/)[0];
  assert.match(form, /method="POST"/);
  const consent = form.match(/<input[^>]*id="consent"[^>]*>/)[0];
  assert.ok(!/checked/.test(consent), "consent must be unticked");
  assert.match(consent, /required/);
  for (const id of ["name", "email", "ward", "message", "consent"]) assert.match(form, new RegExp(`<label for="${id}"`), `label for ${id}`);
  assert.match(form, /<input[^>]*id="name"[^>]*autocomplete="name"[^>]*required/);
  assert.match(form, /<input[^>]*id="email"[^>]*type="email"[^>]*autocomplete="email"[^>]*required/);
  assert.match(form, /<fieldset[\s\S]*<legend>/);
  assert.match(form, /href="\/(?:[^"]*\/)?privacy\/"/);
  assert.match(form, /name="form_name" value="signup"/);
  assert.match(form, /name="consent_text" value="I agree to Shinfield Parish First keeping these details/);
  assert.match(form, /class="hp" aria-hidden="true"[\s\S]*tabindex="-1"/);
  assert.match(form, /maxlength="500"/);
  assert.ok(!/type="tel"|name="phone"|name="address"|date of birth/i.test(form), "no extra personal fields");
  const boxes = [...form.matchAll(/name="help" value="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(boxes.length, 7);
  assert.ok(boxes.includes("Be an advocate and spread the word"));
});

test("internal material never appears on the site", () => {
  const banned = [/alder grove/i, /land sale/i, /operator/i];
  const hits = [];
  for (const f of pages) for (const b of banned) if (b.test(read(f))) hits.push(`${urlOf(f)}: ${b}`);
  assert.deepEqual(hits, []);
});

test("nothing claims SPF is registered while ecRegistered is false", () => {
  const site = JSON.parse(fs.readFileSync("src/_data/site.json", "utf8"));
  if (site.ecRegistered) return;
  for (const f of pages) assert.ok(!/We are registered with the Electoral Commission/.test(read(f)), urlOf(f));
});

test("page weight: under 300 KB per page excluding fonts", () => {
  const shared = ["assets/css/site.css", "assets/js/site.js"].reduce((n, p) => n + fs.statSync(path.join(SITE, p)).size, 0);
  for (const f of pages) {
    const html = read(f);
    let size = fs.statSync(f).size + shared;
    for (const m of html.matchAll(/<img[^>]*src="\/([^"]+)"/g)) size += fs.statSync(path.join(SITE, m[1].replace(/^ShinfieldParishFirst\//, ""))).size;
    assert.ok(size < 300 * 1024, `${urlOf(f)} is ${Math.round(size / 1024)} KB`);
  }
  assert.ok(fs.statSync(path.join(SITE, "assets/js/site.js")).size < 10 * 1024, "JavaScript under 10 KB");
});

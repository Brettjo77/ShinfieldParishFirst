import fs from "node:fs";
import path from "node:path";
import { HtmlBasePlugin } from "@11ty/eleventy";
import { isPlaceholder, record, found } from "./lib/placeholders.js";
import { readTokens } from "./lib/tokens.js";

// Fail closed: anything that is not explicitly development or preview is treated as production.
const ENV = ["development", "preview"].includes(process.env.ELEVENTY_ENV) ? process.env.ELEVENTY_ENV : "production";
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (iso) => {
  const [y, m, d] = String(iso).split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

// The CSS is built from these partials, in this order, into one file.
const CSS_PARTS = [
  "src/assets/img/brand/spf-brand-tokens.css",
  "src/assets/css/tokens.css",
  "src/assets/css/fonts.css",
  "src/assets/css/base.css",
  "src/assets/css/layout.css",
  "src/assets/css/components.css",
  "src/assets/css/print.css",
];

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.amendLibrary("md", (md) => md.disable("code"));

  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img/brand/spf-logo-colour.svg": "favicon.svg" });
  eleventyConfig.ignores.add("src/assets/**");
  eleventyConfig.addWatchTarget("src/assets/");

  const today = new Date().toISOString().slice(0, 10);
  const tokens = readTokens();

  eleventyConfig.addGlobalData("build", {
    env: ENV,
    isProduction: ENV === "production",
    pathPrefix: PATH_PREFIX,
    // Preview builds, and any production build not on the primary domain, are kept out of search engines.
    // LIGHTHOUSE=1 is only used for the Lighthouse check in CI, so the SEO score is measured as it will be live. Never deployed.
    noindex: (ENV !== "production" || PATH_PREFIX !== "/") && !process.env.LIGHTHOUSE,
    today,
    year: today.slice(0, 4),
    themeColor: tokens["--brand-primary"],
    css: () => CSS_PARTS.map((f) => `/* ${path.basename(f)} */\n` + fs.readFileSync(f, "utf8")).join("\n"),
  });

  // Placeholders: highlighted in development and preview; collected (and the build failed) in production.
  eleventyConfig.addFilter("ph", function (value) {
    if (isPlaceholder(value)) {
      if (ENV === "production") {
        record(value, this.page?.url);
        return escapeHtml(value);
      }
      return `<mark class="placeholder">${escapeHtml(value)}</mark>`;
    }
    return escapeHtml(value ?? "");
  });
  // For attribute values (href, action): never wrapped, still recorded in production.
  eleventyConfig.addFilter("phAttr", function (value) {
    if (isPlaceholder(value) && ENV === "production") record(value, this.page?.url);
    return value;
  });
  eleventyConfig.addFilter("isPh", (v) => isPlaceholder(v));
  eleventyConfig.addFilter("longDate", longDate);
  eleventyConfig.addFilter("isoBefore", (a, b) => String(a) < String(b));
  eleventyConfig.addFilter("published", (items) => (items || []).filter((i) => i.publish === true));
  eleventyConfig.addFilter("consented", (people) => (people || []).filter((p) => p.consent === true));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("orgJsonLd", (site) => {
    const org = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url + "/",
      logo: site.url + "/assets/img/brand/spf-logo-colour.png",
      slogan: site.tagline,
      areaServed: "Shinfield parish, Wokingham, England",
    };
    if (!isPlaceholder(site.facebook)) org.sameAs = [site.facebook];
    return JSON.stringify(org).replace(/</g, "\\u003c");
  });

  // The colour emblem, inline, decorative (the link around it carries the accessible name).
  eleventyConfig.addShortcode("emblem", (fileArg, clsArg) => {
    const file = typeof fileArg === "string" && fileArg ? fileArg : "spf-logo-colour.svg";
    const cls = typeof clsArg === "string" && clsArg ? clsArg : "emblem";
    let svg = fs.readFileSync(path.join("src/assets/img/brand", file), "utf8");
    svg = svg
      .replace(/<\?xml[^>]*\?>\s*/, "")
      .replace(/<metadata>[\s\S]*?<\/metadata>/g, "")
      .replace(/\s+xmlns:c2pa="[^"]*"/, "")
      .replace(/\s+role="img"/, "")
      .replace(/\s+aria-label="[^"]*"/, "")
      .replace(/id="([\w-]+)"/g, 'id="hdr-$1"')
      .replace(/url\(#([\w-]+)\)/g, "url(#hdr-$1)")
      .replace("<svg ", `<svg class="${cls}" aria-hidden="true" focusable="false" `)
      .replace(/\n\s*/g, "");
    return svg;
  });

  eleventyConfig.on("eleventy.after", () => {
    if (ENV === "production" && found.size) {
      const lines = [...found].map(([v, pages]) => `  ${v}  (on ${[...pages].join(", ")})`);
      found.clear();
      throw new Error(
        `Production build stopped: these placeholders still need real values in src/_data/site.json (or the page text):\n${lines.join("\n")}`
      );
    }
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: PATH_PREFIX,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}

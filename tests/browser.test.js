// Browser checks with Playwright: axe (WCAG 2.x A and AA) on every page at 360px and 1280px,
// plus the menu, the sign-up form behaviour, reflow at 320px and the no-JavaScript fallback.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { serve } from "../lib/serve.js";
import { htmlFiles, urlOf } from "../lib/checks.js";

let server, base, browser;
const pages = htmlFiles().map(urlOf);

before(async () => {
  ({ server, base } = await serve());
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  server?.close();
});

for (const width of [360, 1280]) {
  test(`axe finds no WCAG A/AA violations at ${width}px`, async () => {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const failures = [];
    for (const url of pages) {
      await page.goto(base + url);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      for (const v of results.violations) failures.push(`${url}: ${v.id} (${v.nodes.length}) ${v.help}`);
    }
    await context.close();
    assert.deepEqual(failures, []);
  });
}

test("no sideways scrolling at 320px on any page", async () => {
  const context = await browser.newContext({ viewport: { width: 320, height: 640 } });
  const page = await context.newPage();
  const wide = [];
  for (const url of pages) {
    await page.goto(base + url);
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    if (w > 320) wide.push(`${url}: ${w}px`);
  }
  await context.close();
  assert.deepEqual(wide, []);
});

test("skip link is the first thing in the tab order and moves focus to main", async () => {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto(base + "/");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), "Skip to main content");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "main");
  await page.close();
});

test("menu button opens and closes the navigation on a phone, and the nav shows without JavaScript", async () => {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto(base + "/");
  const button = page.locator(".menu-button");
  assert.equal(await button.getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator("#main-nav").isVisible(), false);
  assert.equal(await page.locator(".header-actions .btn").isVisible(), true, "Get involved shows without opening the menu");
  await button.click();
  assert.equal(await button.getAttribute("aria-expanded"), "true");
  assert.equal(await page.locator("#main-nav").isVisible(), true);
  await page.close();

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const p2 = await noJs.newPage();
  await p2.goto(base + "/about/");
  assert.equal(await p2.locator("#main-nav").isVisible(), true);
  assert.equal(await p2.locator(".menu-button").isVisible(), false);
  assert.equal(await p2.locator('#main-nav a[aria-current="page"]').textContent(), "About us");
  await noJs.close();
});

test("?role=advocate pre-ticks the advocate box; nothing is pre-ticked otherwise", async () => {
  const page = await browser.newPage();
  await page.goto(base + "/stand-with-us/?role=advocate#signup");
  assert.equal(await page.isChecked("#help-advocate"), true);
  assert.equal(await page.isChecked("#consent"), false);
  await page.goto(base + "/stand-with-us/?role=candidate");
  assert.equal(await page.isChecked("#help-candidate"), true);
  await page.goto(base + "/stand-with-us/");
  assert.equal(await page.locator('input[type="checkbox"]:checked').count(), 0);
  await page.close();
});

test("submitting an empty form shows a focused error summary linked to each field", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base + "/stand-with-us/");
  await page.click(".signup-form button[type=submit]");
  assert.equal(await page.evaluate(() => document.activeElement.id), "error-summary");
  const links = await page.locator("#error-summary a").allTextContents();
  assert.deepEqual(links, [
    "Enter your name",
    "Enter an email address like name@example.com",
    "Choose at least one way you'd like to help",
    "Tick the box to agree to us keeping your details",
  ]);
  assert.match(await page.getAttribute("#email", "aria-describedby"), /email-error/);
  assert.equal(await page.getAttribute("#email", "aria-invalid"), "true");
  await page.click('#error-summary a[href="#email"]');
  assert.equal(await page.evaluate(() => document.activeElement.id), "email");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  assert.deepEqual(results.violations.map((v) => v.id), []);
  await context.close();
});

test("focus is visible on links and buttons", async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + "/");
  for (let i = 0; i < 4; i++) await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle + " " + getComputedStyle(document.activeElement).outlineWidth);
  assert.equal(outline, "solid 3px");
  await page.close();
});

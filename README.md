# Shinfield Parish First website

The website for **Shinfield Parish First**: independent residents standing under one name in the Shinfield Parish Council election on Thursday 6 May 2027.

It has two jobs: explain what Shinfield Parish First is and why it exists, and recruit candidates and advocates.

The full specification is in [`docs/brief/SPF-WEBSITE-SPEC.md`](docs/brief/SPF-WEBSITE-SPEC.md).

## For non-developers

- **Change wording or settings:** see [`docs/EDITING.md`](docs/EDITING.md).
- **Change the logo or colours after the group decides:** see [`docs/REBRAND.md`](docs/REBRAND.md).
- **Put the site on shinfieldparishfirst.org.uk:** see [`docs/GOING-LIVE.md`](docs/GOING-LIVE.md).

## How it works

The site is built with [Eleventy](https://www.11ty.dev/) into plain HTML pages. GitHub Actions builds, tests and publishes it to GitHub Pages whenever something is merged into `main`, and again every morning at 05:00 UTC so date-based content (the launch meeting notice, the polling day timeline) stays current.

There is no database and no server. The site sets no cookies and loads nothing from other websites: fonts, images and scripts are all served from the site itself.

### Safety catches

- Every variable fact (names, addresses, dates, figures) lives in `src/_data/site.json`.
- Anything still in `[[double brackets]]` is a placeholder. Preview builds show placeholders highlighted in yellow. **A production build refuses to finish while the imprint, contact details, form address or any other required placeholder is still unfilled**, so the site cannot go live with a dummy imprint.
- Every page must carry the election imprint and the line saying we are not connected with Shinfield Parish Council or Wokingham Borough Council. The build and the tests check this.

## Running it on a computer

You need Node.js 22 (see `.nvmrc`).

```sh
npm ci                          # install
npx playwright install chromium # once, for the tests and image generation
npm start                       # local preview at http://localhost:8080 with placeholders highlighted
npm run build:preview           # build a preview into _site/
npm test                        # run all checks against _site/
npm run build                   # production build (fails while placeholders remain)
```

## What the checks cover

`npm test` runs: HTML validation (html-validate), internal link and anchor checks, imprint and disclaimer on every page, title/description/canonical checks, the colour contrast of every text and border pair in the tokens file, a no-tracking check (no third-party requests, no cookies), the sign-up form rules (unticked consent, labels, privacy link, honeypot), a check that internal material never appears, page weight, and Playwright browser tests: axe accessibility checks on every page at 360px and 1280px, no sideways scrolling at 320px, the skip link, the menu button with and without JavaScript, `?role=advocate` pre-ticking, and the form error summary.

Pull requests also run Lighthouse (mobile) on the Home, What a councillor does and Stand with us pages.

## Dependencies, and why

| Package | Why |
|---|---|
| `@11ty/eleventy` | Builds the pages from Markdown and one settings file. |
| `playwright` | Generates the share card and PNG favicons from the logo and colours, and runs the browser tests. |
| `@axe-core/playwright` | Automated accessibility checks (WCAG 2.2 AA). |
| `html-validate` | Checks the built HTML is valid. |

Lighthouse CI (`@lhci/cli`) runs in the pull request workflow only, with `npx`, so it is not installed locally. There are no runtime dependencies: visitors download only HTML, one CSS file, one small JavaScript file (under 5 KB), fonts and images.

`@11ty/eleventy-img` (responsive images) is not used yet because the site has no photographs. Add it when steering group photos arrive.

## Layout

```
src/_data/site.json         all settings and placeholders
src/_data/achievements.json Brett's council record, item by item, with status and source
src/_data/people.json       steering group (nobody is shown without "consent": true)
src/*.md                    one file per page
src/_includes/              page layout and shared pieces (header, footer, imprint, form, ballot)
src/assets/css/tokens.css   the only place colours and fonts are set
src/assets/img/brand/       logo kit (replace these files to rebrand)
scripts/                    share card and favicon generation, post-build checks
tests/                      automated checks
docs/                       hand-over notes and the original brief
```

## Licence

Code: MIT. Content, name and logos: all rights reserved to Shinfield Parish First. See [LICENSE](LICENSE).

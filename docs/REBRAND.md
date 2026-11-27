# Rebranding after the group decides

The interim brand is Damson and Copper with Concept B "Field and path" (Brett, 27 November 2026). Everything visual comes from two places, so a rebrand touches only these:

## 1. Logo files: `src/assets/img/brand/`

Replace these files with new ones **of the same names**:

- `spf-logo-colour.svg` (header emblem, favicons)
- `spf-logo-colour-on-dark.svg` (footer, share card)
- `spf-emblem-ballot-bw.svg` (ballot illustration on Home)
- the matching `.png` files and lockups
- `spf-brand-tokens.css` (the kit's colour and font values: `--spf-damson`, `--spf-copper`, `--spf-copper-text`, `--spf-stone`, `--spf-ink`, `--spf-green`)

## 2. Colour roles: `src/assets/css/tokens.css`

If the new kit uses the same variable names, nothing else changes. If the names differ, update the six `--brand-*` lines at the top so they point at the new values.

## 3. Check

Open a pull request. The checks will:

- rebuild the share card and favicons from the new logo and colours,
- **fail clearly** if any text or border colour pair falls below WCAG contrast (4.5:1 for text, 3:1 for borders and focus), naming the pair,
- re-run the accessibility tests on every page.

Rules that still apply: no blue, red, orange or yellow, emerald green, turquoise or teal as main colours (they read as national parties), and no Shinfield Parish Council greens (#2F4235, #BCCE62) as backgrounds, headings or buttons.

If the tagline changes, edit `tagline` in `src/_data/site.json`. Fonts live in `src/assets/fonts/` with `src/assets/css/fonts.css`.

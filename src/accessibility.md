---
layout: layouts/base.njk
title: "Accessibility statement · Shinfield Parish First"
description: "How we make the Shinfield Parish First website accessible, how it was tested against WCAG 2.2 AA, known issues, and how to ask for information another way."
permalink: /accessibility/
lastReviewed: "2026-11-27"
---
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Accessibility</p>
<h1>Accessibility statement</h1>

We want everyone in the parish to be able to use this website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.

## What we've done

- Large, clear text in a typeface designed for readers with low vision
- Colours checked for contrast, and meaning never carried by colour alone
- Works with a keyboard alone, with a visible focus outline
- Pages work on small phone screens and when zoomed to 400%
- Forms with clear labels and error messages in words
- No cookies, pop-ups or anything that moves on its own

## How we tested it

On {{ lastReviewed | longDate }} every page was checked with automated accessibility tests (axe) at phone and desktop widths, and with a keyboard-only check of every page and the sign-up form. Screen reader checks with VoiceOver on iPhone and NVDA on Windows will be done before the site goes live.

## Known issues

None known at the moment. If you find a problem, please tell us.

## Getting information another way

If you need anything on this website in another format, such as large print, or you have trouble using it, email us at {{ site.email | ph | safe }} and we'll help.

This statement was last reviewed on {{ lastReviewed | longDate }}.

</div>
</section>

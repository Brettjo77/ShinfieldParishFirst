---
layout: layouts/base.njk
title: "Privacy notice · Shinfield Parish First"
description: "How Shinfield Parish First collects, uses and protects your details when you sign up, take our survey or email us, and your rights under UK data protection law."
permalink: /privacy/
lastUpdated: "2026-11-27"
reviewStatus: "[[Draft privacy notice: Brett to review before going live]]"
---
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Privacy</p>
<h1>Privacy notice</h1>
<p class="small-note">Last updated {{ lastUpdated | longDate }}. {{ reviewStatus | ph | safe }}</p>

## Who we are

Shinfield Parish First is a group of independent residents standing in the Shinfield Parish Council election. You can contact us by email at {{ site.email | ph | safe }} or by post at {{ site.postalAddress | ph | safe }}.

The data controller is {{ site.privacy.controller | ph | safe }}.

## What we collect

Through the sign-up form: your name, your email address, your ward (if you choose to tell us), how you'd like to help (for example standing, or helping as an advocate), anything else you choose to tell us, and a record that you gave consent and the wording you agreed to.

Through the survey: your answers, and your contact details only if you choose to give them.

Through email: whatever you send us.

## Why we use it, and our lawful basis

We use your details to contact you about the campaign and the ways you offered to help.

Because supporting a political group can reveal your political opinions, we rely on your explicit consent (UK GDPR Article 6(1)(a) and Article 9(2)(a)). You can withdraw your consent at any time by emailing us. Withdrawing it does not affect anything we did before you withdrew it.

## Who handles it for us

Our form service, {{ site.form.provider | ph | safe }}, stores sign-up form submissions on our behalf under a data processing agreement. It stores data {{ site.form.dataLocation | ph | safe }}.

The survey is run by {{ site.surveyProvider | ph | safe }}, which stores survey answers on our behalf.

GitHub hosts this website. Like any web host, it receives visitors' IP addresses in its server logs. We cannot see them.
{%- if site.analytics.enabled %}

We use GoatCounter to count visits to this website. It does not use cookies and does not collect personal data.
{%- endif %}

## What we don't do

We don't sell your details or share them with other parties or campaigns. This website sets no cookies, uses no tracking and shows no adverts.

## How long we keep it

We delete sign-up details by {{ site.privacy.retainUntil | ph | safe }}, unless you've joined as a member or asked us to keep in touch. Survey answers are anonymised for the published summary, and the raw responses are deleted by the same date.

## Your rights

You have the right to:

- ask for a copy of the details we hold about you
- ask us to correct them
- ask us to delete them
- withdraw your consent
- object to how we use them

To do any of these, email us at {{ site.email | ph | safe }}.

You can also complain to the Information Commissioner's Office at [ico.org.uk](https://ico.org.uk/) or on 0303 123 1113.

## Changes to this notice

If we change this notice, we'll update the date at the top of this page.

</div>
</section>

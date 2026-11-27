---
layout: layouts/base.njk
title: "Contact · Shinfield Parish First"
description: "Get in touch with Shinfield Parish First about the May 2027 parish council election, the parish council or getting involved. Email, Facebook or post."
permalink: /contact/
cta: advocate
---
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Contact</p>
<h1>Get in touch</h1>

Ask us anything about the election, the parish council or how to get involved. We'll give you a straight answer.

<ul class="contact-list">
<li><strong>Email:</strong> {% if site.email | isPh %}{{ site.email | ph | safe }}{% else %}<a href="mailto:{{ site.email }}">{{ site.email }}</a>{% endif %}</li>
{%- if not (site.facebook | isPh) %}
<li><strong>Facebook:</strong> <a href="{{ site.facebook }}">Shinfield Parish First on Facebook</a></li>
{%- elif not build.isProduction %}
<li><strong>Facebook:</strong> {{ site.facebook | ph | safe }} <span class="small-note">(hidden on the live site until set)</span></li>
{%- endif %}
<li><strong>Post:</strong> {{ site.postalAddress | ph | safe }}</li>
</ul>

<p>Looking for Shinfield Parish Council itself? It has <a href="{{ site.links.parishCouncil }}">its own website</a> and office at the School Green Centre. We are a separate group.</p>
</div>
</section>

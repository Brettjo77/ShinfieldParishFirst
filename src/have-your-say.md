---
layout: layouts/base.njk
title: "Have your say · Shinfield Parish First"
description: "Tell Shinfield Parish First what the parish council should do next: a five-minute survey on facilities, priorities and how you like to be kept informed."
permalink: /have-your-say/
cta: advocate
---
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Have your say</p>
<h1>What should the parish do next?</h1>

Our candidates will stand on what residents tell us. The survey takes about five minutes.

Questions it asks:

- Which parish facilities do you use, and what's missing?
- What is the one thing you'd most like the parish council to do in the next four years?
- How would you like the council to keep you informed?

{% if site.surveyUrl | isPh %}
<p class="survey-soon"><strong>The survey opens soon.</strong>{% if not build.isProduction %} {{ site.surveyUrl | ph | safe }}{% endif %}</p>
{% else %}
<p><a class="btn" href="{{ site.surveyUrl }}">Take the survey<span class="btn-note"> (opens on {{ site.surveyProvider | ph | safe }}'s website)</span></a></p>
{% endif %}

We publish a summary of the results. We never share your details.

</div>
</section>

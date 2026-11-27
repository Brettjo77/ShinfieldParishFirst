---
layout: layouts/base.njk
title: "Stand with us · Shinfield Parish First"
description: "Stand for Shinfield Parish Council in May 2027 or back us as an advocate. Who can stand, the road to polling day, and how to put your name forward."
permalink: /stand-with-us/
---
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Stand with us</p>
<h1>Stand with us</h1>

There are two ways to stand with Shinfield Parish First: put yourself forward for a seat, or back us as an advocate. Either way, we won't ask about your party politics. All we ask is that you put the parish first.

<nav class="on-page" aria-label="On this page">
<ul>
<li><a href="#stand">Stand for a seat</a></li>
<li><a href="#advocate">Be an advocate</a></li>
<li><a href="#signup">Put your name forward</a></li>
</ul>
</nav>
</div>
</section>

<section class="section section-alt">
<div class="wrap prose">
<h2 id="stand">Could you be a parish councillor?</h2>

You don't need experience. You need to care about the parish and be willing to give {{ site.timeCommitment }}.

## Who can stand

You must be 18 or over on nomination day, a British, Irish or qualifying Commonwealth citizen or an eligible EU citizen, and meet at least one of these:

- You are on the electoral register for the parish
- You have lived in the parish, or within 3 miles (4.8km) of it, for the last 12 months
- Your main place of work has been in the parish for the last 12 months
- You have owned or rented land or premises in the parish for the last 12 months

Some people are disqualified, for example employees of the parish council. We'll go through the full rules with you. {% if site.links.ecCandidateGuidance | isPh %}<span class="link-pending">Electoral Commission guidance for parish candidates {{ site.links.ecCandidateGuidance | ph | safe }}</span>{% else %}<a href="{{ site.links.ecCandidateGuidance }}">Electoral Commission guidance for parish candidates</a>{% endif %}

## The road to 6 May

<ol class="timeline">
<li><strong>January 2027.</strong> Launch meeting, steering group formed, candidates start coming forward</li>
<li><strong>February.</strong> Candidate conversations, a shared statement of what we stand for</li>
<li><strong>March.</strong> Leaflets, door knocking, meeting residents in every ward</li>
<li><strong>Early April.</strong> Nomination papers in. Deadline {{ site.nominationDeadlineText }}{% if not site.nominationDeadlineConfirmed %} (to be confirmed with Wokingham elections){% endif %}</li>
<li><strong>Thursday 6 May.</strong> Polling day{% if state.afterElection %} (held){% endif %}</li>
</ol>
</div>
</section>

<section class="section">
<div class="wrap prose">
<h2 id="advocate">Be an advocate</h2>

You don't have to stand to make a difference. Advocates are residents who believe the parish council should be run by local people who answer to the parish. You don't need to join anything or belong to any party. You could:

- Tell friends and neighbours what the parish council does and why this election matters
- Share our posts on Facebook and in local groups
- Deliver leaflets on your street
- Put a poster in your window at election time
- Come to a meeting and bring someone with you
- Suggest someone who would make a good councillor

Do as much or as little as you like. We'll never pass your details to anyone else.

<p><a class="btn btn-secondary" href="/stand-with-us/?role=advocate#signup">Sign up as an advocate</a></p>
</div>
</section>

<section class="section section-alt">
<div class="wrap prose">
<h2 id="signup">Put your name forward</h2>
<p>Tell us how you'd like to help and we'll be in touch.</p>
{% include "partials/signup-form.njk" %}
</div>
</section>

---
layout: layouts/base.njk
title: "Shinfield Parish First: local people standing for the parish"
description: "Independent residents standing together for Shinfield Parish Council on 6 May 2027. No national party, no whip. Find out how you could stand or help."
permalink: /
cta: stand
jsonld: true
---
<section class="hero">
<div class="wrap">
<p class="eyebrow">Shinfield Parish Council election · {{ site.electionDateText }}</p>
<h1>Local people, standing for the parish. No national party. No whip.</h1>
<p class="lead">Shinfield Parish First is a group of independent residents who want to serve on Shinfield Parish Council. Each of us keeps our own voice. We share one name on the ballot so you can tell who we are.</p>
<p class="btns"><a class="btn" href="/stand-with-us/">Could you stand?</a> <a class="btn btn-secondary" href="/stand-with-us/#advocate">Back us without standing</a></p>
<p><a href="/what-a-councillor-does/">What does a parish councillor do?</a></p>
<ul class="facts">
<li><span class="fact-number">{{ site.seats }}</span> <span class="fact-label">seats on the parish council</span></li>
<li><span class="fact-number">{{ site.majority }}</span> <span class="fact-label">makes a majority</span></li>
{%- if not (build.isProduction and (site.wardCount | isPh)) %}
<li><span class="fact-number">{{ site.wardCount | ph | safe }}</span> <span class="fact-label">wards across the parish</span></li>
{%- endif %}
</ul>
</div>
</section>

<section class="section">
<div class="wrap prose">

## Why we exist

Parish councils look after the things on our doorstep: pitches, play areas, halls, open spaces, and the parish's voice on planning. Those decisions should be made by people who answer to the parish, not to a national party line.

In May 2027 every one of the {{ site.seats }} seats is up for election. We want residents to have a real local choice in every ward, so we are bringing together independent people who will each think for themselves and put the parish first.

[Read more about us](/about/)

</div>
</section>

<section class="section section-alt">
<div class="wrap">
<h2>How we will look on the ballot</h2>
{% include "partials/ballot.njk" %}
</div>
</section>

<section class="section">
<div class="wrap">
<h2>What we stand for</h2>
<ul class="cards cards-4">
<li class="card"><h3>Facilities across the whole parish.</h3><p>Sport, play and meeting space in Shinfield, Spencers Wood, Three Mile Cross and Grazeley, not just one corner.</p></li>
<li class="card"><h3>Fair prices for residents.</h3><p>Pitches, courts and halls that local people and clubs can afford to use.</p></li>
<li class="card"><h3>Clubs and residents together.</h3><p>Working with the groups that already make the parish work.</p></li>
<li class="card"><h3>Straight answers.</h3><p>Saying clearly what the parish can do, what it can't, and why.</p></li>
</ul>
</div>
</section>

<section class="section section-alt">
<div class="wrap">
<h2>Two ways to help</h2>
<ul class="cards cards-2">
<li class="card card-action"><h3>Stand for a seat.</h3><p>You don't need experience or a party. You need to care about the parish and give {{ site.timeCommitment }}.</p><p><a class="btn" href="/stand-with-us/">Could you stand?</a></p></li>
<li class="card card-action"><h3>Be an advocate.</h3><p>Not ready to stand? Back the idea. Talk to neighbours, share our posts, deliver a few leaflets or put a poster in your window. Whatever your politics, you're welcome.</p><p><a class="btn btn-secondary" href="/stand-with-us/#advocate">Back us without standing</a></p></li>
</ul>
</div>
</section>
{%- if state.showLaunchMeeting %}

<section class="section">
<div class="wrap prose">
<h2>Public launch meeting</h2>
<p class="meeting-when"><strong>{{ site.launchMeeting.date }}, {{ site.launchMeeting.venue }}.</strong>{% if not site.launchMeeting.confirmed %} (to be confirmed){% endif %}</p>
<p>Come and hear what a parish councillor really does, what the parish council spends and decides, and how you could stand or help. Free, everyone welcome, step-free access.</p>
{%- if state.calendarFile %}
<p><a href="/launch-meeting.ics" download>Add to your calendar</a></p>
{%- endif %}
</div>
</section>
{%- endif %}

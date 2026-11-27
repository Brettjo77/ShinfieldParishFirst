---
layout: layouts/base.njk
title: "About us · Shinfield Parish First"
description: "Why Shinfield Parish First exists, who founded it, and the parish projects Brett Johnson has worked on with Shinfield Parish Council as Facilities chair."
permalink: /about/
cta: advocate
---
<section class="section">
<div class="wrap prose">
<p class="eyebrow">About us</p>
<h1>Why Shinfield Parish First?</h1>

Parish councils should be run by people who answer to the parish. We want a full team of capable local candidates on the ballot in May 2027, so residents have a real choice.

Shinfield Parish First is open to anyone who lives or works in the parish and shares our aims. We are not part of any national party and we do not tell our councillors how to vote. What links us is a commitment to put the parish first, to work together across the wards, and to give residents straight answers.

{% if site.ecRegistered %}We are registered with the Electoral Commission as a local party, only for Shinfield Parish Council elections.{% else %}We are registering as a local party with the Electoral Commission, only for Shinfield Parish Council elections.{% endif %} That is simply what lets independents share a name and emblem on the ballot paper.

</div>
</section>

<section class="section section-alt">
<div class="wrap prose">
<h2>Founded by {{ site.founder.name }}</h2>
<figure class="pull-quote">
<blockquote><p>“I joined the parish council in 2025 with no background in local government. It's been rewarding, demanding and worthwhile.”</p></blockquote>
<figcaption>{{ site.founder.name }}, {{ site.founder.role }}</figcaption>
</figure>

Brett is a long-time resident who joined Shinfield Parish Council in 2025 with no background in local government, and now chairs its Facilities Committee. The projects below are decisions and work of the council and its committees. Brett's part in each is described as the council's own records show it.

<ol class="record">
{%- for item in achievements | published %}
<li class="record-item">
<h3>{{ item.title }}</h3>
<p>{{ item.text }}</p>
<p class="record-status"><strong>Status:</strong> {{ item.statusText | ph | safe }}</p>
<p class="record-source">Source: {{ item.source }}. Last checked {{ item.lastChecked | longDate }}.</p>
</li>
{%- endfor %}
</ol>
<p class="small-note">These were decisions of Shinfield Parish Council and its committees. This site is not run by or connected with the parish council.</p>
</div>
</section>

<section class="section">
<div class="wrap prose">
<h2>Who else is involved</h2>
{%- set people = people | consented %}
{%- if people.length %}
<ul class="people">
{%- for person in people %}
<li class="person">{% if person.photo %}<img src="{{ person.photo }}" alt="" width="96" height="96">{% endif %}<h3>{{ person.name }}</h3><p class="person-ward">{{ person.ward }}</p><p>{{ person.line }}</p></li>
{%- endfor %}
</ul>
{%- else %}
<p>Steering group members, added after the launch meeting with their permission.</p>
{%- endif %}
</div>
</section>

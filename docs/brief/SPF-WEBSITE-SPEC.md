# Shinfield Parish First website: build specification

**For:** Claude Code (or any developer), building in `https://github.com/Brettjo77/ShinfieldParishFirst`
**Owner:** Brett (GitHub `Brettjo77`)
**Version:** 1.1, 27 November 2026 (adds the two purposes, advocate recruitment, the interim brand, and Brett's corrected track record). Replaces `BUILD-BRIEF.md`. Project folder: `website/brief/`.
**Status:** content approved as draft; interim brand Damson and Copper with Concept B, provisional until Brett's group meets (about 11 December 2026).

---

## 0. How to use this document

1. Read the whole spec before writing code. Sections 3 (rules) and 13 (acceptance) are binding.
2. The repository was empty on 27 November 2026. Build from scratch on a branch, open a pull request, and let Brett merge.
3. Copy the page wording in section 6 exactly. Do not rewrite, shorten or "improve" it without Brett's say-so. Anything in `[[double brackets]]` is a placeholder (see section 5).
4. Reference files that come with this spec (put them in `docs/brief/` in the repo):
   - `SPF-WEBSITE-SPEC.md` (this file)
   - `spf-website-draft.html`: the approved draft layout and wording, a single page with hash routing. Use it for look and tone; the real site has one URL per page. Where the draft and this spec differ (Brett's track record, time commitment, logo), this spec wins.
   - `brand/`: the interim logo kit (Concept B "Field and path", Damson and Copper), with its own README and tokens file.
5. **Do not** buy anything, create accounts, sign up to services, change DNS, change GoDaddy or GitHub account settings, or publish to the live domain. Section 10 tells Brett what to click; you only prepare the repo and say when it is ready.

---

## 1. What the site is for

Shinfield Parish First (SPF) is a group of independent residents standing under one shared name in the **Shinfield Parish Council election on Thursday 6 May 2027**. The council has **18 seats** from May 2027, so **10 is a majority**. SPF is registering with the Electoral Commission as a minor party for parish elections only, so that independents can share a name and emblem on the ballot. Each councillor keeps their own voice; there is no whip.

The site has **two main purposes** (Brett, 27 November 2026). Every page must serve at least one of them, and the home page must serve both above the fold on a phone:

1. **Inform: what SPF is and why it exists.** A visitor should leave knowing that SPF is local, independent residents sharing one name on the ballot; that it belongs to no national party and has no whip; why that matters for a parish council (the council should answer to the parish, not to a party line); and what a parish councillor actually does and can and cannot do.
2. **Recruit non-political advocates.** People who care about the parish and are not standing for a party, in two groups:
   - **Candidates** for all 18 seats, across every ward.
   - **Advocates**: supporters who back the idea without standing. They talk to neighbours, share posts, deliver leaflets, display a window poster, come to meetings, and help find candidates. "Non-political" means non-party: nobody is asked about their party politics, and no party membership is needed.

Supporting jobs: gather residents' views (survey link) and give a way to get in touch.

Every page ends with a call to action pointing at one of the two recruitment routes (section 6.12).

Audience: residents of Shinfield, Spencers Wood, Three Mile Cross and Grazeley, many on phones, many older, many who have never read a council agenda.

Tone: warm, plain English, short sentences, straight answers. Not partisan, never attacks other people or parties.

---

## 2. Domains

| Domain | Role |
|---|---|
| `shinfieldparishfirst.org.uk` | **Primary.** Canonical URL for every page. |
| `www.shinfieldparishfirst.org.uk` | Redirects to the primary (GitHub Pages does this automatically). |
| `shinfieldparishfirst.co.uk` and `www.` | Permanent (301) redirect to the primary, set up in GoDaddy (section 10.4). |

Both domains are registered by Brett at GoDaddy. Canonical base URL in config: `https://shinfieldparishfirst.org.uk`. Email addresses are on hold (see placeholders); the site shows whatever `site.email` is set to.

---

## 3. Non-negotiable rules

These come from election law, data protection law and the group's own decisions. A page that breaks one of them fails acceptance.

### 3.1 Election imprint on every page
UK law (Elections Act 2022, digital imprints) requires election material published online to show who promoted it. The footer of **every page** must carry:

> Promoted by `[[promoter name]]` on behalf of Shinfield Parish First, both of `[[promoter address]]`.

- Drive it from `site.imprint.promoter` and `site.imprint.address` in one data file. If the promoter's address is the same as SPF's, use the "both of" form above; if different, use: "Promoted by `[[name]]`, `[[address]]`, on behalf of Shinfield Parish First, `[[SPF address]]`." Support both via config (`site.imprint.sameAddress: true|false`).
- The imprint must be real text (not an image), visible without clicking, and included in the printed version of the page.
- Social share images (section 9.3) are also digital material. Either include a short imprint line on the image or make sure every post carries it. The default share image built here **must** include the imprint in small type.
- **Build must fail** if the imprint still contains a placeholder when building for production (section 11.3).
- Before going live, Brett checks the wording against the Electoral Commission's current imprint guidance.

### 3.2 Not the parish council
Every page footer must say:

> Shinfield Parish First is an independent group. It is not connected with Shinfield Parish Council or Wokingham Borough Council.

And:
- No Shinfield Parish Council crest, logo, photos or documents.
- Do not use SPC's colours as main colours: SPC dark green `#2F4235` and lime `#BCCE62` are banned as backgrounds, headings or buttons. The soft olive in our palette (section 4) is for small details only.
- Brett's record is always phrased as work done "as Facilities chair" or "working with the council", because the decisions were the council's. Keep the sentence on the About page that says so.
- The Contact page keeps the line pointing people who want the council itself to the council.

### 3.3 Data protection (UK GDPR)
- Signing up to a political campaign reveals political opinions, which is **special category data**. So the sign-up form needs **explicit, unticked consent**, a link to the privacy notice next to the tick box, and must collect only what is listed in section 7.
- No data is stored by the website itself. Submissions go to one third-party form service chosen by Brett (section 7.3).
- The site sets **no cookies** and uses **no third-party trackers**. Fonts, images and scripts are self-hosted. No Google Fonts, Google Analytics, reCAPTCHA, Facebook pixel, YouTube embeds or social "like" widgets. If any future feature needs a cookie, it needs a consent banner first and Brett's approval.

### 3.4 Accessibility
WCAG 2.2 level AA throughout (section 8). This is a requirement, not a nice to have.

### 3.5 Honesty
- No figures without a source. The precept and Band D figures carry a "last checked" date in config and are shown with it.
- Nothing claims SPF is registered with the Electoral Commission until `site.ecRegistered` is `true`.

---

## 4. Brand: provisional, built to be swapped

Brett's group decides the name styling, colours and logo by about 11 December 2026. **Everything visual must come from design tokens in one file** (`src/assets/css/tokens.css`) plus the logo files in `src/assets/img/brand/`, so a re-skin is a change to those two places only. No colour hex values anywhere else in the CSS.

### 4.1 Logo (interim pick: Concept B "Field and path")
Brett's interim choice on 27 November 2026: **Damson and Copper palette with Concept B, "Field and path"**. A circular emblem: ploughed furrows and a path leading to a village on the horizon (a house, a plain spire, a house). It nods to the "field" in Shinfield and the parish's farmland, with the idea of a clear way forward. The group may still change it when it meets in mid-December.

The interim logo kit is in `docs/brief/brand/` (see its `README.md`):

| File | Use on the site |
|---|---|
| `spf-lockup-light.svg` / `.png` | Header lockup (emblem, name, "Parish before party") on light backgrounds |
| `spf-lockup-dark.svg` / `.png` | Footer or damson bands, and the base for the social share card |
| `spf-logo-colour.svg` / `.png` | Emblem alone on light backgrounds; favicon source |
| `spf-logo-colour-on-dark.svg` / `.png` | Emblem alone on damson backgrounds |
| `spf-emblem-ballot-bw.svg` / `.png` | Ballot illustration on the home page (black and white, as it would print) |
| `spf-lockup-bw.svg` / `.png` | Print stylesheet |
| `spf-brand-tokens.css` | Source colour and font values (section 4.2 maps them to roles) |

Rules:
- Copy the kit into `src/assets/img/brand/` unchanged. A rebrand replaces these files with new ones of the same names.
- The lockup SVGs use live text in Bricolage Grotesque. On the website, build the header lockup in HTML instead: the emblem SVG inline (`aria-hidden="true"`) plus the name and tagline as real text in the self-hosted heading font. The link text "Shinfield Parish First, home" is the accessible name. Use the lockup PNGs only where the font cannot load, such as the share card generator.
- Minimum emblem size on screen: 40px. Clear space: a quarter of the emblem's width on all sides.
- The kit README mentions Google Fonts; **the website must not use them** (section 3.3). Self-host the fonts instead.
- Other concepts (Oak and landmarks, Shinfield landmarks) are on the brand page for the group to weigh. Do not build them.

### 4.2 Colour tokens (interim pick: Damson and Copper, with a hint of olive)

The website imports `spf-brand-tokens.css` from the kit and maps it to its own names, so new kit values flow straight through. Equivalent values:

```css
:root {
  /* Brand: values from the kit (--spf-damson, --spf-copper, --spf-copper-text, --spf-stone, --spf-ink, --spf-green). Interim pick Damson & Copper (Brett, 27 Nov 2026). Swap these when the group decides */
  --brand-primary:        #4B2340; /* Damson: headings, header, primary buttons */
  --brand-accent:         #B8642E; /* Copper: decoration, large display text only */
  --brand-accent-strong:  #9A4F1F; /* Copper, darkened: links, small accent text, button backgrounds */
  --brand-paper:          #F2ECE6; /* Cream: page background */
  --brand-ink:            #241A21; /* Body text */
  --brand-olive:          #A5BA5E; /* Soft olive: logo ground line, thin rules, small details ONLY */

  /* Roles: components use these, never the brand values directly */
  --color-bg: var(--brand-paper);
  --color-surface: #FFFFFF;
  --color-text: var(--brand-ink);
  --color-heading: var(--brand-primary);
  --color-link: var(--brand-accent-strong);
  --color-button-bg: var(--brand-primary);
  --color-button-text: #FFFFFF;
  --color-focus: var(--brand-accent-strong);
  --color-placeholder-bg: #FFF3B0; /* highlights unfilled [[placeholders]] in preview builds */
}
```

Contrast checked on 27 November 2026 (WCAG ratios):

| Pair | Ratio | Allowed use |
|---|---|---|
| Ink on cream | 14.4 | Body text |
| Damson on cream | 11.1 | Headings, buttons (cream or white text on damson: 11.1) |
| Copper `#B8642E` on cream | 3.7 | Large text (24px+, or 19px bold) and decoration only |
| White on copper `#B8642E` | 4.3 | **Fails** for normal text. Do not use. |
| Copper strong `#9A4F1F` on cream | 5.1 | Links, small accent text |
| White on copper strong | 6.0 | Secondary buttons |
| Olive on cream | 1.8 | **Decoration only.** Never text, icons or form borders. |
| Olive on damson | 6.1 | Small details on dark areas |

A test (section 11.2) must check every role pair in the tokens file meets 4.5:1 for text and 3:1 for UI borders and focus rings, so a new palette cannot ship failing contrast.

Not allowed in any palette: blue, red, orange/yellow as main colours, bright emerald green, turquoise or teal (these read as national parties), or SPC's greens as main colours.

Dark mode: not required for launch. Do not add `prefers-color-scheme` styles until the palette is final.

### 4.3 Fonts
- Headings: **Bricolage Grotesque** (variable, weights 600 to 800).
- Body and UI: **Atkinson Hyperlegible** (400 and 700, regular and italic). Chosen for low-vision readability.
- Both are SIL Open Font License. **Self-host** WOFF2 files in `src/assets/fonts/` with the licence text alongside. Subset to Latin. `font-display: swap`. Preload the body regular and the heading font only.
- Tokens: `--font-heading`, `--font-body`, with sensible system fallbacks (`system-ui, sans-serif`).
- Type scale: base 18px on mobile and desktop (older readers), line height 1.6, measure about 65 characters. Use a fluid scale with `clamp()`. Never below 16px for any text, including the footer imprint.

### 4.4 Tagline
"Parish before party" (provisional). From `site.tagline`.

---

## 5. Site settings and placeholders

All variable facts live in `src/_data/site.json`. Templates never hard-code them.

```json
{
  "name": "Shinfield Parish First",
  "tagline": "Parish before party",
  "url": "https://shinfieldparishfirst.org.uk",
  "lang": "en-GB",
  "electionDate": "2027-05-06",
  "electionDateText": "Thursday 6 May 2027",
  "seats": 18,
  "majority": 10,
  "wardCount": "[[5, confirm for 2027]]",
  "wards": ["Shinfield Village", "Shinfield North", "Spencers Wood and Three Mile Cross", "Spencers Wood South", "Grazeley"],
  "wardsConfirmed": false,
  "ecRegistered": false,
  "imprint": {
    "promoter": "[[promoter name]]",
    "address": "[[promoter address]]",
    "sameAddress": true,
    "spfAddress": "[[SPF correspondence address]]"
  },
  "email": "[[contact email]]",
  "facebook": "[[Facebook page URL]]",
  "postalAddress": "[[correspondence address]]",
  "surveyUrl": "[[survey link]]",
  "form": {
    "provider": "[[form service]]",
    "action": "[[form endpoint URL]]"
  },
  "analytics": { "enabled": false, "goatcounterCode": "" },
  "founder": { "name": "Brett Johnson", "role": "Shinfield Parish Councillor and Chair of the Facilities Committee" },
  "launchMeeting": {
    "show": true,
    "confirmed": false,
    "date": "Thursday 14 January 2027, 7.30pm",
    "venue": "Spencers Wood Village Hall, Basingstoke Road, RG7 1AJ"
  },
  "figures": {
    "precept": "£667,000",
    "preceptYear": "2025-26",
    "bandD": "£90.69",
    "bandDYear": "2026-27",
    "lastChecked": "2026-11-27"
  },
  "timeCommitment": "15 to 20 hours a month",
  "nominationDeadlineText": "about Thursday 8 April 2027, 4pm",
  "nominationDeadlineConfirmed": false
}
```

Placeholder rules:
- A string containing `[[` is a placeholder. In development and preview builds, render it inside `<mark class="placeholder">` with the yellow placeholder background so Brett can spot it.
- In a production build (`ELEVENTY_ENV=production`), the build **fails** and lists every placeholder still present. Exception list: none for the imprint, email and form action. `wardCount`, `surveyUrl` and `facebook` may be hidden instead (the component that uses them is not rendered when the value is a placeholder), so the site can launch before they exist.
- Where a value is unconfirmed (`confirmed: false`), show the plain word "(to be confirmed)" after it in all builds.

Open items for Brett, at 27 November 2026: promoter name and address, SPF correspondence address, contact email (domain mailbox or forwarding), Facebook URL, survey link, form service, launch meeting date and venue booking, ward names and seats per ward for 2027, figures re-check, nomination deadline from Wokingham Borough Council.

---

## 6. Pages and content

One URL per page, trailing slash, lower case. Every page has the shared header, main content, and footer (section 6.8).

| # | Page | URL | `<title>` |
|---|---|---|---|
| 1 | Home | `/` | Shinfield Parish First: local people standing for the parish |
| 2 | About us | `/about/` | About us · Shinfield Parish First |
| 3 | What a councillor does | `/what-a-councillor-does/` | What a parish councillor does · Shinfield Parish First |
| 4 | Stand with us | `/stand-with-us/` | Stand with us · Shinfield Parish First |
| 5 | Have your say | `/have-your-say/` | Have your say · Shinfield Parish First |
| 6 | Contact | `/contact/` | Contact · Shinfield Parish First |
| 7 | Privacy notice | `/privacy/` | Privacy notice · Shinfield Parish First |
| 8 | Accessibility statement | `/accessibility/` | Accessibility statement · Shinfield Parish First |
| 9 | Thank you (form success) | `/thank-you/` | Thank you · Shinfield Parish First (`noindex`) |
| 10 | Not found | `/404.html` | Page not found · Shinfield Parish First (`noindex`) |

Main navigation (in this order): Home, About us, What a councillor does, Stand with us, Have your say, Contact. Footer links: Privacy notice, Accessibility statement, Contact.

The copy below is the approved draft. Keep headings and wording. `{{site.x}}` means "insert the setting".

### 6.1 Home `/`

**Eyebrow:** Shinfield Parish Council election · {{site.electionDateText}}

**H1:** Local people, standing for the parish. No national party. No whip.

**Intro:** Shinfield Parish First is a group of independent residents who want to serve on Shinfield Parish Council. Each of us keeps our own voice. We share one name on the ballot so you can tell who we are.

**Buttons:** "Could you stand?" → `/stand-with-us/` (primary). "Back us without standing" → `/stand-with-us/#advocate` (secondary). Text link below: "What does a parish councillor do?" → `/what-a-councillor-does/`.

**Fact row (three tiles):**
- {{site.seats}} · seats on the parish council
- {{site.majority}} · makes a majority
- {{site.wardCount}} · wards across the parish (hide this tile while it is a placeholder in production)

**Section H2: Why we exist** *(new copy, draft for Brett's approval)*
Parish councils look after the things on our doorstep: pitches, play areas, halls, open spaces, and the parish's voice on planning. Those decisions should be made by people who answer to the parish, not to a national party line.

In May 2027 every one of the {{site.seats}} seats is up for election. We want residents to have a real local choice in every ward, so we are bringing together independent people who will each think for themselves and put the parish first.

Link: "Read more about us" → `/about/`

**Section H2: How we will look on the ballot**
An illustration of two ballot rows (a plain HTML/CSS figure, not an image):
- Row 1: "SURNAME, Firstname" / "Shinfield Parish First" / the mono mark in a box / an empty voting box
- Row 2: "SURNAME, Firstname" / "Other description" / empty emblem box / empty voting box

Caption: Illustration only. Our name and emblem appear on the ballot once registered with the Electoral Commission. (When `ecRegistered` is true: "Illustration only. Real ballot papers are set out by the returning officer.")
The figure has a text alternative describing it for screen readers. No tick or cross in the voting box.

**Section H2: What we stand for** (four cards, heading plus one line each)
1. **Facilities across the whole parish.** Sport, play and meeting space in Shinfield, Spencers Wood, Three Mile Cross and Grazeley, not just one corner.
2. **Fair prices for residents.** Pitches, courts and halls that local people and clubs can afford to use.
3. **Clubs and residents together.** Working with the groups that already make the parish work.
4. **Straight answers.** Saying clearly what the parish can do, what it can't, and why.

**Section H2: Two ways to help** *(new copy, draft for Brett's approval)*
Two cards side by side on desktop, stacked on mobile:
- **Stand for a seat.** You don't need experience or a party. You need to care about the parish and give {{site.timeCommitment}}. → "Could you stand?" `/stand-with-us/`
- **Be an advocate.** Not ready to stand? Back the idea. Talk to neighbours, share our posts, deliver a few leaflets or put a poster in your window. Whatever your politics, you're welcome. → "Back us without standing" `/stand-with-us/#advocate`

**Section H2: Public launch meeting** (only when `launchMeeting.show` is true; remove automatically the day after the meeting date, see 11.4)
{{launchMeeting.date}}, {{launchMeeting.venue}}. (to be confirmed, while `confirmed` is false)
Come and hear what a parish councillor really does, what the parish council spends and decides, and how you could stand or help. Free, everyone welcome, step-free access.
Link: "Add to your calendar" → a static `.ics` file generated at build time (only once `confirmed` is true).

### 6.2 About us `/about/`

**Eyebrow:** About us
**H1:** Why Shinfield Parish First?

Parish councils should be run by people who answer to the parish. We want a full team of capable local candidates on the ballot in May 2027, so residents have a real choice.

Shinfield Parish First is open to anyone who lives or works in the parish and shares our aims. We are not part of any national party and we do not tell our councillors how to vote. What links us is a commitment to put the parish first, to work together across the wards, and to give residents straight answers.

We are registering as a local party with the Electoral Commission, only for Shinfield Parish Council elections. That is simply what lets independents share a name and emblem on the ballot paper.
(When `ecRegistered` is true, replace the first sentence with: "We are registered with the Electoral Commission as a local party, only for Shinfield Parish Council elections.")

**H2:** Founded by {{founder.name}}

Pull quote: "I joined the parish council in 2025 with no background in local government. It's been rewarding, demanding and worthwhile."
Attribution: {{founder.name}}, {{founder.role}}

Brett is a long-time resident who joined Shinfield Parish Council in 2025 with no background in local government, and now chairs its Facilities Committee. The projects below are decisions and work of the council and its committees. Brett's part in each is described as the council's own records show it.

*(Corrected 27 November 2026 from the Facilities Committee chronological record, which Brett confirms is public record. Copy is a draft for Brett's approval.)*

1. **High Copse: room to grow.** In November 2026 the University of Reading agreed in principle to include Cowherds Field and land north of the bus lane at High Copse, opening the way to much more sports space and a full-size 3G pitch. As Facilities Chair, Brett has led the talks with the University, the Football Foundation and Berks & Bucks FA.
   Status: agreed in principle. Legal documents, planning and funding still to come.
   The council has also agreed a 58-year lease of the High Copse sports facility with the University of Reading. *(Editor note, not for the site: confirmed by Brett, 27 November 2026; source is the lease between the University and SPC.)*
2. **Padel: shaped by what you told us.** Brett led the residents' consultation on padel courts: 307 responses, with 94% in support. A noise assessment came back positive, and the University has given permission to progress planning.
   Status: next step is a planning pre-application and the initial design. No planning application has been decided yet.
3. **A cycling area for young people at The Manor.** Brett took an informal youth cycling and BMX idea to the University of Reading, which agreed a temporary licence for part of the field at The Manor. The area is in use, and an extension to June 2027 has been agreed in principle.
   Status: in use. The extension is subject to legal documents.
4. **Cricket at High Copse, chosen fairly.** After four presentations and three tenders, the Facilities Committee unanimously chose Shinfield Cricket Club for High Copse in April 2026. Brett seconded the decision.
   Status: agreed. Heads of terms to follow.
5. **Tennis at Millworth Lane.** Brett has helped negotiate heads of terms with Shinfield Tennis Club for Millworth Lane.
   Status: still being finalised.
6. **Goals on the community pitch.** Goals for the council's free community pitch at High Copse, with permanent fencing and security improvements following in 2026.
   Status: delivered or in delivery (Brett to confirm wording).

Note (small text, keep): These were decisions of Shinfield Parish Council and its committees. This site is not run by or connected with the parish council.

**Rules for this list:**
- Build it as data in `src/_data/achievements.json`, one object per item: `title`, `text`, `status` (one of `complete`, `in-use`, `agreed`, `agreed-in-principle`, `in-progress`), `statusText`, `source` (for example "Facilities Chair update to Full Council, 18 November 2026"), `lastChecked`, and `publish` (true or false).
- Show the status line under each item in plain text, never as colour alone. Show the source in small text, so readers can check it. That fits our "straight answers" value.
- Never upgrade wording: "agreed in principle" stays "agreed in principle" until a signed document exists, and "permission to progress planning" is never "planning permission".
- Never present a council or committee decision as Brett's personal decision. Use his recorded role: led talks, led the consultation, seconded, chaired, helped negotiate.
- Before going live, Brett re-checks each item's status and source. Do not add anything from internal or negotiation papers: Brett confirmed on 27 November 2026 which items are internal; they are left out of the site entirely. (Redacted from this public copy.)

**H2:** Who else is involved
Steering group members, added after the launch meeting with their permission. (Build a `people.json` list with name, ward, one line, optional photo; render nothing but this sentence while empty. Never publish a person without a `consent: true` field.)

### 6.3 What a councillor does `/what-a-councillor-does/`

**Eyebrow:** Plain English
**H1:** What a parish councillor does

Shinfield Parish Council is the most local level of government. Its councillors decide how a budget of about {{figures.precept}} a year is spent, look after local facilities, and speak for residents to Wokingham Borough Council.

The parish part of council tax for a Band D home is {{figures.bandD}} in {{figures.bandDYear}}. Councillors are unpaid volunteers.
Small text: Figures from Shinfield Parish Council and Wokingham Borough Council, last checked {{figures.lastChecked}} (formatted "27 November 2026").

**H2:** What the parish council can and can't do
Two side-by-side lists on desktop, stacked on mobile. Use real lists with headings, not a table and not icons alone (the can/can't meaning must not rely on colour or a tick/cross symbol).

*The parish council can*
- Set the parish precept and decide how it is spent
- Run and improve sports pitches, play areas, open spaces and community halls
- Make grants to local clubs and groups
- Comment on every planning application in the parish
- Shape planning through the Neighbourhood Plan
- Use its share of developer money (CIL) on local projects
- Act for the wellbeing of the parish under the General Power of Competence, where it qualifies

*The parish council can't*
- Decide planning applications. Wokingham Borough Council does, including Loddon Garden Village
- Fix roads, potholes or traffic. That's the borough
- Run schools, bin collections or social care
- Set the main council tax, only the parish part

**H2:** What the job involves
- A full council meeting about once a month, in the evening, open to the public
- One or two committees, such as Facilities or Planning
- Reading papers, visiting sites and talking to residents
- Around {{site.timeCommitment}} in total
- Training is offered, and the Clerk is a qualified professional who advises the council

(Note: the draft said "2 to 4 evenings a month"; Brett's figure is 15 to 20 hours a month. Use the setting.)

**H2:** Why it matters in 2027
The council grows to {{site.seats}} seats in May 2027, so {{site.majority}} councillors make a majority. Whoever holds those seats sets the parish's priorities for four years.

**Call to action:** "Could you stand?" → `/stand-with-us/`

### 6.4 Stand with us `/stand-with-us/`

**Eyebrow:** Stand with us
**H1:** Stand with us

Intro *(new copy, draft for Brett's approval)*: There are two ways to stand with Shinfield Parish First: put yourself forward for a seat, or back us as an advocate. Either way, we won't ask about your party politics. All we ask is that you put the parish first.

On-page links: "Stand for a seat" (`#stand`) · "Be an advocate" (`#advocate`) · "Put your name forward" (`#signup`).

**H2 (id `stand`):** Could you be a parish councillor?

You don't need experience. You need to care about the parish and be willing to give {{site.timeCommitment}}.

**H2:** Who can stand
You must be 18 or over on nomination day, a British, Irish or qualifying Commonwealth citizen or an eligible EU citizen, and meet at least one of these:
- You are on the electoral register for the parish
- You have lived in the parish, or within 3 miles (4.8km) of it, for the last 12 months
- Your main place of work has been in the parish for the last 12 months
- You have owned or rented land or premises in the parish for the last 12 months

Some people are disqualified, for example employees of the parish council. We'll go through the full rules with you. Link text: "Electoral Commission guidance for parish candidates" → the Electoral Commission's guidance page for candidates at parish council elections in England (Brett to confirm the URL; it opens in the same tab).

**H2:** The road to 6 May (an ordered list styled as a timeline)
1. **January 2027.** Launch meeting, steering group formed, candidates start coming forward
2. **February.** Candidate conversations, a shared statement of what we stand for
3. **March.** Leaflets, door knocking, meeting residents in every ward
4. **Early April.** Nomination papers in. Deadline {{site.nominationDeadlineText}} (to be confirmed with Wokingham elections, while unconfirmed)
5. **Thursday 6 May.** Polling day

**H2 (id `advocate`):** Be an advocate *(new copy, draft for Brett's approval)*
You don't have to stand to make a difference. Advocates are residents who believe the parish council should be run by local people who answer to the parish. You don't need to join anything or belong to any party. You could:
- Tell friends and neighbours what the parish council does and why this election matters
- Share our posts on Facebook and in local groups
- Deliver leaflets on your street
- Put a poster in your window at election time
- Come to a meeting and bring someone with you
- Suggest someone who would make a good councillor

Do as much or as little as you like. We'll never pass your details to anyone else.

**H2 (id `signup`):** Put your name forward
Tell us how you'd like to help and we'll be in touch.
Then the sign-up form (section 7).

### 6.5 Have your say `/have-your-say/`

**Eyebrow:** Have your say
**H1:** What should the parish do next?

Our candidates will stand on what residents tell us. The survey takes about five minutes.

Questions it asks (shown as a short list so people know what to expect):
- Which parish facilities do you use, and what's missing?
- What is the one thing you'd most like the parish council to do in the next four years?
- How would you like the council to keep you informed?

Button: "Take the survey" → {{site.surveyUrl}}. The survey is hosted by the form service (link out, no embed). Say on the button or beside it that it opens the survey on [provider name]'s site. Hide the button and show "The survey opens soon." while the URL is a placeholder.

We publish a summary of the results. We never share your details.

### 6.6 Contact `/contact/`

**Eyebrow:** Contact
**H1:** Get in touch

Ask us anything about the election, the parish council or how to get involved. We'll give you a straight answer.

- Email: {{site.email}} (a `mailto:` link)
- Facebook: {{site.facebook}} (hide while placeholder)
- Post: {{site.postalAddress}}

Looking for Shinfield Parish Council itself? It has its own website and office at the School Green Centre. We are a separate group.
(Link the words "its own website" to `https://www.shinfieldparish.gov.uk/`; Brett to confirm the URL.)

### 6.7 Privacy notice `/privacy/`

Plain-English notice. Claude Code drafts it from this outline, with placeholders, and marks it for Brett's review. It must cover:
1. **Who we are.** Shinfield Parish First, contact {{site.email}}, {{site.postalAddress}}. Data controller: SPF (or the named officer until SPF is constituted; placeholder).
2. **What we collect** through the sign-up form: name, email, ward (optional), how you'd like to help (for example standing, or helping as an advocate), anything else you choose to tell us, your consent. Through the survey: your answers, and contact details only if you choose to give them. Through email: whatever you send.
3. **Why, and our lawful basis.** To contact you about the campaign and the ways you offered to help. Because supporting a political group can reveal your political opinions, we rely on your **explicit consent** (UK GDPR Article 6(1)(a) and Article 9(2)(a)). You can withdraw it at any time by emailing us; it does not affect anything done before.
4. **Who processes it.** The form service [[provider]] stores submissions on our behalf under a data processing agreement; say where it stores data and, if outside the UK, the transfer safeguard. GitHub hosts the website and, like any web host, receives visitors' IP addresses in server logs; we cannot see them. [If analytics is enabled: GoatCounter, which counts visits without cookies or personal data.]
5. **What we don't do.** No selling or sharing with other parties or campaigns. No cookies. No tracking. No adverts.
6. **How long we keep it.** Sign-up details are deleted by **[[31 August 2027]]** unless you've joined as a member or asked us to keep in touch. Survey answers are anonymised for the published summary and the raw responses deleted by the same date.
7. **Your rights.** Access, correction, deletion, withdraw consent, object, complain to the Information Commissioner's Office (ico.org.uk, 0303 123 1113).
8. **Changes.** "Last updated" date from the file's front matter.

### 6.8 Accessibility statement `/accessibility/`
Short statement: aims for WCAG 2.2 AA; how it was tested (automated plus manual keyboard and screen reader checks, with dates); known issues (none at launch, or list them); how to ask for information in another format ({{site.email}}); date of last review.

### 6.9 Thank you `/thank-you/`
H1: Thank you. Text: We've got your details and someone from Shinfield Parish First will be in touch. You can ask us to delete them at any time by emailing {{site.email}}. Link back to Home.

### 6.10 404
H1: We can't find that page. Text with links to Home and Contact. Same header and footer.

### 6.11 Shared header and footer
**Header:** skip link ("Skip to main content"), logo lockup linking home, "Get involved" button (6.12), main nav. On narrow screens the nav collapses behind a "Menu" button (a real `<button>` with `aria-expanded`, works without JavaScript by showing the nav as a list below the header). Current page marked with `aria-current="page"`.

**Footer**, on every page, in this order:
1. Shinfield Parish First · {{site.tagline}} · Independent residents standing for Shinfield Parish Council
2. Shinfield Parish First is an independent group. It is not connected with Shinfield Parish Council or Wokingham Borough Council.
3. Links: Privacy notice · Accessibility statement · Contact
4. The imprint (section 3.1), on its own line, at least 16px.


### 6.12 Calls to action on every page
Each page ends with a short call-to-action band before the footer, from one partial with two variants (not on Stand with us, Privacy, Accessibility, Thank you or 404):
- **Stand** (Home, What a councillor does): "Could you stand? Find out what's involved." → `/stand-with-us/#stand`
- **Advocate** (About, Have your say, Contact): "Not ready to stand? Back us as an advocate." → `/stand-with-us/#advocate`
The header also carries a compact "Get involved" button linking to `/stand-with-us/` (it sits outside the main nav list, visible on mobile without opening the menu).

---

## 7. Sign-up form

### 7.1 Fields
| Field | Type | Required | Notes |
|---|---|---|---|
| Your name | text, `autocomplete="name"` | Yes | |
| Email | email, `autocomplete="email"` | Yes | |
| Where you live | select: the wards from `site.wards`, plus "Not sure" and "Outside the parish" | No | Add "(ward names for 2027 to be confirmed)" hint while `wardsConfirmed` is false |
| I'd like to | checkboxes in a `<fieldset>` with `<legend>`: Think about standing as a candidate; Be an advocate and spread the word; Help a candidate in my area; Deliver leaflets on my street; Display a window poster at election time; Join the steering group; Suggest someone who would make a good councillor | At least one | Support a `?role=advocate` or `?role=candidate` query string (and the `#advocate` link's button) that pre-ticks the matching box with JavaScript; without JavaScript nothing is pre-ticked |
| Anything else? | textarea, 500 characters max | No | |
| Consent | single checkbox, **unticked** | Yes | Label: "I agree to Shinfield Parish First keeping these details and contacting me about the campaign. I can ask for them to be deleted at any time. Read the privacy notice." ("privacy notice" links to `/privacy/`) |
| Honeypot | hidden text field named per the provider's convention | No | Visually hidden and `tabindex="-1"`, `aria-hidden`, labelled "Leave this empty" |

No phone number, address, date of birth or political history fields.

### 7.2 Behaviour
- A plain HTML `<form method="POST" action="{{site.form.action}}">` that works with JavaScript turned off and redirects to `/thank-you/` (provider "redirect" or "next" setting).
- Progressive enhancement: with JavaScript, validate on submit, show an error summary at the top (linked to each field, focused on submit, per GOV.UK pattern) and inline error messages tied with `aria-describedby`. Then submit normally (no fetch/AJAX needed).
- Errors in words, not colour alone. Error text examples: "Enter your name", "Enter an email address like name@example.com", "Choose at least one way you'd like to help", "Tick the box to agree to us keeping your details".
- Send a hidden field `form_name = signup` and `consent_text` (the exact label wording) so the provider stores what people agreed to.
- No CAPTCHA that uses cookies or Google services. Rely on honeypot plus the provider's spam filter.

### 7.3 Form service (Brett chooses and creates the account)
Requirements: accepts a plain HTML POST from a static site; offers a UK GDPR data processing agreement; lets Brett export and delete submissions; no tracking cookies on our site; email notification to Brett; free or cheap at our volume (under a few hundred sign-ups); can host the survey too, ideally.

Candidates to evaluate (check current terms and limits before choosing):
- **Formspree**: plain HTML POST, honeypot support, redirect after submit, DPA available. US-based, so the privacy notice names the transfer safeguard.
- **Tally**: EU-based, generous free plan, good for the **survey** (link out). Not a plain-POST endpoint, so for the sign-up form it would be a link-out or embed rather than our own form.

Recommended starting point: our own HTML sign-up form posting to a plain-POST service such as Formspree, and the survey on Tally as a link. Claude Code builds the form so the action URL is the only thing that changes; it must not create either account.

---

## 8. Accessibility (WCAG 2.2 AA) and mobile first

Build mobile first (start at 320px wide, enhance upward). No horizontal scrolling at 320px or at 400% zoom (1.4.10 Reflow).

Must have:
- `lang="en-GB"` on `<html>`. One `<h1>` per page, headings in order, no skipped levels.
- Landmarks: `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<footer>`. Skip link is the first focusable element and visible on focus.
- Colour contrast per section 4.2. Never use colour alone to carry meaning.
- Visible focus on every interactive element: 3px outline in `--color-focus` with 2px offset, at least 3:1 against the background. Focus must not be hidden by the sticky header if one is used (2.4.11 Focus Not Obscured). Prefer a non-sticky header.
- Targets at least 44 by 44 CSS px for buttons, nav links and checkboxes (beats 2.5.8's 24px minimum).
- Forms: every input has a visible `<label>`; groups use `<fieldset>`/`<legend>`; required fields say "(required)" in text; correct `autocomplete`; errors per 7.2 (3.3.1, 3.3.3). No time limits.
- Text resizes to 200% without loss. Line height and spacing overrides (1.4.12) do not break layout.
- Images: meaningful images have alt text; decorative ones `alt=""`. No text in images except the logo and share card.
- Motion: no auto-playing anything. Respect `prefers-reduced-motion`.
- Links make sense out of context ("Read the privacy notice", not "click here"). External links say where they go.
- Works with keyboard only, and with VoiceOver (iOS Safari) and NVDA (Windows Firefox or Chrome).
- Print stylesheet: hides nav, keeps content, footer and imprint.

Performance (helps older phones and poor signal): total page weight under 300 KB excluding fonts; under 500 KB including fonts. No JavaScript framework. JavaScript under 10 KB total, deferred, and the site fully usable without it. Lighthouse mobile scores: Performance 90+, Accessibility 100, Best Practices 95+, SEO 100.

---

## 9. SEO, sharing and analytics

### 9.1 Every page
- Unique `<title>` (section 6 table) and `<meta name="description">` of 120 to 160 characters (Claude Code drafts, Brett approves).
- `<link rel="canonical" href="https://shinfieldparishfirst.org.uk/...">`, always the primary domain and https.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` (never disable zoom).
- `<meta name="theme-color">` from `--brand-primary`.
- Favicons: SVG favicon from the mark, plus 32px PNG and 180px apple-touch-icon, generated from the logo source at build time or committed alongside it so a rebrand updates them.

### 9.2 Site-wide
- `sitemap.xml` (exclude thank-you and 404) and `robots.txt` pointing to it.
- JSON-LD on the home page: `Organization` with name, url, logo, `areaServed` "Shinfield parish, Wokingham, England", and `sameAs` the Facebook URL once set.
- No `noindex` on content pages. `noindex` on `/thank-you/` and the 404.
- Preview builds (any URL that is not the primary domain) send `noindex` so drafts never appear in search.

### 9.3 Social cards
- Open Graph and Twitter card tags on every page: `og:title`, `og:description`, `og:url`, `og:type` (`website`), `og:locale` (`en_GB`), `og:image` (absolute URL), `og:image:alt`, `twitter:card = summary_large_image`.
- One default share image, 1200 by 630 PNG, generated at build time from an SVG template using the tokens and logo: name, tagline, "Shinfield Parish Council election · 6 May 2027", and the imprint in small type along the bottom. Keep under 300 KB. Regenerated automatically after a rebrand.

### 9.4 Analytics
- **Off at launch.** If Brett wants visit counts, use **GoatCounter** (no cookies, no personal data; free for non-commercial use) loaded from its script only when `analytics.enabled` is true. No consent banner is needed for a cookieless counter, but the privacy notice must mention it.
- Never Google Analytics, Meta pixel or anything that sets cookies or fingerprints.

---

## 10. Hosting and custom domain

GitHub Pages, published with **GitHub Actions** (not the branch method). Facts below checked against GitHub's and GoDaddy's help pages on 27 November 2026.

### 10.1 Order of work (important)
GitHub warns that pointing DNS at Pages before the domain is added in GitHub lets someone else claim it. Do it in this order:
1. Merge the site to `main` and confirm the Actions deploy works at `https://brettjo77.github.io/ShinfieldParishFirst/`.
2. **Verify the domain** in Brett's GitHub account (10.2).
3. Add the custom domain in the repo's Pages settings (10.3).
4. Change DNS at GoDaddy (10.3).
5. Wait for the certificate, then tick Enforce HTTPS.
6. Set up the .co.uk forwarding (10.4).

All of steps 2 to 6 are Brett's clicks. Claude Code supplies this checklist in `docs/GOING-LIVE.md` and stops.

Note on step 1: the project-site URL has a `/ShinfieldParishFirst/` path prefix. The build must handle a configurable path prefix (`PATH_PREFIX` env var, default `/`) so links work both there and on the custom domain. The deploy workflow uses `/` once the custom domain is set (a repository variable `PAGES_PATH_PREFIX`).

### 10.2 Verify the domain (stops takeovers)
GitHub: profile picture → **Settings** → in the sidebar under "Code, planning, and automation" click **Pages** → **Add a domain** → enter `shinfieldparishfirst.org.uk` → **Add domain**. GitHub shows a TXT record. In GoDaddy add:

| Type | Name | Value | TTL |
|---|---|---|---|
| TXT | `_github-pages-challenge-brettjo77` | (the code GitHub shows) | 1 hour |

Wait, then click **Verify** in GitHub. Leave this TXT record in place permanently.

### 10.3 Point shinfieldparishfirst.org.uk at GitHub Pages
In the repo: **Settings → Pages**. Source: **GitHub Actions**. Custom domain: `shinfieldparishfirst.org.uk` → Save.

Then GoDaddy: Domain Portfolio → `shinfieldparishfirst.org.uk` → **DNS** tab → **DNS Records**.

**First delete** GoDaddy's default records: the `@` A record pointing to "Parked" (or any GoDaddy IP), and any existing `www` CNAME or forwarding on this domain. **Do not** add any wildcard (`*`) record. Leave NS and SOA records alone.

Add:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 1 hour |
| A | `@` | `185.199.109.153` | 1 hour |
| A | `@` | `185.199.110.153` | 1 hour |
| A | `@` | `185.199.111.153` | 1 hour |
| AAAA | `@` | `2606:50c0:8000::153` | 1 hour |
| AAAA | `@` | `2606:50c0:8001::153` | 1 hour |
| AAAA | `@` | `2606:50c0:8002::153` | 1 hour |
| AAAA | `@` | `2606:50c0:8003::153` | 1 hour |
| CNAME | `www` | `brettjo77.github.io` | 1 hour |

The `www` CNAME points to `brettjo77.github.io` with **no repository name** and not to `@`. GitHub then redirects `www` to the apex automatically.

Email records (MX, SPF TXT) for the contact address are separate and must not be removed if Brett sets up email.

Check: `dig shinfieldparishfirst.org.uk +noall +answer -t A` shows the four IPs; `dig www.shinfieldparishfirst.org.uk +noall +answer` shows the CNAME. DNS can take up to 24 hours.

**HTTPS:** once the Pages settings page shows the DNS check passed, the certificate can take up to 24 hours. Then tick **Enforce HTTPS**.

With the Actions publishing method, **no `CNAME` file is needed** in the repo; the custom domain lives in the Pages settings. Do not add one.

### 10.4 Redirect shinfieldparishfirst.co.uk
GitHub Pages allows one custom domain per site, so the .co.uk redirect is done by GoDaddy forwarding (GoDaddy says forwarding over HTTPS is available on all forwarded domains at no extra cost).

GoDaddy: Domain Portfolio → `shinfieldparishfirst.co.uk` → **DNS** → **Forwarding** → **Add Forwarding**:
- Domain (root): destination `https://` + `shinfieldparishfirst.org.uk`, type **Permanent (301)**. Not "Forward with masking". → Save.
- Then add forwarding for the **subdomain** `www` with the same destination and type (or set the `www` CNAME to `@`, which GoDaddy's help suggests for forwarding www too).

Check after an hour: `curl -sI http://shinfieldparishfirst.co.uk`, `curl -sI https://shinfieldparishfirst.co.uk` and the `www.` versions each return 301 with `Location: https://shinfieldparishfirst.org.uk/`. If the `https://` version gives a certificate error, the fallback is a tiny second Pages repo (`spf-co-uk-redirect`) with the .co.uk as its custom domain and a redirect page (meta refresh plus canonical link); Claude Code can build that on request.

Deep paths on .co.uk (for example `/about/`) are not guaranteed to carry over; GoDaddy's pages do not say. That is acceptable: all printed material uses the .org.uk address.

---

## 11. Technical build

### 11.1 Stack
- **Eleventy (11ty) v3**, Nunjucks templates, page content in Markdown with front matter. Static output only; no server, no database.
- Node: current LTS, pinned in `.nvmrc` and in `package.json` `engines`. Lock file committed.
- CSS: hand-written, one stylesheet built from partials (tokens, base, layout, components, print), no framework, no Tailwind. Optional: Lightning CSS for minify and nesting.
- JavaScript: plain, one small file for the menu button and form validation.
- Images: `@11ty/eleventy-img` for responsive images (AVIF/WebP plus fallback, width and height set).
- Keep dependencies minimal and well known. Every dependency justified in the README.

Why Eleventy: Brett and helpers can edit wording in Markdown and settings in one JSON file without touching templates, and it outputs plain HTML that GitHub Pages serves well.

### 11.2 Quality checks (run locally and in CI)
- `npm run build`: production build, fails on placeholders (5), broken internal links, or missing imprint.
- `npm test` runs:
  - **html-validate** on all built pages.
  - **Link check** of internal links and anchors (external links reported, not failing).
  - **Accessibility:** Playwright with `@axe-core/playwright` on every page at 360px and 1280px widths, failing on any WCAG 2.x A/AA violation.
  - **Imprint and disclaimer test:** every built HTML page contains the imprint text and the "not connected with" line inside `<footer>`.
  - **Contrast test:** reads `tokens.css` and checks the text and UI role pairs (4.5:1 and 3:1).
  - **No-tracking test:** built HTML contains no requests to third-party hosts except the form action, survey link, Facebook link and (if enabled) GoatCounter. No `document.cookie` writes.
  - **Form test:** sign-up form has the consent checkbox unticked by default, required attributes, labels, and a privacy link.
- Lighthouse CI on Home, What a councillor does and Stand with us, mobile profile, thresholds in section 8.

### 11.3 Environments
- `ELEVENTY_ENV=development` (local `npm start`, live reload): placeholders highlighted.
- `ELEVENTY_ENV=preview` (pull request builds): placeholders highlighted, `noindex` everywhere, banner "Preview, not the live site".
- `ELEVENTY_ENV=production` (deploy from `main`): placeholders fail the build as set out in section 5.

### 11.4 Time-based content
The site is static, so date rules (hide the launch meeting after it happens, switch timeline wording after polling day) are applied at build time. A scheduled workflow rebuilds the site daily at 05:00 UK time so these stay current without anyone pushing.

---

## 12. Repository layout and workflow

```
ShinfieldParishFirst/
├─ .github/
│  ├─ workflows/
│  │  ├─ deploy.yml        # build + test + deploy to Pages on push to main, daily schedule, manual run
│  │  └─ check.yml         # build (preview) + test on every pull request
│  ├─ dependabot.yml       # weekly npm and actions updates
│  └─ pull_request_template.md
├─ docs/
│  ├─ brief/               # this spec, the draft HTML, provisional logo files
│  ├─ GOING-LIVE.md        # Brett's click-by-click for section 10
│  ├─ EDITING.md           # how to change wording, settings, people, achievements, brand
│  └─ REBRAND.md           # the exact files to change after the group decides
├─ src/
│  ├─ _data/
│  │  ├─ site.json         # all settings and placeholders (section 5)
│  │  ├─ nav.json
│  │  ├─ achievements.json
│  │  └─ people.json
│  ├─ _includes/
│  │  ├─ layouts/base.njk
│  │  └─ partials/         # header, footer, imprint, logo, ballot, form, cards
│  ├─ assets/
│  │  ├─ css/              # tokens.css, base, layout, components, print
│  │  ├─ js/site.js
│  │  ├─ fonts/            # self-hosted WOFF2 + OFL licences
│  │  └─ img/brand/        # mark SVGs, favicon sources, share-card template
│  ├─ index.md
│  ├─ about.md
│  ├─ what-a-councillor-does.md
│  ├─ stand-with-us.md
│  ├─ have-your-say.md
│  ├─ contact.md
│  ├─ privacy.md
│  ├─ accessibility.md
│  ├─ thank-you.md
│  ├─ 404.md
│  ├─ sitemap.xml.njk
│  └─ robots.txt.njk
├─ tests/                  # Playwright + axe, imprint, contrast, no-tracking, form tests
├─ eleventy.config.js
├─ package.json / package-lock.json / .nvmrc
├─ .editorconfig / .gitignore
├─ LICENSE                 # code: MIT; content: all rights reserved to SPF (state both)
└─ README.md               # what the site is, how to run it, how it deploys
```

### 12.1 deploy.yml
- Triggers: `push` to `main`, `schedule` (daily, `0 5 * * *` UTC is fine), `workflow_dispatch`.
- Permissions: `contents: read`, `pages: write`, `id-token: write`. Concurrency group `pages`, cancel in progress false.
- Jobs: **build** (checkout, setup-node with cache, `npm ci`, `npm run build` with `ELEVENTY_ENV=production` and `PATH_PREFIX` from repo variable, `npm test`, `actions/configure-pages`, `actions/upload-pages-artifact` with `_site`), then **deploy** (`actions/deploy-pages`, environment `github-pages`).
- Pin actions to current major versions.

### 12.2 check.yml
On every pull request: `npm ci`, preview build, full test suite, Lighthouse CI, upload `_site` as a build artifact so Brett can download and look.

### 12.3 Branches and review
- `main` is what's live. Work on feature branches, open a pull request, CI must pass, Brett merges.
- Suggest Brett turns on branch protection for `main` (require pull request and passing checks). That is his setting to change.
- First pull request: the full site with placeholders, provisional brand, all tests passing, `docs/GOING-LIVE.md`. Later pull requests: rebrand, real values, go live.

---

## 13. Acceptance checklist

Brett (or Claude Code, reporting results) ticks each before the site goes on the real domain.

**The two purposes**
- [ ] A first-time visitor on a phone can tell from the home page, without scrolling past the second screen, what SPF is, that it has no national party or whip, and why it exists.
- [ ] Both recruitment routes (stand, be an advocate) are reachable in one tap from the home page and from every content page's call-to-action band.
- [ ] The sign-up form offers advocate options, and `?role=advocate` pre-ticks the advocate box.
- [ ] No page asks about or assumes anyone's party politics.

**Content and rules**
- [ ] All ten pages exist at the URLs in section 6, with the approved wording.
- [ ] Every page footer shows the imprint with the real promoter and address, and the "not connected with" line.
- [ ] No SPC crest, photos, or SPC greens as main colours anywhere.
- [ ] Brett's track record matches the Facilities Committee record: each item shows its status and source, nothing "in principle" is shown as done, and nothing from internal papers appears (Brett holds the list; redacted from this public copy).
- [ ] Brett's achievements are phrased as council work, with the note that they were council decisions.
- [ ] Figures show a "last checked" date within the last three months.
- [ ] Nothing says SPF is registered until it is.
- [ ] No `[[placeholder]]` left on the production site.
- [ ] Privacy notice reviewed by Brett and names the actual form service.

**Form**
- [ ] Sign-up submits with JavaScript on and off, lands on `/thank-you/`, and arrives in Brett's form service account.
- [ ] Consent box is unticked by default and required; the privacy link works.
- [ ] Error summary and inline errors read correctly with a screen reader.
- [ ] A honeypot submission is rejected or marked as spam.

**Accessibility and devices**
- [ ] axe tests pass on all pages at 360px and 1280px.
- [ ] Keyboard-only walk-through of every page and the form: all reachable, focus always visible, nothing obscured.
- [ ] VoiceOver on an iPhone and NVDA on Windows: headings, landmarks, nav, form and ballot illustration announce sensibly.
- [ ] Works at 320px wide and at 400% zoom with no sideways scrolling.
- [ ] Checked on iPhone Safari, Android Chrome, desktop Chrome, Firefox, Safari and Edge.
- [ ] Lighthouse mobile: Performance 90+, Accessibility 100, Best Practices 95+, SEO 100.

**Privacy and tracking**
- [ ] Browser dev tools show no cookies set and no requests to hosts other than our own (plus GoatCounter if enabled).
- [ ] Fonts load from our domain.

**SEO and sharing**
- [ ] Each page has a unique title, description and canonical on `https://shinfieldparishfirst.org.uk`.
- [ ] `sitemap.xml` and `robots.txt` load.
- [ ] Sharing the home page on Facebook and WhatsApp shows the card with the imprint (check with Facebook's Sharing Debugger).

**Domain and hosting**
- [ ] Domain verified in Brett's GitHub account (TXT record in place).
- [ ] `https://shinfieldparishfirst.org.uk` loads with a valid certificate; Enforce HTTPS is ticked.
- [ ] `http://` and `www.` versions redirect to `https://shinfieldparishfirst.org.uk/`.
- [ ] `http://` and `https://` `shinfieldparishfirst.co.uk` and `www.` redirect with 301 to the .org.uk.
- [ ] No wildcard DNS records exist on either domain.
- [ ] Deploy workflow runs green on push and on the daily schedule.

**Hand-over**
- [ ] `README.md`, `docs/EDITING.md`, `docs/REBRAND.md`, `docs/GOING-LIVE.md` written in plain English for a non-developer.
- [ ] Rebrand test: changing only `tokens.css` and the logo files changes the whole site, favicons and share card, and the contrast test still passes or fails clearly.

---

## 14. Out of scope for version 1
Candidate profile pages per ward (planned once candidates agree; build `people.json` so this is easy later), news or blog, donations or payments, events calendar beyond the launch meeting, Welsh or other languages, dark mode, a membership area, newsletter sign-up (the sign-up form covers it for now).

## 15. Prompt to give Claude Code

> Build the Shinfield Parish First website in this repository, following `docs/brief/SPF-WEBSITE-SPEC.md` exactly. Read the whole spec first. Use the wording in section 6 word for word and keep every placeholder in `src/_data/site.json`. Work on a branch called `site-v1`, make all tests in section 11.2 pass, and open a pull request for me to review. Do not create accounts, buy anything, change DNS or GitHub settings, or set the custom domain: write `docs/GOING-LIVE.md` for me instead. When you finish, list any placeholder still open and any part of the spec you could not meet.

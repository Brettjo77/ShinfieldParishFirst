# Editing the website

You can make every change below on github.com without installing anything: open the file, click the pencil icon, make the change, then choose **Create a new branch for this commit and start a pull request**. The checks run on the pull request; when they are green, merge it and the live site updates a few minutes later.

## Settings and placeholders: `src/_data/site.json`

Every fact that might change is here. Text in `[[double brackets]]` is a placeholder: replace the whole thing, brackets included.

| Setting | What it is |
|---|---|
| `imprint.promoter`, `imprint.address` | The election imprint shown at the foot of every page and on the share image. Required by law. If the promoter's address differs from SPF's, set `sameAddress` to `false` and fill in `spfAddress`. |
| `email` | Contact email (currently contact@shinfieldparishfirst.co.uk). |
| `postalAddress` | Correspondence address shown on Contact and Privacy. |
| `facebook` | Facebook page address. Hidden until set. |
| `surveyUrl`, `surveyProvider` | Survey link and the service's name (for example Tally). The button shows "The survey opens soon" until set. |
| `form.action`, `form.provider`, `form.dataLocation` | The sign-up form service's endpoint, name and where it stores data. |
| `privacy.controller`, `privacy.retainUntil` | Who the data controller is, and the deletion date. |
| `links.ecCandidateGuidance` | The Electoral Commission's guidance page for parish candidates. |
| `wardCount`, `wards`, `wardsConfirmed` | Wards for 2027. Set `wardsConfirmed` to `true` once Wokingham confirms them. |
| `launchMeeting` | Date, venue, and `confirmed`. When `confirmed` is `true`, "(to be confirmed)" disappears and an "Add to your calendar" link appears. Set `isoDate` (YYYY-MM-DD) too: the notice disappears the day after. Set `show` to `false` to hide it. |
| `figures` | Precept and Band D figures, and `lastChecked` (YYYY-MM-DD). Re-check before going live and at least every three months. |
| `ecRegistered` | Set to `true` only when the Electoral Commission has registered SPF. The wording on Home and About changes automatically. |
| `nominationDeadlineText`, `nominationDeadlineConfirmed` | From Wokingham Borough Council elections. |
| `analytics.enabled` | Leave `false` unless the group agrees to GoatCounter (no cookies). The privacy notice updates itself. |

## Page wording: `src/*.md`

Each page is one file (`index.md` is Home). Plain paragraphs are ordinary text; leave the lines in `<angle brackets>` and `{{ curly braces }}` alone unless you know what they do. The `description:` line at the top is what search engines and link previews show (keep it 120 to 160 characters).

## Brett's record: `src/_data/achievements.json`

One block per item, in the order shown. Fields: `title`, `text`, `status` (`complete`, `in-use`, `agreed`, `agreed-in-principle`, `in-progress`), `statusText`, `source`, `lastChecked`, `publish` (`true` or `false`).

Rules: never upgrade wording ("agreed in principle" stays so until a signed document exists), always describe Brett's recorded role (led, seconded, helped negotiate), and never add anything from internal or negotiation papers.

## Steering group: `src/_data/people.json`

Add one block per person once they have agreed in writing:

```json
[
  { "name": "Jane Smith", "ward": "Grazeley", "line": "Runs the village fete committee.", "photo": "", "consent": true }
]
```

Nobody appears unless `"consent": true` is present.

# Going live: Brett's checklist

Everything here is a click for Brett (or whoever holds the GitHub and GoDaddy logins). Nothing in this repository changes DNS, settings or accounts by itself.

Do the steps **in this order**. GitHub warns that pointing DNS at Pages before the domain is verified and added lets someone else claim it.

## Before you start: fill in the placeholders

A production build stops until these have real values. The build log lists anything still missing.

- [ ] **Imprint:** promoter name and address (`imprint` in `src/_data/site.json`). Check the wording against the Electoral Commission's current digital imprint guidance.
- [ ] **Correspondence address** (`postalAddress`).
- [ ] **Sign-up form service:** create the account yourself (the spec suggests Formspree for the form, with a UK GDPR data processing agreement), then set `form.action`, `form.provider` and `form.dataLocation`. In the service, set the redirect after submit to `https://shinfieldparishfirst.org.uk/thank-you/` and the spam/honeypot field to `_gotcha`.
- [ ] **Privacy notice:** read `/privacy/`, set `privacy.controller` and `privacy.retainUntil`, then delete the `reviewStatus` line at the top of `src/privacy.md`.
- [ ] **Electoral Commission guidance link** for parish candidates (`links.ecCandidateGuidance`).
- [ ] **Goals on the community pitch:** confirm the status wording in `src/_data/achievements.json`.
- [ ] Re-check every item in `achievements.json` against its source, and the precept and Band D figures (`figures`, with today's date in `lastChecked`).
- [ ] Optional (hidden until set): `surveyUrl` and `surveyProvider`, `facebook`, `wardCount`.
- [ ] Check that contact@shinfieldparishfirst.co.uk receives mail.

## 1. Turn on GitHub Pages and test on the github.io address

1. Repository → **Settings → Pages**. Under **Build and deployment**, Source: **GitHub Actions**.
2. Repository → **Settings → Secrets and variables → Actions → Variables → New repository variable**: name `PAGES_PATH_PREFIX`, value `/ShinfieldParishFirst/`.
3. Merge a pull request into `main` (or **Actions → Deploy to GitHub Pages → Run workflow**).
4. When the run is green, check `https://brettjo77.github.io/ShinfieldParishFirst/`. (It carries `noindex` so search engines ignore it.)

Optional: **Settings → Branches → Add branch ruleset** for `main`, requiring a pull request and the "Check pull request" check to pass.

## 2. Verify the domain (stops takeovers)

1. GitHub: your profile picture → **Settings** → under "Code, planning, and automation" click **Pages** → **Add a domain** → `shinfieldparishfirst.org.uk` → **Add domain**. GitHub shows a TXT record.
2. GoDaddy: Domain Portfolio → `shinfieldparishfirst.org.uk` → **DNS** → **DNS Records** → **Add**:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | TXT | `_github-pages-challenge-brettjo77` | (the code GitHub shows) | 1 hour |

3. Wait a few minutes, then click **Verify** in GitHub. Leave this TXT record in place permanently.

## 3. Add the custom domain and point DNS at GitHub

1. Repository → **Settings → Pages** → Custom domain: `shinfieldparishfirst.org.uk` → **Save**.
2. Change the repository variable `PAGES_PATH_PREFIX` to `/`.
3. GoDaddy: `shinfieldparishfirst.org.uk` → **DNS** → **DNS Records**.
   - **Delete first:** the `@` A record pointing to "Parked" (or any GoDaddy address), and any existing `www` CNAME or forwarding on this domain. Do **not** add any wildcard (`*`) record. Leave NS and SOA records alone, and keep any MX or email TXT records.
   - **Add:**

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

   The `www` CNAME points to `brettjo77.github.io` with no repository name.
4. Re-run the deploy (**Actions → Deploy to GitHub Pages → Run workflow**) so links use the new `/` prefix.
5. DNS can take up to 24 hours. Check with `dig shinfieldparishfirst.org.uk +noall +answer -t A` (four addresses) and `dig www.shinfieldparishfirst.org.uk +noall +answer` (the CNAME).

No `CNAME` file is needed in the repository with the GitHub Actions method. Do not add one.

## 4. HTTPS

When **Settings → Pages** shows the DNS check has passed, the certificate can take up to 24 hours. Then tick **Enforce HTTPS**.

## 5. Redirect shinfieldparishfirst.co.uk

GoDaddy: `shinfieldparishfirst.co.uk` → **DNS** → **Forwarding** → **Add Forwarding**:

- Root domain: destination `https://shinfieldparishfirst.org.uk`, type **Permanent (301)**, not "Forward with masking". Save.
- Add forwarding for the `www` subdomain with the same destination and type.

Careful: contact@shinfieldparishfirst.co.uk is on this domain. Forwarding the website must not remove its MX (email) records.

After an hour, `curl -sI http://shinfieldparishfirst.co.uk`, `https://…`, and the `www.` versions should each return `301` with `Location: https://shinfieldparishfirst.org.uk/`. If the `https://` version gives a certificate error, ask for the small redirect repository described in section 10.4 of the spec.

## 6. Final checks (spec section 13)

- [ ] `https://shinfieldparishfirst.org.uk` loads with a valid certificate; `http://` and `www.` redirect to it.
- [ ] Sign up once with JavaScript on and once off: both land on `/thank-you/` and arrive in the form service.
- [ ] A test with the honeypot field filled is rejected or marked as spam.
- [ ] Browser dev tools show no cookies and no requests to other sites.
- [ ] Share the home page in Facebook's Sharing Debugger and WhatsApp: the card shows, with the imprint.
- [ ] Screen reader check with VoiceOver (iPhone) and NVDA (Windows), then update the dates in `src/accessibility.md`.
- [ ] Try it on iPhone Safari, Android Chrome, and desktop Chrome, Firefox, Safari and Edge.

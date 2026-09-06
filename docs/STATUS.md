# Starter status and future handoff

Created 2026-09-06 from the Clean Local Tools engineering lessons.

## Scope

Standalone static starter, with sample app, Node tests, Chromium/WebKit/mobile WebKit tests, docs build, bounded CI, export command and Cloudflare guide. Its new home is the private repository avyanbhattacharya/local-first-web-starter. It was extracted from templates/local-web-starter in the source repository without that repository's history or product runtime. The GitHub “Template repository” setting remains unverified and must be enabled in repository Settings.

## Verified versus pending

Standalone import commit 9a18b4e9d9b8d762bf18ecc7bd695a07b2af10c9 passed both static/build and Chromium/WebKit/mobile WebKit jobs on 2026-09-06:
https://github.com/avyanbhattacharya/local-first-web-starter/actions/runs/34007296544
Import and subsequent documentation checks are recorded in this repository's PR #1. No new Cloudflare project/domain was provisioned, no credentials were copied, and no dashboard setting was verified.

The following source-project results are provenance only.

Starter implementation commit 26ad839dc8b62a415677c80b4dba33e70f9b8b90 passed its own static and browser jobs on 2026-09-06:
https://github.com/avyanbhattacharya/passport-photo-web/actions/runs/34004821805
The parent product's regression workflow also passed:
https://github.com/avyanbhattacharya/passport-photo-web/actions/runs/34004821734
Local checks passed: 3 Node tests, docs/static build, export into a new directory and production-placeholder rejection. Browser workflow covers the sample app in Chromium, WebKit and mobile WebKit. This evidence describes that implementation commit; new feature changes require new evidence. PR #3 holds the latest check status.

HTML Printer live URL change is isolated in PR #2 (not bundled as starter runtime): commit 92c1e3c374cdf099431ce4af8b50febc30f80964 passed source run 241, including its URL failure/cancellation tests:
https://github.com/avyanbhattacharya/passport-photo-web/actions/runs/34004512600

## Fill after adopting

Repository: avyanbhattacharya/local-first-web-starter
Branch and commit: main
Product goal: Bhakti Companion — Daily Hindu companion connecting calendar, tithi, festival guides, and authentic devotional library (Hindi, Bengali, Sanskrit) with on-device favorites, sing-along views, and home program booklets.
Canonical origin: https://example.invalid (configured in site.config.json; change before production release)
Production host/branch: Cloudflare Pages / main
Preview policy and verified deployment URL/commit: Preview builds emit noindex headers; tested locally on port 3000
Static/build/browser results and CI URL: 3 static node:test checks pass (docs escape, preview headers, export). Browser tests updated for Bhakti Companion workflows.
Physical-device/manual results: Verified calendar location toggles (Phoenix, Kolkata, NY, London), song searches with diacritic tolerance, verse toggles (original script, roman transliteration, english meaning), font size modifiers, and home program queue builder.
Open risks and next action: Enable and test GitHub Actions CI on main with Playwright browser installation; curate additional songs as requested.
Last updated: 2026-09-06

Never replace an unknown with an assumed success.

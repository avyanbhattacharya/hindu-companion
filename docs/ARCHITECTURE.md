# Architecture

## Runtime and trust boundary

Bhakti Companion is a static site built from semantic HTML, CSS, and plain browser JavaScript. Node 24 and Playwright are development-only. There is no runtime server, account system, analytics, or API key.

Runtime sources live in `public/`; `scripts/build.cjs` copies only those files into `dist/`. Repository docs are compiled into noindex handbook pages. Tests, source assets, package metadata, and build tooling are never part of the published artifact.

The deployed page makes no network requests after its static assets load. Favorites and Home Program selections are stored in browser local storage on the current device.

## Content model

`calendar.js`, `content.js`, and `guides.js` are versioned curated data. They support the UI; they are not a calculation engine or a substitute for a tradition-specific local panchang.

Every new devotional item needs an identifier, language/script fields, transliteration and meaning where supplied, attribution, source edition, rights/reuse status, and review status. See `CONTENT-GOVERNANCE.md`.

## Build modes and hosting

`site.config.json` owns the product name, canonical origin, and production branch.

- `DEPLOY_ENV=production` emits production robots and sitemap content for `https://hinducompanion.com`.
- Local and preview builds are noindex by default.
- GitHub Pages receives `dist/` only after the quality workflow succeeds on `main`.
- `public/CNAME` declares `hinducompanion.com`; DNS and HTTPS verification are external configuration.

Cloudflare-specific `_headers` are retained as future-hosting configuration, but GitHub Pages does not apply them. Do not claim those headers are live on GitHub Pages without deployed-header evidence.

## Change boundaries

A calendar calculation engine, remote content service, audio hosting, accounts, offline service worker, or AI capability requires an ADR, privacy review, source/license review, and targeted tests before it is added.

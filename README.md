# Bhakti Companion

A static, local-first Hindu resource: a location-aware devotional calendar, festival guides, and a curated library of bhajans and prayers. The first release supports Hindi, Bengali, Sanskrit, Roman transliteration, and English meaning.

## What it does now

- Shows curated calendar and observance information for Phoenix, Kolkata, New York, and London.
- Lets people search devotional songs, save favorites on their device, use a sing-along reader, and prepare a home program.
- Runs entirely in the browser. It has no account, analytics, server API, or working-file upload.

## Development

Use Node 24.

1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT-GOVERNANCE.md`, `docs/TESTING.md`, and `docs/STATUS.md`.
2. Run `npm ci`.
3. Run `npm run test:static`.
4. Run `npm run build`.
5. Install browsers once with `npx playwright install --with-deps chromium webkit`.
6. Run `npm run test:browser`.
7. Run `npm start` and open `http://127.0.0.1:4173`.

## Hosting

GitHub Pages publishes a successful quality-validated `main` commit. The intended public origin is `https://hinducompanion.com`; `public/CNAME` declares that name for GitHub Pages. DNS and GitHub Pages custom-domain verification must be completed before relying on that URL.

Only `dist/` is published. The production build is explicit: `DEPLOY_ENV=production npm run build`. Local and preview builds remain noindex.

## Content responsibility

Calendar dates and devotional texts are curated static content, not an authoritative panchang service. Every new entry needs provenance, rights/reuse status, and human review as described in `docs/CONTENT-GOVERNANCE.md`.

## Current evidence

The latest verified CI and Pages deployment are recorded in `docs/STATUS.md`. Do not treat an earlier green run as evidence for a newer commit.

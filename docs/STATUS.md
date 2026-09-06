# Bhakti Companion status

Last updated: 2026-09-06

Current main commit: `adf2803954a0d20f830dbd83b2ebc74dd0b6b3f1`

## Current product

Repository: `avyanbhattacharya/hindu-companion`  
Release branch: `main`  
Product: Bhakti Companion — a static Hindu calendar and devotional-resource app with curated calendar cards, festival guides, bhajans/prayers, on-device favorites, and Home Program tools.

## Verified evidence

- Quality workflow passed for main commit `adf2803954a0d20f830dbd83b2ebc74dd0b6b3f1`: https://github.com/avyanbhattacharya/hindu-companion/actions/runs/34059148850
- GitHub Pages deployment ran after that successful quality workflow and passed: https://github.com/avyanbhattacharya/hindu-companion/actions/runs/34059196143
- GitHub Pages URL: https://avyanbhattacharya.github.io/hindu-companion/

## Current configuration

- Intended canonical domain: `https://hinducompanion.com`.
- GitHub Pages custom domain is declared by `public/CNAME`.
- Production build must use `DEPLOY_ENV=production`; local and preview builds are noindex.
- The runtime is static and makes no intentional runtime network requests.

## Open risks and next actions

- Configure DNS and verify HTTPS for `hinducompanion.com` in GitHub Pages before treating that domain as live.
- Calendar data is curated static content, not a complete panchang engine.
- Add content provenance, rights status, and human review metadata before expanding devotional material.
- Expand regression coverage for favorites, Home Program editing/sharing, guide flows, and content-schema validation.
- Confirm repository branch-protection settings for `main`.

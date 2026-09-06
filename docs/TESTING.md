# Testing

## Layers

- `node:test` verifies build safety, document escaping, preview behavior, production canonical/sitemap output, GitHub Pages CNAME inclusion, and export boundaries.
- Playwright runs actual user flows in Chromium, WebKit, and mobile WebKit.
- GitHub Actions runs the static job within three minutes and the browser job within eight minutes. Browser tests use a 30-second test timeout, a four-minute CI ceiling, two workers, one retry, traces on first retry, and failure reports.

## Current regression coverage

The browser suite verifies location switching, bhajan search, sing-along open/close, no external runtime requests, Home Program visibility, and a mobile overflow guard.

## Required additions with feature work

Add direct regression coverage for:

- Favorites persistence and corrupted local-storage recovery.
- Program add, remove, reorder, presets, share links, and hash routing.
- Festival-guide navigation and linked songs.
- Filters, script/meaning/font toggles, keyboard behavior, and print invocation.
- Content-schema validation, source/review metadata, and supported-location assumptions.
- Published-site behavior under the GitHub Pages project path and custom-domain configuration once DNS is active.

Never replace a meaningful assertion with a fixed sleep, a skipped test, or `continue-on-error`. A green test run is evidence only for that commit.

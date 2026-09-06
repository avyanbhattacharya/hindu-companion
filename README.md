# Hindu Companion

Hindu Companion is a static, content-first resource for devotional music, festival learning, and eventually a carefully sourced local calendar. It runs on Astro and deploys as static files to GitHub Pages—there is no application server, account system, or runtime content API.

## Content workflow

- Add a bhajan, kirtan, prayer, or guide as Markdown under `src/content/`.
- Every entry needs a concise description and a `source` field. Follow `docs/CONTENT-GOVERNANCE.md` before publishing text, translations, audio, or images.
- Astro compiles Markdown into static pages during `npm run build`.

## Development

Use Node 24.

1. `npm ci`
2. `npm run test:static`
3. `npm run build`
4. `npx playwright install --with-deps chromium webkit` (once)
5. `npm run test:browser`
6. `npm run dev`

`npm run build` outputs only deployable files in `dist/`. GitHub Pages publishes a validated `main` commit. The intended public origin is `https://hinducompanion.com`; DNS and GitHub Pages custom-domain verification remain an external step.

## Styling

The visual system is intentionally token-based. Start in `src/styles/theme.css`: colors, type families, spacing radius, and shadows are CSS variables so a later visual redesign does not require touching every component.

## Calendar scope

The calendar page is intentionally a roadmap until a reviewed data source and calculation policy are available. Do not publish example or guessed tithi/festival dates as a live panchang.

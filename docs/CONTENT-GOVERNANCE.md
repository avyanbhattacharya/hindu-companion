# Content governance

## Scope

Bhakti Companion contains devotional texts, translations, transliterations, festival guides, and curated calendar information. Spiritual and cultural accuracy deserves the same care as technical correctness.

## Required metadata

Each new song, prayer, guide, or calendar entry must record the minimal editorial model:

- `source`: Work title, author/tradition, and/or stable reference URL.
- `contentOrigin`: `traditional-source`, `original-site-writing`, `permission`, or `link-only`.
- `status`: `draft` or `published`.
- `reviewedOn`: Optional ISO date (`YYYY-MM-DD`) set by human editor upon publication.

Do not copy a website merely because it is publicly readable. Contemporary lyrics, translations, recordings, scans, and editorial notes may be protected even when an older original work is public domain.

## Review workflow & AI agent boundary

1. Google AI Studio and Jules agents may prepare new content entries with `status: draft`.
2. **AI agents must NEVER change `status` from `draft` to `published`.**
3. Only Abhishek or a designated human editor may verify the text/translation and set `status` to `published`.
4. Preserve variant readings rather than silently combining traditions.
5. Keep a correction path and record the edition/version used in `source`.

## Calendar boundary

The initial calendar is curated static data for supported locations. It must state its source and convention. Do not promise universal tithi, fasting, sunrise, or festival accuracy until a licensed or independently validated calculation approach exists.

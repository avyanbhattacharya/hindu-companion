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

## Repository Boundary & Review Workflow

1. Unapproved drafts, research notes, and unverified texts belong in the **separate private content repository**.
2. `src/content/bhajans/` in this public repository contains **only approved `status: published` entries**.
3. Google AI Studio and Jules agents may prepare new content entries as `status: draft` in private draft storage, but **must NEVER set `status: published` or commit unverified drafts to this public repository**.
4. Only Abhishek or a designated human editor may verify text/translation accuracy and move entries into this public repository with `status: published`.
5. Preserve variant readings rather than silently combining traditions.
6. Keep a correction path and record the edition/version used in `source`.

## Calendar boundary

The initial calendar is curated static data for supported locations. It must state its source and convention. Do not promise universal tithi, fasting, sunrise, or festival accuracy until a licensed or independently validated calculation approach exists.

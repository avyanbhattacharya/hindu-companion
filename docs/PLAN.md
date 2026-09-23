# Hindu Companion — product plan

## Vision

`hinducompanion.com` is a static, trustworthy Hindu companion: the day's
observance, mantras and prayers in readable scripts, festival guides,
katha, and eventually a computed panchang. No accounts, no ads, no
analytics, no tracking.

Every word on the site is ancient, public domain, openly licensed, or
originally written — nothing borrowed from modern authors. See
`docs/SOURCES.md` for the vetted source list and `docs/CONTENT-GOVERNANCE.md`
for the per-entry metadata rules that enforce this.

## Copyright doctrine (non-negotiable)

Four tiers, enforced through the governance checklist before anything
publishes:

1. **Ancient originals are free.** Sanskrit from Sanskrit Wikisource
   (CC BY-SA 4.0, with attribution) or transcribed from public-domain
   editions directly.
2. **Pre-1930 translations are free.** Ganguli, Griffith, Arnold, Müller,
   Bühler, Dutt are public domain under US law (the operator is US-based;
   the stricter US life-plus-70 rule governs, not India's life-plus-60).
3. **Everything else is written fresh.** All summaries, festival
   explainers, katha retellings, and commentary are original. Never adapt
   a modern author's retelling.
4. **Link-only tier.** sanskritdocuments.org and GRETIL are references,
   never sources to copy.

Hard no list: Gita Press translations, Prabhupada, any living translator,
lyrics sites, YouTube audio rips, scraped panchang sites, modern calendar
art, user comments at launch.

## Phases

### Phase 0 — Foundation (now)

- Merge the `docs/SOURCES.md` bibliography (PR #6).
- Point `hinducompanion.com` DNS at GitHub Pages (`public/CNAME` is
  already in the repo).
- Make the governance gate — source, rights status, human reviewer — a
  hard requirement before any content entry publishes.
- **Done when:** the site is live on the domain with the checklist
  enforced.

### Phase 1 — Mantra & stotra library (safest content; start here)

- 20–30 core texts: Gayatri Mantra, Mahamrityunjaya, Hanuman Chalisa
  (traditional text, self-transcribed), popular ashtottaras.
- Each entry: Devanagari, IAST, Hindi, Bengali, and English meaning from
  a public-domain translation or an original gloss — plus source
  attribution and tradition notes.
- Content lives in `src/content/` following the existing collection
  conventions (provenance frontmatter required by static tests).
- **Done when:** a qualified reviewer has checked script,
  transliteration, and meaning for every entry, and the correction path
  is live.

### Phase 2 — Festival guides

- Original explainers for ~15 major festivals: the story retold from
  public-domain sources, how it is observed, and regional variations
  stated explicitly (amanta vs purnimanta month reckoning where it shifts
  dates).
- **Done when:** no festival is presented as universal — region and
  tradition are labeled on each guide.

### Phase 3 — Katha

- Retellings sourced to Ganguli and Dutt, clearly marked as retold, with
  canto/chapter citations. Original narration throughout.
- **Done when:** each katha traces to its public-domain source.

### Phase 4 — Panchang (last; hardest)

- Compute from JPL ephemeris data plus textbook algorithms — never
  scrape. Verify any library's commercial license before depending on it.
- Disclose the method on the site (*"Computed using Lahiri ayanamsa;
  regional variations exist."*).
- Start with 2–3 locations; keep the roadmap framing from the README
  until values are cross-checked against two independent references for
  a full year.
- **Done when:** a full year of values validates and the method page is
  published.

### Phase 5 — Home Program tools & polish

- On-device favorites, printable program sheets, site search.

## Explicitly not doing

User comments at launch, hosted audio of any kind, "universal" religious
claims, anything the product brief lists as a limit (no universal
panchang promises, no licensed recordings, no offline support claims).

## Legal posture (not legal advice)

Informational disclaimers (not priestly guidance), a visible correction
path with fast fixes, a DMCA agent registered at launch, US governing law
in the Terms, and a respectful multi-tradition tone throughout.

## Open questions

1. Which 5 mantras or texts come first in Phase 1?
2. Hindi-first, English-first, or parallel scripts from day one?
3. For the eventual panchang: Indian cities, US diaspora cities, or both?

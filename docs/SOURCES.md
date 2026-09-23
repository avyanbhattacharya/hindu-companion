# Source bibliography

Concrete, pre-vetted sources backing the rights/reuse metadata required by
`CONTENT-GOVERNANCE.md`. Every content entry's `source` field should
ultimately trace back to an item here — or to a new item added here with
the same level of verification.

The operator is US-based, so all copyright calls below use **US law**:
works published before 1930 are public domain; otherwise life + 70 years.
(India uses life + 60; the US rule is stricter, so it governs.)

> The core principle: the Sanskrit verses are ancient and free. The risk is
> never the mantra — it is someone's modern translation, transcription,
> arrangement, photo, or recording of it.

## English translations (public domain)

All editions below were published before 1930 and are public domain in the
US. Quote freely; credit the translator as a courtesy. Browse the full
collection at https://sacred-texts.com/hin/index.htm

| Text | Translator | Published |
|---|---|---|
| Mahabharata, complete (18 books) | Kisari Mohan Ganguli | 1883–1896 |
| Ramayana | Ralph T. H. Griffith | 1870–1874 |
| Ramayana & Mahabharata, abridged | Romesh Chunder Dutt | 1899 |
| Bhagavad Gita ("The Song Celestial") | Edwin Arnold | 1885 |
| Hymns of the Rig Veda | Ralph T. H. Griffith | 1889–1892 |
| Upanishads (Sacred Books of the East) | F. Max Müller | 1879–1884 |
| Laws of Manu | Georg Bühler | 1886 |

Full Mahabharata text: https://sacred-texts.com/hin/maha/index.htm

Do not use: Gita Press translations, Prabhupada's "Bhagavad-gita As It Is",
Easwaran/Mitchell or any living translator, modern retellings, or anyone's
"108 mantras with meanings" book or blog wholesale — selection, arrangement,
and commentary can be copyrighted even when the verses are ancient.

## Sanskrit e-texts

The verses are millennia old; each archive's **transcription terms** differ.

- **Sanskrit Wikisource** (https://sa.wikisource.org/) — **CC BY-SA 4.0**.
  Commercial reuse allowed with attribution; link the license
  (https://creativecommons.org/licenses/by-sa/4.0/). ShareAlike propagates
  to derivatives, so record page title, revision id (`oldid`), and fetch
  date per text.
- **GRETIL** (https://gretil.sub.uni-goettingen.de/) — academic e-texts
  (often IAST, not Devanagari); no reuse license granted. Use for
  cross-checking readings only, not as a source to copy.
- **sanskritdocuments.org** — ⚠️ explicitly NOT free to reuse. Their terms
  forbid copying for website promotion or commercial use. **Do not copy
  text from this site**; link-only at most. This is the classic trap: it
  feels public domain and isn't.

## Images

- Start at Wikimedia Commons:
  https://commons.wikimedia.org/wiki/Category:Hindu_deities
  Check **every image's license tag individually**: PD-art/PD-old (free),
  CC BY / CC BY-SA (free with attribution), anything else (skip).
- Good public-domain hunting: Raja Ravi Varma paintings (d. 1906),
  19th-century Company School paintings, archaeological sculpture where
  the photo itself is PD or freely licensed.
- Modern calendar/framing-shop art: assume copyrighted. Stock photos:
  licensed only — never pull from Google Images.
- Long-term: commission original illustrations with full rights assigned
  in writing. One-time cost, zero license ambiguity.

## Panchang / calendar data

Tithi dates, nakshatras, and sunrise times are **facts** — not copyrightable
in the US. Never scrape another site's presentation; compute values
independently:

1. Ephemeris: JPL Development Ephemeris data (US government, public domain).
2. Textbook algorithms (tithi = 12° of lunar elongation; nakshatra = 13°20'
   segments; standard sunrise equations).
3. Libraries: verify the license for commercial use before depending on one
   (Swiss Ephemeris-based packages carry restrictions).

Always disclose the method: *"Computed using Lahiri ayanamsa; regional
variations exist."* Note amanta vs purnimanta month reckoning and ayanamsa
choices — most "wrong date" disputes are method differences, and saying so
up front turns a controversy into a footnote.

## Audio

Audio carries **two stacked copyrights**: lyrics/composition AND the
recording (performer + label). Every audio entry must record its rights
status per the governance doc:

- Traditional lyrics of unknown authorship: safe **as text you transcribe
  yourself**; never copy-paste a lyrics site's transcription.
- Modern bhajans/kirtan compositions or any living artist: copyrighted —
  skip unless permission is granted in writing.
- Never rip from YouTube "non-copyright" compilations; the uploader usually
  owns nothing either.
- Later: commission original recordings with written performer agreements.

## Legal notes (not legal advice)

- **DMCA**: US hosts act on takedowns fast, and music labels file
  aggressively. Register a DMCA agent to keep safe-harbor protection.
- **BNS Section 299** (replaced IPC 295A): punishes *deliberate and
  malicious* acts outraging religious feelings (up to 3 years). A sincere
  site with an honest error doesn't meet that bar — but the real threat is
  backlash (mass reporting, app-store removal), not prosecution.
- Launch posture: informational disclaimers, method disclosure for calendar
  data, visible correction path, no user comments at launch, US governing
  law in Terms.

## Adding a new source

Before any source joins this bibliography:

1. Is the *specific edition/translation/recording* pre-1930, or did its
   author die 70+ years ago?
2. If it's a site's transcription: does that site permit reuse?
3. If an image: what does its license tag say?
4. If audio: who owns the *recording*, separate from the lyrics?
5. Record the answer in the content entry's rights/reuse metadata.

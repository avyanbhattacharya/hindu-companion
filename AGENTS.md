# Instructions for every human or AI maintainer

Read `README.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT-GOVERNANCE.md`, `docs/TESTING.md`, `docs/WORKFLOW.md`, and `docs/STATUS.md` before changes. They are the continuity contract.

- Preserve unrelated edits. Inspect branch and current commit before modifying. Do not force-push, rewrite history, move a baseline, deploy, alter secrets, or change a domain without explicit scope.
- Keep the runtime static: semantic HTML, CSS, and browser JavaScript. New dependencies, APIs, accounts, analytics, or server behavior require a documented decision and regression tests.
- Do not add network contact silently. The app currently has no runtime fetches; explain and test any change to that boundary. Never place credentials in browser code.
- Calendar data, lyrics, translations, and recordings require source, attribution, rights status, and human-review metadata. Do not represent curated sample data as a universal or authoritative observance.
- Add regression tests for every meaningful workflow change. Keep CI bounded; never hide a failure, add arbitrary sleeps, or skip coverage to obtain green.
- Run static tests, build, Chromium, WebKit, and mobile-WebKit checks. Inspect the actual CI run for the exact commit.
- Publish only `dist/`. GitHub Pages deployment must follow a successful quality workflow. Generated docs are outputs; edit Markdown sources.
- Keep production and preview semantics explicit. `DEPLOY_ENV=production` is the release build; local and preview builds remain noindex.
- Update `docs/STATUS.md` after a meaningful session with commit, tests, deployment evidence, unresolved choices, and next action.

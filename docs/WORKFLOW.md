# Workflow and releases

## Branches

`main` is the release branch. Use short-lived `feature/*` or `fix/*` branches and a pull request for changes. Protect `main` with the `Starter quality` check when repository settings permit it.

## Release gate

1. A pull request runs the quality workflow.
2. Merge only after the quality result for the reviewed head commit is green.
3. A successful `Starter quality` run on `main` triggers GitHub Pages.
4. The Pages workflow checks out that validated commit, builds `dist/` with `DEPLOY_ENV=production`, and publishes it.

A Pages success is evidence of publication, not of domain DNS, browser compatibility on physical devices, or calendar/content accuracy.

## Domain

`hinducompanion.com` is the intended canonical domain. The repository provides `public/CNAME`; GitHub Pages and DNS must be configured separately. Keep the GitHub Pages URL available as a fallback until custom-domain HTTPS is verified.

## Handoff

Update `STATUS.md` with the commit, test/deployment URLs, verified facts, remaining risks, and next action. Store architecture or content-policy decisions as Markdown, not only in chat.

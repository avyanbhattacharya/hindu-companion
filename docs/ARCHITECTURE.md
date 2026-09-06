# Architecture

## Runtime model

Hindu Companion is an Astro static site. Astro renders `.astro` pages and Markdown content into static HTML at build time. GitHub Pages serves the generated `dist/` directory.

There is no web server, database, account, analytics service, or runtime content API. Browser interactions should remain optional and local-first.

## Content model

`src/content/config.ts` defines the content schemas. Entries live in these collections:

- `src/content/bhajans/` — bhajans, kirtans, prayers, and stotras.
- `src/content/guides/` — festival and home-practice guides.

Each Markdown file creates a static route. Frontmatter is validated during the build; provenance is mandatory.

## Presentation model

- `src/layouts/BaseLayout.astro` owns document metadata and shared navigation.
- `src/components/` contains reusable view components.
- `src/styles/theme.css` owns the design tokens. Prefer token edits and component classes over page-specific inline styling.
- `src/pages/` owns routes and contains no unreviewed devotional source text.

## Deployment

`Starter quality` runs tests and the Astro build. The Pages workflow runs only after a successful `main` quality run, builds with `npm run build`, and deploys `dist/`.

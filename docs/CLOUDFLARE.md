# Future Cloudflare hosting note

Bhakti Companion currently publishes through GitHub Pages, not Cloudflare Pages. The active release workflow is `.github/workflows/pages.yml`.

This file is retained only as a future migration reference. Do not follow it as current deployment instructions, and do not assume Cloudflare headers, preview branches, or custom-domain settings are active.

If the project later moves to Cloudflare Pages, make a documented hosting decision first. Reconfirm the production origin, deploy only `dist/`, preserve the explicit preview/production build mode, and verify headers and preview behavior on the deployed host.

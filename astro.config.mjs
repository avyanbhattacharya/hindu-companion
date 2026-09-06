import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hinducompanion.com',
  output: 'static',
  integrations: [sitemap()],
  // Directory routes make every page work on both a GitHub project URL and a custom domain.
  build: { format: 'directory' }
});

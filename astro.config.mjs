import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const PREVIEW = process.env.PREVIEW === '1';
export default defineConfig({
  site: 'https://www.thabayametsi.com',
  trailingSlash: 'never',
  build: { format: PREVIEW ? 'file' : 'file', inlineStylesheets: 'always' },
  integrations: PREVIEW ? [] : [sitemap({ filter: (p) => !p.includes('/404') })],
  compressHTML: true,
});

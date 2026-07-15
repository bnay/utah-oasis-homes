// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  trailingSlash: "ignore",
  site: "https://utahoasishomes.com",
  integrations: [
    sitemap({
      filter: (page) =>
        new URL(page).pathname.replace(/\/$/, "") !== "/thank-you",
    }),
  ],
});


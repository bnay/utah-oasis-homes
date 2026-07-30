// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isNoIndexBuild = process.env.PUBLIC_SITE_NOINDEX === 'true';

// https://astro.build/config
export default defineConfig({
  trailingSlash: "ignore",
  site: "https://utahoasishomes.com",
  integrations: isNoIndexBuild
    ? []
    : [
        sitemap({
          filter: (page) =>
            new URL(page).pathname.replace(/\/$/, "") !== "/thank-you",
        }),
      ],
});

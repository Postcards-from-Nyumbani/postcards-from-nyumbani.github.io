import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // GitHub Pages routing configuration
// The absolute domain (dashes)
  site: 'https://postcards-from-nyumbani.github.io',
  
  // The exact repository name (underscores)
  base: '/postcards_from_nyumbani',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
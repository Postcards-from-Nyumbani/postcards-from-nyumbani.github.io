import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // GitHub Pages routing configuration
// The absolute domain (dashes)
 site: 'https://postcards-from-nyumbani.github.io',
  
  // This is the magic toggle!
  // If building on GitHub, use the subfolder. If on your computer, use the root (/).
  base: process.env.GITHUB_ACTIONS ? '/postcards_from_nyumbani' : '/',
  

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
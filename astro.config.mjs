// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  vite: { plugins: [tailwindcss()] },
  integrations: [svelte()],
  adapter: netlify(),
});

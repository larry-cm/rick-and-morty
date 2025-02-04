// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import icon from 'astro-icon';



import cloudflare from '@astrojs/cloudflare';



// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact({compat:true}), icon()],
  output:"server",
  adapter: cloudflare()
});
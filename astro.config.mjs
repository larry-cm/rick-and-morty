// @ts-check
import { defineConfig } from 'astro/config'

import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'

import vercel from '@astrojs/vercel'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), react()],
  output: 'server',
  adapter: vercel({
    imageService: true,
    devImageService: 'sharp'
  }),
  image: {
    domains: ['https://rickandmortyapi.com/api/character/avatar/'],
    remotePatterns: [{ protocol: 'https', hostname: 'rickandmortyapi.com' }]
  }
})

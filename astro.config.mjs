// @ts-check
import { defineConfig } from 'astro/config'

import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  output: 'server',

  adapter: vercel({
    imageService: true,
    devImageService: 'sharp'
  }),

  image: {
    domains: ['https://rickandmortyapi.com/api/character/avatar/'],
    remotePatterns: [{ protocol: 'https', hostname: 'rickandmortyapi.com' }]
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
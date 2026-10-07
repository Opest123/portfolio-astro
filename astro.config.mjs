// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.stephenenikanoselu.com',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  // Fonts are downloaded at build time and served from this site (no
  // render-blocking request to Google), with size-matched fallbacks to avoid layout shift.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo Black',
      cssVariable: '--font-archivo-black',
      weights: [400],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      weights: [400, 500, 700],
      styles: ['normal'],
    },
  ],

  // Pages stay static; only the contact Action runs on demand (as a Vercel function).
  adapter: vercel(),

  // Typed, validated env vars, imported from 'astro:env/server'.
  // Server secrets can never be bundled into client code.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      EMAIL_FROM: envField.string({ context: 'server', access: 'public', default: 'Portfolio <onboarding@resend.dev>' }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'public', default: 'stephenenikanoselu@gmail.com' }),
    }
  }
});

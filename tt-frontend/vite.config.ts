import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    /* Re-encodes images in the build output (incl. public/) at the qualities
       below. NOTE: this does NOT resize — the heavy lifting (downscaling the
       multi-thousand-px source art + WebP conversion) is done ahead of time by
       `npm run optimize:images` (scripts/optimize-public.mjs). This plugin is
       the ongoing safety net so any new/un-optimized image still gets squeezed
       at build time. */
    ViteImageOptimizer({
      /* Raster only — we don't ship SVGs through here, and enabling SVG would
         pull in an optional `svgo` dependency. */
      test: /\.(jpe?g|png|webp)$/i,
      jpg: { quality: 72 },
      jpeg: { quality: 72 },
      png: { quality: 75 },
      webp: { quality: 72 },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        /* Split heavy vendor libs into their own chunks so first-paint
           only has to download what the landing route actually needs. */
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'motion'
          if (
            id.includes('react-router') ||
            id.includes('react-dom') ||
            id.includes('/react/')
          ) {
            return 'vendor'
          }
        },
      },
    },
  },
})

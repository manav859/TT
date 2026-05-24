import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
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

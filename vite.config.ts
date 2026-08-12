import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      'ae1a-2409-40c4-11c1-75f9-a4b2-a05c-6e7-d221.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io',
    ],
  },
})

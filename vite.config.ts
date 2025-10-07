import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'  // If you have this, keep; else ignore

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // <-- KEY: Root path for Vercel (remove any '/pi-cover-alliance/')
  build: {
    outDir: 'dist',  // Standard
  },
})

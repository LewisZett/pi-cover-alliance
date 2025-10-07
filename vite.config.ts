import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // <-- This now works after Step 1

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Root path for Vercel (no '/pi-cover-alliance/')
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
})

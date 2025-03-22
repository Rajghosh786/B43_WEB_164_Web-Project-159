import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Smart-Balance/',  // Adjust base path
  build: {
    outDir: 'Smart-Balance/dist'  // Ensure the output folder is correct
  }
})

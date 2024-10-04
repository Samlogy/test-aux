import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Ignorer les erreurs de typage spécifiques
    ignoreAnnotations: true,
  },
})

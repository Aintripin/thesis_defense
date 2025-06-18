import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(() => {
  const esTarget = process.env.VITE_ES_TARGET || 'es2020';
  
  return {
    plugins: [react(), viteSingleFile()],
    build: {
      target: esTarget,
      rollupOptions: {
        output: {
          // This won't work with vite-plugin-singlefile, but we'll handle naming after build
          entryFileNames: `presentation_${esTarget.toUpperCase()}.js`,
        }
      }
    }
  }
})

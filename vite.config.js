import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react(),
  ],
  build: {
    // Minificación optimizada
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    // Optimizar chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React core
          'react-vendor': ['react', 'react-dom'],
          // GSAP separado (se usa en varios componentes)
          'gsap-vendor': ['gsap', '@gsap/react'],
          // Lenis smooth scroll
          'lenis-vendor': ['lenis'],
          // Internacionalización
          'i18n-vendor': ['react-i18next', 'i18next', 'i18next-http-backend'],
          // UI utilities
          'ui-vendor': ['@iconify/react', 'react-responsive', 'react-scroll'],
        },
      },
    },
    // Reportar tamaño de chunks
    chunkSizeWarningLimit: 500,
  },
  // Optimizaciones de desarrollo
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap'],
  },
})

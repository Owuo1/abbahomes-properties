import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { githubPagesSpa } from '@sctg/vite-plugin-github-pages-spa'

export default defineConfig({
  plugins: [
    react(),
    githubPagesSpa({
      verbose: true,  // Optional: shows what the plugin is doing
    })
  ],
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['react-icons/fa', 'react-icons/ai', 'react-icons/md']
        }
      }
    }
  },
  preview: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons/fa', 'react-icons/ai', 'react-icons/md', 'uuid']
  },
  css: {
    devSourcemap: true,
  }
})

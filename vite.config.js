import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base path for GitHub Pages deployment
  // Since your repo is 'abbahomes-properties', set base to '/abbahomes-properties/'
  // If you're using a custom domain (which you are), you can use '/'
  base: '/',
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['react-icons/fa', 'react-icons/ai', 'react-icons/md']
        }
      }
    }
  },
  
  // Preview configuration
  preview: {
    port: 3000,
    open: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons/fa', 'react-icons/ai', 'react-icons/md', 'uuid']
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    }
  }
})

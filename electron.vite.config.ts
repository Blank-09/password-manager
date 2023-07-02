import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    mode: 'development',
    build: {
      minify: true,
      sourcemap: false,
      watch: { include: ['electron/main/**'] },
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/main/index.ts')
        }
      }
    }
  },
  preload: {
    mode: 'development',
    build: {
      minify: true,
      sourcemap: false,
      watch: { include: ['electron/preload/**'] },
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/preload/index.ts')
        }
      }
    }
  },
  renderer: {
    root: '.',
    mode: 'development',
    build: {
      minify: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      }
    },
    resolve: {
      alias: {
        // '@renderer': resolve('src'),
        '@': resolve('src'),
        '@components': resolve(__dirname, 'src/components')
      }
    },
    plugins: [react()]
  }
})

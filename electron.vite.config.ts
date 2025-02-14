import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      watch: {
        include: ['src/main/**']
      },
      minify: !isDev
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      watch: {
        include: ['src/preload/**']
      },
      minify: !isDev
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})

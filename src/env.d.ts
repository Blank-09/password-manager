/// <reference types="vite/client" />

declare module '*.svg' {}

interface ImportMetaEnv {
  readonly VITE_APP_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ACCESS_KEYS: string,
    readonly VITE_SECRET_KEYS: string,
    readonly VITE_SECRET_PEXELS: string,
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
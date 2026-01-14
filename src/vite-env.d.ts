//Este archivo permite que el main.ts interprete el App.vue y todos los archivos .vue

/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}   
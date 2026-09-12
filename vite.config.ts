import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

// `vite` (dev) serves the demo app from index.html; `vite build` emits the library.
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    command === 'build' &&
      dts({
        tsconfigPath: './tsconfig.app.json',
        include: ['src/index.ts', 'src/components/**/*'],
        exclude: ['src/components/docs/**', 'src/components/table/TableDemo.tsx'],
      }),
  ],
  publicDir: command === 'build' ? false : 'public',
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'formik'],
    },
    sourcemap: true,
  },
}))

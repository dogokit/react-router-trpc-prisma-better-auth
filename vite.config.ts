import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()]
})

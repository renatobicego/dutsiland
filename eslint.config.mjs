// Flat config: ESLint 9 ya no lee .eslintrc.json, y Next 16 sacó el comando `next lint`
// (el script "lint" del package.json llama a eslint directo).
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  ...nextVitals,
  ...nextTs,
])

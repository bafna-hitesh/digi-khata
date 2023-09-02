import { defineConfig } from 'father'

export default defineConfig({
  sourcemap: false,
  cjs: {
    input: 'src',
    output: 'dist/cjs'
  },
  esm: {
    input: 'src',
    output: 'dist/es'
  }
})

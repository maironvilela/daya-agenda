import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';


export default defineConfig({

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },

  },
  plugins: [tsconfigPaths()],

  test: {
    include: ['src/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/docs/**'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/**/usecases', 'src/**/presentation/controllers/**/*.ts'],
      exclude: ['**/core/usecases/**', '**/protocols/**']
    },
  },


});
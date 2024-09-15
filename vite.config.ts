import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: './lib/index.ts',
      },
      formats: ['es', 'cjs'],
      name: '@shrimpcoder/ts-fetcher',
      fileName: format => {
        return `${format}/index.js`;
      },
    },
  },
  test: {
    globals: true,
    include: ['lib/**/*.test.ts', 'lib/**/*.spec.ts'],
    exclude: ['lib/index.ts'],
    coverage: {
      provider: 'v8',
      include: ['lib/**/*.test.ts', 'lib/**/*.spec.ts'],
      exclude: ['lib/index.ts'],
    },
  },
});

import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    svelte({
      hot: !process.env.VITEST
    })
  ],
  resolve: {
    alias: {
      $lib: resolve('./src/lib')
    },
    conditions: ['browser', 'default']
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true
  }
});
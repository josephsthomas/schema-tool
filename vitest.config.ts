import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Phase 1: only Node-side tests for the ingest scripts. When React component
// tests land in Phase 2, replace this with a `projects` setup (separate node
// project for scripts, jsdom project for src/**) per the vitest 3+ pattern.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    globals: false,
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
});

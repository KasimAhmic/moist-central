/// <reference types="vitest" />
import reactSwcPlugin from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [reactSwcPlugin()],
  build: {
    outDir: 'build',
  },
  test: {
    coverage: {
      provider: 'v8',
      all: true,
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});

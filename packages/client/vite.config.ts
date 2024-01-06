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
});

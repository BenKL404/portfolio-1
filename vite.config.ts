import { defineConfig } from 'vite';
import { resolve } from 'node:path';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [cloudflare()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv.html'),
      },
    },
  },
});
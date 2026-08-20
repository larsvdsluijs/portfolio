import { defineConfig } from 'vite';

export default defineConfig({
  // Served from the custom domain root (see public/CNAME), not a repo subpath.
  base: '/',
  server: {
    host: true,
    port: 5173
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048
  }
});

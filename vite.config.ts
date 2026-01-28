
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  define: {
    // Inject the API_KEY from the environment during build/dev
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Allows standalone offline file:// execution and standard localhost hosting
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/*.zip', '**/.git/**', '**/dist/**', '**/.agents/**']
    }
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const sandboxHosts = [];
if (process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN) {
  sandboxHosts.push(`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`);
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Preview proxy forwards requests with the sandbox hostname; allow it explicitly.
    allowedHosts: sandboxHosts.length ? sandboxHosts : undefined,
    watch: process.env.BASE44_PREVIEW_MODE === '1' ? { usePolling: true, interval: 320 } : undefined,
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});

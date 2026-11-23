import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sandbox-only allowances: the preview proxy reaches the dev server through a
// rotating sandbox hostname, so it has to be allowed explicitly. Outside the
// preview (flag unset) Vite keeps its default host checking.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHost = process.env.BASE44_SANDBOX_HOST_DOMAIN;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: previewMode && sandboxHost ? [`.${sandboxHost}`] : undefined,
    watch: previewMode ? { usePolling: true, interval: 300 } : undefined,
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});

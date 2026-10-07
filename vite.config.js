import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Base44 preview proxy forwards the sandbox hostname as the Host header.
// The sandbox id rotates on every environment recreate, so only the shared
// domain suffix can be allow-listed. This override exists ONLY in the sandbox
// (BASE44_PREVIEW_MODE === "1"); without it the app keeps Vite's defaults.
const allowedHosts = ['localhost', '127.0.0.1'];
if (process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN) {
  allowedHosts.push(`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`);
}

const isSandbox = process.env.BASE44_PREVIEW_MODE === '1';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts,
    // Bind mounts do not always emit inotify events; polling only in the sandbox.
    watch: isSandbox ? { usePolling: true, interval: 400 } : undefined,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts,
  },
});

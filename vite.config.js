import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

// The sandbox preview proxy serves the app from a public host, so the dev
// server must bind every interface, accept that host and poll for changes on
// the bind-mounted source tree.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: { usePolling: true, interval: 400 },
    // Sandbox-only: the proxy forwards Host: <port>-<sandbox id>.<domain>, and
    // the sandbox id rotates, so the allowlist uses a leading-dot wildcard.
    // Outside preview mode nothing changes.
    allowedHosts:
      previewMode && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined,
  },
})

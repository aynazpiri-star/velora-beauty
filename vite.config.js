import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // The preview proxy forwards requests under a rotating sandbox subdomain.
    allowedHosts:
      previewMode && sandboxDomain ? [`.${sandboxDomain}`] : undefined,
    watch: {
      usePolling: previewMode,
    },
  },
})

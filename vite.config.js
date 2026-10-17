import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox-only preview support. Everything here is gated on
// BASE44_PREVIEW_MODE === "1"; with the variable unset (or any other value)
// Vite keeps its stock behaviour and the app is unchanged.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

const sandboxAllowedHosts =
  previewMode && sandboxHostDomain ? [sandboxHostDomain, `.${sandboxHostDomain}`] : []

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Bind mounts do not always emit inotify events inside the sandbox.
    ...(previewMode ? { watch: { usePolling: true, interval: 400 } } : {}),
    ...(sandboxAllowedHosts.length ? { allowedHosts: sandboxAllowedHosts } : {}),
  },
})

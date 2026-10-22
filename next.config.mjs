/** @type {import('next').NextConfig} */

// In the Base44 sandbox the preview is served through a proxy that forwards the
// public host (https://3000-<suffix>) as the Origin header. Next blocks dev
// assets/HMR from origins it does not know, so allow that one origin while in
// preview mode only. With the flag unset the array stays empty (Next's default).
const allowedDevOrigins = [];
if (process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_PUBLIC_HOST_SUFFIX) {
  allowedDevOrigins.push(`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`);
}

const nextConfig = {
  allowedDevOrigins,
  // Images are pre-sized local JPEGs; skipping the optimizer keeps the dev
  // server light and avoids a native sharp dependency.
  images: { unoptimized: true },
};

export default nextConfig;

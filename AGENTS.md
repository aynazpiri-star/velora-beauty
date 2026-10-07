# AGENTS.md — VELORA Beauty

Guidance for agents working in this repository.

## What this is

A single-page-application storefront (Vite + React + React Router + Tailwind CSS) for the
fictional beauty brand **VELORA**. There is **no backend, database or external service** — the
product catalogue lives in `src/data/products.js` and editorial copy in `src/data/content.js`.
Cart, wishlist and coupon state are client-side and persisted to `localStorage`.

Because there is no server-side component, checkout and the account area are intentionally
demo-only (no payments are processed, no real accounts).

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Then open http://localhost:3000.

- The compose file runs `npm ci` on container start and then `vite` in dev mode, so edits to
  `src/` hot-reload without rebuilding the image.
- `node_modules` is a named volume (`velora-beauty_node_modules`), so it is **not** the repo's
  `package-lock.json` directory on the host. If dependencies change, recreate the service.
- The web service exposes host port **3000**; that is the port the preview proxies.

Equivalent without Docker (Node 22):

```bash
npm install
npm run dev
```

## Sandbox-specific configuration

The only sandbox-dependent behaviour is host allow-listing in `vite.config.js`:

- When `BASE44_PREVIEW_MODE === "1"`, the preview's sandbox hostname suffix
  (`.$BASE44_SANDBOX_HOST_DOMAIN`) is appended to Vite's `server.allowedHosts`, and file watching
  switches to polling (bind mounts do not always emit inotify events).
- When the variable is unset or has any other value, Vite keeps its normal defaults — nothing
  about the app's behaviour changes.
- The platform additionally supplies `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, passed through
  compose, which Vite ≥ 6.1 appends to `allowedHosts` itself.

`docker-compose.base44.yml` passes `BASE44_PREVIEW_MODE` through as a bare `environment:` entry
(never hardcoded), along with the sandbox host variables.

## How to verify it works

The compose healthcheck already asserts the dev server answers `/` with the app shell. To check
by hand:

```bash
curl -fsS http://localhost:3000/ | head -5      # should return the HTML shell
docker compose -f docker-compose.base44.yml ps  # web should be "healthy"
```

Then exercise the real routes: `/`, `/shop`, `/product/radiance-vitamin-c-serum`,
`/collections/skincare`, `/wishlist`, `/checkout`, `/about`, `/contact`, `/journal`.
Deep links work because the Vite dev server performs SPA fallback.

## Gotchas

- Product images are hot-linked from the Pexels CDN (`images.pexels.com`) and testimonial avatars
  from `randomuser.me`. `SafeImage` renders a blush placeholder if a remote image fails, so a
  network hiccup will not break the layout — but a fully offline sandbox will show placeholders.
- Google Fonts (Playfair Display + Inter) load from `fonts.googleapis.com`; the Tailwind stacks
  fall back to Georgia / system sans if that request is blocked.
- `npm ci` runs on every container start and wipes/reinstalls `node_modules` in the volume; expect
  a slow first boot (~60–90s) and a healthcheck `start_period` that covers it.

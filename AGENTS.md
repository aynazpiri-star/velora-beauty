# AGENTS.md

## What this repo is

Persian (fa) RTL luxury womenswear storefront built with Next.js App Router +
Tailwind CSS. No database: the catalog lives in `lib/products.ts` and cart /
wishlist state lives in `localStorage` via `components/store-provider.tsx`.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d      # dev server on host :3000
docker compose -f docker-compose.base44.yml logs -f web # build/dev-server output
```

The service uses a plain `node:22` image with the repo bind-mounted and runs
`next dev` (hot reload). `node_modules` lives in the named volume
`velora_node_modules`, so dependency changes need
`docker compose -f docker-compose.base44.yml exec web npm install` (or a
`restart`). `.next` is written into the bind mount.

## Conventions

- Persian content only; the UI is RTL via `<html lang="fa" dir="rtl">`. Prefer
  logical Tailwind utilities (`ps-*`, `pe-*`, `start-*`, `end-*`) — never
  `left/right` for layout direction.
- Numbers and prices are rendered with `Intl.NumberFormat("fa-IR")` through
  `lib/format.ts` (Persian digits + تومان).
- Brand palette lives in `tailwind.config.ts`: wine `#361216`, ivory `#f9f3f0`,
  cream `#eadbd3`, blush `#f3e3dd`, gold `#c8a98d`, ink `#2d1d1f`.
- Vazirmatn is self-hosted at `public/fonts/Vazirmatn.woff2` and declared in
  `app/globals.css`; do not switch to a Google Fonts `<link>` (the sandbox has no
  guarantee of runtime font access).
- All photography is downloaded into `public/images/**` and referenced with
  plain `<img>` tags (images are pre-sized; the optimizer is disabled). Keep new
  imagery local for the same reason — remote hotlinks will rot.
- Copy that is demo content (testimonials, prices, contact details) is marked as
  such in the UI; payment, inventory and newsletter delivery are explicitly not
  connected (`app/api/newsletter/route.ts` only validates).

## Sandbox specifics

- `next.config.mjs` appends `3000-$BASE44_PUBLIC_HOST_SUFFIX` to
  `allowedDevOrigins` **only** when `BASE44_PREVIEW_MODE === "1"`, so Next dev
  accepts the preview proxy's Origin. With the flag unset, behavior is the
  upstream default.
- Verify a change by loading `http://localhost:3000/` (proxy host needs the
  public suffix). Cart/wishlist persistence can be checked in the browser after
  adding a product.

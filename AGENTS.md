# VELORA

Premium Persian (RTL) watch boutique built with Vite + React + React Router.

## Sandbox / Base44 setup

Run everything through the dev compose file:

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Vite dev server runs inside the `web` service on container port `5173`,
  published on host port `3000` (the preview entry point).
- Dependencies install on container start into the `node_modules` named volume;
  the repo is bind-mounted so edits hot-reload.
- `vite.config.js` allows the preview proxy host only when
  `BASE44_PREVIEW_MODE=1`; unset, it keeps Vite's default host allowlist.
- Product photography lives in `public/images` (downloaded once, no runtime
  external requests). The hero watch is a hand-built SVG (`WatchArt.jsx`).
- The flagship product (`chrono-gold`) sets `art: true` in
  `src/data/products.js`, so `ProductVisual` renders the same SVG instead of a
  photo — the hero, catalog, product page and cart all show one consistent
  gold watch. Other products use their photo.
- Catalog filters and search are URL-driven (`/shop?cat=…`, `/shop?q=…`);
  cart state persists in `localStorage` (`velora-cart`). No backend is needed.

## Structure

- `src/styles/base.css` — tokens, header, footer, shared UI
- `src/styles/home.css` — hero (notched dark panel) and homepage sections
- `src/styles/store.css` — product cards, shop, product page, cart drawer, checkout
- `src/data/products.js` — catalog (Persian names, Toman prices)
- `src/context/CartContext.jsx` — cart state persisted in `localStorage`

## Verify

- `curl -s http://localhost:3000/` should return the Vite HTML shell.
- Cart, filters and checkout are client-side; no backend or database required.

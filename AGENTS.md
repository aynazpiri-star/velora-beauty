# Velora — agent notes

فروشگاه آنلاین کفش Velora: React + Vite (کلاینت) و Express (API سفارش‌ها) — تمام رابط کاربری فارسی و RTL.

## Structure

- `src/` — Vite + React storefront (React Router, no CSS framework; design tokens in `src/index.css`).
- `server/index.js` — Express API: orders, coupon validation, product reviews, newsletter, contact.
- `shared/catalog.js` — **single source of truth** for products, prices, shipping, coupons and order totals. Imported by BOTH the client and the API; keep it free of browser/Node-only APIs.
- `public/images/` — product, category and editorial photography.

## Running

```bash
docker compose -f docker-compose.base44.yml up -d
```

- `web` serves the storefront on host port **3000** (Vite dev server, live reload).
- `api` listens on host port 8000 and is reached through Vite's `/api` proxy (`API_URL=http://api:8000`).
- Both services run `npm install` on start because `node_modules` lives on the bind mount. The `web` service waits for `api` to be healthy so the two installers never run concurrently.

## Local data

Orders, reviews, newsletter subscribers and contact messages are persisted as JSON in `.data/db.json` (mounted from `DATA_DIR=/app/.data`, gitignored). Delete that file to reset.

## Quirks

- Sandbox host allowlist: `vite.config.js` appends `.${BASE44_SANDBOX_HOST_DOMAIN}` to `allowedHosts` only when `BASE44_PREVIEW_MODE === "1"`; with the flag unset Vite keeps its default host checking.
- Persian numerals are formatted in the UI only (`src/lib/format.js`); the API and catalog always use Latin digits and plain numbers in Toman.
- Order totals are recomputed server-side from the catalog, so client-side tampering cannot change a price.
- Cart, favorites and the applied coupon live in `localStorage` (`velora.cart.v1`, `velora.favorites.v1`, `velora.coupon`).

## Verify

- Health: `curl -s localhost:3000 | head` and `curl -s localhost:8000/api/health`.
- Checkout path: add an item → `/checkout` → submit → `/order/VLR-XXXXXX` reads the order back from the API.

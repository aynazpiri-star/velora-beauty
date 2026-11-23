# VELORA

بوتیک آنلاین ساعت‌های لوکس — کاملاً فارسی و راست‌به‌چپ.

A premium Persian (RTL) watch boutique: editorial homepage with a notched
chocolate hero, catalog with category filters and search, product pages, a
slide-out cart, and a checkout flow. Built with Vite, React and React Router.

## Run locally

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Open http://localhost:3000.

## Structure

- `src/styles/` — design tokens, hero, catalog/cart/checkout styles
- `src/data/products.js` — catalog (Persian names, Toman prices)
- `src/context/CartContext.jsx` — cart state persisted in `localStorage`
- `src/components/WatchArt.jsx` — hand-built SVG hero watch
- `public/images/` — product and editorial photography

See `AGENTS.md` for sandbox-specific notes.

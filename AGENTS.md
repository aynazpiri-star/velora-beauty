# AURELIA — Persian RTL jewelry storefront

React + Vite single-page storefront (no backend). Persian/RTL UI, brand marks in Latin.

## Run in this sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- One service, `web`: plain `node:22` image, repo bind-mounted at `/app`, `npm install`
  (or `npm ci`) on container start, then `vite --host 0.0.0.0 --port 3000`.
- `node_modules` lives in the `node_modules` compose volume, not in the repo.
- Public entry point: host port **3000**. No database, migrations or seed steps.
- `BASE44_PREVIEW_MODE` is passed through from the platform environment. Nothing in the
  app currently branches on it; `vite.config.js` sets `server.allowedHosts: true` only to
  let the preview proxy's host header through in development.

## Things that are not obvious

- **Images in `public/images/` are cropped from the client's reference design comp**
  (`b1501cc6c_.jpg`, 736×1988) and upscaled 2.2–2.6× with LANCZOS + unsharp mask. That is
  the highest-fidelity source available, but it is low resolution: swapping in the original
  high-resolution campaign photos (same filenames, same aspect ratios) is the single
  biggest quality win. Aspect ratios currently used:
  product cards 1.32, category circles 1:1, split banners ~1.07,
  story arch 1.08, instagram tiles 1.08, testimonial avatars 1:1, newsletter gift 1.4.
- Crops deliberately exclude text baked into the reference (hero script line, gift-banner
  heading) — keep that in mind before re-cropping.
- **Hero photo:** `public/images/hero-model-aurelia.jpg` (1140×625, ratio 1.824) is cropped
  from a client screenshot that also contained its own header, baked headline and service
  strip. Only the photograph region (x 0–1140, y 140–765) is used — the rest is never
  rendered, and the hero headline/CTA are real HTML. Re-cropping needs the original
  screenshot, which is not kept in the repo.
- Fonts are self-hosted in `public/fonts` (Vazirmatn for Persian, Jost + Cormorant Garamond
  for Latin). The `@font-face` declarations are in `src/index.css`; without Vazirmatn the
  Persian text falls back to Tahoma.
- Cart and wishlist persist in `localStorage` under `aurelia:cart` and `aurelia:wishlist`.
  Clearing them is the way to reset a manual test.
- Demo catalogue data (prices in Toman, ratings, copy) lives in `src/data/products.js` and
  `src/data/categories.js`. Prices are rendered with `toLocaleString('fa-IR')`, so Persian
  digits appear automatically.
- Nothing here processes payments, orders, stock or reviews. Those are demo placeholders and
  the UI says so (cart note, newsletter, testimonial caption, contact page).

## Verify a change

No test suite. Open `http://localhost:3000/` and walk the flow:

1. Home renders all sections in order: hero → benefits → categories → bestsellers →
   split banners → values → story → testimonials → instagram → newsletter → footer.
2. Add to cart from a product card: badge count appears, toast shows, cart drawer opens from
   the right (RTL start side), quantity +/− changes the subtotal.
3. Search icon → typing filters products; picking a result closes the overlay.
4. Heart on a card → `/wishlist` shows the item → toggling it again shows the empty state.
5. Newsletter: empty/invalid email shows an inline error, valid email shows the success note.
6. Mobile (≤640px): no horizontal overflow (`document.documentElement.scrollWidth` must equal
   `clientWidth`), and the hamburger drawer opens from the right.

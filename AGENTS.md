# AGENTS.md — AURA PARFUMS

Guidance for agents working in this repository.

## What this is

A Persian (RTL) luxury-fragrance storefront: **Vite 6 + React 18 + React Router 6 + Tailwind CSS 3**.
The whole UI is Persian with `dir="rtl"`; the brand name stays latin (`AURA PARFUMS`).

There is **no backend, database, authentication or payment provider**. The catalogue lives in
`src/data/products.js`, editorial copy in `src/data/content.js`. Cart, wishlist and the last
demo order request persist in `localStorage` only. Checkout is therefore an honest
"order request" flow — never describe it as a real payment.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Then open http://localhost:3000. `npm ci` runs on container start, then `vite` in dev mode, so
edits to `src/` hot-reload. `node_modules` is a **named volume**, not the host directory — if
dependencies change, recreate the service. Equivalent without Docker (Node 22):

```bash
npm install && npm run dev
```

## Imagery

Every photograph is **served from this repository** under `public/images/` — `products/`,
`scenes/` and the two hero files — and referenced through `IMG` / `shot()` / `scene()` in
`src/data/products.js`. Never point product or hero imagery back at a stock CDN: the storefront
renders for visitors in Iran, where `images.pexels.com` is commonly unreachable, and hotlinked
photos silently came back as empty boxes. Adding a photo means downloading it into
`public/images/` (Pexels CDN URLs accept `?auto=compress&cs=tinysrgb&w=<width>`; use 1920 for the
hero, 900–1200 elsewhere) and referencing the local path.

The hero (`src/components/home/Hero.jsx`) is two photographs, not a gradient: `hero-ocean.jpg`
as the full-bleed backdrop and `hero-bottle.jpg` (frosted teal bottle on wet stones, dark studio
frame) layered in the foreground with the `.mask-bottle` mask plus `mix-blend-screen`, so there is
no visible rectangle or halo. It stays visible on phones at ~62% column width.

## Sandbox-only configuration

`vite.config.js` gates everything on `BASE44_PREVIEW_MODE === "1"`: it appends the sandbox host
suffix (`.$BASE44_SANDBOX_HOST_DOMAIN`) to Vite's `allowedHosts` and switches file watching to
polling. When the variable is unset or has any other value, Vite keeps its stock behaviour.
`docker-compose.base44.yml` passes the flag through as a bare `environment:` entry (never
hardcoded). The platform additionally supplies `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.

## Gotchas worth knowing before you edit

- **`SafeImage` must not emit `relative` when the caller passes `absolute`/`fixed`/`sticky`.** Both
  classes end up on one element and Tailwind's stylesheet order (`absolute` before `relative`) wins,
  dropping the image into normal flow. That silently pushed every inner-page hero's heading off the
  bottom of a 100vh screenshot. Keep the `selfPositioned` guard.
- **Drawers use logical insets but *physical* transforms.** The mobile menu is pinned to
  `start-0` (the right in RTL) and hides with `translate-x-full`; the cart drawer and the shop
  filter panel are pinned to `end-0` (the left in RTL) and hide with `-translate-x-full`.
  `rtl:` variants invert the wrong way for these — don't "fix" them back.
- Tailwind has no `duration-400` (only 75/100/150/200/300/500/700/1000); use 300 or 500.
- **Never add a Pexels photo without looking at it at ~600px first.** Many of the most popular
  perfume photos on that CDN carry real competitor branding that is invisible at thumbnail size:
  `32630380` (Kilian "Smoke for the Soul"), `11295337` ("bekheit"), `36459921` ("CHANEL"),
  `965989` ("D&G"), `32630388` ("Versace"), `32630374`/`32630382` ("Issey Miyake"/"Joop"),
  `1961786` ("L'Impératrice"), `15096784` ("FIRE"), `15426081` ("OPINION"), `30970926` ("zudio"),
  `11517442` ("The Eagle"), `21008941` ("Marc Jacobs"). Also rejected later: `31612011`/`31612014`
  ("Gloria Perfume"), `16239693` ("AFFINESSE"), `12741172` ("Bespoke London"), `11705153` ("Zara"),
  `30455875` ("Zielinski & Rozen"), `16722582` ("Ivy Dubai"), `9957575` ("Gucci Flora"),
  `13875781` ("Fratelli Diamanti") and `11711813` ("honeymoon"). Verify before swapping imagery.
- Google Fonts (Vazirmatn for Persian, Cormorant Garamond for the wordmark) load remotely; the
  Tailwind stacks fall back to system sans / Georgia when that request is blocked.
- The reviews section renders **clearly labelled sample content** because no review system is
  connected. Do not present it as real testimonials.
- Footer contact details and social links are deliberate placeholders (`BRAND.contact` in
  `src/data/content.js`) — swap them for real business details before launch.

## How to verify it works

```bash
curl -fsS http://localhost:3000/ | head -5      # HTML shell
docker compose -f docker-compose.base44.yml ps  # web should be "healthy"
```

Then exercise the real routes: `/`, `/shop`, `/product/scuba-blue`, `/collections`,
`/collections/women`, `/gift-sets`, `/about`, `/contact`, `/cart`, `/wishlist`, `/checkout`,
`/account`, `/faq`, `/terms` — and any unknown path, which must render the 404 page.

End-to-end checks that matter:

1. Hero "افزودن به سبد" → header badge increments → cart drawer opens with the line item.
2. `/shop` category + family + price filters, search, sort, and the empty state.
3. `/product/:slug` → quantity stepper → add to cart → related products.
4. `/cart` → quantity +/-, remove, empty state.
5. `/wishlist` → empty state, heart toggle, "پاک کردن فهرست".
6. `/checkout` → empty-submit validation, then a valid submit produces an `AURA-######` id,
   clears the cart and appears on `/account`.
7. Scent quiz on the home page: three answers → results must come only from the catalogue.
8. Mobile: hamburger drawer, no horizontal overflow (`scrollWidth <= clientWidth`).

# VELORA — agent notes

بوتیک ساعت لوکس VELORA: storefront فارسی و کاملاً RTL با React + Vite و یک API کوچک Express برای سفارش‌ها، خبرنامه و فرم تماس. بدون CSS framework — توکن‌های طراحی در `src/index.css`.

## Structure

- `src/` — Vite + React storefront (React Router). Home، فروشگاه، محصول، سبد، پرداخت، سفارش، درباره، تماس.
- `src/components/Hero.jsx` + `hero.css` — بخش قهرمان صفحهٔ اصلی؛ مهم‌ترین بخش طراحی (پنل شکلاتی، بریدگی‌های مقعر بالا/پایین، تایپوگرافی درشت).
- `shared/catalog.js` — **تنها منبع حقیقت** برای محصولات، کالکشن‌ها، روش‌های ارسال، کدهای تخفیف و محاسبهٔ مبلغ سفارش. هم کلاینت و هم API آن را import می‌کنند؛ نباید به APIهای مخصوص مرورگر یا Node وابسته شود.
- `server/index.js` — Express API: `POST /api/orders`، `GET /api/orders/:code`، `POST /api/newsletter`، `POST /api/contact`، `GET /api/health`.
- `public/images/` — عکاسی محصول و ادیتوریال (Unsplash، مجوز آزاد).

## Running

```bash
docker compose -f docker-compose.base44.yml up -d
```

- `web` — Vite dev server روی پورت **۳۰۰۰** (live reload) و پروکسی `/api` به `api:8000`.
- `api` — Express روی ۸۰۰۰، فقط داخلی (همان‌مبدأ با فرانت).
- `deps` — نصب یک‌بارهٔ وابستگی‌ها؛ `api` و `web` تا پایان موفق آن صبر می‌کنند تا دو نصب هم‌زمان روی `node_modules` bind-mount اجرا نشود.

پس از تغییر `package.json` یک‌بار `docker compose -f docker-compose.base44.yml run --rm deps` را اجرا کنید.

## Local data

سفارش‌ها، پیام‌ها و ایمیل‌های خبرنامه در `.data/db.json` (gitignored) ذخیره می‌شوند. API کل فایل را در حافظه نگه می‌دارد و در هر نوشتن بازنویسی می‌کند؛ اگر فایل را دستی ویرایش کردید، سرویس `api` را restart کنید وگرنه نسخهٔ حافظه بر فایل چیره می‌شود.

## Quirks

- `vite.config.js` فقط وقتی `BASE44_PREVIEW_MODE === "1"` باشد، `.${BASE44_SANDBOX_HOST_DOMAIN}` را به `allowedHosts` اضافه و polling واچر را فعال می‌کند؛ در حالت عادی رفتار پیش‌فرض Vite حفظ می‌شود.
- اعداد فارسی فقط در لایهٔ نمایش (`src/lib/format.js`) ساخته می‌شوند؛ کاتالوگ و API همیشه عدد لاتین و تومان خام دارند.
- مبلغ نهایی سفارش سمت سرور از روی کاتالوگ دوباره محاسبه می‌شود؛ تغییر قیمت در کلاینت بی‌اثر است.
- سبد خرید در `localStorage` با کلید `velora.cart.v1` ذخیره می‌شود.
- بریدگی‌های هیرو با بیضی‌های رنگ‌شده به رنگ `--sand` ساخته می‌شوند و `overflow: hidden` پنل نیمهٔ بیرونی آن‌ها را می‌برد؛ رنگ پس‌زمینهٔ صفحه و بریدگی باید همیشه یکی بماند.
- کشوی سبد خرید با تغییر مسیر بسته می‌شود (`CartDrawer` روی `location.pathname` واکنش می‌دهد).

## Verify

- `curl -s localhost:3000 | head` و `curl -s localhost:3000/api/health`.
- مسیر پرداخت: افزودن محصول → `/checkout` → ثبت → `/order/VLR-XXXXXX` سفارش را از API می‌خواند.
- کد تخفیف نمونه: `VELORA15` (۱۵٪).

# VELORA

بوتیک ساعت لوکس — یک فروشگاه اینترنتی فارسی و کاملاً RTL با طراحی ادیتوریال و پنل قهرمان الهام‌گرفته از مرجع بصری پروژه.

A premium Persian (Farsi) watch boutique: fully RTL storefront with an editorial, high-end aesthetic — warm sand, dark chocolate and bronze.

## Stack

- **React 19 + Vite 6** — SPA با React Router و بدون CSS framework
- **Express** — API سفارش‌ها، خبرنامه و فرم تماس
- **Vazirmatn Variable** — تایپوگرافی فارسی (نصب محلی، بدون CDN)
- **Docker Compose** — محیط توسعهٔ آماده در `docker-compose.base44.yml`

## Run

```bash
docker compose -f docker-compose.base44.yml up -d
```

سپس <http://localhost:3000> را باز کنید. سرویس `web` با live reload اجرا می‌شود و `/api` را به سرویس `api` پروکسی می‌کند.

## Features

- هیرو صفحهٔ اصلی با پنل شکلاتی، بریدگی‌های مقعر متقارن، تایپوگرافی درشت (عنوان توپر + توخالی) و ساعت شاخص
- کالکشن‌های ادیتوریال، تازه‌ها، بخش صنعتگری، پیشنهاد تخفیف، مزیت‌ها و خبرنامه
- فروشگاه با فیلتر کالکشن، جستجو و مرتب‌سازی
- صفحهٔ محصول با گالری، مشخصات فنی و افزودن به سبد
- سبد خرید (کشو + صفحه)، کد تخفیف، پرداخت با اعتبارسنجی و صفحهٔ تأیید سفارش
- کاملاً واکنش‌گرا، دسترس‌پذیر و با احترام به `prefers-reduced-motion`

## Structure

```
shared/catalog.js   محصولات، کالکشن‌ها، ارسال، تخفیف و محاسبهٔ سفارش
server/index.js     Express API (سفارش، خبرنامه، تماس)
src/                رابط کاربری React
public/images/      عکاسی محصول و ادیتوریال
```

جزئیات محیط توسعه و نکات فنی در [`AGENTS.md`](./AGENTS.md) آمده است.

## Notes

- قیمت‌ها به تومان و محاسبهٔ نهایی سمت سرور انجام می‌شود.
- پرداخت در این نسخه به‌صورت «پرداخت در محل» یا «کارت به کارت» است؛ درگاه آنلاین متصل نیست.
- تصاویر از Unsplash و با مجوز آزاد استفاده شده‌اند.

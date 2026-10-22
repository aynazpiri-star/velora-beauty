"use client";

import Link from "next/link";
import { useStore } from "./store-provider";
import { priceLabel, formatNumber } from "@/lib/format";
import { MinusIcon, PlusIcon, TrashIcon } from "./icons";

const FREE_SHIPPING_FROM = 5000000;

export function CartView() {
  const { entries, subtotal, updateQty, removeLine, hydrated, notify } = useStore();

  if (!hydrated) {
    return <div className="min-h-[320px]" aria-busy="true" />;
  }

  if (entries.length === 0) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 border border-dashed border-ink/15 bg-cream/20 px-6 text-center">
        <p className="text-[15px] text-ink">سبد خرید شما خالی است.</p>
        <p className="max-w-sm text-[12.5px] leading-7 text-muted">
          از مجموعه‌های مجلسی، اداری و اکسسوری‌های ولورا انتخاب کنید و استایل بعدی‌تان را بسازید.
        </p>
        <Link href="/shop" className="btn-wine mt-2">
          شروع خرید
        </Link>
      </div>
    );
  }

  const shippingFree = subtotal >= FREE_SHIPPING_FROM;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      <div>
        <div className="border-y border-ink/10">
          {entries.map((entry) => (
            <div
              key={entry.key}
              className="grid grid-cols-[92px_1fr] items-start gap-4 border-b border-ink/10 py-5 sm:grid-cols-[92px_1fr_auto]"
            >
              <Link href={`/product/${entry.product.slug}`} className="block overflow-hidden bg-cream/40">
                <img
                  src={entry.product.image}
                  alt={entry.product.name}
                  className="h-[116px] w-full object-cover"
                />
              </Link>

              <div className="min-w-0">
                <Link
                  href={`/product/${entry.product.slug}`}
                  className="block text-[13px] text-ink transition-colors hover:text-wine"
                >
                  {entry.product.name}
                </Link>
                <p className="mt-1.5 text-[11px] text-muted">
                  سایز {entry.size} · رنگ {entry.color}
                </p>
                <p className="mt-2 text-[12px] text-wine">{priceLabel(entry.product.price)}</p>

                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center rounded-[3px] border border-ink/15">
                    <button
                      type="button"
                      onClick={() => updateQty(entry.key, entry.qty - 1)}
                      aria-label={`کاهش تعداد ${entry.product.name}`}
                      className="grid h-9 w-9 place-items-center text-ink/60 transition-colors hover:text-wine"
                    >
                      <MinusIcon />
                    </button>
                    <span className="w-8 text-center text-[12px]">
                      {formatNumber(entry.qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(entry.key, entry.qty + 1)}
                      aria-label={`افزایش تعداد ${entry.product.name}`}
                      className="grid h-9 w-9 place-items-center text-ink/60 transition-colors hover:text-wine"
                    >
                      <PlusIcon />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeLine(entry.key)}
                    className="flex items-center gap-1.5 text-[11px] text-muted transition-colors hover:text-wine"
                  >
                    <TrashIcon />
                    حذف
                  </button>
                </div>
              </div>

              <p className="col-span-2 text-end text-[12.5px] text-ink sm:col-span-1">
                {priceLabel(entry.product.price * entry.qty)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/shop"
          className="mt-6 inline-block text-[12px] text-wine underline decoration-gold/60 underline-offset-4 transition-colors hover:decoration-wine"
        >
          ادامه‌ی خرید
        </Link>
      </div>

      <aside className="bg-cream/40 p-6 lg:sticky lg:top-32">
        <h2 className="text-[13px] text-ink">خلاصه‌ی سفارش</h2>

        <dl className="mt-5 space-y-3 text-[12px]">
          <div className="flex items-center justify-between text-ink/75">
            <dt>جمع کالاها</dt>
            <dd>{priceLabel(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-ink/75">
            <dt>هزینه ارسال</dt>
            <dd>{shippingFree ? "رایگان" : "در مرحله‌ی بعد"}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-[13px] text-ink">
            <dt>مبلغ قابل پرداخت</dt>
            <dd>{priceLabel(subtotal)}</dd>
          </div>
        </dl>

        {!shippingFree && (
          <p className="mt-4 text-[10.5px] leading-6 text-muted">
            با {priceLabel(FREE_SHIPPING_FROM - subtotal)} خرید بیشتر، ارسال سفارش شما رایگان می‌شود.
          </p>
        )}

        <button
          type="button"
          onClick={() => notify("درگاه پرداخت هنوز متصل نشده است؛ این نسخه نمایشی است")}
          className="btn-wine mt-6 h-11 w-full"
        >
          ادامه و پرداخت
        </button>

        <p className="mt-4 text-[10.5px] leading-6 text-muted">
          پرداخت آنلاین و مدیریت موجودی انبار در این نسخه‌ی نمایشی فعال نیست و پس از اتصال درگاه
          بانکی و سیستم انبار فعال می‌شود.
        </p>
      </aside>
    </div>
  );
}

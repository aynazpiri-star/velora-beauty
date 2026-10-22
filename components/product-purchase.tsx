"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useStore } from "./store-provider";
import { HeartIcon, MinusIcon, PlusIcon } from "./icons";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished, notify } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const wished = isWished(product.slug);

  return (
    <div className="mt-8 space-y-7">
      <div>
        <p className="text-[11.5px] text-muted">
          رنگ: <span className="text-ink">{color}</span>
        </p>
        <div className="mt-3 flex items-center gap-2.5">
          {product.colors.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setColor(option.name)}
              aria-label={`رنگ ${option.name}`}
              aria-pressed={color === option.name}
              className={`grid h-8 w-8 place-items-center rounded-full border transition-all ${
                color === option.name ? "border-wine" : "border-ink/15 hover:border-ink/40"
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-ink/10"
                style={{ backgroundColor: option.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11.5px] text-muted">سایز</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={`min-w-[52px] rounded-[3px] border px-3 py-2 text-[12px] transition-colors ${
                size === option
                  ? "border-wine bg-wine text-ivory"
                  : "border-ink/15 text-ink/75 hover:border-wine hover:text-wine"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-[3px] border border-ink/15">
          <button
            type="button"
            onClick={() => setQty((current) => Math.max(1, current - 1))}
            aria-label="کاهش تعداد"
            className="grid h-11 w-11 place-items-center text-ink/70 transition-colors hover:text-wine"
          >
            <MinusIcon />
          </button>
          <span className="w-8 text-center text-[13px] text-ink" aria-live="polite">
            {new Intl.NumberFormat("fa-IR").format(qty)}
          </span>
          <button
            type="button"
            onClick={() => setQty((current) => Math.min(99, current + 1))}
            aria-label="افزایش تعداد"
            className="grid h-11 w-11 place-items-center text-ink/70 transition-colors hover:text-wine"
          >
            <PlusIcon />
          </button>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, { size, color, qty })}
          className="btn-wine h-11 flex-1 min-w-[180px]"
        >
          افزودن به سبد خرید
        </button>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={wished}
          className={`grid h-11 w-11 place-items-center rounded-[3px] border transition-colors ${
            wished ? "border-wine text-wine" : "border-ink/15 text-ink/60 hover:border-wine hover:text-wine"
          }`}
          aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        >
          <HeartIcon className="h-5 w-5" filled={wished} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => notify("درگاه پرداخت در این نسخه‌ی نمایشی متصل نشده است")}
        className="text-[11.5px] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-wine"
      >
        نیاز به مشاوره برای انتخاب سایز دارید؟
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { categoryTitle, type Product } from "@/lib/products";
import { priceLabel } from "@/lib/format";
import { useStore } from "./store-provider";
import { HeartIcon } from "./icons";

const badgeStyles: Record<string, string> = {
  new: "bg-ivory/90 text-ink",
  bestseller: "bg-wine text-ivory",
  sale: "bg-gold text-wine",
};

const badgeLabels: Record<string, string> = {
  new: "جدید",
  bestseller: "پرفروش",
  sale: "حراج",
};

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const badge = product.tags.find((tag) => tag === "sale") ?? product.tags[0];
  const wished = isWished(product.slug);

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-cream/40">
        <Link
          href={`/product/${product.slug}`}
          className="block aspect-[3/4] overflow-hidden"
          aria-label={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.05]"
          />
        </Link>

        {badge && (
          <span
            className={`absolute start-3 top-3 rounded-[2px] px-2.5 py-1 text-[10px] tracking-[0.08em] ${badgeStyles[badge]}`}
          >
            {badgeLabels[badge]}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? `حذف ${product.name} از علاقه‌مندی‌ها` : `افزودن ${product.name} به علاقه‌مندی‌ها`}
          aria-pressed={wished}
          className={`absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/85 backdrop-blur transition-colors hover:bg-ivory ${
            wished ? "text-wine" : "text-ink/70"
          }`}
        >
          <HeartIcon className="h-4 w-4" filled={wished} />
        </button>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-wine/95 py-2.5 text-[11.5px] text-ivory opacity-0 transition-all duration-300 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          افزودن سریع به سبد
        </button>
      </div>

      <div className="mt-3 flex flex-1 items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className={`truncate font-normal text-ink ${compact ? "text-[12.5px]" : "text-[13.5px]"}`}>
            <Link href={`/product/${product.slug}`} className="transition-colors hover:text-wine">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[10.5px] text-muted">{categoryTitle(product.category)}</p>
        </div>
        <div className="shrink-0 text-end">
          <p className={`text-wine ${compact ? "text-[11.5px]" : "text-[12.5px]"}`}>
            {priceLabel(product.price)}
          </p>
          {product.oldPrice && (
            <p className="mt-0.5 text-[10.5px] text-muted line-through">{priceLabel(product.oldPrice)}</p>
          )}
        </div>
      </div>
    </article>
  );
}

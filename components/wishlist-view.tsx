"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useStore } from "./store-provider";
import { ProductCard } from "./product-card";

export function WishlistView() {
  const { wishlist, hydrated } = useStore();

  if (!hydrated) {
    return <div className="min-h-[280px]" aria-busy="true" />;
  }

  const items = products.filter((product) => wishlist.includes(product.slug));

  if (items.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 border border-dashed border-ink/15 bg-cream/20 px-6 text-center">
        <p className="text-[15px] text-ink">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
        <p className="max-w-sm text-[12.5px] leading-7 text-muted">
          قلب کوچک روی هر محصول را بزنید تا برای بعد نگهش دارید.
        </p>
        <Link href="/shop" className="btn-wine mt-2">
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-5 md:gap-y-11 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

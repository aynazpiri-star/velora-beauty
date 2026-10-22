import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryTitle, getProduct, relatedProducts } from "@/lib/products";
import { formatNumber, priceLabel } from "@/lib/format";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";
import { CheckIcon, StarIcon } from "@/components/icons";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "محصول پیدا نشد | ولورا" };
  return {
    title: `${product.name} | ولورا`,
    description: product.description.slice(0, 150),
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 4);

  return (
    <div>
      <div className="shell py-6 md:py-10">
        <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
          <Link href="/" className="transition-colors hover:text-wine">
            خانه
          </Link>
          <span className="mx-2 text-muted/50">/</span>
          <Link href={`/shop?category=${product.category}`} className="transition-colors hover:text-wine">
            {categoryTitle(product.category)}
          </Link>
          <span className="mx-2 text-muted/50">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          <ProductGallery images={product.gallery} name={product.name} />

          <div className="lg:pt-2">
            <p className="eyebrow text-gold-deep">{categoryTitle(product.category)}</p>
            <h1 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-snug text-ink">
              {product.name}
            </h1>
            <p className="mt-2 text-[13px] text-muted">{product.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11.5px] text-muted">
              <span className="flex items-center gap-1 text-gold-deep">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="h-3.5 w-3.5" filled={index < Math.round(product.rating)} />
                ))}
              </span>
              <span>
                {new Intl.NumberFormat("fa-IR").format(product.rating)} از ۵ ·{" "}
                {formatNumber(product.reviews)} دیدگاه
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-[19px] text-wine">{priceLabel(product.price)}</span>
              {product.oldPrice && (
                <span className="text-[13px] text-muted line-through">{priceLabel(product.oldPrice)}</span>
              )}
            </div>

            <p className="mt-6 text-[13px] leading-8 text-ink/75">{product.description}</p>

            <ProductPurchase product={product} />

            <div className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-[11.5px] text-ink/70">
              <p className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-gold-deep" />
                ارسال رایگان برای سفارش‌های بالای ۵٬۰۰۰٬۰۰۰ تومان
              </p>
              <p className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-gold-deep" />
                ۷ روز ضمانت بازگشت یا تعویض کالا
              </p>
              <p className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-gold-deep" />
                بسته‌بندی ویژه‌ی هدیه در صورت درخواست
              </p>
            </div>

            <div className="mt-7 border-t border-ink/10 pt-6">
              <h2 className="text-[12px] tracking-[0.12em] text-gold-deep">مشخصات</h2>
              <ul className="mt-4 space-y-2.5 text-[12px] leading-6 text-ink/70">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-ink/10 bg-cream/25 py-14 md:py-20">
        <div className="shell">
          <h2 className="text-center text-[clamp(1.4rem,2.4vw,2rem)] font-normal text-ink">
            شاید این‌ها را هم دوست داشته باشید
          </h2>
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

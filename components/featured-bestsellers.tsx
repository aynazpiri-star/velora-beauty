import Link from "next/link";
import { bestsellers } from "@/lib/products";
import { ProductCard } from "./product-card";

export function FeaturedBestsellers() {
  return (
    <section className="bg-ivory pb-16 md:pb-24" aria-label="مجموعه‌ی ویژه و پرفروش‌ها">
      <div className="shell grid gap-5 lg:grid-cols-[1.02fr_1fr]">
        <article className="group relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden bg-wine p-8 text-ivory md:min-h-[600px] md:p-12">
          <img
            src="/images/editorial/duo.jpg"
            alt="دو مدل با پیراهن‌های مجلسی"
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-wine via-wine/70 to-wine/20" />
          <p className="eyebrow">مجموعه‌ی ویژه</p>
          <h2 className="mt-4 max-w-sm text-[clamp(1.7rem,2.6vw,2.4rem)] font-light leading-snug">
            منتخب استایل‌های خاص
          </h2>
          <p className="mt-4 max-w-sm text-[13px] leading-7 text-cream/80">
            قطعه‌هایی که با ظرافت انتخاب شده‌اند؛ از پیراهن‌های الهام‌گرفته از فرش‌های ایرانی
            تا برش‌های مینیمال امروز.
          </p>
          <Link href="/shop?category=dresses" className="btn-gold mt-8 self-start">
            مشاهده مجموعه
          </Link>
        </article>

        <div className="bg-cream/35 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold-deep">انتخاب مشتریان</p>
              <h2 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] font-normal text-ink">
                پرفروش‌ترین‌ها
              </h2>
            </div>
            <Link
              href="/shop?sort=featured"
              className="hidden text-[11.5px] text-wine underline decoration-gold/60 underline-offset-4 transition-colors hover:decoration-wine sm:block"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7">
            {bestsellers(4).map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>

          <Link href="/shop?sort=featured" className="btn-ghost-dark mt-8 w-full">
            خرید پرفروش‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}

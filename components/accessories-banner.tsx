import Link from "next/link";

export function AccessoriesBanner() {
  return (
    <section className="bg-ivory pb-16 md:pb-24" aria-labelledby="accessories-title">
      <div className="shell">
        <div className="grid overflow-hidden bg-blush md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-7 py-12 md:order-1 md:px-12 md:py-16">
            <p className="eyebrow text-gold-deep">اکسسوری‌ها</p>
            <h2 id="accessories-title" className="section-title mt-4">
              جزئیاتی برای تکمیل استایل
            </h2>
            <p className="mt-4 max-w-sm text-[13px] leading-7 text-ink/70">
              کیف‌های چرمی، جواهرات ظریف و عطرهایی که یک استایل ساده را به امضای شخصی شما تبدیل
              می‌کنند.
            </p>
            <Link href="/shop?category=accessories" className="btn-gold mt-8 self-start">
              خرید اکسسوری‌ها
            </Link>
          </div>
          <div className="order-1 h-[300px] md:order-2 md:h-[520px]">
            <img
              src="/images/accessories/banner.jpg"
              alt="کیف چرمی و ساعت طلایی روی پارچه"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

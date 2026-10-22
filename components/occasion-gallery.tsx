import Link from "next/link";
import { occasions } from "@/lib/content";

export function OccasionGallery() {
  return (
    <section className="bg-ivory py-16 md:py-24" aria-labelledby="occasions-title">
      <div className="shell">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">مناسبت‌ها</p>
          <h2 id="occasions-title" className="section-title mt-4">
            انتخاب استایل بر اساس مناسبت
          </h2>
          <p className="mt-4 text-[13px] leading-7 text-muted">
            از مهمانی‌های شبانه تا روزهای کاری؛ هر مناسبت، استایل خودش را می‌خواهد.
          </p>
        </div>

        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 no-scrollbar md:mt-14 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:pb-0">
          {occasions.map((occasion) => (
            <li
              key={occasion.title}
              className="w-[60%] shrink-0 snap-start sm:w-[38%] md:w-auto"
            >
              <Link href={occasion.href} className="group block">
                <div className="overflow-hidden rounded-t-[999px] rounded-b-[3px] bg-cream">
                  <div className="aspect-[3/4.3] overflow-hidden">
                    <img
                      src={occasion.image}
                      alt={occasion.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
                <p className="mt-4 text-center text-[13px] text-ink transition-colors group-hover:text-wine">
                  {occasion.title}
                </p>
                <span className="mx-auto mt-2 block h-px w-6 bg-gold/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link href="/shop?category=dresses" className="btn-ghost-dark">
            مشاهده همه مناسبت‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}

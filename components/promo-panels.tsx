import Link from "next/link";

export function PromoPanels() {
  return (
    <section className="bg-ivory pb-16 md:pb-24" aria-label="مجموعه‌های مجلسی و اداری">
      <div className="shell grid gap-5 md:grid-cols-2">
        <article className="group relative isolate flex min-h-[480px] flex-col justify-end overflow-hidden bg-wine p-8 text-ivory md:min-h-[560px] md:p-10">
          <img
            src="/images/panels/evening.jpg"
            alt="مدل با پیراهن مجلسی درخشان"
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-luxe group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-wine via-wine/55 to-wine/10" />
          <p className="eyebrow">شب‌های خاص</p>
          <h3 className="mt-4 text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-snug">
            درخشش در شب
          </h3>
          <p className="mt-3 max-w-xs text-[13px] leading-7 text-cream/80">
            پیراهن‌های بلند با پارچه‌های درخشان؛ برای شب‌هایی که باید در خاطر بمانند.
          </p>
          <Link href="/shop?category=dresses" className="btn-gold mt-7 self-start">
            خرید لباس مجلسی
          </Link>
        </article>

        <article className="group relative isolate flex min-h-[480px] flex-col justify-end overflow-hidden bg-cream/70 p-8 text-ink md:min-h-[560px] md:p-10">
          <img
            src="/images/panels/work.jpg"
            alt="مدل با استایل اداری خاکستری"
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-luxe group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#f5eae3] via-[#f5eae3]/80 to-[#f5eae3]/5" />
          <p className="eyebrow">روزهای کاری</p>
          <h3 className="mt-4 text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-snug">
            قدرت در استایل
          </h3>
          <p className="mt-3 max-w-xs text-[13px] leading-7 text-ink/70">
            برش‌های تمیز و رنگ‌های گرم برای روزهای کاری که اهمیت دارند.
          </p>
          <Link href="/shop?category=workwear" className="btn-gold mt-7 self-start">
            خرید استایل اداری
          </Link>
        </article>
      </div>
    </section>
  );
}

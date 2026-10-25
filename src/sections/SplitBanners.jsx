import { Link } from 'react-router-dom'

export default function SplitBanners() {
  return (
    <section className="grid md:grid-cols-2">
      {/* wedding */}
      <article className="grid bg-cream sm:grid-cols-[52%_48%]">
        <div className="flex flex-col items-start justify-center gap-5 px-7 py-10 sm:px-9 lg:px-11">
          <h2 className="text-[21px] font-light leading-[1.5] text-ink sm:text-[24px] lg:text-[26px]">
            برای لحظه‌های خاص زندگی
          </h2>
          <Link to="/shop?category=wedding" className="btn-gold">
            مشاهده جواهرات عروس
          </Link>
        </div>
        <div className="relative h-[240px] sm:h-auto sm:min-h-[340px] lg:min-h-[380px]">
          <img
            src="/images/banner-wedding.jpg"
            alt="حلقه‌های عروس طلا"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </article>

      {/* gift */}
      <article className="grid bg-[#463A2E] sm:grid-cols-[52%_48%]">
        <div className="flex flex-col items-start justify-center gap-5 px-7 py-10 sm:px-9 lg:px-11">
          <h2 className="text-[21px] font-light leading-[1.5] text-white sm:text-[24px] lg:text-[26px]">
            هدیه‌ای ماندگار
          </h2>
          <Link
            to="/shop?category=gifts"
            className="inline-flex items-center border border-white bg-white px-7 py-3 text-[11px] tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-white"
          >
            خرید هدیه
          </Link>
        </div>
        <div className="relative h-[240px] sm:h-auto sm:min-h-[340px] lg:min-h-[380px]">
          <img
            src="/images/banner-gift.jpg"
            alt="گردنبند طلا در کنار جعبه هدیه"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </article>
    </section>
  )
}

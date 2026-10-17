import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { IMG, getProduct } from '../../data/products'
import { toFaNumber } from '../../lib/format'

// Scuba Blue bottle: unbranded shot of a frosted bottle with teal liquid resting
// on river stones against dark marble — it reads naturally as standing on the
// coastal rocks once the ocean backdrop and soft oval mask are applied.
const HERO_BOTTLE =
  'https://images.pexels.com/photos/7814958/pexels-photo-7814958.jpeg?auto=compress&cs=tinysrgb&w=1200'

/**
 * Cinematic hero — an ocean campaign shot with the Scuba Blue bottle
 * composited onto the rocks in the foreground.
 */
export default function Hero() {
  const { addToCart } = useStore()
  const hero = getProduct('scuba-blue')

  return (
    <section className="relative isolate flex min-h-[94vh] flex-col justify-center overflow-hidden bg-ocean-ink pb-24 pt-28 sm:pb-28 sm:pt-32 lg:min-h-screen">
      {/* 1. Ocean / rocks backdrop */}
      <img
        src={IMG.oceanHero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full scale-[1.06] object-cover object-[58%_38%]"
      />

      {/* 2. Cinematic grading: deepen the blues, protect the horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-ink/80 via-ocean/25 to-ocean-ink/92"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ocean/35 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(130%_95%_at_62%_28%,rgba(18,168,196,0.28)_0%,transparent_46%,rgba(2,30,44,0.82)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/* 3. Campaign content */}
      <div className="container-x relative z-10 grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="max-w-xl lg:col-span-6 xl:col-span-5">
          <p className="eyebrow mb-5 flex items-center gap-3 text-champagne text-shadow-hero">
            <span className="h-px w-10 bg-champagne/70" />
            کالکشن جدید AURA
          </p>

          <h1 className="font-display text-[42px] leading-[1.15] text-white text-shadow-hero sm:text-[60px] lg:text-[70px]">
            رایحه‌ای به وسعت
            <span className="mt-2 block bg-gradient-to-l from-turquoise-light via-white to-champagne bg-clip-text text-transparent">
              اقیانوس
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-[14.5px] leading-8 text-white/80 text-shadow-hero sm:text-[15.5px]">
            تجربه‌ای متفاوت از طراوت، قدرت و ماندگاری؛ عطری برای کسانی که خاص بودن را انتخاب می‌کنند.
          </p>

          {/* Featured product */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-white">عطر آبی اسکیوبا</span>
              <span className="tnum block text-[12px] text-champagne">
                {toFaNumber(hero.price)} تومان
              </span>
            </span>
            <span aria-hidden="true" className="hidden h-9 w-px bg-white/20 sm:block" />
            <button
              type="button"
              onClick={() => addToCart(hero.id)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-2 text-[11.5px] text-white transition hover:border-champagne hover:bg-champagne hover:text-ocean-ink"
            >
              <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
              افزودن به سبد
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={`/product/${hero.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-champagne px-8 py-4 text-[13px] font-medium uppercase tracking-wide2 text-ocean-ink transition-all duration-300 hover:bg-white active:scale-[0.98]"
            >
              خرید عطر
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-white/45 px-8 py-4 text-[13px] font-medium uppercase tracking-wide2 text-white transition-all duration-300 hover:bg-white hover:text-ocean active:scale-[0.98]"
            >
              کشف رایحه‌ها
            </Link>
          </div>
        </div>

        {/* Bottle on the rocks */}
        <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-7">
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[440px] xl:max-w-[500px]">
            <span
              aria-hidden="true"
              className="absolute inset-x-[-18%] top-[6%] -z-10 block h-[78%] rounded-full bg-turquoise/25 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-4 start-1/2 -z-10 block h-10 w-[68%] -translate-x-1/2 rounded-[50%] bg-ocean-ink/80 blur-2xl"
            />

            <img
              src={HERO_BOTTLE}
              alt="عطر آبی اسکیوبا — بطری شیشه‌ای آبی روی صخره‌های ساحلی"
              className="mask-soft-oval relative w-full animate-floaty drop-shadow-[0_45px_60px_rgba(2,30,44,0.9)]"
            />

            {/* Reflection under the bottle so it reads as standing on the rock */}
            <img
              src={HERO_BOTTLE}
              alt=""
              aria-hidden="true"
              className="mask-soft-oval pointer-events-none absolute inset-x-0 top-[93%] w-full -scale-y-100 opacity-25 blur-[3px]"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-wide2 text-white/50">اسکرول کنید</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/20">
          <span className="animate-scrollHint absolute inset-x-0 top-0 block h-4 bg-champagne" />
        </span>
      </div>

      {/* Fade into the page body */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-t from-ocean-ink to-transparent"
      />
    </section>
  )
}

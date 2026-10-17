import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { IMG, getProduct } from '../../data/products'
import { toFaNumber } from '../../lib/format'

/**
 * Cinematic hero — a real ocean photograph (waves breaking over coastal rocks in
 * sunlight) with the Scuba Blue bottle standing in the foreground.
 *
 * Both layers are repo-hosted photographs (`public/images/…`), never gradients.
 * The bottle shot is a dark studio frame of a frosted teal bottle on wet stones,
 * so it is soft-masked and screen-blended into the surf instead of sitting on a
 * visible rectangle.
 */
export default function Hero() {
  const { addToCart } = useStore()
  const hero = getProduct('scuba-blue')

  return (
    <section className="relative isolate flex min-h-[92vh] flex-col justify-center overflow-hidden bg-ocean-ink pb-14 pt-24 sm:pb-24 sm:pt-32 lg:min-h-screen">
      {/* 1. Ocean, waves and coastal rocks */}
      <img
        src={IMG.oceanHero}
        alt="دریای فیروزه‌ای و امواج روی صخره‌های ساحلی در نور خورشید"
        className="absolute inset-0 -z-20 h-full w-full scale-[1.05] object-cover object-[62%_42%]"
      />

      {/* 2. Cinematic grading: keep the sea turquoise, protect the type */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-ink/70 via-ocean/20 to-ocean-ink/90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_70%_22%,rgba(18,168,196,0.22)_0%,transparent_45%,rgba(2,30,44,0.78)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ocean-ink/80 to-transparent"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/* 3. Campaign content */}
      <div className="container-x relative z-10 grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="max-w-xl lg:col-span-6 xl:col-span-5">
          <p className="eyebrow mb-5 flex items-center gap-3 text-champagne text-shadow-hero">
            <span className="h-px w-10 bg-champagne/70" />
            کالکشن جدید AURA
          </p>

          <h1 className="font-display text-[34px] leading-[1.15] text-white text-shadow-hero sm:text-[60px] lg:text-[70px]">
            رایحه‌ای به وسعت
            <span className="mt-2 block bg-gradient-to-l from-turquoise-light via-white to-champagne bg-clip-text text-transparent">
              اقیانوس
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-[13.5px] leading-7 text-white/85 text-shadow-hero sm:mt-6 sm:text-[15.5px] sm:leading-8">
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

        {/* Bottle standing in the surf — anchored to the bottom edge so it reads as
            a foreground object on the shore instead of floating in the water. */}
        <div className="relative -mb-12 flex items-end justify-center sm:-mb-16 lg:col-span-6 lg:-mb-24 lg:self-end xl:col-span-7">
          <div className="relative w-[64%] max-w-[235px] sm:w-[62%] sm:max-w-[300px] lg:max-w-[440px] xl:max-w-[510px]">
            {/* soft glow so the glass reads against the water */}
            <span
              aria-hidden="true"
              className="absolute inset-x-[-22%] top-[4%] -z-10 block h-[80%] rounded-[50%] bg-turquoise/15 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 start-1/2 -z-10 block h-8 w-[70%] -translate-x-1/2 rounded-[50%] bg-ocean-ink/70 blur-xl"
            />

            <img
              src={IMG.heroBottle}
              alt="عطر آبی اسکیوبا — بطری شیشه‌ای آبی روی صخره‌های کنار دریا"
              className="mask-bottle mix-blend-screen relative aspect-[4/5] w-full animate-floaty object-cover object-[50%_58%] drop-shadow-[0_35px_45px_rgba(2,30,44,0.75)]"
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

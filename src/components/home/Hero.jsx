import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { IMG, getProduct } from '../../data/products'
import { toman } from '../../lib/format'

/**
 * Cinematic ocean campaign hero.
 *
 * One repo-hosted photograph carries the whole scene — turquoise surf breaking
 * over dark coastal rocks, the sapphire Scuba bottle standing centre frame with
 * its gold collar and faceted cap, and the oversized AURA wordmark behind it
 * (see AGENTS.md for how the asset is produced). The Persian campaign copy is
 * real HTML laid over the negative space on the start (right) side, so it stays
 * crisp and selectable at every width.
 *
 * Below 1280px a stacked arrangement replaces the overlay: the photograph keeps
 * the upper band and the copy sits on the ocean-ink panel underneath. The
 * overlaid copy is confined to the start-side column, which only clears the
 * centre-framed bottle from 1280px up.
 */
export default function Hero() {
  const { addToCart } = useStore()
  const hero = getProduct('scuba-blue')

  return (
    <section className="relative isolate overflow-hidden bg-ocean-ink xl:min-h-screen">
      {/* Photograph band */}
      <div className="relative h-[56svh] min-h-[330px] w-full overflow-hidden sm:h-[62svh] lg:h-[64svh] xl:absolute xl:inset-0 xl:h-full xl:min-h-0">
        <img
          src={IMG.scubaHero}
          alt="عطر آبی اسکیوبا روی صخره‌های ساحلی زیر نور روز، با امواج فیروزه‌ای اقیانوس در پس‌زمینه"
          className="absolute inset-0 h-full w-full object-cover object-[50%_34%] sm:object-[50%_42%] xl:object-[50%_52%]"
        />

        {/* Grading: keeps the daylight photograph readable under the type
            without washing the surf out. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ocean-ink/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-l from-ocean-ink/85 via-ocean-ink/25 to-transparent xl:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ocean-ink via-ocean-ink/60 to-transparent"
        />
        <div aria-hidden="true" className="grain absolute inset-0" />
      </div>

      {/* Campaign copy */}
      <div className="container-x relative xl:flex xl:min-h-screen xl:items-center">
        <div className="me-auto w-full max-w-[520px] pb-16 pt-9 xl:max-w-[440px] xl:py-32">
          <p className="eyebrow flex items-center gap-3 text-champagne text-shadow-hero">
            <span className="h-px w-10 bg-champagne/70" />
            کالکشن جدید AURA
          </p>

          <h1 className="mt-5 font-display text-[34px] leading-[1.15] text-white text-shadow-hero sm:text-[52px] lg:text-[54px] 2xl:text-[62px]">
            رایحه‌ای به وسعت
            <span className="mt-1 block bg-gradient-to-l from-turquoise-light via-white to-champagne bg-clip-text text-transparent">
              اقیانوس
            </span>
          </h1>

          <p className="mt-5 max-w-[400px] text-[13.5px] leading-7 text-white/85 text-shadow-hero sm:text-[15px] sm:leading-8">
            تجربه‌ای متفاوت از طراوت، قدرت و ماندگاری؛ عطری برای کسانی که خاص بودن را انتخاب می‌کنند.
          </p>

          {/* Featured product */}
          <div className="mt-7 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-white">عطر آبی اسکیوبا</span>
              <span className="tnum block text-[12px] text-champagne">{toman(hero.price)}</span>
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

          <div className="mt-7 flex flex-wrap items-center gap-3">
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-2 xl:flex">
        <span className="text-[10px] tracking-wide2 text-white/50">اسکرول کنید</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/20">
          <span className="animate-scrollHint absolute inset-x-0 top-0 block h-4 bg-champagne" />
        </span>
      </div>
    </section>
  )
}

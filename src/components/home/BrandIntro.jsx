import { IMG } from '../../data/products'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SafeImage from '../ui/SafeImage'

const STATS = [
  { value: '۱۸ سال', label: 'تجربه در دنیای عطر' },
  { value: '۹۰+', label: 'رایحه در کالکشن' },
  { value: '۱۰۰٪', label: 'اصالت تضمین‌شده' },
]

/** Editorial brand introduction — split photo / typography on warm ivory. */
export default function BrandIntro() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <SafeImage
            src={IMG.brandIntro}
            alt="بطری عطر AURA در نور طبیعی"
            wrapperClassName="aspect-[4/5] w-full rounded-[26px] shadow-soft sm:aspect-[5/6]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-6 -start-4 hidden h-28 w-28 rounded-full border border-champagne/60 sm:block"
          />
          <span className="absolute bottom-6 start-6 hidden rounded-2xl bg-white/95 px-5 py-4 shadow-card backdrop-blur-sm sm:block">
            <span className="brand-wordmark font-display block text-[13px] text-ocean">
              AURA PARFUMS
            </span>
            <span className="mt-1 block text-[11px] text-ink-muted">Maison de Parfum · Est. ۲۰۰۶</span>
          </span>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-4 flex items-center gap-3 text-turquoise-dark">
            <span className="h-px w-8 bg-turquoise-dark" />
            درباره AURA
          </p>

          <h2 className="text-[28px] font-semibold leading-[1.35] text-ink sm:text-[38px] lg:text-[42px]">
            هنر ماندگار عطر
          </h2>

          <p className="mt-6 text-[14px] leading-8 text-ink-muted sm:text-[15px]">
            هر رایحه داستانی دارد؛ داستانی از احساس، خاطره و شخصیت. در AURA، عطرها را برای لحظه‌هایی
            انتخاب می‌کنیم که قرار است فراموش نشوند.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-ivory-line py-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="tnum text-[18px] font-semibold text-ocean sm:text-[22px]">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[11px] leading-5 text-ink-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <Button variant="primary" size="lg" to="/about" className="mt-8">
            درباره AURA
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

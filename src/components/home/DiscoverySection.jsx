import { Check } from 'lucide-react'
import { IMG } from '../../data/products'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SafeImage from '../ui/SafeImage'

const POINTS = [
  'چهار نمونه‌ی ۲ میلی‌لیتری از رایحه‌های منتخب',
  'کارت رایحه‌شناسی با نت‌های هر عطر',
  'اعتبار خرید معادل هزینه‌ی ست تست',
]

/** Dark discovery-set panel — deliberately breaks the ivory rhythm. */
export default function DiscoverySection() {
  return (
    <section className="relative isolate overflow-hidden bg-ocean-ink py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute -start-24 top-1/4 h-72 w-72 rounded-full bg-turquoise/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -end-16 bottom-0 h-64 w-64 rounded-full bg-champagne/10 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-champagne">
            <span className="h-px w-8 bg-champagne" />
            ست‌های تست AURA
          </p>
          <h2 className="text-[28px] font-semibold leading-[1.35] text-white sm:text-[38px] lg:text-[42px]">
            رایحه مخصوص خودت را پیدا کن
          </h2>
          <p className="mt-6 text-[14px] leading-8 text-white/70 sm:text-[15px]">
            با مجموعه تست عطر AURA، رایحه‌های مختلف را تجربه کن و انتخابی متناسب با شخصیتت داشته باش.
          </p>

          <ul className="mt-8 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[13px] leading-7 text-white/80">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne/50 text-champagne">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Button variant="champagne" size="lg" to="/gift-sets" className="mt-9">
            مشاهده ست‌های تست
          </Button>
        </Reveal>

        <Reveal delay={140} className="relative">
          <SafeImage
            src={IMG.discovery}
            alt="جعبه‌ی ست تست AURA همراه با نمونه‌های کوچک عطر"
            wrapperClassName="aspect-[5/4] w-full rounded-[26px] sm:aspect-[4/3]"
            className="opacity-95"
          />
          <span className="absolute -bottom-5 end-5 rounded-2xl border border-white/15 bg-ocean-ink/90 px-5 py-4 backdrop-blur-md">
            <span className="block text-[11px] tracking-wide2 text-champagne">۴ نمونه در هر ست</span>
            <span className="tnum mt-1 block text-[13px] text-white">۱٬۲۵۰٬۰۰۰ تومان</span>
          </span>
        </Reveal>
      </div>
    </section>
  )
}

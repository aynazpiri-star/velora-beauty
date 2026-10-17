import { IMG } from '../../data/products'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SafeImage from '../ui/SafeImage'

/** Warm beige gifting section. */
export default function GiftCollection() {
  return (
    <section className="bg-champagne-pale py-16 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow mb-4 flex items-center gap-3 text-champagne-deep">
            <span className="h-px w-8 bg-champagne-deep" />
            هنر هدیه دادن
          </p>

          <h2 className="text-[28px] font-semibold leading-[1.35] text-ink sm:text-[38px] lg:text-[42px]">
            هدیه‌ای برای لحظه‌های خاص
          </h2>

          <p className="mt-6 max-w-lg text-[14px] leading-8 text-ink-muted sm:text-[15px]">
            با ست‌های هدیه AURA، احساست را با رایحه‌ای ماندگار بیان کن.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {['جعبه‌ی مخمل', 'روبان دست‌ساز', 'کارت پیام اختصاصی'].map((item) => (
              <li
                key={item}
                className="rounded-full border border-champagne-deep/40 bg-white/60 px-4 py-2 text-[11.5px] text-ink"
              >
                {item}
              </li>
            ))}
          </ul>

          <Button variant="primary" size="lg" to="/gift-sets" className="mt-9">
            مشاهده هدیه‌ها
          </Button>
        </Reveal>

        <Reveal delay={140} className="relative order-1 lg:order-2">
          <SafeImage
            src={IMG.giftBoxes}
            alt="جعبه‌های هدیه‌ی AURA با روبان طلایی"
            wrapperClassName="aspect-[4/3] w-full rounded-[26px] shadow-soft"
          />
          <span
            aria-hidden="true"
            className="absolute -top-4 -end-4 hidden h-24 w-24 rounded-full border border-champagne-deep/50 sm:block"
          />
        </Reveal>
      </div>
    </section>
  )
}

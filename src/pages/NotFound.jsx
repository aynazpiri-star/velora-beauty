import Button from '../components/ui/Button'
import { BrandMark } from '../components/ui/Logo'
import { IMG } from '../data/products'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ocean-ink px-5 py-28">
      <img
        src={IMG.oceanDusk}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-ink/85 via-ocean/70 to-ocean-ink/95"
      />

      <div className="mx-auto max-w-lg text-center">
        <BrandMark className="mx-auto h-14 w-14 text-champagne" />
        <p className="eyebrow mt-8 text-champagne">خطای ۴۰۴</p>
        <h1 className="mt-4 text-[26px] font-semibold leading-10 text-white sm:text-[34px]">
          این صفحه در کالکشن AURA پیدا نشد
        </h1>
        <p className="mt-5 text-[13.5px] leading-8 text-white/70">
          ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد. از مسیرهای زیر
          ادامه بده.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button variant="light" size="lg" to="/">
            بازگشت به صفحه اصلی
          </Button>
          <Button variant="ghostLight" size="lg" to="/shop">
            مشاهده‌ی فروشگاه
          </Button>
        </div>
      </div>
    </section>
  )
}

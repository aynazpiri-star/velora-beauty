import { Check } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { photo } from '../data/images'

const steps = [
  {
    number: '۰۱',
    title: 'ثبت درخواست',
    text: 'فرم مشاوره را تکمیل می‌کنید و شرح کوتاهی از پروژه خود می‌نویسید.',
  },
  {
    number: '۰۲',
    title: 'تماس کارشناس',
    text: 'کارشناس مربوطه در نخستین فرصت تماس می‌گیرد و پرسش‌های تکمیلی را می‌پرسد.',
  },
  {
    number: '۰۳',
    title: 'جلسه و بازدید',
    text: 'در صورت نیاز، جلسه حضوری و بازدید از زمین یا ملک شما هماهنگ می‌شود.',
  },
  {
    number: '۰۴',
    title: 'پیشنهاد و برآورد',
    text: 'دامنه کار، برنامه زمان‌بندی و برآورد هزینه به‌صورت مکتوب ارائه می‌شود.',
  },
]

const outcomes = [
  'برآورد اولیه هزینه بر اساس متراژ و کاربری',
  'پیشنهاد مسیر طراحی و اجرا متناسب با بودجه',
  'زمان‌بندی تقریبی مراحل پروژه',
  'معرفی نمونه پروژه‌های مشابه برای مقایسه',
]

export default function Consultation() {
  return (
    <>
      <PageHero
        eyebrow="درخواست مشاوره"
        title="شروع یک همکاری ماندگار"
        description="اگر برای ساخت، طراحی یا بازسازی ملک خود برنامه دارید، فرم زیر را تکمیل کنید. کارشناسان آرکا سازه آماده‌اند تا درباره ایده‌ها و نیازهای شما گفت‌وگو کنند."
        image={photo('1494526585095-c41746248156', 2000)}
        breadcrumbs={[{ label: 'خانه', to: '/' }, { label: 'درخواست مشاوره' }]}
      />

      {/* گام‌های مشاوره */}
      <section className="relative bg-ivory py-20 lg:py-24">
        <div className="shell relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 80} className="border-t border-ink/15 pt-7">
                <span className="num font-serif text-3xl text-gold">{step.number}</span>
                <h2 className="mt-4 text-lg">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-charcoal-muted">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* فرم مشاوره */}
      <section className="relative bg-ivory pb-24 lg:pb-28">
        <div className="shell relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="border border-ink/10 bg-ivory-light p-6 shadow-soft sm:p-9">
              <h2 className="text-2xl">فرم درخواست مشاوره</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal-muted">
                موارد ستاره‌دار الزامی است. اطلاعات شما فقط برای بررسی همین درخواست استفاده
                می‌شود.
              </p>
              <div className="mt-9">
                <ContactForm />
              </div>
            </div>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <h2 className="text-xl">پس از ارسال درخواست چه اتفاقی می‌افتد؟</h2>
            <ul className="mt-6 space-y-4">
              {outcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-ink/10 pb-4 text-sm leading-7 text-charcoal-muted last:border-b-0"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs leading-7 text-charcoal-muted">
              توجه: این سایت نمونه است و اطلاعات ثبت‌شده در فرم فقط در مرورگر شما نگهداری می‌شود.
              برای فعال‌سازی ارسال واقعی، نشانی سرویس دریافت درخواست را در تنظیمات پروژه وارد
              کنید.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

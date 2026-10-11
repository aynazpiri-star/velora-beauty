import { useEffect, useState } from 'react'
import Button from './Button'
import { photo } from '../data/images'

// اسلایدهای بخش قهرمان؛ تصویر، عنوان و شرح هر اسلاید قابل ویرایش است.
const slides = [
  {
    image: photo('1600585154340-be6161a56a0c', 2000),
    caption: 'ویلای مدرن — لواسان',
    alt: 'ویلای مدرن با نمای چوبی و شیشه‌های سراسری در غروب',
  },
  {
    image: photo('1580587771525-78b9dba3b914', 2000),
    caption: 'مجتمع لوکس — ارومیه',
    alt: 'ساختمان لوکس مسکونی با نمای سنگ و استخر در محوطه',
  },
  {
    image: photo('1486406146926-c627a92ad1ab', 2000),
    caption: 'برج تجاری — تهران',
    alt: 'برج‌های شیشه‌ای مدرن تهران از نمای پایین به بالا',
  },
]

export default function HeroSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink pb-24 pt-32 lg:min-h-[88vh] lg:pt-40"
    >
      {/* تصاویر اسلایدها */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
              index === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* لایه‌های تیره برای خوانایی متن */}
      <div className="absolute inset-0 bg-ink/60 md:bg-ink/40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-l from-ink via-ink/50 to-transparent"
        aria-hidden="true"
      />

      {/* ترسیم فنی کمرنگ */}
      <svg
        className="pointer-events-none absolute -bottom-6 start-0 h-64 w-[520px] opacity-[0.16]"
        viewBox="0 0 520 260"
        fill="none"
        stroke="#C5A16B"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M20 240V90l70-44 70 44v150" />
        <path d="M190 240V40l80-30 80 30v200" />
        <path d="M380 240v-90l60-34 60 34v90" />
        <path d="M0 240h520" />
        <path d="M90 130v110M270 110v130M440 170v70" strokeDasharray="5 7" />
      </svg>

      <div className="shell relative z-10 w-full">
        <div className="flex flex-col items-start">
          <span className="eyebrow animate-floatIn">معماری متمایز • ساخت ماندگار</span>

          <h1 className="mt-7 text-[2.6rem] leading-[1.28] text-white sm:text-6xl lg:text-[4.4rem] lg:leading-[1.22]">
            <span className="block">می‌سازیم</span>
            <span className="block text-gold">برای ماندن</span>
          </h1>

          <p className="mt-7 max-w-lg text-[1.05rem] leading-9 text-white/75">
            از طراحی معماری تا اجرای پروژه‌های مسکونی و تجاری، با تکیه بر تخصص، کیفیت و تعهد به
            جزئیات.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button to="/projects" size="lg" arrow>
              مشاهده پروژه‌ها
            </Button>
            <Button to="/about" variant="outlineDark" size="lg">
              آشنایی با آرکا سازه
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-white/60">
            <span className="num text-gold">۰{active + 1}</span>
            <span className="h-px w-10 bg-white/25" aria-hidden="true" />
            <span className="num">۰{slides.length}</span>
            <span className="ms-2">{slides[active].caption}</span>
          </div>
        </div>
      </div>

      {/* نشانگر عمودی اسلایدر — در چیدمان راست‌به‌چپ در سمت چپ قرار می‌گیرد */}
      <div
        className="absolute top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
        style={{ insetInlineEnd: '2.75rem' }}
      >
        {slides.map((slide, index) => {
          const isActive = index === active
          return (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`نمایش اسلاید ${index + 1}: ${slide.caption}`}
              aria-current={isActive}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className={`num text-[0.65rem] transition-colors ${
                  isActive ? 'text-gold' : 'text-white/40 group-hover:text-white/70'
                }`}
              >
                ۰{index + 1}
              </span>
              <span
                className={`w-px transition-all duration-500 ${
                  isActive ? 'h-12 bg-gold' : 'h-6 bg-white/25 group-hover:bg-white/50'
                }`}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

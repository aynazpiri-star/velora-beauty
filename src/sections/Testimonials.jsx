import { useState } from 'react'
import StarRating from '../components/StarRating'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
} from '../components/Icons'

const reviews = [
  {
    id: 1,
    quote:
      'کیفیت قطعه واقعاً عالی است؛ انگشتر در دست از آنچه در عکس دیدم زیباتر بود و بسته‌بندی هم بسیار ظریف.',
    name: 'پریا س.',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    sample: true,
  },
  {
    id: 2,
    quote:
      'طراحی‌ها سلیقه‌ای و متفاوت‌اند و پاسخ‌گویی هم سریع بود. با خیال راحت خرید کردم.',
    name: 'عایشه ک.',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    sample: true,
  },
  {
    id: 3,
    quote:
      'برای سالگرد ازدواج‌مان سفارش دادم؛ یک هدیه ساده و در عین حال خاص که خیلی پسندیده شد.',
    name: 'روهان م.',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    sample: true,
  },
]

export default function Testimonials() {
  const [start, setStart] = useState(0)

  const ordered = reviews.map((_, i) => reviews[(start + i) % reviews.length])
  const prev = () => setStart((s) => (s - 1 + reviews.length) % reviews.length)
  const next = () => setStart((s) => (s + 1) % reviews.length)

  return (
    <section className="bg-cream/50 py-14 lg:py-20">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">نظر مشتریان ما</p>
            <h2 className="heading-lg mt-3">محبوب هزاران نفر</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="نظر قبلی"
              className="grid h-9 w-9 place-items-center border border-line text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <IconChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="نظر بعدی"
              className="grid h-9 w-9 place-items-center border border-line text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <IconChevronLeft size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {ordered.map((review, index) => (
            <figure
              key={review.id}
              className={`flex flex-col border border-line/80 bg-white p-6 ${
                index === 0 ? '' : 'hidden md:flex'
              }`}
            >
              <StarRating value={review.rating} size={13} />
              <blockquote className="mt-4 flex-1 text-[12.5px] leading-8 text-ink/85">
                «{review.quote}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line/70 pt-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-[11.5px] text-ink">{review.name}</p>
                  {review.sample && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[9.5px] text-muted">
                      <IconCheck size={11} className="text-gold" />
                      نظر نمونه
                    </span>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-5 text-[10.5px] leading-6 text-muted">
          نظرات نمایش‌داده‌شده نمونه هستند و پس از راه‌اندازی فروشگاه با دیدگاه واقعی مشتریان
          جایگزین می‌شوند.
        </p>
      </div>
    </section>
  )
}

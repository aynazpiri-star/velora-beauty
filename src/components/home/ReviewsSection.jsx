import { Quote } from 'lucide-react'
import { SAMPLE_REVIEWS } from '../../data/content'
import Rating from '../ui/Rating'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

/**
 * There is no review system connected yet, so this section renders clearly
 * labelled sample content instead of pretending these are real testimonials.
 */
export default function ReviewsSection() {
  return (
    <section className="bg-ivory-deep py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="نظرها"
          title="تجربه مشتریان AURA"
          subtitle="کارت‌های زیر نمونه‌ی نمایشی هستند؛ پس از اتصال سامانه‌ی نظرات، دیدگاه‌های واقعی مشتریان در همین بخش نمایش داده می‌شود."
        />

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne-deep/40 bg-champagne-pale px-4 py-2 text-[11.5px] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne-deep" aria-hidden="true" />
          نمونه نمایشی — دیدگاه واقعی ثبت نشده است
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_REVIEWS.map((review, index) => (
            <Reveal
              key={review.name}
              as="li"
              delay={index * 80}
              className="flex flex-col rounded-[22px] border border-ivory-line bg-white p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean text-[13px] font-semibold text-white">
                    {review.name.replace(/\s/g, '').slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ink">{review.name}</span>
                    <span className="block text-[11px] text-ink-muted">{review.city}</span>
                  </span>
                </div>
                <Quote className="h-5 w-5 shrink-0 text-champagne" aria-hidden="true" />
              </div>

              <Rating value={review.rating} className="mt-5" />

              <p className="mt-4 flex-1 text-[12.5px] leading-7 text-ink-muted">{review.text}</p>

              <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-ivory-deep px-3 py-1 text-[10.5px] text-ink-muted">
                نمونه نمایشی
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

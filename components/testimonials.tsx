import { testimonials } from "@/lib/content";
import { StarIcon } from "./icons";

export function Testimonials() {
  return (
    <section className="bg-cream/45 py-16 md:py-24" aria-labelledby="testimonials-title">
      <div className="shell">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-gold-deep">نظر مشتریان</p>
          <h2 id="testimonials-title" className="section-title mt-4">
            تجربه مشتریان ما
          </h2>
          <p className="mt-4 text-[13px] leading-7 text-muted">
            چند نمونه از دیدگاه‌های مشتریان ولورا؛ این نظرات برای نمایش طراحی سایت آورده شده‌اند.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {testimonials.map((review) => (
            <li
              key={review.name}
              className="flex flex-col gap-4 border border-ink/10 bg-ivory p-6 transition-shadow duration-300 hover:shadow-[0_20px_40px_-30px_rgba(45,29,31,0.6)]"
            >
              <div className="flex items-center gap-1 text-gold-deep" aria-label={`${review.rating} از ۵ ستاره`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="h-3.5 w-3.5" filled={index < review.rating} />
                ))}
              </div>
              <p className="flex-1 text-[12.5px] leading-7 text-ink/75">{review.text}</p>
              <div className="flex items-center gap-3 border-t border-ink/10 pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-[11px] text-wine">
                  {review.initials}
                </span>
                <div>
                  <p className="text-[12px] text-ink">{review.name}</p>
                  <p className="text-[10.5px] text-muted">{review.city}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

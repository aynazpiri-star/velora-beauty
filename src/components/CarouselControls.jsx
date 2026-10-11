import { ArrowLeft, ArrowRight } from 'lucide-react'

/** کنترل‌های دایره‌ای کاروسل: قبلی، نشانگرهای صفحه و بعدی (چیدمان راست‌به‌چپ). */
export default function CarouselControls({
  page,
  pageCount,
  onPrev,
  onNext,
  onGoTo,
  tone = 'dark',
  label = 'کاروسل',
}) {
  const isLight = tone === 'light'

  const buttonClass = `flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
    isLight
      ? 'border-white/20 text-white hover:border-gold hover:bg-gold hover:text-ink'
      : 'border-ink/15 text-ink hover:border-gold hover:bg-gold hover:text-ink'
  }`

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          className={buttonClass}
          aria-label={`${label} — مورد قبلی`}
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className={buttonClass}
          aria-label={`${label} — مورد بعدی`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center gap-2" role="tablist" aria-label={`${label} — صفحه‌ها`}>
        {Array.from({ length: pageCount }).map((_, index) => {
          const isActive = index === page
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`صفحه ${index + 1} از ${pageCount}`}
              onClick={() => onGoTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? `w-8 ${isLight ? 'bg-gold' : 'bg-gold'}`
                  : `w-1.5 ${isLight ? 'bg-white/30 hover:bg-white/60' : 'bg-ink/20 hover:bg-ink/40'}`
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

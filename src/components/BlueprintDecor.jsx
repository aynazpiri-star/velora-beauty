/**
 * ترسیم‌های فنی کمرنگ (نقشه معماری) برای پس‌زمینه بخش‌های تیره.
 * همیشه پشت محتوا و با شفافیت بسیار کم نمایش داده می‌شود.
 */
export default function BlueprintDecor({ className = '', variant = 'plan' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {variant === 'plan' && (
        <svg
          viewBox="0 0 600 400"
          className="absolute -start-10 top-6 h-[420px] w-[620px] opacity-[0.13]"
          fill="none"
          stroke="#C5A16B"
          strokeWidth="1"
        >
          <rect x="40" y="40" width="360" height="270" />
          <rect x="80" y="80" width="140" height="110" />
          <rect x="250" y="80" width="110" height="190" />
          <path d="M40 150h360M220 40v270" strokeDasharray="6 8" />
          <path d="M400 310h160M480 310v60M400 250h160" />
          <circle cx="150" cy="135" r="34" />
          <path d="M40 330h360" strokeDasharray="3 6" />
        </svg>
      )}

      {variant === 'elevation' && (
        <svg
          viewBox="0 0 620 300"
          className="absolute -end-6 bottom-0 h-[340px] w-[660px] opacity-[0.12]"
          fill="none"
          stroke="#C5A16B"
          strokeWidth="1"
        >
          <path d="M30 270V120l70-46 70 46v150" />
          <path d="M200 270V70l80-52 80 52v200" />
          <path d="M390 270V150l60-40 60 40v120" />
          <path d="M10 270h600" />
          <path d="M100 150v120M280 120v150M450 180v90" strokeDasharray="5 7" />
        </svg>
      )}

      {variant === 'grid' && (
        <svg
          viewBox="0 0 400 400"
          className="absolute -start-16 -top-10 h-[440px] w-[440px] opacity-[0.1]"
          fill="none"
          stroke="#C5A16B"
          strokeWidth="1"
        >
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="96" />
          <path d="M200 30v340M30 200h340" strokeDasharray="4 8" />
        </svg>
      )}
    </div>
  )
}

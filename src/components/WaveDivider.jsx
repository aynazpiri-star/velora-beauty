const COLORS = {
  ink: '#171A1B',
  ivory: '#F6F1E9',
  cream: '#FCF9F4',
}

const PATHS = {
  // لبه موجی بالای یک بخش؛ ناحیه پایین شکل با رنگ همان بخش پر می‌شود.
  top: 'M0 120 L0 74 C 210 16 430 128 690 74 C 880 36 1120 -6 1440 58 L1440 120 Z',
  // لبه موجی پایین یک بخش؛ ناحیه بالای شکل با رنگ همان بخش پر می‌شود.
  bottom:
    'M0 0 L1440 0 L1440 44 C 1210 124 940 6 660 62 C 430 106 190 34 0 88 Z',
}

/**
 * جداساز موجی ارگانیک میان بخش‌های تیره و روشن.
 * رنگ شکل، رنگ بخش جاری است و روی بخش مجاور کشیده می‌شود.
 */
export default function WaveDivider({
  position = 'top',
  tone = 'ivory',
  className = '',
  height = 'h-[54px] sm:h-[80px] lg:h-[110px]',
}) {
  const fill = COLORS[tone] ?? COLORS.ivory

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        position === 'top' ? 'bottom-full' : 'top-full'
      } ${height} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        focusable="false"
      >
        <path d={PATHS[position]} fill={fill} />
      </svg>
    </div>
  )
}

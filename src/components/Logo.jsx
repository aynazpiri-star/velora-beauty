/**
 * نشانه معماری آرکا سازه: دو حجم شیب‌دار تودرتو (نمای برش‌خورده ساختمان)
 * روی خط زمین. با currentColor رنگ می‌گیرد تا روی زمینه تیره و روشن درست دیده شود.
 */
export function LogoMark({ className = 'h-11 w-11' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path
        d="M5 40V17.5L24 6.5l19 11V40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 40V22.4l10-5.8 10 5.8V40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <path d="M24 16.6V40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M3 40h42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 12.5V16.6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

/** نشان کامل شامل نشانه و نام فارسی برند. */
export default function Logo({ tone = 'light', compact = false, className = '' }) {
  const isLight = tone === 'light'
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className={isLight ? 'text-gold' : 'text-gold-muted'}>
        <LogoMark className={compact ? 'h-9 w-9' : 'h-11 w-11'} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${isLight ? 'text-white' : 'text-ink'}`}
          style={{ letterSpacing: '0.01em' }}
        >
          آرکا سازه
        </span>
        {!compact && (
          <span
            className={`mt-1 font-serif text-[0.68rem] uppercase ${
              isLight ? 'text-white/55' : 'text-charcoal-muted'
            }`}
            style={{ letterSpacing: '0.32em' }}
          >
            ARKA SAZEH
          </span>
        )}
      </span>
    </span>
  )
}

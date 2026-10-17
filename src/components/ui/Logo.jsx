import { Link } from 'react-router-dom'
import { classNames } from '../../lib/classNames'

/**
 * AURA PARFUMS wordmark.
 *
 * The mark is a geometric "A" drawn as two strokes inside a diamond — the same
 * visual language as the brand reference, and it stays legible down to 20px.
 */
export function BrandMark({ className, tone = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="نشان AURA PARFUMS"
      fill="none"
    >
      <path d="M24 3 L45 24 L24 45 L3 24 Z" stroke={tone} strokeWidth="1.4" opacity="0.55" />
      <path d="M24 10 L35 38 H30.5 L24 20.5 L17.5 38 H13 Z" fill={tone} />
      <path d="M19.6 31.2 H28.4" stroke={tone} strokeWidth="1.8" />
    </svg>
  )
}

export default function Logo({
  to = '/',
  tone = 'dark',
  compact = false,
  className,
  onClick,
}) {
  const ink = tone === 'light' ? 'text-white' : tone === 'ink' ? 'text-ink' : 'text-ink'
  const sub = tone === 'light' ? 'text-white/70' : 'text-ink-muted'

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="AURA PARFUMS — صفحه اصلی"
      className={classNames('group flex items-center gap-2 sm:gap-3', ink, className)}
    >
      <BrandMark
        className={classNames(
          'shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]',
          compact ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9',
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={classNames(
            'brand-wordmark font-display font-medium',
            compact ? 'text-[15px]' : 'text-[15px] sm:text-[19px]',
          )}
        >
          AURA
          <span className="ms-2 opacity-70">PARFUMS</span>
        </span>
        <span className={classNames('mt-1 text-[9px] tracking-wide2', sub)}>
          عطرهای لوکس
        </span>
      </span>
    </Link>
  )
}

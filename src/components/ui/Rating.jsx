import { classNames } from '../../lib/classNames'

/** Read-only star rating (used only for clearly-labelled sample content). */
export default function Rating({ value = 5, size = 14, className, tone = 'champagne' }) {
  const color = tone === 'champagne' ? 'text-champagne-deep' : 'text-turquoise'
  return (
    <span
      className={classNames('inline-flex items-center gap-0.5', color, className)}
      role="img"
      aria-label={`امتیاز ${value} از ۵`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i <= value ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M10 2.6l2.3 4.7 5.2.75-3.75 3.65.9 5.2L10 14.45 5.35 16.9l.9-5.2L2.5 8.05l5.2-.75L10 2.6z" />
        </svg>
      ))}
    </span>
  )
}

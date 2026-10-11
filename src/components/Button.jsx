import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  gold: 'bg-gold text-ink hover:bg-gold-muted hover:text-white shadow-soft',
  outlineDark: 'border border-white/25 text-white hover:border-gold hover:text-gold',
  outlineLight: 'border border-ink/15 text-ink hover:border-gold hover:text-gold-muted',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  ghost: 'text-gold hover:text-white',
}

const sizes = {
  sm: 'px-5 py-2.5',
  md: 'px-7 py-3.5',
  lg: 'px-8 py-4 text-base',
}

/**
 * دکمه مشترک سایت. اگر به prop، به مسیر داخلی اشاره کند Link و در غیر این صورت
 * تگ <a> یا <button> رندر می‌شود.
 */
export default function Button({
  to,
  href,
  variant = 'gold',
  size = 'md',
  arrow = false,
  externalArrow = false,
  icon: Icon,
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant] ?? variants.gold} ${sizes[size] ?? sizes.md} ${className}`

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {arrow && (
        <ArrowLeft
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
      )}
      {externalArrow && (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

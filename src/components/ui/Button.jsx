import { Link } from 'react-router-dom'
import { classNames } from '../../lib/classNames'

const VARIANTS = {
  primary:
    'bg-ink text-white hover:bg-ocean border border-ink hover:border-ocean',
  ocean: 'bg-ocean text-white hover:bg-ocean-deep border border-ocean',
  turquoise: 'bg-turquoise text-white hover:bg-turquoise-dark border border-turquoise',
  outline: 'bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink border border-white hover:bg-champagne hover:border-champagne',
  ghostLight:
    'bg-transparent text-white border border-white/45 hover:bg-white hover:text-ocean',
  champagne: 'bg-champagne text-ink border border-champagne hover:bg-champagne-deep',
}

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-[13px]',
  lg: 'px-8 py-4 text-sm',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const classes = classNames(
    'inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-wide2 font-medium',
    'transition-all duration-300 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  const Tag = as || 'button'
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

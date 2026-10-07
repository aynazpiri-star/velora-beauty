import { Link } from 'react-router-dom';
import { classNames } from '../../lib/format.js';

const VARIANTS = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  ink: 'btn bg-ink px-7 py-3 text-cream hover:bg-burgundy hover:shadow-lift',
  light: 'btn bg-cream px-7 py-3 text-ink hover:bg-white hover:shadow-soft',
};

/**
 * Single button primitive used across the storefront. Renders a <button> by
 * default, a <Link> when `to` is set, and an <a> when `href` is set.
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  to,
  href,
  type = 'button',
  ...rest
}) {
  const classes = classNames(VARIANTS[variant] ?? VARIANTS.primary, className);

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

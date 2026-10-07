import { Link } from 'react-router-dom';
import { classNames } from '../../lib/format.js';

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="presentation" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#F8EEEC" stroke="#EBCFCB" />
      <path
        d="M20 29c0-7.4 3.6-11 9.6-12.2C28.4 24.2 25.6 28 20 29Z"
        fill="#9B4560"
        opacity="0.92"
      />
      <path
        d="M20 29c0-7.4-3.6-11-9.6-12.2C11.6 24.2 14.4 28 20 29Z"
        fill="#B86D7E"
      />
      <path d="M20 29V15" stroke="#9B4560" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="20" cy="12.4" r="1.7" fill="#9B4560" />
    </svg>
  );
}

export default function Logo({ to = '/', tone = 'dark', className = '' }) {
  return (
    <Link
      to={to}
      className={classNames('group inline-flex items-center gap-3', className)}
      aria-label="VELORA — home"
    >
      <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-6" />
      <span className="flex flex-col leading-none">
        <span
          className={classNames(
            'font-serif text-[22px] font-semibold tracking-[0.22em]',
            tone === 'light' ? 'text-cream' : 'text-ink',
          )}
        >
          VELORA
        </span>
        <span
          className={classNames(
            'mt-1 text-[8px] font-medium uppercase tracking-[0.42em]',
            tone === 'light' ? 'text-cream/60' : 'text-ink/45',
          )}
        >
          Beauty
        </span>
      </span>
    </Link>
  );
}

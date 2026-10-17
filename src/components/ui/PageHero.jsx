import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { classNames } from '../../lib/classNames'
import SafeImage from './SafeImage'

/**
 * Compact editorial banner used at the top of inner pages so every route keeps
 * the same art direction as the home hero.
 */
export default function PageHero({ eyebrow, title, subtitle, image, breadcrumb = [], children }) {
  return (
    <header className="relative isolate overflow-hidden bg-ocean-ink pt-32 pb-14 sm:pt-40 sm:pb-20">
      {image && (
        <SafeImage
          src={image}
          alt=""
          loading="eager"
          wrapperClassName="absolute inset-0 -z-10"
          className="scale-105 opacity-45"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-ink/92 via-ocean/80 to-ocean-ink/95"
      />
      <div className="container-x">
        {breadcrumb.length > 0 && (
          <nav aria-label="مسیر صفحه" className="mb-6 flex items-center gap-2 text-[11px] text-white/60">
            <Link to="/" className="transition hover:text-champagne">
              صفحه اصلی
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronLeft className="h-3 w-3" aria-hidden="true" />
                {crumb.to ? (
                  <Link to={crumb.to} className="transition hover:text-champagne">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/85">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className={classNames('max-w-3xl', children && 'max-w-none')}>
          {eyebrow && (
            <p className="eyebrow mb-4 flex items-center gap-3 text-champagne">
              <span className="h-px w-8 bg-champagne" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-[28px] font-semibold leading-[1.3] text-white sm:text-[40px] lg:text-[46px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 sm:text-[15px]">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </header>
  )
}

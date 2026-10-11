import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'

/** سرصفحه تیره صفحات داخلی با مسیر راهنما و لبه موجی پایین. */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs = [],
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-32 lg:pb-28 lg:pt-44">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-l from-ink via-ink/60 to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      {!image && (
        <div className="blueprint absolute inset-0 opacity-70" aria-hidden="true" />
      )}

      <div className="shell relative z-10">
        {breadcrumbs.length > 0 && (
          <nav aria-label="مسیر صفحه" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/50">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {crumb.to && !isLast ? (
                      <Link to={crumb.to} className="transition-colors hover:text-gold">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'text-gold' : undefined}>{crumb.label}</span>
                    )}
                    {!isLast && <ChevronLeft className="h-3.5 w-3.5 text-white/25" aria-hidden="true" />}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="mt-5 text-3xl leading-[1.4] text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={160}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-9 text-white/70">{description}</p>
            </Reveal>
          )}
          {children && <Reveal delay={220}>{children}</Reveal>}
        </div>
      </div>

      <WaveDivider position="bottom" tone="ivory" />
    </section>
  )
}

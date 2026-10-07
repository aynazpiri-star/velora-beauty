import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SafeImage from './SafeImage.jsx';
import { classNames } from '../../lib/format.js';

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  image,
  align = 'left',
  children,
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/[0.07] bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-softpink/35 blur-3xl"
      />

      <div
        className={classNames(
          'container-velora relative py-12 lg:py-16',
          image && 'grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16',
        )}
      >
        <div className={classNames(align === 'center' && !image && 'mx-auto max-w-3xl text-center')}>
          {breadcrumbs.length ? (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] text-ink/50">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {crumb.to ? (
                      <Link to={crumb.to} className="transition-colors hover:text-burgundy">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink/75">
                        {crumb.label}
                      </span>
                    )}
                    {i < breadcrumbs.length - 1 ? <ChevronRight size={13} /> : null}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-5 font-serif text-[34px] leading-[1.12] sm:text-[44px] lg:text-[52px]">
            {title}
          </h1>
          {description ? (
            <p
              className={classNames(
                'mt-5 text-[15px] leading-relaxed text-ink/70',
                align === 'center' && !image ? 'mx-auto max-w-2xl' : 'max-w-2xl',
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>

        {image ? (
          <div className="overflow-hidden rounded-xl2 border border-white/70 shadow-card">
            <SafeImage
              src={image}
              alt=""
              wrapperClassName="aspect-[4/3]"
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

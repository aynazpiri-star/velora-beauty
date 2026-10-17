import { classNames } from '../../lib/classNames'
import Reveal from './Reveal'

/**
 * Editorial section heading: optional eyebrow, a large serif-ish title and a
 * lead paragraph, with an optional action slot on the opposite side (RTL aware).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  tone = 'dark',
  align = 'start',
  className,
}) {
  const isLight = tone === 'light'
  return (
    <Reveal
      className={classNames(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={classNames('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && (
          <p
            className={classNames(
              'eyebrow mb-3 flex items-center gap-3',
              align === 'center' && 'justify-center',
              isLight ? 'text-champagne' : 'text-turquoise-dark',
            )}
          >
            <span className={classNames('h-px w-8', isLight ? 'bg-champagne' : 'bg-turquoise-dark')} />
            {eyebrow}
          </p>
        )}
        <h2
          className={classNames(
            'text-[26px] font-semibold leading-[1.35] sm:text-[34px] lg:text-[40px]',
            isLight ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={classNames(
              'mt-4 text-sm leading-7 sm:text-[15px]',
              isLight ? 'text-white/70' : 'text-ink-muted',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  )
}

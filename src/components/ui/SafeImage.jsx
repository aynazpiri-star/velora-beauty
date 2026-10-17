import { useState } from 'react'
import { classNames } from '../../lib/classNames'

/**
 * Image with a graceful fallback: if the remote photo fails to load we render
 * an on-brand placeholder instead of a broken image.
 */
export default function SafeImage({
  src,
  alt = '',
  className,
  wrapperClassName,
  loading = 'lazy',
  ...rest
}) {
  const [state, setState] = useState('loading')

  // The wrapper needs `relative` for the placeholder overlay, but a caller may
  // position it itself (e.g. `absolute inset-0` as a section backdrop). Emitting
  // both would let Tailwind's stylesheet order decide instead of the caller.
  const selfPositioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(wrapperClassName ?? '')

  return (
    <span
      className={classNames(
        selfPositioned ? 'block' : 'relative block',
        'overflow-hidden bg-ivory-deep',
        wrapperClassName,
      )}
    >
      {state !== 'ready' && (
        <span
          aria-hidden="true"
          className={classNames(
            'absolute inset-0 bg-gradient-to-br from-ivory-deep via-champagne/40 to-ivory',
            state === 'loading' && 'animate-pulse',
          )}
        />
      )}
      {state === 'error' ? (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] uppercase tracking-wide2 text-ink-muted">
          تصویر موجود نیست
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          className={classNames('relative h-full w-full object-cover', className)}
          {...rest}
        />
      )}
    </span>
  )
}

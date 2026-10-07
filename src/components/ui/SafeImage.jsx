import { useState } from 'react';
import { classNames } from '../../lib/format.js';

/**
 * Photography wrapper: lazy-loads, fades in and falls back to a soft blush
 * panel if the remote image cannot be fetched, so a card never renders broken.
 */
export default function SafeImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  sizes,
  eager = false,
}) {
  const [state, setState] = useState('loading');

  return (
    <div className={classNames('relative overflow-hidden bg-sand', wrapperClassName)}>
      {state !== 'ready' ? (
        <div
          aria-hidden="true"
          className={classNames(
            'absolute inset-0 bg-gradient-to-br from-blush via-sand to-softpink',
            state === 'loading' && 'animate-pulse',
          )}
        />
      ) : null}

      {state !== 'error' ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={eager ? 'high' : 'auto'}
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          className={classNames(
            className,
            'transition-opacity duration-700',
            state === 'ready' ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : null}

      {state === 'error' ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-lg tracking-[0.3em] text-burgundy/50">VELORA</span>
        </div>
      ) : null}
    </div>
  );
}

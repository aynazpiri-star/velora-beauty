import { Star } from 'lucide-react';
import { classNames } from '../../lib/format.js';

export default function Rating({ value = 5, reviewCount, size = 14, className = '', showValue = false }) {
  const rounded = Math.round(value);
  return (
    <div className={classNames('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rounded ? 'fill-burgundy text-burgundy' : 'text-ink/20'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="sr-only">{`Rated ${value} out of 5`}</span>
      {showValue || reviewCount != null ? (
        <span className="text-[12px] text-ink/55">
          {showValue ? value.toFixed(1) : null}
          {showValue && reviewCount != null ? ' · ' : null}
          {reviewCount != null ? `${reviewCount} reviews` : null}
        </span>
      ) : null}
    </div>
  );
}

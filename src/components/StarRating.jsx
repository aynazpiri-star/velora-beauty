import { IconStar } from './Icons'
import { toFa } from '../lib/format'

export default function StarRating({ value = 5, count, size = 12, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex items-center gap-[2px] text-[#C9A227]">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} size={size} filled={i < Math.round(value)} />
        ))}
      </span>
      {typeof count === 'number' && (
        <span className="text-[11px] text-muted">({toFa(count)})</span>
      )}
    </div>
  )
}

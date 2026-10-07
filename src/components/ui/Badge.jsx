import { classNames } from '../../lib/format.js';

export default function Badge({ children, tone = 'rose', className = '' }) {
  const tones = {
    rose: 'bg-burgundy text-cream',
    soft: 'bg-softpink text-ink',
    light: 'bg-white/90 text-ink',
    ink: 'bg-ink text-cream',
    outline: 'border border-ink/20 text-ink',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]',
        tones[tone] ?? tones.rose,
        className,
      )}
    >
      {children}
    </span>
  );
}

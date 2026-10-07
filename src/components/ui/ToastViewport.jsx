import { Check, Info, X } from 'lucide-react';
import { classNames } from '../../lib/format.js';
import { useStore } from '../../context/StoreContext.jsx';

const TONES = {
  success: { icon: Check, ring: 'border-burgundy/25 bg-white', mark: 'bg-burgundy text-cream' },
  error: { icon: Info, ring: 'border-ink/15 bg-white', mark: 'bg-ink text-cream' },
  default: { icon: Info, ring: 'border-ink/15 bg-white', mark: 'bg-softpink text-ink' },
};

export default function ToastViewport() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const tone = TONES[toast.tone] ?? TONES.default;
        const Icon = tone.icon;
        return (
          <div
            key={toast.id}
            className={classNames(
              'pointer-events-auto flex items-center gap-3 rounded-xl2 border px-4 py-3 shadow-card animate-fade-up',
              tone.ring,
            )}
          >
            <span className={classNames('inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full', tone.mark)}>
              <Icon size={15} />
            </span>
            <p className="flex-1 text-[13px] leading-snug text-ink/85">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-ink/40 transition-colors hover:text-ink"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

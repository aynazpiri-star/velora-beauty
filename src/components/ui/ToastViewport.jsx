import { CheckCircle2, Info, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { classNames } from '../../lib/classNames'

/** Bottom-anchored transient messages (cart / wishlist / form feedback). */
export default function ToastViewport() {
  const { toasts, dismissToast } = useStore()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={classNames(
            'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl px-4 py-3 shadow-card',
            'animate-rise border text-[13px] leading-6',
            toast.tone === 'info'
              ? 'border-ocean/20 bg-ocean text-white'
              : 'border-turquoise/30 bg-white text-ink',
          )}
        >
          {toast.tone === 'info' ? (
            <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-turquoise-dark" aria-hidden="true" />
          )}
          <p className="flex-1">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 rounded-full p-1 opacity-60 transition hover:opacity-100"
            aria-label="بستن پیام"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  )
}

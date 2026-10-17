import { useEffect } from 'react'

/** Locks body scroll while a full-screen overlay (drawer/modal/menu) is open. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

/** Calls `handler` on Escape — used to close drawers and modals. */
export function useEscape(handler, active = true) {
  useEffect(() => {
    if (!active) return
    const onKey = (event) => {
      if (event.key === 'Escape') handler(event)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler, active])
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * با هر تغییر مسیر به بالای صفحه می‌رود و اگر آدرس هش داشته باشد،
 * با اسکرول نرم به همان بخش صفحه منتقل می‌شود.
 */
export default function ScrollToTopRoute() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        )
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

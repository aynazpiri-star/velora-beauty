import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** دکمه بازگشت به بالای صفحه؛ پس از اسکرول مقداری ظاهر می‌شود. */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="بازگشت به بالای صفحه"
      className={`fixed bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ink/90 text-gold shadow-lift backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink ${
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ insetInlineStart: '1.5rem' }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}

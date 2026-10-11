import { useEffect, useState } from 'react'

/**
 * منطق مشترک کاروسل‌های سایت (پروژه‌ها و مجله).
 * تعداد کل اسلایدها و تعداد اسلاید در هر نما را می‌گیرد و صفحه فعال را برمی‌گرداند.
 */
export default function useCarousel(total, perPage) {
  const pageCount = Math.max(1, Math.ceil(total / perPage))
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1))
  }, [pageCount])

  const next = () => setPage((current) => (current + 1) % pageCount)
  const prev = () => setPage((current) => (current - 1 + pageCount) % pageCount)
  const goTo = (index) =>
    setPage(Math.min(Math.max(index, 0), pageCount - 1))

  return { page, pageCount, next, prev, goTo }
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-site py-24 text-center">
      <p className="eyebrow">خطای ۴۰۴</p>
      <h1 className="heading-lg mt-3">این صفحه پیدا نشد</h1>
      <p className="mt-3 text-[12px] text-muted">
        ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد.
      </p>
      <Link to="/" className="btn-gold mt-7">
        بازگشت به خانه
      </Link>
    </div>
  )
}

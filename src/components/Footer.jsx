import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand">VELORA</span>
            <p>
              بوتیک ساعت‌های لوکس ولورا؛ گزیده‌ای از ساعت‌هایی که دقت، هنر و
              طراحی ماندگار را در یک قاب گرد هم می‌آورند.
            </p>
          </div>

          <div className="footer-col">
            <h4>فروشگاه</h4>
            <ul>
              <li>
                <Link to="/shop">همهٔ ساعت‌ها</Link>
              </li>
              <li>
                <Link to="/shop">کلاسیک</Link>
              </li>
              <li>
                <Link to="/shop">کرونوگراف</Link>
              </li>
              <li>
                <Link to="/shop">اسپرت</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>ولورا</h4>
            <ul>
              <li>
                <Link to="/#story">داستان ما</Link>
              </li>
              <li>
                <Link to="/#collections">مجموعه‌ها</Link>
              </li>
              <li>
                <Link to="/#story">آتلیه</Link>
              </li>
              <li>
                <Link to="/shop">خدمات پس از فروش</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-news">
            <h4>خبرنامهٔ ولورا</h4>
            <p>دعوت‌نامهٔ مجموعه‌های محدود و داستان‌های آتلیه، ماهی یک بار.</p>
            <form className="news-form" onSubmit={submit}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="نشانی ایمیل"
                aria-label="نشانی ایمیل برای خبرنامه"
                required
              />
              <button type="submit">عضویت</button>
            </form>
            {sent && (
              <p className="news-note" role="status">
                سپاسگزاریم؛ عضویت شما ثبت شد.
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© ۲۰۲۶ VELORA — تمامی حقوق محفوظ است.</span>
          <span>تهران، خیابان ولیعصر</span>
        </div>
      </div>
    </footer>
  )
}

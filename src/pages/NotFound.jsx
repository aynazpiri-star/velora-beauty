import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center bg-ivory pb-24 pt-40">
      <div className="shell relative z-10 text-center">
        <span className="num font-serif text-6xl text-gold sm:text-7xl">۴۰۴</span>
        <h1 className="mt-6 text-2xl sm:text-3xl">این صفحه در نقشه‌های ما پیدا نشد</h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-charcoal-muted">
          ممکن است نشانی تغییر کرده باشد یا این بخش هنوز ساخته نشده باشد. از مسیرهای زیر ادامه
          دهید.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" size="lg" arrow>
            بازگشت به صفحه اصلی
          </Button>
          <Button to="/projects" variant="outlineLight" size="lg">
            مشاهده پروژه‌ها
          </Button>
        </div>

        <Link to="/contact" className="link-underline mt-9 inline-flex text-gold">
          تماس با ما
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

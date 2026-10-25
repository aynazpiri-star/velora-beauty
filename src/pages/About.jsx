import { Link } from 'react-router-dom'
import Values from '../sections/Values'

export default function About() {
  return (
    <div>
      <div className="container-site py-10 lg:py-14">
        <nav aria-label="مسیر" className="text-[10.5px] text-muted">
          <Link to="/" className="hover:text-gold">
            خانه
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">درباره ما</span>
        </nav>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div>
            <p className="eyebrow">داستان ما</p>
            <h1 className="heading-lg mt-3">میراثی از ظرافت و هنر دست</h1>
            <div className="mt-5 space-y-4 text-[12.5px] leading-8 text-muted">
              <p>
                AURELIA با تمرکز بر جواهرات ظریف و ماندگار شکل گرفته است؛ جایی که طراحی آرام و
                بی‌زمان بر شلوغی و زرق‌وبرق ترجیح داده می‌شود. هر قطعه با دقت در انتخاب سنگ،
                پرداخت دستی و توجه به جزئیات ساخته می‌شود.
              </p>
              <p id="craft">
                در کارگاه ما، هر قطعه مسیر خود را طی می‌کند: از انتخاب مواد اولیه تا ساخت قالب،
                نشاندن سنگ و پرداخت نهایی. همین وسواس است که جواهر را به یادگاری برای سال‌ها
                تبدیل می‌کند.
              </p>
              <p className="text-[11px] leading-7">
                اطلاعات تاریخی و جزئیات تأسیس برند در این نسخه نمایشی قابل ویرایش است و به‌عنوان
                ادعای رسمی مطرح نمی‌شود.
              </p>
            </div>
            <Link to="/shop" className="btn-gold mt-7">
              مشاهده مجموعه
            </Link>
          </div>

          <div className="overflow-hidden rounded-t-full bg-cream">
            <img
              src="/images/story-craft.jpg"
              alt="ساخت جواهر با دست"
              className="aspect-[214/196] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div id="values">
        <Values />
      </div>

      <div className="container-site py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            ['انتخاب مواد', 'سنگ‌ها و فلزات با توجه به اصالت و دوام انتخاب می‌شوند.'],
            ['ساخت دستی', 'پرداخت و مونتاژ قطعه‌ها با دقت و در تعداد محدود انجام می‌شود.'],
            ['همراهی پس از خرید', 'برای سایز، نگهداری و بازگشت کالا در کنار شما هستیم.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-line/80 bg-white p-6">
              <h2 className="text-[12.5px] text-ink">{title}</h2>
              <p className="mt-2 text-[11.5px] leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

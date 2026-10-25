import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import {
  IconFacebook,
  IconInstagram,
  IconPinterest,
  IconTiktok,
  IconYoutube,
} from './Icons'

const columns = [
  {
    title: 'فروشگاه',
    links: [
      { label: 'همه محصولات', to: '/shop' },
      { label: 'انگشتر', to: '/shop?category=rings' },
      { label: 'گردنبند', to: '/shop?category=necklaces' },
      { label: 'گوشواره', to: '/shop?category=earrings' },
      { label: 'دستبند', to: '/shop?category=bracelets' },
      { label: 'جواهرات عروس', to: '/shop?category=wedding' },
      { label: 'هدایا', to: '/shop?category=gifts' },
    ],
  },
  {
    title: 'درباره ما',
    links: [
      { label: 'داستان ما', to: '/about' },
      { label: 'هنر دست', to: '/about#craft' },
      { label: 'تولید مسئولانه', to: '/about#values' },
      { label: 'وبلاگ', to: '/blog' },
      { label: 'تماس با ما', to: '/contact' },
    ],
  },
  {
    title: 'خدمات مشتریان',
    links: [
      { label: 'پیگیری سفارش', to: '/account' },
      { label: 'بازگشت و تعویض', to: '/contact' },
      { label: 'راهنمای سایز', to: '/contact' },
      { label: 'پرسش‌های متداول', to: '/contact' },
      { label: 'حریم خصوصی', to: '/contact' },
      { label: 'قوانین و مقررات', to: '/contact' },
    ],
  },
]

const socials = [
  { Icon: IconInstagram, label: 'اینستاگرام' },
  { Icon: IconFacebook, label: 'فیسبوک' },
  { Icon: IconPinterest, label: 'پینترست' },
  { Icon: IconYoutube, label: 'یوتیوب' },
  { Icon: IconTiktok, label: 'تیک‌تاک' },
]

export default function Footer() {
  const { notify } = useStore()
  const year = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8 lg:py-16">
        <div>
          <Link to="/" className="inline-flex flex-col leading-none text-ink">
            <span className="brand-word text-[21px] tracking-[0.34em]">AURELIA</span>
            <span className="mt-1.5 text-[7.5px] tracking-[0.42em] text-muted">
              FINE JEWELRY
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-[12px] leading-7 text-muted">
            جواهرات ماندگار برای زیباتر شدن هر روز شما؛ طراحی‌های ظریف که با گذر زمان ارزشمندتر
            می‌شوند.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {socials.map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => notify(`${label} AURELIA به‌زودی فعال می‌شود`)}
                aria-label={label}
                className="grid h-8 w-8 place-items-center border border-line text-ink transition-colors hover:border-gold hover:text-gold"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[11.5px] font-medium tracking-[0.08em] text-ink">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[11.5px] text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line/80">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-[10.5px] text-muted sm:flex-row">
          <p>© {year} AURELIA Jewelry. تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده با ♡ برای دنیایی زیباتر.</p>
        </div>
      </div>
    </footer>
  )
}

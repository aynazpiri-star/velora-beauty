import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlueprintDecor from './BlueprintDecor'
import Button from './Button'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import WaveDivider from './WaveDivider'
import { brand, contact, navLinks } from '../data/site'

/** پاورقی تیره با لبه موجی، اطلاعات تماس، پیوندهای سریع و شبکه‌های اجتماعی. */
export default function Footer() {
  const year = '۱۴۰۵'

  return (
    <footer className="blueprint relative bg-ink pt-20 text-white/70 lg:pt-24">
      <WaveDivider position="top" tone="ink" />
      <BlueprintDecor variant="elevation" />

      <div className="shell relative z-10">
        {/* نوار فراخوان کوتاه */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">پروژه‌ای در ذهن دارید؟</p>
            <h2 className="mt-4 text-2xl leading-relaxed text-white sm:text-3xl">
              برای ساخت، طراحی یا بازسازی ملک خود با ما گفت‌وگو کنید.
            </h2>
          </div>
          <Button to="/consultation" size="lg" arrow className="shrink-0">
            دریافت مشاوره
          </Button>
        </div>

        {/* سه ستون اصلی */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 text-base text-gold">{brand.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-7">{brand.shortDescription}</p>
            <div className="mt-7">
              <SocialLinks tone="light" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-white/50">
              اطلاعات تماس
            </h3>
            <ul className="mt-7 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="transition-colors hover:text-gold"
                >
                  <span className="bidi-ltr num">{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={contact.emailHref}
                  className="transition-colors hover:text-gold"
                >
                  <span className="bidi-ltr">{contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {contact.address}
                  <br />
                  <span className="text-white/45">{contact.addressDetail}</span>
                </span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-white/40">{contact.hours}</p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-white/50">
              دسترسی سریع
            </h3>
            <ul className="mt-7 space-y-4 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-underline hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* نوار پایانی */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row">
          <p>
            © <span className="num">{year}</span> {brand.name} | تمامی حقوق محفوظ است.
          </p>
          <p className="flex items-center gap-6">
            <span>حریم خصوصی</span>
            <span aria-hidden="true" className="text-white/20">
              |
            </span>
            <span>قوانین و مقررات</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

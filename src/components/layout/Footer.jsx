import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { BRAND, FOOTER_COLUMNS } from '../../data/content'
import { toFaDigits } from '../../lib/format'
import { BrandMark } from '../ui/Logo'

const SOCIAL_ICONS = {
  instagram: (
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM17.5 5.6a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
  ),
  telegram: <path d="M21.5 3.3L2.9 10.6c-.9.35-.9 1.6.02 1.9l4.6 1.5 1.7 5.4c.25.8 1.3.95 1.8.25l2.4-3.3 4.7 3.5c.7.5 1.7.1 1.85-.75l3-14.2c.15-.8-.65-1.45-1.45-1.1zM9.4 13.4l8.6-6-6.6 7.3-.3 3.2-1.7-4.5z" />,
  whatsapp: (
    <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 2a8 8 0 016.9 12.1l-.3.5.8 2.9-3-.8-.5.3A8 8 0 1112 4zm-3.1 3.9c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2s.8 2.2 1 2.4c.2.3 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.5-.05 1.5-.6 1.7-1.2.2-.6.2-1.1.15-1.2-.05-.1-.2-.2-.4-.3l-1.5-.7c-.2-.1-.4-.1-.55.1l-.6.75c-.15.15-.3.2-.5.1a6.4 6.4 0 01-1.9-1.15 7 7 0 01-1.3-1.6c-.1-.2 0-.35.1-.45l.45-.55c.1-.15.15-.3.05-.5l-.65-1.55c-.2-.45-.4-.4-.55-.4h-.5z" />
  ),
  youtube: (
    <path d="M22.5 7.2a3.3 3.3 0 00-2.3-2.3C18.3 4.4 12 4.4 12 4.4s-6.3 0-8.2.5A3.3 3.3 0 001.5 7.2C1 9.1 1 12 1 12s0 2.9.5 4.8a3.3 3.3 0 002.3 2.3c1.9.5 8.2.5 8.2.5s6.3 0 8.2-.5a3.3 3.3 0 002.3-2.3c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.9 15.1V8.9l5.4 3.1-5.4 3.1z" />
  ),
}

export default function Footer() {
  const year = toFaDigits(new Date().getFullYear())

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 start-1/4 h-72 w-72 rounded-full bg-turquoise/12 blur-3xl"
      />

      <div className="container-x relative py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <BrandMark className="h-9 w-9 text-champagne" />
              <span className="brand-wordmark font-display text-[18px] text-white">
                AURA<span className="ms-2 opacity-70">PARFUMS</span>
              </span>
            </div>
            <p className="mt-5 text-[12.5px] leading-7 text-white/60">{BRAND.about}</p>
            <div className="mt-6 flex items-center gap-2">
              {BRAND.socials.map((social) => (
                <span
                  key={social.icon}
                  title={`${social.label} — نشانی در انتظار تکمیل`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    {SOCIAL_ICONS[social.icon]}
                  </svg>
                  <span className="sr-only">{social.label} (نشانی به‌زودی)</span>
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-5 text-white/35">
              نشانی شبکه‌های اجتماعی هنوز ثبت نشده است.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow mb-5 text-champagne">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[12.5px] text-white/65 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow mb-5 text-champagne">ارتباط با ما</h3>
            <ul className="space-y-3 text-[12.5px] text-white/65">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turquoise-light" aria-hidden="true" />
                <a href={BRAND.contact.phoneHref} className="transition hover:text-white" dir="ltr">
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turquoise-light" aria-hidden="true" />
                <a href={BRAND.contact.emailHref} className="transition hover:text-white" dir="ltr">
                  {BRAND.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turquoise-light" aria-hidden="true" />
                <span>{BRAND.contact.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turquoise-light" aria-hidden="true" />
                <span>{BRAND.contact.hours}</span>
              </li>
            </ul>
            <p className="mt-3 text-[11px] leading-5 text-white/35">
              اطلاعات تماس نمونه است و پیش از راه‌اندازی نهایی جایگزین می‌شود.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11.5px] text-white/45 sm:flex-row">
          <p>© تمامی حقوق این وب‌سایت متعلق به AURA PARFUMS است.</p>
          <p className="flex items-center gap-4">
            <Link to="/terms" className="transition hover:text-white">
              قوانین و شرایط
            </Link>
            <Link to="/faq" className="transition hover:text-white">
              پرسش‌های متداول
            </Link>
            <span className="tnum">{year}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

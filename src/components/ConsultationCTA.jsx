import { Mail, MapPin, Phone } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { contact } from '../data/site'

/** فراخوان مشاوره: عنوان اصلی، شرح و دکمه شروع همکاری. */
export default function ConsultationCTA({
  eyebrow = 'شروع همکاری',
  title = 'بیایید پروژه بعدی را با هم بسازیم',
  subtitle = 'شروع یک همکاری ماندگار',
  description = 'اگر برای ساخت، طراحی یا بازسازی ملک خود برنامه دارید، کارشناسان آرکا سازه آماده‌اند تا درباره ایده‌ها و نیازهای شما گفت‌وگو کنند.',
  primaryTo = '/consultation',
  primaryLabel = 'شروع مشاوره',
  showContact = true,
}) {
  return (
    <div>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 text-3xl leading-[1.5] sm:text-4xl lg:text-[2.6rem]">{title}</h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-3 text-lg text-gold">{subtitle}</p>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-charcoal-muted">{description}</p>
      </Reveal>

      {showContact && (
        <Reveal delay={260}>
          <ul className="mt-9 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
              <a href={`tel:${contact.phoneHref}`} className="hover:text-gold-muted">
                <span className="bidi-ltr num">{contact.phone}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
              <a href={contact.emailHref} className="hover:text-gold-muted">
                <span className="bidi-ltr">{contact.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              <span className="text-charcoal-muted">{contact.address}</span>
            </li>
          </ul>
        </Reveal>
      )}

      <Reveal delay={320}>
        <div className="mt-9">
          <Button to={primaryTo} size="lg" arrow>
            {primaryLabel}
          </Button>
        </div>
      </Reveal>
    </div>
  )
}

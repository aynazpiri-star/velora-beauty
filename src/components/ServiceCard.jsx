import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

/** آیتم خدمت: آیکون دایره‌ای خطی طلایی، عنوان و توضیح کوتاه. */
export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col items-center px-2 py-4 text-center"
      aria-label={`جزئیات خدمت ${service.title}`}
    >
      <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-gold/45 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
        <Icon name={service.icon} className="h-7 w-7" />
      </span>

      <h3 className="mt-6 text-lg leading-relaxed transition-colors duration-300 group-hover:text-gold-muted">
        {service.title}
      </h3>

      <p className="mt-3 max-w-[15rem] text-sm leading-7 text-charcoal-muted">{service.short}</p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        بیشتر بدانید
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

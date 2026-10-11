import { Instagram, Linkedin, Send } from 'lucide-react'
import { socials } from '../data/site'

const ICONS = {
  instagram: Instagram,
  telegram: Send,
  linkedin: Linkedin,
}

/** شبکه‌های اجتماعی برند؛ فهرست در فایل داده‌ها قابل ویرایش است. */
export default function SocialLinks({ tone = 'light', className = '' }) {
  const isLight = tone === 'light'

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map((social) => {
        const Icon = ICONS[social.key] ?? Instagram
        return (
          <li key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              title={social.label}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isLight
                  ? 'border-white/15 text-white/70 hover:border-gold hover:text-gold'
                  : 'border-ink/10 text-charcoal-muted hover:border-gold hover:text-gold-muted'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

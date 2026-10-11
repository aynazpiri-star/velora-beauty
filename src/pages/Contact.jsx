import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import ContactSection from '../components/ContactSection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import { photo } from '../data/images'
import { contact } from '../data/site'

const channels = [
  {
    key: 'phone',
    icon: Phone,
    label: 'تلفن دفتر',
    value: contact.phone,
    href: `tel:${contact.phoneHref}`,
    latin: true,
  },
  {
    key: 'mobile',
    icon: Phone,
    label: 'همراه کارشناسان',
    value: contact.mobile,
    href: `tel:${contact.mobileHref}`,
    latin: true,
  },
  {
    key: 'email',
    icon: Mail,
    label: 'ایمیل',
    value: contact.email,
    href: contact.emailHref,
    latin: true,
  },
  {
    key: 'address',
    icon: MapPin,
    label: 'نشانی دفتر مرکزی',
    value: `${contact.address} — ${contact.addressDetail}`,
    latin: false,
  },
]

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="تماس با ما"
        title="در گفت‌وگو با آرکا سازه"
        description="برای طرح پرسش، هماهنگی جلسه مشاوره یا بازدید از کارگاه‌ها، از راه‌های زیر با ما در ارتباط باشید."
        image={photo('1626178793926-22b28830aa30', 2000)}
        breadcrumbs={[{ label: 'خانه', to: '/' }, { label: 'تماس با ما' }]}
      />

      <section className="relative bg-ivory py-20 lg:py-24">
        <div className="shell relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, index) => (
              <Reveal
                key={channel.key}
                delay={index * 70}
                className="border border-ink/10 bg-cream p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <channel.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-charcoal-muted">
                  {channel.label}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="mt-3 block text-sm leading-7 text-ink transition-colors hover:text-gold-muted"
                  >
                    <span className={channel.latin ? 'bidi-ltr num' : undefined}>
                      {channel.value}
                    </span>
                  </a>
                ) : (
                  <p className="mt-3 text-sm leading-7 text-ink">{channel.value}</p>
                )}
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-ink/10 bg-ivory-light px-7 py-6 sm:flex-row sm:items-center">
            <p className="flex items-center gap-3 text-sm text-charcoal-muted">
              <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
              {contact.hours}
            </p>
            <div className="flex items-center gap-5">
              <span className="text-xs text-charcoal-muted">ما را دنبال کنید</span>
              <SocialLinks tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

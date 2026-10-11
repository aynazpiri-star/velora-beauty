import { ArrowLeft, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ConsultationCTA from '../components/ConsultationCTA'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { photo } from '../data/images'
import { getService, services } from '../data/services'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <NotFound />

  const related = services.filter((item) => item.slug !== service.slug)

  return (
    <>
      <PageHero
        eyebrow="خدمات تخصصی"
        title={service.title}
        description={service.short}
        image={photo('1518005020951-eccb494ad742', 2000)}
        breadcrumbs={[
          { label: 'خانه', to: '/' },
          { label: 'خدمات', to: '/services' },
          { label: service.title },
        ]}
      />

      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="shell relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="معرفی خدمت" title="این خدمت چه چیزی را در بر می‌گیرد؟" />

            <p className="mt-7 text-[1.02rem] leading-9 text-charcoal-muted">{service.overview}</p>

            <h3 className="mt-12 text-xl">مراحل و محتوای خدمت</h3>
            <ul className="mt-6 space-y-4">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 border-b border-ink/10 pb-4 text-sm leading-7 text-charcoal-muted last:border-b-0"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-xl">خروجی‌های نهایی</h3>
            <ul className="mt-6 flex flex-wrap gap-3">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="border border-gold/40 px-4 py-2 text-xs text-gold-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal className="border border-ink/10 bg-ivory-light p-8 shadow-soft">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl">درخواست این خدمت</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal-muted">
                برای دریافت برآورد زمانی و هزینه، فرم مشاوره را تکمیل کنید. کارشناس مربوطه در
                نخستین فرصت با شما تماس می‌گیرد.
              </p>
              <div className="mt-7">
                <Button to="/consultation" arrow>
                  شروع مشاوره
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <h3 className="text-sm uppercase tracking-[0.24em] text-charcoal-muted">
                خدمات مرتبط
              </h3>
              <ul className="mt-5 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/services/${item.slug}`}
                      className="group flex items-center justify-between gap-4 border-b border-ink/10 py-3.5 text-sm transition-colors hover:text-gold-muted"
                    >
                      <span className="flex items-center gap-3">
                        <Icon name={item.icon} className="h-4 w-4 text-gold" />
                        {item.title}
                      </span>
                      <ArrowLeft
                        className="h-4 w-4 text-gold transition-transform duration-300 group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-ivory-light py-20 lg:py-24">
        <div className="shell relative z-10">
          <ConsultationCTA
            eyebrow="همراهی از ایده تا اجرا"
            title="بیایید پروژه بعدی را با هم بسازیم"
          />
        </div>
      </section>

      <CtaBand
        eyebrow="نمونه کارها"
        title="نمونه اجرای این خدمت را ببینید"
        description="در بخش پروژه‌ها، نمونه‌هایی از اجرای همین خدمت با جزئیات فنی و تصاویر واقعی آورده شده است."
        primaryTo="/projects"
        primaryLabel="مشاهده پروژه‌ها"
      />
    </>
  )
}

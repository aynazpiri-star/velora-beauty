import Button from './Button'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ServiceCard from './ServiceCard'
import WaveDivider from './WaveDivider'
import { services } from '../data/services'

/** بخش خدمات: شش خدمت تخصصی در یک ردیف روی دسکتاپ. */
export default function ServicesSection({ withHeader = true, showWave = true }) {
  return (
    <section id="services" className="relative bg-ivory py-20 lg:py-28">
      {showWave && <WaveDivider position="top" tone="ivory" />}

      <div className="shell relative z-10">
        {withHeader && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="خدمات تخصصی"
              title="خدمات ما"
              description="شش حوزه تخصصی که در کنار هم، مسیر یک پروژه را از ایده تا تحویل کامل می‌کنند."
            />
            <Reveal delay={200} className="shrink-0">
              <Button to="/services" variant="outlineLight" arrow>
                همه خدمات
              </Button>
            </Reveal>
          </div>
        )}

        <div
          className={`grid gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 ${
            withHeader ? 'mt-14' : ''
          }`}
        >
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 70}
              className="border-ink/10 sm:border-e sm:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e xl:[&:nth-child(3n)]:border-e xl:last:border-e-0"
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { photo } from '../data/images'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="خدمات تخصصی"
        title="خدمات آرکا سازه"
        description="از طراحی معماری و ساخت‌وساز تا طراحی داخلی، بازسازی و مدیریت پروژه؛ همه خدمات در یک تیم و با یک زبان مشترک ارائه می‌شود."
        image={photo('1600047509807-ba8f99d2cdde', 2000)}
        breadcrumbs={[{ label: 'خانه', to: '/' }, { label: 'خدمات' }]}
      />

      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="حوزه‌های تخصص"
            title="شش خدمت، یک تعهد"
            description="هر خدمت به‌صورت مستقل نیز قابل سفارش است؛ اما بیشترین نتیجه زمانی به دست می‌آید که طراحی و اجرا در یک تیم پیش برود."
          />

          <div className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={index * 70}
                className="border-ink/10 sm:border-e sm:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:[&:nth-child(3n)]:border-e-0"
              >
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="انتخاب خدمت"
        title="نمی‌دانید پروژه شما به کدام خدمت نیاز دارد؟"
        description="در یک جلسه مشاوره کوتاه، دامنه کار، زمان‌بندی و برآورد اولیه پروژه شما مشخص می‌شود."
      />
    </>
  )
}

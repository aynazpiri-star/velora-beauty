import { Check, MapPin, Maximize2, CalendarRange, CircleDot, Building } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { getProject, getRelatedProjects } from '../data/projects'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const related = getRelatedProjects(project.slug)

  const facts = [
    { icon: Building, label: 'نوع پروژه', value: project.type },
    { icon: MapPin, label: 'موقعیت', value: project.location },
    { icon: Maximize2, label: 'متراژ', value: project.area },
    { icon: CircleDot, label: 'وضعیت', value: project.status },
    { icon: CalendarRange, label: 'سال', value: project.year },
  ]

  return (
    <>
      <PageHero
        eyebrow={project.type}
        title={project.title}
        description={project.cardSummary}
        image={project.image}
        breadcrumbs={[
          { label: 'خانه', to: '/' },
          { label: 'پروژه‌ها', to: '/projects' },
          { label: project.title },
        ]}
      />

      {/* ویژگی‌های کلیدی پروژه */}
      <section className="relative bg-ivory py-14 lg:py-16">
        <div className="shell relative z-10">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map((fact, index) => (
              <Reveal
                key={fact.label}
                delay={index * 60}
                className="border-t border-ink/15 pt-6 lg:border-e lg:border-t-0 lg:pt-0 lg:ps-7 lg:last:border-e-0 lg:first:ps-0"
              >
                <dt className="flex items-center gap-2 text-xs text-charcoal-muted">
                  <fact.icon className="h-4 w-4 text-gold" aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="mt-3 text-base text-ink">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* معرفی و ایده طراحی */}
      <section className="relative bg-ivory pb-20 lg:pb-28">
        <div className="shell relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="معرفی پروژه" title="روایت ساخت" />
            <p className="mt-7 text-[1.02rem] leading-9 text-charcoal-muted">{project.overview}</p>

            <h3 className="mt-12 text-xl">ایده طراحی</h3>
            <p className="mt-4 text-[1.02rem] leading-9 text-charcoal-muted">{project.concept}</p>

            <h3 className="mt-12 text-xl">متریال و جزئیات اجرایی</h3>
            <ul className="mt-5 space-y-4">
              {project.materials.map((material) => (
                <li key={material} className="flex items-start gap-3 text-sm leading-7 text-charcoal-muted">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {material}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <img
              src={project.gallery[1] ?? project.image}
              alt={`جزئیات معماری پروژه ${project.title}`}
              loading="lazy"
              className="h-72 w-full object-cover lg:h-[420px]"
            />

            <dl className="mt-10 border-t border-ink/10 pt-8">
              <h3 className="text-lg">مشخصات فنی</h3>
              <div className="mt-5 space-y-4">
                {project.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 border-b border-ink/10 pb-3 text-sm last:border-b-0"
                  >
                    <dt className="text-charcoal-muted">{spec.label}</dt>
                    <dd className="num text-ink">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* گالری پروژه */}
      <section className="relative bg-ivory-light py-20 lg:py-24">
        <div className="shell relative z-10">
          <SectionHeading eyebrow="گالری" title="تصاویر پروژه" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {project.gallery.map((image, index) => (
              <Reveal
                key={image}
                delay={index * 80}
                className={index === 0 ? 'sm:col-span-2' : undefined}
              >
                <img
                  src={image}
                  alt={`تصویر ${index + 1} از پروژه ${project.title}`}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 hover:scale-[1.02] ${
                    index === 0 ? 'h-72 sm:h-[440px]' : 'h-60 sm:h-[300px]'
                  }`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* پروژه‌های مرتبط */}
      <section className="relative bg-ivory py-20 lg:py-24">
        <div className="shell relative z-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="ادامه ببینید" title="پروژه‌های مرتبط" />
            <Link to="/projects" className="link-underline text-gold">
              همه پروژه‌ها
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80}>
                <ProjectCard project={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="پروژه مشابه"
        title="پروژه‌ای با همین کیفیت اجرا می‌خواهید؟"
        description="برای بررسی زمین، برآورد هزینه و تعیین زمان‌بندی، با کارشناسان ما گفت‌وگو کنید."
      />
    </>
  )
}

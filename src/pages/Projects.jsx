import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { photo } from '../data/images'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="نمونه کارها"
        title="پروژه‌های آرکا سازه"
        description="مجموعه‌ای از پروژه‌های مسکونی، تجاری و بازسازی که با تمرکز بر کیفیت اجرا و طراحی ماندگار انجام شده‌اند. برای مشاهده جزئیات هر پروژه، روی کارت آن کلیک کنید."
        image={photo('1486406146926-c627a92ad1ab', 2000)}
        breadcrumbs={[{ label: 'خانه', to: '/' }, { label: 'پروژه‌ها' }]}
      />

      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="shell relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-14 border-t border-ink/10 pt-8 text-center text-xs leading-7 text-charcoal-muted">
              نمونه‌کارهای نمایشی؛ پیش از انتشار عمومی با پروژه‌های تأییدشده و اسناد واقعی شرکت
              جایگزین می‌شوند.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="همکاری با ما"
        title="پروژه شما نیز می‌تواند بخشی از این مجموعه باشد"
        description="برای بررسی امکان‌سنجی و برآورد اولیه پروژه، درخواست مشاوره ثبت کنید."
      />
    </>
  )
}

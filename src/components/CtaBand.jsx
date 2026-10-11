import BlueprintDecor from './BlueprintDecor'
import Button from './Button'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'

/** نوار فراخوان تیره انتهای صفحات داخلی. */
export default function CtaBand({
  eyebrow = 'گام بعدی',
  title = 'پروژه بعدی شما می‌تواند اینجا باشد',
  description = 'برای بررسی امکان‌سنجی زمین، برآورد هزینه یا طراحی اولیه، یک جلسه مشاوره رزرو کنید.',
  primaryTo = '/consultation',
  primaryLabel = 'شروع مشاوره',
  secondaryTo = '/contact',
  secondaryLabel = 'تماس با ما',
}) {
  return (
    <section className="blueprint relative bg-ink py-20 lg:py-24">
      <WaveDivider position="top" tone="ink" />
      <BlueprintDecor variant="grid" />

      <div className="shell relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-2xl leading-relaxed text-white sm:text-3xl">{title}</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 text-sm leading-8 text-white/60">{description}</p>
          </Reveal>
        </div>

        <Reveal delay={200} className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button to={primaryTo} size="lg" arrow>
            {primaryLabel}
          </Button>
          <Button to={secondaryTo} variant="outlineDark" size="lg">
            {secondaryLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

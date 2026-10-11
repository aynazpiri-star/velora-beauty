import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import WaveDivider from './WaveDivider'
import { photo } from '../data/images'
import { advantages } from '../data/stats'

// آیکون هر مزیت رقابتی، متناظر با کلیدهای فایل داده‌ها.
const iconByKey = {
  'custom-design': 'compass',
  'execution-quality': 'award',
  transparency: 'ruler',
  timeline: 'target',
}

/** بخش «چرا آرکا سازه؟» با تصویر پروژه و چهار مزیت کلیدی. */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-ink py-24 lg:py-32">
      <WaveDivider position="top" tone="ink" />

      <div className="shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <img
                src={photo('1494526585095-c41746248156', 1200)}
                alt="نمای شبانه یک خانه مدرن با نورپردازی نمای بیرونی"
                loading="lazy"
                className="h-full w-full object-cover shadow-lift"
              />
              <div
                className="pointer-events-none absolute -bottom-5 -start-5 hidden h-32 w-32 border border-gold/30 lg:block"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="تعهد ما"
              title="چرا آرکا سازه؟"
              description="چهار اصلی که در همه پروژه‌ها، از یک بازسازی کوچک تا یک مجتمع تجاری، یکسان رعایت می‌شود."
              tone="light"
            />

            <ul className="mt-12 space-y-8">
              {advantages.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.key}
                  delay={index * 80}
                  className="flex gap-5 border-b border-white/10 pb-8 last:border-b-0 last:pb-0"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold">
                    <Icon name={iconByKey[item.key]} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

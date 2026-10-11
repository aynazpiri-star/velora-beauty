import BlueprintDecor from './BlueprintDecor'
import Icon from './Icon'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'
import { statistics, years } from '../data/stats'

// آیکون‌های آماری، متناظر با کلیدهای فایل داده‌ها.
const iconByKey = {
  projects: 'building',
  satisfaction: 'handshake',
  team: 'users',
  quality: 'shield',
}

/** بخش تجربه و آمار شرکت روی زمینه تیره با ترسیم‌های فنی کمرنگ. */
export default function StatisticsSection({ showWave = true }) {
  return (
    <section id="experience" className="blueprint relative bg-ink py-24 lg:py-32">
      {showWave && <WaveDivider position="top" tone="ink" />}
      <BlueprintDecor variant="plan" />

      <div className="shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* نشان دایره‌ای سال تجربه */}
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-8 lg:flex-col lg:items-start">
              <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-gold/40 sm:h-48 sm:w-48">
                <div className="absolute inset-3 rounded-full border border-gold/15" aria-hidden="true" />
                <div className="text-center">
                  <span className="num block font-serif text-5xl text-gold sm:text-6xl">
                    {years.value}
                  </span>
                  <span className="mt-2 block text-xs tracking-[0.2em] text-white/60">
                    {years.label}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-7 text-white/50 lg:max-w-[16rem]">
                بیش از یک دهه ساخت فضایی که با گذر زمان ارزشمندتر می‌شود.
              </p>
            </div>
          </Reveal>

          {/* عنوان و توضیح */}
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">ساخته‌شده بر پایه اعتماد</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl leading-[1.5] text-white sm:text-4xl lg:text-[2.75rem]">
                تجربه‌ای که اطمینان می‌سازد
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-9 text-white/65">
                در آرکا سازه، هر پروژه حاصل ترکیب دانش فنی، طراحی دقیق و تعهد به کیفیت است. از
                نخستین ایده تا تحویل نهایی، همراه شما هستیم.
              </p>
            </Reveal>
          </div>
        </div>

        {/* چهار شاخص کلیدی */}
        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <Reveal
              key={stat.key}
              delay={index * 90}
              className="border-t border-white/10 pt-7 lg:border-e lg:border-t-0 lg:pt-0 lg:ps-8 lg:first:ps-0"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon name={iconByKey[stat.key]} className="h-5 w-5" />
              </span>
              <p className="num mt-6 font-serif text-4xl text-gold lg:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm text-white/60">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

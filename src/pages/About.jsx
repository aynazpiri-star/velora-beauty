import { Award, Droplets, HeartHandshake, Leaf } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SafeImage from '../components/ui/SafeImage'
import { BRAND } from '../data/content'
import { IMG } from '../data/products'

const VALUES = [
  {
    icon: Droplets,
    title: 'الهام از اقیانوس',
    text: 'بخش بزرگی از کالکشن AURA از نور، نمک و حرکت آب الهام گرفته است.',
  },
  {
    icon: Award,
    title: 'کیفیت بی‌چون‌وچرا',
    text: 'غلظت و ماندگاری هر رایحه پیش از عرضه در آزمایشگاه بررسی می‌شود.',
  },
  {
    icon: Leaf,
    title: 'انتخاب مسئولانه',
    text: 'تا جای ممکن از مواد اولیه‌ی پایدار و بسته‌بندی قابل بازیافت استفاده می‌کنیم.',
  },
  {
    icon: HeartHandshake,
    title: 'مشاوره‌ی واقعی',
    text: 'رایحه‌شناسی برای ما یک گفت‌وگوست، نه یک فروش سریع.',
  },
]

const TIMELINE = [
  { year: '۱۳۸۵', title: 'شروع در یک کارگاه کوچک', text: 'AURA با سه رایحه و یک آزمایشگاه خانگی آغاز شد.' },
  { year: '۱۳۹۴', title: 'نخستین کالکشن آبی', text: 'کالکشن دریایی AURA با الهام از سواحل جنوبی ایران ساخته شد.' },
  { year: '۱۴۰۰', title: 'کالکشن عود و چوب', text: 'رایحه‌های شرقی و چوبی به کالکشن افزوده شد.' },
  { year: '۱۴۰۳', title: 'فروشگاه آنلاین AURA', text: 'تجربه‌ی خرید آنلاین با مشاوره‌ی رایحه‌شناسی راه‌اندازی شد.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="درباره ما"
        title="داستان AURA"
        subtitle={BRAND.about}
        image={IMG.oceanDusk}
        breadcrumb={[{ label: 'درباره ما' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SafeImage
              src={IMG.pouring}
              alt="عطر AURA در حال استفاده"
              wrapperClassName="aspect-[4/5] w-full rounded-[26px] shadow-soft"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-4 flex items-center gap-3 text-turquoise-dark">
              <span className="h-px w-8 bg-turquoise-dark" />
              فلسفه‌ی ما
            </p>
            <h2 className="text-[26px] font-semibold leading-[1.35] text-ink sm:text-[34px]">
              عطر، خاطره‌ای است که با خود حمل می‌کنی
            </h2>
            <p className="mt-6 text-[14px] leading-8 text-ink-muted">
              ما باور داریم یک رایحه‌ی درست، بیشتر از یک بو است؛ یک نشانه است. نشانه‌ای که یک روز
              خاص، یک آدم یا یک شهر را در ذهن زنده می‌کند. به همین دلیل هر کالکشن AURA را حول یک
              خاطره می‌سازیم.
            </p>
            <p className="mt-4 text-[14px] leading-8 text-ink-muted">
              از طراوت شور دریا تا گرمای عود در یک شب زمستانی، هدف ما ساختن رایحه‌هایی است که هم
              امروزی باشند و هم سال‌ها بعد هنوز دوست‌داشتنی.
            </p>
            <Button variant="primary" size="lg" to="/shop" className="mt-8">
              مشاهده‌ی کالکشن
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory-deep py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-[24px] font-semibold text-ink sm:text-[30px]">چهار اصل AURA</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 70}
                className="rounded-[22px] border border-ivory-line bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ocean">
                  <value.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[14px] font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-[12px] leading-7 text-ink-muted">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-[24px] font-semibold text-ink sm:text-[30px]">مسیر AURA</h2>
          <ol className="mt-10 space-y-6 border-s border-ivory-line ps-6">
            {TIMELINE.map((item, index) => (
              <Reveal as="li" key={item.year} delay={index * 70} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -start-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-turquoise"
                />
                <p className="tnum text-[12px] text-turquoise-dark">{item.year}</p>
                <h3 className="mt-2 text-[15px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 max-w-xl text-[12.5px] leading-7 text-ink-muted">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

import BlueprintDecor from '../components/BlueprintDecor'
import Button from '../components/Button'
import CtaBand from '../components/CtaBand'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import StatisticsSection from '../components/StatisticsSection'
import { photo } from '../data/images'
import { brand } from '../data/site'

const values = [
  {
    key: 'design',
    icon: 'compass',
    title: 'طراحی با نگاه بلندمدت',
    text: 'هر طرح را با این پرسش آغاز می‌کنیم که ده سال بعد چگونه دیده می‌شود.',
  },
  {
    key: 'craft',
    icon: 'ruler',
    title: 'دقت در جزئیات اجرا',
    text: 'کیفیت در جزئیاتی است که دیده نمی‌شوند؛ از آرماتوربندی تا درزگیری نما.',
  },
  {
    key: 'trust',
    icon: 'handshake',
    title: 'شفافیت در گفت‌وگو',
    text: 'برنامه زمان‌بندی، هزینه و تغییرات را روشن و بدون ابهام پیش می‌بریم.',
  },
]

const steps = [
  {
    number: '۰۱',
    title: 'گفت‌وگو و نیازسنجی',
    text: 'بررسی زمین، بودجه، سبک زندگی و اهداف کارفرما در نخستین جلسه.',
  },
  {
    number: '۰۲',
    title: 'طراحی و برآورد',
    text: 'ارائه طرح اولیه، رندر سه‌بعدی و برآورد دقیق هزینه و زمان.',
  },
  {
    number: '۰۳',
    title: 'اجرا و نظارت',
    text: 'اجرای مرحله‌ای پروژه با گزارش‌های منظم و کنترل کیفیت روزانه.',
  },
  {
    number: '۰۴',
    title: 'تحویل و پشتیبانی',
    text: 'تحویل نهایی همراه با مستندات فنی و پشتیبانی پس از بهره‌برداری.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="درباره آرکا سازه"
        title="معماری ماندگار، ساخت آینده"
        description="آرکا سازه یک شرکت ایرانی فعال در حوزه معماری، ساخت‌وساز و توسعه املاک است که از سال ۱۳۸۹ در تهران، ارومیه و استان‌های شمالی کشور پروژه اجرا می‌کند."
        image={photo('1518005020951-eccb494ad742', 2000)}
        breadcrumbs={[{ label: 'خانه', to: '/' }, { label: 'درباره ما' }]}
      />

      {/* روایت شرکت */}
      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="shell relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="روایت ما"
              title="از یک دفتر کوچک تا پروژه‌های شهری"
              description=""
            />
            <div className="mt-7 space-y-6 text-[1.02rem] leading-9 text-charcoal-muted">
              <p>
                کار ما با بازسازی چند خانه قدیمی در ارومیه آغاز شد؛ جایی که یاد گرفتیم کیفیت
                ساخت، پیش از هر چیز به دقت در تصمیم‌های کوچک بستگی دارد. همان تجربه، مسیر رشد ما
                به پروژه‌های مسکونی، اداری و تجاری در شهرهای مختلف کشور را ساخت.
              </p>
              <p>
                امروز تیمی از معماران، مهندسان سازه و مجریان باسابقه در آرکا سازه کنار هم کار
                می‌کنند تا پروژه‌ها با یک زبان مشترک پیش برود: طراحی روشن، اجرای دقیق و گفت‌وگوی
                شفاف با کارفرما.
              </p>
              <p>
                تمرکز ما بر پروژه‌هایی است که سال‌ها بعد نیز به آن‌ها افتخار کنیم؛ نه ساختمان‌هایی
                که سریع‌تر ساخته شوند.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/projects" arrow>
                نمونه پروژه‌ها
              </Button>
              <Button to="/contact" variant="outlineLight">
                تماس با ما
              </Button>
            </div>
          </div>

          <Reveal delay={120} className="lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <img
                src={photo('1580587771525-78b9dba3b914', 900)}
                alt="نمای یک ساختمان لوکس با سنگ‌کاری و استخر در محوطه"
                loading="lazy"
                className="h-64 w-full object-cover sm:h-80"
              />
              <img
                src={photo('1541888946425-d81bb19240f5', 900)}
                alt="کارگاه ساختمانی در مرحله آرماتوربندی فونداسیون"
                loading="lazy"
                className="h-64 w-full object-cover sm:mt-10 sm:h-80"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="relative bg-ivory-light py-20 lg:py-24">
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="اصول کاری"
            title="سه اصلی که در همه پروژه‌ها یکسان است"
            align="center"
          />

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal
                key={value.key}
                delay={index * 90}
                className="border border-ink/10 bg-cream p-8 text-center"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon name={value.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-lg">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal-muted">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatisticsSection />

      {/* مسیر همکاری */}
      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="فرایند کار"
            title="مسیر همکاری با آرکا سازه"
            description="چهار گام روشن که در همه پروژه‌ها، از کوچک تا بزرگ، تکرار می‌شود."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 80}
                className="border-t border-ink/15 pt-7"
              >
                <span className="num font-serif text-3xl text-gold">{step.number}</span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal-muted">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={`آرکا سازه — از ${brand.established}`}
        title="درباره پروژه خود با ما گفت‌وگو کنید"
        description="یک جلسه مشاوره کافی است تا مسیر، زمان و هزینه پروژه شما روشن شود."
      />
    </>
  )
}

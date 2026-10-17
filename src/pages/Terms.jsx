import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { TERMS_SECTIONS } from '../data/content'
import { IMG } from '../data/products'

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="قوانین"
        title="قوانین و شرایط"
        subtitle="پیش از ثبت سفارش، لطفاً شرایط خرید، ارسال و بازگشت کالا را مطالعه کنید."
        image={IMG.oceanRocks}
        breadcrumb={[{ label: 'قوانین و شرایط' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <nav aria-label="فهرست قوانین" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4 text-ink-muted">فهرست</p>
            <ul className="space-y-2 border-s border-ivory-line ps-4">
              {TERMS_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-[12.5px] text-ink-muted transition hover:text-turquoise-dark"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            {TERMS_SECTIONS.map((section, index) => (
              <Reveal
                key={section.id}
                delay={index * 60}
                className="scroll-mt-28 rounded-[22px] border border-ivory-line bg-white p-6 sm:p-8"
              >
                <h2 id={section.id} className="scroll-mt-28 text-[18px] font-semibold text-ink">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-[13px] leading-8 text-ink-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal className="rounded-[22px] border border-champagne-deep/40 bg-champagne-pale p-6 text-[12.5px] leading-7 text-ink sm:p-8">
              این متن‌ها نمونه‌اند و به‌عنوان سند حقوقی نهایی تلقی نمی‌شوند. پیش از راه‌اندازی رسمی،
              شرایط باید با مشاور حقوقی کسب‌وکار بازبینی شود.
            </Reveal>

            <p className="text-[12.5px] text-ink-muted">
              پرسش دیگری دارید؟{' '}
              <Link to="/contact" className="link-underline text-ocean">
                با ما تماس بگیرید
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

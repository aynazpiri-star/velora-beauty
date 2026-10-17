import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { FAQ_ITEMS } from '../data/content'
import { IMG } from '../data/products'
import { classNames } from '../lib/classNames'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero
        eyebrow="پشتیبانی"
        title="پرسش‌های متداول"
        subtitle="پاسخ پرتکرارترین پرسش‌ها درباره‌ی خرید، ارسال، اصالت کالا و ست‌های تست."
        image={IMG.seaTexture}
        breadcrumb={[{ label: 'پرسش‌های متداول' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = open === index
              return (
                <Reveal
                  key={item.q}
                  delay={index * 40}
                  className="overflow-hidden rounded-[22px] border border-ivory-line bg-white"
                >
                  <h2>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                    >
                      <span className="text-[14px] font-medium text-ink">{item.q}</span>
                      <span
                        className={classNames(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                          isOpen
                            ? 'border-turquoise bg-turquoise text-white'
                            : 'border-ink/15 text-ink',
                        )}
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </h2>
                  <div
                    className={classNames(
                      'grid transition-all duration-500 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <p className="overflow-hidden px-6 text-[12.5px] leading-8 text-ink-muted">
                      <span className="block pb-6">{item.a}</span>
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[22px] border border-ivory-line bg-white p-6">
              <h2 className="text-[15px] font-semibold text-ink">پاسخ خود را پیدا نکردی؟</h2>
              <p className="mt-3 text-[12.5px] leading-7 text-ink-muted">
                تیم پشتیبانی AURA در ساعات کاری آماده‌ی پاسخ‌گویی است. همچنین می‌توانید قوانین کامل
                خرید را مطالعه کنید.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="primary" to="/contact">
                  تماس با ما
                </Button>
                <Button variant="outline" to="/terms">
                  قوانین و شرایط
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

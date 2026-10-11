import ConsultationCTA from './ConsultationCTA'
import ContactForm from './ContactForm'
import Reveal from './Reveal'

/** بخش تماس و مشاوره: فراخوان همکاری در یک ستون و فرم در ستون دیگر. */
export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-ivory py-20 lg:py-28">
      <div className="shell relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ConsultationCTA />
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="border border-ink/10 bg-ivory-light p-6 shadow-soft sm:p-9">
              <h3 className="text-xl">فرم درخواست مشاوره</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal-muted">
                فرم زیر را تکمیل کنید؛ کارشناسان ما برای بررسی اولیه و تعیین جلسه با شما تماس
                می‌گیرند.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

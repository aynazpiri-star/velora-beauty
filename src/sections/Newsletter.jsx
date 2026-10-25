import { useState } from 'react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    const value = email.trim()
    if (!value) {
      setError('لطفاً ایمیل خود را وارد کنید.')
      return
    }
    if (!emailPattern.test(value)) {
      setError('ایمیل وارد‌شده معتبر نیست.')
      return
    }
    setError('')
    setDone(true)
    setEmail('')
  }

  return (
    <section className="overflow-hidden bg-[linear-gradient(105deg,#F6E9DC_0%,#EFE0D0_48%,#E7D5C2_100%)]">
      <div className="container-site grid items-center gap-8 py-12 sm:grid-cols-[1.25fr_0.75fr] lg:py-14">
        <div>
          <h2 className="text-[22px] font-light leading-[1.45] text-ink sm:text-[26px] lg:text-[30px]">
            از پیشنهادهای ویژه باخبر شوید
          </h2>
          <p className="mt-3 max-w-lg text-[12px] leading-7 text-[#6B5B4C] sm:text-[12.5px]">
            عضو خبرنامه شوید تا پیش از همه از مجموعه‌های تازه، پیشنهادهای ویژه و داستان‌های
            AURELIA باخبر شوید.
          </p>

          {done ? (
            <p
              role="status"
              className="mt-6 inline-flex items-center gap-2 border border-gold/40 bg-white/60 px-4 py-3 text-[11.5px] text-ink"
            >
              عضویت شما ثبت شد؛ به‌زودی از ما خبر می‌گیرید.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 max-w-md">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (error) setError('')
                  }}
                  placeholder="ایمیل خود را وارد کنید"
                  aria-label="ایمیل"
                  aria-invalid={Boolean(error)}
                  className="h-11 flex-1 border border-[#D8C3AC] bg-white/80 px-4 text-[12px] text-ink outline-none transition-colors placeholder:text-muted/80 focus:border-gold"
                />
                <button type="submit" className="btn-gold h-11 shrink-0">
                  عضویت
                </button>
              </div>
              {error && (
                <p role="alert" className="mt-2 text-[10.5px] text-[#9B4A34]">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>

        <div className="relative hidden justify-center sm:flex">
          <img
            src="/images/news-gift.jpg"
            alt="جعبه هدیه AURELIA"
            loading="lazy"
            className="h-[190px] w-full max-w-[300px] object-cover object-center lg:h-[210px]"
          />
        </div>
      </div>
    </section>
  )
}

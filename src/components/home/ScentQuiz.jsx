import { useMemo, useState } from 'react'
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QUIZ_QUESTIONS, recommend } from '../../data/content'
import { FAMILY_LABELS, products } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { classNames } from '../../lib/classNames'
import { toFaDigits, toFaNumber } from '../../lib/format'
import SafeImage from '../ui/SafeImage'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import WishlistButton from '../product/WishlistButton'

/** Interactive three-step scent finder. Results come only from the catalogue. */
export default function ScentQuiz() {
  const { addToCart } = useStore()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const question = QUIZ_QUESTIONS[step]
  const finished = step >= QUIZ_QUESTIONS.length
  const results = useMemo(() => (finished ? recommend(answers, products, 3) : []), [finished, answers])

  const answer = (value) => {
    setAnswers((current) => ({ ...current, [question.id]: value }))
    setStep((current) => current + 1)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
  }

  const progress = Math.round((Math.min(step, QUIZ_QUESTIONS.length) / QUIZ_QUESTIONS.length) * 100)

  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="رایحه‌شناسی"
          title="کدام رایحه به تو نزدیک‌تر است؟"
          subtitle="به سه پرسش کوتاه پاسخ بده تا از میان کالکشن AURA، رایحه‌های مناسب سلیقه‌ات را پیشنهاد کنیم."
          align="center"
        />

        <Reveal delay={80} className="mx-auto mt-10 w-full max-w-3xl">
          <div className="overflow-hidden rounded-[26px] border border-ivory-line bg-white shadow-soft">
            {/* Progress */}
            <div className="flex items-center gap-4 border-b border-ivory-line px-6 py-4">
              <span className="tnum text-[11.5px] text-ink-muted">
                {finished
                  ? 'نتیجه'
                  : `پرسش ${toFaDigits(step + 1)} از ${toFaDigits(QUIZ_QUESTIONS.length)}`}
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-ivory-line">
                <span
                  className="block h-full rounded-full bg-gradient-to-l from-turquoise to-ocean transition-all duration-500"
                  style={{ width: `${finished ? 100 : progress}%` }}
                />
              </span>
              {step > 0 && (
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted transition hover:text-ink"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  شروع دوباره
                </button>
              )}
            </div>

            {!finished ? (
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <h3 className="text-[18px] font-semibold leading-8 text-ink sm:text-[21px]">
                  {question.question}
                </h3>

                <div
                  className={classNames(
                    'mt-7 grid gap-3',
                    question.options.length > 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2',
                  )}
                >
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => answer(option.value)}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-ivory-line bg-ivory px-5 py-4 text-start transition-all duration-300 hover:-translate-y-0.5 hover:border-turquoise hover:bg-white hover:shadow-soft"
                    >
                      <span>
                        <span className="block text-[13.5px] font-medium text-ink">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-[11.5px] text-ink-muted">{option.hint}</span>
                      </span>
                      <ArrowLeft
                        className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-turquoise-dark"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <p className="eyebrow mb-3 flex items-center gap-2 text-turquoise-dark">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  پیشنهاد AURA برای تو
                </p>
                <h3 className="text-[18px] font-semibold leading-8 text-ink sm:text-[21px]">
                  این رایحه‌ها با پاسخ‌هایت هم‌خوان‌اند
                </h3>

                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {results.map((product) => (
                    <li
                      key={product.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-ivory-line bg-ivory"
                    >
                      <div className="relative">
                        <Link to={`/product/${product.slug}`}>
                          <SafeImage
                            src={product.image}
                            alt={product.name}
                            wrapperClassName="aspect-square w-full"
                          />
                        </Link>
                        <span className="absolute end-2 top-2">
                          <WishlistButton
                            productId={product.id}
                            productName={product.name}
                            tone="dark"
                            className="h-8 w-8"
                          />
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <span className="eyebrow text-turquoise-dark">
                          {FAMILY_LABELS[product.family]}
                        </span>
                        <span className="mt-2 text-[13.5px] font-semibold text-ink">
                          {product.name}
                        </span>
                        <span className="mt-1 line-clamp-2 text-[11.5px] leading-5 text-ink-muted">
                          {product.tagline}
                        </span>
                        <span className="tnum mt-4 text-[13px] font-semibold text-ocean">
                          {toFaNumber(product.price)} تومان
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(product.id)}
                          className="mt-3 rounded-full bg-ink px-4 py-2.5 text-[11.5px] text-white transition hover:bg-turquoise"
                        >
                          افزودن به سبد خرید
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[12px] text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    شروع دوباره‌ی آزمون
                  </button>
                  <Link
                    to="/shop"
                    className="link-underline text-[12.5px] text-ocean"
                  >
                    مشاهده‌ی کل کالکشن
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

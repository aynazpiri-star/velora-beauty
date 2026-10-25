import { Link } from 'react-router-dom'
import { IconArrowLeft } from '../components/Icons'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.62fr)]">
        <div className="order-2 flex items-center bg-ivory px-6 py-12 sm:px-10 lg:order-1 lg:px-10 lg:py-10 xl:px-14">
          <div className="mx-auto max-w-[430px] text-center lg:mx-0 lg:text-right">
            <p className="eyebrow animate-fade-up">ظرافت، ماندگار است</p>
            <h1 className="animate-fade-up mt-5 text-[30px] font-light leading-[1.45] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[38px] xl:text-[42px] [animation-delay:80ms]">
              جواهری که داستان شما را روایت می‌کند
            </h1>
            <p className="animate-fade-up mt-5 text-[12.5px] leading-8 text-muted sm:text-[13px] [animation-delay:160ms]">
              طراحی‌های ماندگار برای ارزشمندترین لحظات شما
            </p>
            <Link
              to="/shop"
              className="group btn-gold animate-fade-up mt-8 [animation-delay:240ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-goldDeep focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              مشاهده مجموعه
              <IconArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="relative order-1 aspect-[1140/625] lg:order-2">
          <img
            src="/images/hero-model-aurelia.jpg"
            alt="مدل زن با گوشواره و انگشترهای جواهر AURELIA"
            width={1140}
            height={625}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}

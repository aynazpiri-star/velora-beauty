import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="grid lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
        <div className="order-2 flex items-center bg-ivory px-6 py-14 sm:px-10 lg:order-1 lg:min-h-[540px] lg:px-12 lg:py-20 xl:px-16">
          <div className="mx-auto max-w-[420px] text-center lg:mx-0 lg:text-right">
            <p className="eyebrow animate-fade-up">ظرافت، ماندگار است</p>
            <h1 className="animate-fade-up mt-5 text-[30px] font-light leading-[1.45] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[42px] [animation-delay:80ms]">
              جواهری که داستان شما را روایت می‌کند
            </h1>
            <p className="animate-fade-up mt-5 text-[12.5px] leading-8 text-muted sm:text-[13px] [animation-delay:160ms]">
              طراحی‌های ماندگار برای ارزشمندترین لحظات شما
            </p>
            <Link
              to="/shop"
              className="btn-gold animate-fade-up mt-8 [animation-delay:240ms]"
            >
              مشاهده مجموعه
            </Link>
          </div>
        </div>

        <div className="relative order-1 min-h-[330px] sm:min-h-[440px] lg:order-2 lg:min-h-[540px]">
          <img
            src="/images/hero-model.jpg"
            alt="مدل زن با جواهرات ظریف AURELIA"
            className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[center_30%]"
          />
          <p className="script-word pointer-events-none absolute bottom-8 start-7 max-w-[190px] text-right text-[19px] leading-8 text-[#8A7561]/90 drop-shadow-[0_1px_6px_rgba(255,255,255,0.45)] sm:text-[21px]">
            بیش از یک جواهر،
            <br />
            یک حس ♡
          </p>
        </div>
      </div>
    </section>
  )
}

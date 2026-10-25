import { Link } from 'react-router-dom'

function BrandSeal() {
  return (
    <svg viewBox="0 0 140 140" className="h-[122px] w-[122px] text-[#8E7A64]" aria-hidden="true">
      <defs>
        <path
          id="seal-top"
          d="M70,70 m-52,0 a52,52 0 1,1 104,0"
          fill="none"
        />
        <path
          id="seal-bottom"
          d="M70,70 m-52,0 a52,52 0 0,0 104,0"
          fill="none"
        />
      </defs>
      <circle cx="70" cy="70" r="61" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="70" cy="70" r="56" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <text
        fill="currentColor"
        fontSize="7.4"
        letterSpacing="3.1"
        fontFamily="Jost, sans-serif"
      >
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
          FINE JEWELRY
        </textPath>
      </text>
      <text fill="currentColor" fontSize="8" fontFamily="Vazirmatn, sans-serif">
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
          دست‌ساز با عشق
        </textPath>
      </text>
      <text
        x="70"
        y="74"
        textAnchor="middle"
        fill="currentColor"
        fontSize="13"
        letterSpacing="2.6"
        fontFamily="Jost, sans-serif"
      >
        AURELIA
      </text>
      <text
        x="70"
        y="86"
        textAnchor="middle"
        fill="currentColor"
        fontSize="5.6"
        letterSpacing="1.6"
        fontFamily="Vazirmatn, sans-serif"
      >
        دست‌ساز
      </text>
    </svg>
  )
}

export default function Story() {
  return (
    <section className="overflow-hidden bg-ivory py-16 lg:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-5 lg:pe-6">
          <p className="eyebrow">داستان ما</p>
          <h2 className="heading-lg mt-4">میراثی از ظرافت و هنر دست</h2>
          <p className="mt-5 max-w-md text-[12.5px] leading-8 text-muted">
            در AURELIA باور داریم جواهر تنها یک قطعه نیست؛ یادگاری از یک لحظه است. هر طراحی با
            دقت و حوصله شکل می‌گیرد تا سال‌ها همراه شما بماند و ارزش واقعی خود را حفظ کند. به
            ظرافت جزئیات، انتخاب سنگ‌ها و راحتی استفاده در هر روز توجه می‌کنیم.
          </p>
          <Link to="/about" className="btn-outline mt-7">
            درباره ما
          </Link>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-4">
          <div className="mx-auto aspect-[214/196] w-full max-w-[380px] overflow-hidden rounded-t-full bg-cream lg:max-w-none">
            <img
              src="/images/story-craft.jpg"
              alt="دست‌های هنرمند در حال ساخت جواهر"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="order-3 flex flex-col items-center gap-3 lg:col-span-3">
          <BrandSeal />
          <p className="script-word text-[15px] leading-7 text-gold text-center">
            با عشق ساخته شده ♡
          </p>
        </div>
      </div>
    </section>
  )
}

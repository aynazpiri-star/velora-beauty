import { IconDiamond, IconGift, IconRefresh, IconTruck } from '../components/Icons'

const items = [
  { Icon: IconDiamond, title: 'کیفیت ممتاز', text: 'ساخته‌شده با دقت' },
  { Icon: IconTruck, title: 'ارسال رایگان', text: 'برای سفارش‌های واجد شرایط' },
  { Icon: IconGift, title: 'بسته‌بندی لوکس', text: 'برای هر سفارش' },
  { Icon: IconRefresh, title: 'بازگشت آسان', text: 'خریدی آسوده' },
]

export default function Benefits() {
  return (
    <section className="border-y border-line/70 bg-cream/70">
      <div className="container-site grid grid-cols-2 gap-y-5 py-6 sm:grid-cols-4 sm:gap-y-0 sm:[&>*+*]:border-s sm:[&>*+*]:border-line/70">
        {items.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="flex items-center justify-center gap-3 px-2 sm:px-5"
          >
            <Icon size={24} className="shrink-0 text-gold" />
            <div className="text-right">
              <p className="text-[12px] font-medium text-ink">{title}</p>
              <p className="mt-0.5 text-[10px] text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

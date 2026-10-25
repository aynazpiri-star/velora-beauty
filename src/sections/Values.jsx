import { IconLeaf, IconShield, IconSparkle, IconUsers } from '../components/Icons'

const values = [
  { Icon: IconLeaf, title: 'تأمین اخلاق‌مدار', text: 'با توجه به منشأ مواد اولیه' },
  { Icon: IconShield, title: 'کیفیت تضمین‌شده', text: 'توجه به اصالت و کیفیت' },
  { Icon: IconSparkle, title: 'تولید مسئولانه', text: 'نگاهی به آینده' },
  { Icon: IconUsers, title: 'اعتماد مشتریان', text: 'همراهی مشتریان ما' },
]

export default function Values() {
  return (
    <section className="border-y border-line/60 bg-ivory">
      <div className="container-site grid grid-cols-2 gap-y-6 py-9 sm:grid-cols-4 sm:gap-y-0 sm:[&>*+*]:border-s sm:[&>*+*]:border-line/60">
        {values.map(({ Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center gap-2.5 px-3 text-center">
            <Icon size={26} className="text-gold/90" />
            <p className="text-[11.5px] font-medium text-ink">{title}</p>
            <p className="text-[10px] leading-5 text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

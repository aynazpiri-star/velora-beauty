import { Link } from 'react-router-dom'
import { Heart, Package, User } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../context/StoreContext'
import { IMG } from '../data/products'
import { toFaDigits, toFaNumber } from '../lib/format'

/**
 * There is no authentication backend in this project, so the account area is
 * intentionally an honest, local-only summary of this browser's activity.
 */
export default function Account() {
  const { wishlist, lastOrder } = useStore()

  return (
    <>
      <PageHero
        eyebrow="حساب کاربری"
        title="حساب من"
        subtitle="این بخش خلاصه‌ای از فعالیت شما در همین مرورگر است."
        image={IMG.boutique}
        breadcrumb={[{ label: 'حساب کاربری' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <Reveal className="rounded-[22px] border border-ivory-line bg-white p-6 lg:col-span-2">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory text-ocean">
                <User className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-[16px] font-semibold text-ink">ورود به حساب کاربری</h2>
                <p className="mt-3 max-w-xl text-[12.5px] leading-7 text-ink-muted">
                  در این نسخه سامانه‌ی ثبت‌نام و ورود متصل نشده است. پس از راه‌اندازی، می‌توانید
                  سفارش‌ها، علاقه‌مندی‌ها و اطلاعات ارسال خود را در همین صفحه مدیریت کنید.
                </p>
                <Button variant="outline" size="sm" className="mt-5" to="/contact">
                  تماس با پشتیبانی
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-[22px] border border-ivory-line bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ocean">
              <Heart className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="tnum mt-5 text-[24px] font-semibold text-ink">
              {toFaDigits(wishlist.length)}
            </p>
            <p className="mt-1 text-[12px] text-ink-muted">رایحه در فهرست علاقه‌مندی‌ها</p>
            <Link to="/wishlist" className="link-underline mt-4 inline-block text-[12px] text-ocean">
              مشاهده‌ی فهرست
            </Link>
          </Reveal>

          <Reveal delay={160} className="rounded-[22px] border border-ivory-line bg-white p-6 lg:col-span-3">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory text-ocean">
                <Package className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-semibold text-ink">آخرین درخواست سفارش</h2>

                {lastOrder ? (
                  <dl className="mt-5 grid gap-4 text-[12.5px] sm:grid-cols-3">
                    <div>
                      <dt className="text-ink-muted">شماره پیگیری</dt>
                      <dd className="tnum mt-1 text-ink" dir="ltr">
                        {lastOrder.id}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">مبلغ</dt>
                      <dd className="tnum mt-1 text-ink">{toFaNumber(lastOrder.total)} تومان</dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">گیرنده</dt>
                      <dd className="mt-1 text-ink">{lastOrder.customer.name}</dd>
                    </div>
                  </dl>
                ) : (
                  <p className="mt-3 max-w-xl text-[12.5px] leading-7 text-ink-muted">
                    هنوز سفارشی ثبت نکرده‌اید. پس از ثبت اولین درخواست سفارش، خلاصه‌ی آن در همین
                    بخش نمایش داده می‌شود.
                  </p>
                )}

                {!lastOrder && (
                  <Button variant="primary" size="sm" className="mt-5" to="/shop">
                    شروع خرید
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

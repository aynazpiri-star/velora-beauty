import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[62vh] flex-col items-center justify-center py-16 text-center">
      <p className="eyebrow text-gold-deep">۴۰۴</p>
      <h1 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-normal text-ink">
        صفحه‌ای که دنبالش بودید پیدا نشد
      </h1>
      <p className="mt-4 max-w-md text-[12.5px] leading-7 text-muted">
        شاید نشانی تغییر کرده باشد. از مجموعه‌های ولورا شروع کنید.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-wine">
          بازگشت به خانه
        </Link>
        <Link href="/shop" className="btn-ghost-dark">
          مشاهده محصولات
        </Link>
      </div>
    </div>
  );
}

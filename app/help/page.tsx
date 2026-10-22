import Link from "next/link";
import { brand, contactInfo } from "@/lib/content";

const sections = [
  { id: "about", title: "داستان ولورا" },
  { id: "orders", title: "پیگیری سفارش" },
  { id: "size", title: "راهنمای سایز" },
  { id: "shipping", title: "ارسال و تحویل" },
  { id: "returns", title: "بازگشت و تعویض" },
  { id: "faq", title: "سؤالات متداول" },
  { id: "contact", title: "تماس با ما" },
  { id: "privacy", title: "حریم خصوصی" },
];

const sizeRows = [
  { size: "S", bust: "۸۴ – ۸۸", waist: "۶۶ – ۷۰", hip: "۹۰ – ۹۴" },
  { size: "M", bust: "۸۸ – ۹۲", waist: "۷۰ – ۷۴", hip: "۹۴ – ۹۸" },
  { size: "L", bust: "۹۲ – ۹۶", waist: "۷۴ – ۷۸", hip: "۹۸ – ۱۰۲" },
  { size: "XL", bust: "۹۶ – ۱۰۲", waist: "۷۸ – ۸۴", hip: "۱۰۲ – ۱۰۸" },
];

const faqs = [
  {
    q: "ارسال سفارش چقدر طول می‌کشد؟",
    a: "سفارش‌های تهران معمولاً ۱ تا ۲ روز کاری و شهرستان‌ها ۳ تا ۵ روز کاری به دست شما می‌رسد. سفارش‌های بالای ۵٬۰۰۰٬۰۰۰ تومان رایگان ارسال می‌شوند.",
  },
  {
    q: "امکان تعویض سایز وجود دارد؟",
    a: "بله. تا ۷ روز پس از دریافت، در صورت نداشتن اثر استفاده و سالم بودن برچسب‌ها، تعویض سایز یا بازگشت کالا انجام می‌شود.",
  },
  {
    q: "پرداخت در محل دارید؟",
    a: "پرداخت آنلاین پس از اتصال درگاه بانکی فعال می‌شود؛ در نسخه‌ی نمایشی، سفارش نهایی ثبت نمی‌شود.",
  },
  {
    q: "بسته‌بندی هدیه امکان‌پذیر است؟",
    a: "بله؛ در توضیحات سفارش بنویسید «بسته‌بندی هدیه» تا سفارش شما با جعبه و روبان ویژه ارسال شود.",
  },
];

export const metadata = { title: "راهنمای خرید و پشتیبانی | ولورا" };

export default function HelpPage() {
  return (
    <div>
      <section className="border-b border-ink/10 bg-cream/35 py-10 md:py-14">
        <div className="shell">
          <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
            <Link href="/" className="transition-colors hover:text-wine">
              خانه
            </Link>
            <span className="mx-2 text-muted/50">/</span>
            <span className="text-ink">راهنما و پشتیبانی</span>
          </nav>
          <h1 className="mt-5 text-[clamp(1.7rem,3.2vw,2.6rem)] font-normal text-ink">
            راهنمای خرید و پشتیبانی
          </h1>
          <p className="mt-3 max-w-2xl text-[12.5px] leading-7 text-muted">
            هر آنچه برای خرید مطمئن، انتخاب سایز و پیگیری سفارش لازم دارید.
          </p>
        </div>
      </section>

      <div className="shell grid gap-10 py-10 md:py-14 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="فهرست راهنما" className="lg:sticky lg:top-32 lg:self-start">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] lg:flex-col lg:gap-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-ink/70 transition-colors hover:text-wine">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-2xl space-y-14 text-[13px] leading-8 text-ink/75">
          <section id="about" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">داستان ولورا</h2>
            <p className="mt-4">
              {brand.description} هر قطعه در آتلیه‌ی ما با پارچه‌های انتخاب‌شده و دوخت محدود
              تولید می‌شود تا استایلی داشته باشید که کمتر تکرار می‌شود.
            </p>
          </section>

          <section id="orders" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">پیگیری سفارش</h2>
            <p className="mt-4">
              پس از ثبت سفارش، کد رهگیری از طریق پیامک برای شما ارسال می‌شود. برای پیگیری
              تلفنی با شماره‌ی <span dir="ltr">{contactInfo.phone}</span> در ساعات{" "}
              {contactInfo.hours} تماس بگیرید.
            </p>
          </section>

          <section id="size" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">راهنمای سایز</h2>
            <p className="mt-4">اندازه‌ها به سانتی‌متر و دور بدن است؛ در صورت تردید یک سایز بالاتر انتخاب کنید.</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-[12px]">
                <thead>
                  <tr className="bg-cream/60 text-ink">
                    <th className="border border-ink/10 px-3 py-2.5 text-start font-normal">سایز</th>
                    <th className="border border-ink/10 px-3 py-2.5 text-start font-normal">دور سینه</th>
                    <th className="border border-ink/10 px-3 py-2.5 text-start font-normal">دور کمر</th>
                    <th className="border border-ink/10 px-3 py-2.5 text-start font-normal">دور باسن</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeRows.map((row) => (
                    <tr key={row.size}>
                      <td className="border border-ink/10 px-3 py-2.5 text-ink">{row.size}</td>
                      <td className="border border-ink/10 px-3 py-2.5">{row.bust}</td>
                      <td className="border border-ink/10 px-3 py-2.5">{row.waist}</td>
                      <td className="border border-ink/10 px-3 py-2.5">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="shipping" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">ارسال و تحویل</h2>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>ارسال رایگان برای سفارش‌های بالای ۵٬۰۰۰٬۰۰۰ تومان.</li>
              <li>تحویل تهران: ۱ تا ۲ روز کاری؛ شهرستان‌ها: ۳ تا ۵ روز کاری.</li>
              <li>ارسال با بسته‌بندی محافظ و جعبه‌ی پارچه‌ای ولورا.</li>
            </ul>
          </section>

          <section id="returns" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">بازگشت و تعویض</h2>
            <p className="mt-4">
              تا ۷ روز پس از دریافت سفارش، در صورت استفاده‌نشدن کالا و سالم بودن برچسب‌ها، امکان
              بازگشت یا تعویض وجود دارد. محصولات سفارشی و اکسسوری‌های بهداشتی مانند عطر قابل
              بازگشت نیستند.
            </p>
          </section>

          <section id="faq" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">سؤالات متداول</h2>
            <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[12.5px] text-ink marker:content-['']">
                    {faq.q}
                    <span className="text-gold-deep transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[12px] leading-7 text-ink/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="contact" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">تماس با ما</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                تلفن: <span dir="ltr">{contactInfo.phone}</span>
              </li>
              <li>
                ایمیل: <span dir="ltr">{contactInfo.email}</span>
              </li>
              <li>نشانی: {contactInfo.address}</li>
              <li>ساعات پاسخ‌گویی: {contactInfo.hours}</li>
            </ul>
          </section>

          <section id="privacy" className="scroll-mt-32">
            <h2 className="text-[17px] text-ink">حریم خصوصی</h2>
            <p className="mt-4">
              اطلاعات شما فقط برای پردازش سفارش و اطلاع‌رسانی‌های انتخابی استفاده می‌شود و در
              اختیار شخص ثالث قرار نمی‌گیرد. برای حذف اطلاعات خود با ما تماس بگیرید.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

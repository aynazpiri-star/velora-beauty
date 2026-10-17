/** Slim announcement strip that sits directly under the hero. */
export default function AnnouncementBar() {
  const messages = [
    'ارسال رایگان برای سفارش‌های بالای ۳ میلیون تومان',
    'نمونه رایحه هدیه با هر سفارش',
  ]

  return (
    <section aria-label="اطلاعیه فروشگاه" className="bg-ink text-white">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3.5 text-center">
        {messages.map((message, index) => (
          <p key={message} className="flex items-center gap-6">
            {index > 0 && (
              <span aria-hidden="true" className="hidden text-champagne/70 sm:inline">
                ✦
              </span>
            )}
            <span className="text-[11.5px] tracking-wide2 text-white/85 sm:text-[12px]">
              {message}
            </span>
          </p>
        ))}
      </div>
    </section>
  )
}

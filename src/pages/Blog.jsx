import { Link } from 'react-router-dom'

const posts = [
  {
    title: 'چگونه جواهر مناسب خود را انتخاب کنیم؟',
    excerpt:
      'راهنمای کوتاهی درباره انتخاب اندازه، جنس و سبک قطعه‌ای که سال‌ها همراه شما می‌ماند.',
    image: '/images/insta-1.jpg',
  },
  {
    title: 'نگهداری از جواهرات طلا در خانه',
    excerpt:
      'چند نکته ساده برای حفظ درخشش و سلامت قطعه‌های طلا در استفاده روزمره.',
    image: '/images/insta-4.jpg',
  },
  {
    title: 'انتخاب هدیه برای مناسبت‌های خاص',
    excerpt:
      'از حلقه‌های ظریف تا گردنبندهای ساده؛ پیشنهادهایی برای هدیه‌ای که فراموش نمی‌شود.',
    image: '/images/insta-5.jpg',
  },
]

export default function Blog() {
  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">وبلاگ</span>
      </nav>

      <div className="mt-5 max-w-xl">
        <p className="eyebrow">وبلاگ</p>
        <h1 className="heading-lg mt-3">داستان‌ها و راهنمای جواهرات</h1>
        <p className="mt-3 text-[12px] leading-7 text-muted">
          یادداشت‌هایی کوتاه درباره انتخاب، نگهداری و سبک استفاده از جواهرات. مطالب این صفحه
          نمونه و قابل ویرایش هستند.
        </p>
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="border border-line/80 bg-white">
            <div className="aspect-[104/96] overflow-hidden bg-cream">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-[13px] leading-6 text-ink">{post.title}</h2>
              <p className="mt-2 text-[11.5px] leading-7 text-muted">{post.excerpt}</p>
              <span className="mt-4 inline-block text-[10.5px] text-gold">
                به‌زودی منتشر می‌شود
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

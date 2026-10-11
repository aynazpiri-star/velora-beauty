import { ArrowLeft, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'

/** کارت مقاله مجله: تصویر، تاریخ انتشار، عنوان و خلاصه. */
export default function BlogCard({ post, className = '' }) {
  return (
    <article className={`h-full ${className}`}>
      <Link
        to={`/journal/${post.slug}`}
        className="group flex h-full flex-col border border-ink/10 bg-cream transition-all duration-500 hover:border-gold/50 hover:shadow-lift"
        aria-label={`مطالعه مقاله ${post.title}`}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 text-xs text-charcoal-muted">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span className="num">{post.date}</span>
            </span>
            <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
            <span>{post.category}</span>
          </div>

          <h3 className="mt-5 text-lg leading-8 transition-colors duration-300 group-hover:text-gold-muted">
            {post.title}
          </h3>

          <p className="mt-4 flex-1 text-sm leading-7 text-charcoal-muted">{post.excerpt}</p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
            ادامه مطلب
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  )
}

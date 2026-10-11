import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { getPost, posts } from '../data/posts'
import NotFound from './NotFound'

export default function PostDetail() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <NotFound />

  const others = posts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={post.image}
        breadcrumbs={[
          { label: 'خانه', to: '/' },
          { label: 'مجله معماری', to: '/journal' },
          { label: post.title },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
            <span className="num">{post.date}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
      </PageHero>

      <article className="relative bg-ivory py-20 lg:py-24">
        <div className="shell relative z-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-9 text-ink">{post.excerpt}</p>
            <div className="mt-8 h-px w-24 bg-gold" aria-hidden="true" />

            <div className="mt-10 space-y-8">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[1.02rem] leading-9 text-charcoal-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/journal" className="link-underline text-gold">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                بازگشت به مجله معماری
              </Link>
              <Link to="/consultation" className="link-underline text-ink">
                مشاوره درباره پروژه خودم
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="relative bg-ivory-light py-20 lg:py-24">
        <div className="shell relative z-10">
          <SectionHeading eyebrow="مطالعه بیشتر" title="مقالات دیگر" />

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80}>
                <BlogCard post={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="مجله معماری"
        title="ایده‌ای از این مقالات گرفته‌اید؟"
        description="برای تبدیل آن ایده به طرح و برنامه اجرایی، با کارشناسان ما گفت‌وگو کنید."
      />
    </>
  )
}

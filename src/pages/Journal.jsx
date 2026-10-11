import BlogCard from '../components/BlogCard'
import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { photo } from '../data/images'
import { posts } from '../data/posts'

export default function Journal() {
  return (
    <>
      <PageHero
        eyebrow="مجله معماری"
        title="دانش، ایده‌ها و تجربه‌های اجرایی"
        description="در مجله آرکا سازه درباره طراحی، متریال، فناوری ساختمان و تصمیم‌های مهم پیش از آغاز پروژه می‌نویسیم."
        image={photo('1524230572899-a752b3835840', 2000)}
        breadcrumbs={[{ label: 'خانه', to: '/' }, { label: 'مجله معماری' }]}
      />

      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="shell relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 70}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="گفت‌وگوی تخصصی"
        title="پرسشی درباره پروژه خود دارید؟"
        description="کارشناسان آرکا سازه آماده‌اند تا درباره انتخاب متریال، زمان‌بندی و هزینه پروژه شما راهنمایی کنند."
        primaryLabel="درخواست مشاوره"
      />
    </>
  )
}

import BlogCarousel from './BlogCarousel'
import Button from './Button'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import WaveDivider from './WaveDivider'
import { posts } from '../data/posts'

/** بخش مجله معماری: چهار مقاله در یک ردیف روی دسکتاپ. */
export default function JournalSection() {
  return (
    <section id="journal" className="relative bg-ivory py-20 lg:py-28">
      <WaveDivider position="top" tone="ivory" />

      <div className="shell relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="دانش و ایده‌ها"
            title="از دنیای معماری"
            description="یادداشت‌ها و راهنماهایی برای کارفرمایانی که می‌خواهند پیش از آغاز پروژه، تصمیم درست بگیرند."
          />
          <Reveal delay={200} className="shrink-0">
            <Button to="/journal" variant="outlineLight" arrow>
              همه مقالات
            </Button>
          </Reveal>
        </div>

        <div className="mt-14">
          <BlogCarousel posts={posts} />
        </div>
      </div>
    </section>
  )
}

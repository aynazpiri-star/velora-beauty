import BlogCard from './BlogCard'
import CarouselControls from './CarouselControls'
import useCarousel from '../hooks/useCarousel'
import useMediaQuery from '../hooks/useMediaQuery'

/**
 * کاروسل مجله: چهار مقاله در هر نما روی دسکتاپ، دو مقاله روی تبلت
 * و یک مقاله روی موبایل.
 */
export default function BlogCarousel({ posts }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 640px)')
  const perPage = isDesktop ? 4 : isTablet ? 2 : 1

  const { page, pageCount, next, prev, goTo } = useCarousel(posts.length, perPage)

  return (
    <div>
      <div className="-mx-2.5 overflow-hidden sm:-mx-3">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(${page * 100}%)` }}
        >
          {posts.map((post) => (
            <div
              key={post.slug}
              className="shrink-0 px-2.5 sm:px-3"
              style={{ flexBasis: `${100 / perPage}%` }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <CarouselControls
          page={page}
          pageCount={pageCount}
          onPrev={prev}
          onNext={next}
          onGoTo={goTo}
          label="مقالات مجله"
        />
      </div>
    </div>
  )
}

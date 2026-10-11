import CarouselControls from './CarouselControls'
import ProjectCard from './ProjectCard'
import useCarousel from '../hooks/useCarousel'
import useMediaQuery from '../hooks/useMediaQuery'

/**
 * کاروسل پروژه‌ها: سه کارت در هر نما روی دسکتاپ، دو کارت روی تبلت و
 * یک کارت روی موبایل. جهت حرکت با چیدمان راست‌به‌چپ هماهنگ است.
 */
export default function ProjectCarousel({ projects }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 640px)')
  const perPage = isDesktop ? 3 : isTablet ? 2 : 1

  const { page, pageCount, next, prev, goTo } = useCarousel(projects.length, perPage)

  return (
    <div>
      <div className="-mx-2.5 overflow-hidden sm:-mx-3">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(${page * 100}%)` }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="shrink-0 px-2.5 sm:px-3"
              style={{ flexBasis: `${100 / perPage}%` }}
            >
              <ProjectCard project={project} />
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
          label="پروژه‌های شاخص"
        />
      </div>
    </div>
  )
}

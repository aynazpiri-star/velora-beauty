import { MapPin, Maximize2, PencilRuler } from 'lucide-react'
import { Link } from 'react-router-dom'

/** کارت پروژه: تصویر معماری، عنوان، نوع، موقعیت و متراژ. */
export default function ProjectCard({ project, className = '' }) {
  return (
    <article className={`h-full ${className}`}>
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col border border-ink/10 bg-cream transition-all duration-500 hover:border-gold/50 hover:shadow-lift"
        aria-label={`مشاهده پروژه ${project.title}`}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] w-full">
            <img
              src={project.image}
              alt={`${project.title} — ${project.type} در ${project.location}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
            />
          </div>
          <span className="absolute top-4 start-4 bg-ink/85 px-3 py-1.5 text-[0.68rem] text-gold backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl leading-relaxed transition-colors duration-300 group-hover:text-gold-muted">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-muted">{project.type}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
              <PencilRuler className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/10 pt-5 text-xs text-charcoal-muted">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Maximize2 className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span className="num">{project.area}</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

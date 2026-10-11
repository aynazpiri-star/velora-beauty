import Reveal from './Reveal'

/** سرصفحه مشترک بخش‌ها: برچسب طلایی، عنوان و توضیح. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
  align = 'start',
  className = '',
  as: Tag = 'h2',
}) {
  const isLight = tone === 'light'
  const centered = align === 'center'

  return (
    <div
      className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${centered ? 'eyebrow--center' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <Tag
          className={`mt-5 text-3xl leading-[1.5] sm:text-4xl lg:text-[2.75rem] ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p
            className={`mt-5 text-[1.02rem] leading-8 ${
              isLight ? 'text-white/70' : 'text-charcoal-muted'
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

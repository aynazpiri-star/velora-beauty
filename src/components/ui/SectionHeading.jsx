import { classNames } from '../../lib/format.js';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  className = '',
  tone = 'dark',
}) {
  const alignment =
    align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center';

  return (
    <div className={classNames('flex flex-col', alignment, className)}>
      {eyebrow ? (
        <span className={classNames('eyebrow', tone === 'light' && 'text-cream/80')}>{eyebrow}</span>
      ) : null}
      <Tag
        className={classNames(
          'mt-4 font-serif text-[30px] leading-[1.15] sm:text-[38px] lg:text-[46px]',
          tone === 'light' ? 'text-cream' : 'text-ink',
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={classNames(
            'mt-4 max-w-2xl text-[15px] leading-relaxed',
            tone === 'light' ? 'text-cream/75' : 'text-ink/65',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

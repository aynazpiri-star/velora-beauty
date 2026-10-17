import useScrollReveal from '../../hooks/useScrollReveal'
import { classNames } from '../../lib/classNames'

/** Fades + lifts its children the first time they enter the viewport. */
export default function Reveal({ children, delay = 0, className, as: Tag = 'div' }) {
  const { ref, visible } = useScrollReveal()
  return (
    <Tag
      ref={ref}
      className={classNames('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

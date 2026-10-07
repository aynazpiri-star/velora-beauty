import { classNames } from '../../lib/format.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const { ref, visible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={classNames('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

import { useEffect, useRef, useState } from 'react';

/**
 * Adds a soft reveal-on-scroll transition. Content stays visible when the
 * browser lacks IntersectionObserver or the user prefers reduced motion.
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (
      !('IntersectionObserver' in window) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  });

  useEffect(() => {
    const node = ref.current;
    if (!node || visible || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, visible]);

  return { ref, visible };
}

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { classNames } from '../../lib/format.js';
import { useLockBodyScroll, useOnEscape } from '../../hooks/useOverlay.js';

export default function Modal({
  open,
  onClose,
  title,
  children,
  labelledBy = 'velora-modal-title',
  className = '',
  panelClassName = '',
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useLockBodyScroll(open);
  useOnEscape(open, onClose);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (target ?? closeRef.current)?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={classNames('fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6', className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? labelledBy : undefined}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px] animate-fade-in"
      />
      <div
        ref={panelRef}
        className={classNames(
          'relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl2 border border-ink/10 bg-cream shadow-card animate-fade-up',
          panelClassName,
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <X size={17} />
        </button>
        {title ? (
          <h2 id={labelledBy} className="sr-only">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </div>
  );
}

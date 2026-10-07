import { X } from 'lucide-react';
import FilterSidebar from './FilterSidebar.jsx';
import { useLockBodyScroll, useOnEscape } from '../../hooks/useOverlay.js';

/**
 * Bottom-sheet filter panel used on small screens, where the desktop sidebar
 * is hidden. Shares FilterSidebar so both breakpoints stay in sync.
 */
export default function FilterDrawer({
  open,
  onClose,
  products,
  filters,
  onChange,
  onClear,
  resultCount,
}) {
  useLockBodyScroll(open);
  useOnEscape(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px] animate-fade-in"
      />
      <div className="absolute bottom-0 left-0 max-h-[88vh] w-full overflow-y-auto rounded-t-[1.5rem] bg-cream p-5 animate-fade-up">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10"
          >
            <X size={17} />
          </button>
        </div>

        <FilterSidebar
          products={products}
          filters={filters}
          onChange={onChange}
          onClear={onClear}
          idPrefix="mobile"
        />

        <button type="button" onClick={onClose} className="btn-primary mt-6 w-full">
          Show {resultCount} products
        </button>
      </div>
    </div>
  );
}

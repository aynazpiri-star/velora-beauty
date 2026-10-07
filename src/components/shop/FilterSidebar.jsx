import { Star } from 'lucide-react';
import { CATEGORIES, ALL_TYPES, SKIN_CONCERNS } from '../../data/products.js';
import { classNames } from '../../lib/format.js';

const PRICE_BANDS = [
  { id: 'under25', label: 'Under $25', test: (p) => p.price < 25 },
  { id: '25to35', label: '$25 – $35', test: (p) => p.price >= 25 && p.price <= 35 },
  { id: '35to60', label: '$35 – $60', test: (p) => p.price > 35 && p.price <= 60 },
  { id: 'over60', label: 'Over $60', test: (p) => p.price > 60 },
];

const RATINGS = [
  { id: 4.9, label: '4.9 & up' },
  { id: 4.8, label: '4.8 & up' },
  { id: 4.7, label: '4.7 & up' },
];

function Group({ title, children, id }) {
  return (
    <fieldset className="border-b border-ink/[0.08] py-6 first:pt-0 last:border-0">
      <legend
        id={id}
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70"
      >
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Check({ checked, onChange, label, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[13px] text-ink/75 transition-colors hover:text-burgundy">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded border-ink/30 text-burgundy accent-[#9B4560]"
      />
      <span className="flex-1">{label}</span>
      {count != null ? <span className="text-[11px] text-ink/40">{count}</span> : null}
    </label>
  );
}

export default function FilterSidebar({
  products,
  filters,
  onChange,
  onClear,
  className = '',
  idPrefix = 'filter',
}) {
  const toggle = (key, value) => {
    const current = filters[key];
    onChange({
      ...filters,
      [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    });
  };

  const countBy = (predicate) => products.filter(predicate).length;

  return (
    <aside
      className={classNames('rounded-xl2 border border-ink/[0.07] bg-white p-6 shadow-soft', className)}
      aria-label="Product filters"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] text-ink/50 underline-offset-4 transition-colors hover:text-burgundy hover:underline"
        >
          Clear all
        </button>
      </div>

      <Group title="Category" id={`${idPrefix}-category`}>
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <Check
              key={cat.slug}
              label={cat.name}
              count={countBy((p) => p.category === cat.slug)}
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggle('categories', cat.slug)}
            />
          ))}
        </div>
      </Group>

      <Group title="Price" id={`${idPrefix}-price`}>
        <div className="space-y-0.5">
          {PRICE_BANDS.map((band) => (
            <Check
              key={band.id}
              label={band.label}
              count={countBy(band.test)}
              checked={filters.prices.includes(band.id)}
              onChange={() => toggle('prices', band.id)}
            />
          ))}
        </div>
      </Group>

      <Group title="Skin Concern" id={`${idPrefix}-concern`}>
        <div className="space-y-0.5">
          {SKIN_CONCERNS.map((concern) => (
            <Check
              key={concern}
              label={concern}
              count={countBy((p) => p.concerns?.includes(concern))}
              checked={filters.concerns.includes(concern)}
              onChange={() => toggle('concerns', concern)}
            />
          ))}
        </div>
      </Group>

      <Group title="Product Type" id={`${idPrefix}-type`}>
        <div className="space-y-0.5">
          {ALL_TYPES.map((type) => (
            <Check
              key={type}
              label={type}
              count={countBy((p) => p.type === type)}
              checked={filters.types.includes(type)}
              onChange={() => toggle('types', type)}
            />
          ))}
        </div>
      </Group>

      <Group title="Rating" id={`${idPrefix}-rating`}>
        <div className="space-y-0.5">
          {RATINGS.map((rating) => (
            <label
              key={rating.id}
              className="flex cursor-pointer items-center gap-3 py-1.5 text-[13px] text-ink/75 transition-colors hover:text-burgundy"
            >
              <input
                type="radio"
                name="rating-filter"
                checked={filters.rating === rating.id}
                onChange={() => onChange({ ...filters, rating: rating.id })}
                className="h-4 w-4 accent-[#9B4560]"
              />
              <span className="flex flex-1 items-center gap-1.5">
                <Star size={13} className="fill-burgundy text-burgundy" />
                {rating.label}
              </span>
            </label>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...filters, rating: null })}
            className="mt-2 text-[12px] text-ink/50 transition-colors hover:text-burgundy"
          >
            Any rating
          </button>
        </div>
      </Group>
    </aside>
  );
}

export { PRICE_BANDS };

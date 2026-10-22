import Link from "next/link";
import { categories, categoryTitle, filterProducts, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ShopSearchField, ShopSortSelect } from "@/components/shop-controls";
import { formatNumber } from "@/lib/format";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = first(params.category) ?? "all";
  const query = first(params.q) ?? "";
  const sort = first(params.sort) ?? "featured";
  const sale = first(params.sale) === "1";

  const list = filterProducts({ category, query, sort, sale });
  const activeCategoryTitle =
    category === "all"
      ? "همه محصولات"
      : category === "bag-shoes"
        ? "کیف و کفش"
        : categoryTitle(category as never);

  const buildHref = (next: Record<string, string | null>) => {
    const search = new URLSearchParams();
    if (category !== "all") search.set("category", category);
    if (query) search.set("q", query);
    if (sort !== "featured") search.set("sort", sort);
    if (sale) search.set("sale", "1");
    Object.entries(next).forEach(([key, value]) => {
      if (!value) search.delete(key);
      else search.set(key, value);
    });
    const qs = search.toString();
    return qs ? `/shop?${qs}` : "/shop";
  };

  return (
    <div>
      <section className="border-b border-ink/10 bg-cream/35 py-10 md:py-14">
        <div className="shell">
          <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
            <Link href="/" className="transition-colors hover:text-wine">
              خانه
            </Link>
            <span className="mx-2 text-muted/50">/</span>
            <span className="text-ink">فروشگاه</span>
          </nav>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[clamp(1.7rem,3.2vw,2.6rem)] font-normal text-ink">
                {query ? `نتایج جستجو برای «${query}»` : activeCategoryTitle}
              </h1>
              <p className="mt-3 text-[12.5px] text-muted">
                {formatNumber(list.length)} محصول
                {sale ? " · فقط کالاهای حراج" : ""}
              </p>
            </div>
            <ShopSortSelect value={sort} />
          </div>
        </div>
      </section>

      <div className="shell grid gap-10 py-10 md:py-14 lg:grid-cols-[228px_1fr] lg:gap-12">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="space-y-7">
            <ShopSearchField initialQuery={query} />

            <div>
              <h2 className="text-[11px] tracking-[0.16em] text-gold-deep">دسته‌بندی</h2>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-2.5">
                <li>
                  <Link
                    href={buildHref({ category: null })}
                    className={`inline-block text-[12.5px] transition-colors ${
                      category === "all" ? "text-wine" : "text-ink/70 hover:text-wine"
                    }`}
                  >
                    همه محصولات
                    <span className="mr-1.5 text-[10.5px] text-muted">({formatNumber(products.length)})</span>
                  </Link>
                </li>
                {categories.map((item) => {
                  const count = products.filter((product) => product.category === item.slug).length;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={buildHref({ category: item.slug })}
                        className={`inline-block text-[12.5px] transition-colors ${
                          category === item.slug ? "text-wine" : "text-ink/70 hover:text-wine"
                        }`}
                      >
                        {item.title}
                        <span className="mr-1.5 text-[10.5px] text-muted">({formatNumber(count)})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] tracking-[0.16em] text-gold-deep">پیشنهاد ویژه</h2>
              <Link
                href={buildHref({ sale: sale ? null : "1" })}
                className={`mt-4 inline-flex items-center gap-2 rounded-[3px] border px-4 py-2 text-[12px] transition-colors ${
                  sale
                    ? "border-wine bg-wine text-ivory"
                    : "border-ink/15 text-ink/75 hover:border-wine hover:text-wine"
                }`}
              >
                فقط کالاهای حراج
              </Link>
            </div>
          </div>
        </aside>

        <div>
          {list.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 border border-dashed border-ink/15 bg-cream/20 px-6 text-center">
              <p className="text-[14px] text-ink">محصولی با این فیلترها پیدا نشد.</p>
              <p className="max-w-sm text-[12px] leading-6 text-muted">
                عبارت جستجو یا دسته‌بندی را تغییر دهید؛ شاید بخواهید همه‌ی محصولات را ببینید.
              </p>
              <Link href="/shop" className="btn-ghost-dark mt-2">
                مشاهده همه محصولات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-5 md:gap-y-11">
              {list.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

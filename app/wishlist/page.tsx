import Link from "next/link";
import { WishlistView } from "@/components/wishlist-view";

export const metadata = { title: "علاقه‌مندی‌ها | ولورا" };

export default function WishlistPage() {
  return (
    <div className="shell py-10 md:py-14">
      <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
        <Link href="/" className="transition-colors hover:text-wine">
          خانه
        </Link>
        <span className="mx-2 text-muted/50">/</span>
        <span className="text-ink">علاقه‌مندی‌ها</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-normal text-ink">علاقه‌مندی‌های من</h1>
      <p className="mt-3 text-[12.5px] text-muted">
        محصولاتی که برای بعد نگه داشته‌اید؛ هر زمان بخواهید به سبد اضافه‌شان کنید.
      </p>

      <div className="mt-9">
        <WishlistView />
      </div>
    </div>
  );
}

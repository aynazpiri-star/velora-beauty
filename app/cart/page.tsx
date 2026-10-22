import Link from "next/link";
import { CartView } from "@/components/cart-view";

export const metadata = { title: "سبد خرید | ولورا" };

export default function CartPage() {
  return (
    <div className="shell py-10 md:py-14">
      <nav aria-label="مسیر صفحه" className="text-[11px] text-muted">
        <Link href="/" className="transition-colors hover:text-wine">
          خانه
        </Link>
        <span className="mx-2 text-muted/50">/</span>
        <span className="text-ink">سبد خرید</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-normal text-ink">سبد خرید</h1>
      <p className="mt-3 text-[12.5px] text-muted">
        کالاهای انتخابی شما؛ تعداد را تغییر دهید یا سفارش را کامل کنید.
      </p>

      <div className="mt-9">
        <CartView />
      </div>
    </div>
  );
}

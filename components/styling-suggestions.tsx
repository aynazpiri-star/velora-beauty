"use client";

import { useRef } from "react";
import Link from "next/link";
import { stylingLooks } from "@/lib/content";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

export function StylingSuggestions() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="bg-ivory pb-16 md:pb-24" aria-labelledby="looks-title">
      <div className="shell">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="max-w-xl">
            <p className="eyebrow">استایل‌بندی</p>
            <h2 id="looks-title" className="section-title mt-4">
              پیشنهادهای استایل برای شما
            </h2>
            <p className="mt-4 text-[13px] leading-7 text-muted">
              ست‌های آماده‌ی ولورا؛ پیراهن، کیف، کفش و جواهراتی که با هم کامل می‌شوند.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="استایل قبلی"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink/70 transition-colors hover:border-wine hover:text-wine"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="استایل بعدی"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink/70 transition-colors hover:border-wine hover:text-wine"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar md:mt-12 md:gap-5"
        >
          {stylingLooks.map((look) => (
            <article
              key={look.title}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-0.94rem)]"
            >
              <div className="group overflow-hidden bg-cream/40">
                <Link href="/shop" className="block aspect-[4/5] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.05]"
                  />
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {look.items.map((item) => (
                  <div key={item.label} className="group overflow-hidden bg-cream/40">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.08]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="mt-4 text-[13.5px] text-ink">{look.title}</h3>
              <p className="mt-1.5 text-[11.5px] leading-6 text-muted">{look.caption}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/shop" className="btn-ghost-dark">
            مشاهده همه استایل‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}

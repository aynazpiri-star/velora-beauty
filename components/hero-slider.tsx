"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { heroSlides } from "@/lib/content";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction: number) => {
    setIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      className="relative isolate h-[74vh] min-h-[520px] w-full overflow-hidden bg-wine text-ivory sm:min-h-[580px] lg:h-[82vh] lg:max-h-[820px]"
      aria-roledescription="carousel"
      aria-label="کمپین‌های ولورا"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((slide, slideIndex) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-luxe ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={slideIndex !== index}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover object-center transition-transform duration-[9000ms] ease-linear ${
              slideIndex === index ? "scale-[1.06]" : "scale-100"
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-l from-wine/95 via-wine/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-wine/75 via-transparent to-wine/30" />

      <div className="relative flex h-full items-center">
        <div className="shell w-full">
          <div key={index} className="max-w-[620px] animate-fade-up">
            <p className="flex items-center gap-3 text-[10.5px] tracking-[0.34em] text-gold">
              <span className="inline-block h-px w-10 bg-gold/70" />
              {heroSlides[index].eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-[clamp(2.1rem,5.2vw,4.4rem)] font-light leading-[1.24] text-ivory">
              {heroSlides[index].title}
            </h1>
            <p className="mt-6 max-w-md text-[13.5px] leading-8 text-cream/80 md:text-[15px]">
              {heroSlides[index].body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={heroSlides[index].href} className="btn-gold">
                {heroSlides[index].cta}
              </Link>
              <Link href="/shop?sort=new" className="btn-ghost-light">
                جدیدترین‌ها
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="shell flex items-center justify-between pb-7">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, dotIndex) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`اسلاید ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                className={`h-[2px] transition-all duration-500 ${
                  dotIndex === index ? "w-10 bg-gold" : "w-5 bg-cream/35 hover:bg-cream/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="اسلاید قبلی"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/35 text-ivory/85 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="اسلاید بعدی"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/35 text-ivory/85 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

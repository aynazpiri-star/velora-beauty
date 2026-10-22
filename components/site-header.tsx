"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { announcements, brand, navLinks } from "@/lib/content";
import { useStore } from "./store-provider";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, wishlist, hydrated, notify } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [announcement, setAnnouncement] = useState(0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnnouncement((current) => (current + 1) % announcements.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    setSearchOpen(false);
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
  };

  return (
    <>
      <div className="bg-wine text-cream/85">
        <div className="shell flex h-9 items-center justify-center gap-6 text-[10.5px] tracking-[0.06em]">
          {announcements.map((item, index) => (
            <span
              key={item}
              className={`${index === announcement ? "block" : "hidden"} md:block ${index > 0 ? "md:border-s md:border-cream/20 md:ps-6" : ""}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/95 backdrop-blur-md">
        <div className="shell">
          <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-2 lg:h-[80px]">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="منو"
                className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream/60 lg:hidden"
              >
                <MenuIcon />
              </button>
              <nav className="hidden items-center gap-7 lg:flex" aria-label="منوی اصلی">
                {navLinks.slice(0, 3).map((link) => (
                  <Link key={link.href} href={link.href} className="luxe-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Link href="/" className="flex flex-col items-center gap-1.5" aria-label={`${brand.name} — صفحه اصلی`}>
              <span
                className="text-[20px] leading-none text-wine lg:text-[24px]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: "0.34em" }}
                dir="ltr"
              >
                {brand.latin}
              </span>
              <span className="text-[9.5px] tracking-[0.3em] text-muted">{brand.tagline}</span>
            </Link>

            <div className="flex items-center justify-end gap-0.5">
              <button
                type="button"
                onClick={() => setSearchOpen((open) => !open)}
                aria-label="جستجو"
                aria-expanded={searchOpen}
                className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream/60"
              >
                <SearchIcon />
              </button>
              <button
                type="button"
                onClick={() => notify("ورود به حساب کاربری در این نسخه‌ی نمایشی فعال نیست")}
                aria-label="حساب کاربری"
                className="hidden h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream/60 sm:grid"
              >
                <UserIcon />
              </button>
              <Link
                href="/wishlist"
                aria-label="علاقه‌مندی‌ها"
                className="relative hidden h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream/60 sm:grid"
              >
                <HeartIcon />
                {hydrated && wishlist.length > 0 && (
                  <span className="absolute end-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] text-wine">
                    {new Intl.NumberFormat("fa-IR").format(wishlist.length)}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                aria-label="سبد خرید"
                className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream/60"
              >
                <BagIcon />
                {hydrated && count > 0 && (
                  <span className="absolute end-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-wine px-1 text-[9px] text-ivory">
                    {new Intl.NumberFormat("fa-IR").format(count)}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <nav
            className="hidden h-11 items-center justify-center gap-8 border-t border-ink/10 text-[12.5px] lg:flex"
            aria-label="دسته‌بندی‌ها"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="luxe-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {searchOpen && (
          <div className="absolute inset-x-0 top-full border-b border-ink/10 bg-ivory shadow-[0_24px_40px_-30px_rgba(45,29,31,0.5)]">
            <form onSubmit={submitSearch} className="shell flex items-center gap-4 py-5">
              <SearchIcon className="h-5 w-5 text-gold-deep" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="نام محصول، دسته‌بندی یا مناسبت را بنویسید…"
                aria-label="عبارت جستجو"
                className="h-10 flex-1 border-b border-ink/20 bg-transparent pb-2 text-sm outline-none placeholder:text-muted/70 focus:border-wine"
              />
              <button type="submit" className="btn-wine">
                جستجو
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="بستن جستجو"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-cream/60 hover:text-ink"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
          />
          <div className="absolute inset-y-0 start-0 flex w-[84%] max-w-xs flex-col bg-wine px-7 py-6 text-ivory">
            <div className="flex items-center justify-between">
              <span
                className="text-lg"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: "0.3em" }}
                dir="ltr"
              >
                {brand.latin}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="بستن منو"
                className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory/10"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-5" aria-label="منوی موبایل">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[17px] font-light text-ivory/90 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-3 border-t border-ivory/15 pt-6 text-[13px] text-cream/75">
              <Link href="/wishlist" className="block transition-colors hover:text-gold">
                علاقه‌مندی‌های من
              </Link>
              <Link href="/cart" className="block transition-colors hover:text-gold">
                سبد خرید
              </Link>
              <Link href="/help#contact" className="block transition-colors hover:text-gold">
                تماس با ما
              </Link>
            </div>

            <p className="mt-auto text-[11px] leading-6 text-cream/50">
              {brand.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

import Link from "next/link";
import { brand, contactInfo, footerColumns } from "@/lib/content";
import { NewsletterForm } from "./newsletter-form";
import {
  InstagramIcon,
  PinterestIcon,
  TelegramIcon,
  YoutubeIcon,
} from "./icons";

const socials = [
  { label: "اینستاگرام", Icon: InstagramIcon },
  { label: "تلگرام", Icon: TelegramIcon },
  { label: "پینترست", Icon: PinterestIcon },
  { label: "یوتیوب", Icon: YoutubeIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-wine text-cream/75">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8 lg:py-16">
        <div>
          <Link
            href="/"
            className="text-[22px] text-ivory"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: "0.32em" }}
            dir="ltr"
          >
            {brand.latin}
          </Link>
          <p className="mt-5 max-w-xs text-[12.5px] leading-7 text-cream/65">
            {brand.description}
          </p>
          <div className="mt-6 flex items-center gap-2">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[12px] tracking-[0.14em] text-gold">{column.title}</h3>
            <ul className="mt-5 space-y-3 text-[12.5px]">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-cream/70 transition-colors hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/15">
        <div className="shell grid gap-8 py-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="text-[13px] text-ivory">عضویت در خبرنامه ولورا</h3>
            <p className="mt-3 text-[12px] leading-6 text-cream/60">
              از مجموعه‌های تازه و دعوت‌نامه‌های خصوصی فروش زودتر از همه باخبر شوید.
            </p>
            <div className="mt-5 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid gap-6 text-[12.5px] sm:grid-cols-2">
            <div>
              <h3 className="text-[12px] tracking-[0.14em] text-gold">تماس با ما</h3>
              <ul className="mt-5 space-y-3 text-cream/70">
                <li dir="ltr" className="text-end">{contactInfo.phone}</li>
                <li dir="ltr" className="text-end">{contactInfo.email}</li>
                <li className="leading-6">{contactInfo.address}</li>
                <li>{contactInfo.hours}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] tracking-[0.14em] text-gold">پشتیبانی خرید</h3>
              <ul className="mt-5 space-y-3 text-cream/70">
                <li>
                  <Link href="/help#shipping" className="transition-colors hover:text-ivory">
                    ارسال و تحویل
                  </Link>
                </li>
                <li>
                  <Link href="/help#returns" className="transition-colors hover:text-ivory">
                    بازگشت و تعویض کالا
                  </Link>
                </li>
                <li>
                  <Link href="/help#faq" className="transition-colors hover:text-ivory">
                    سؤالات متداول
                  </Link>
                </li>
                <li>
                  <Link href="/help#size" className="transition-colors hover:text-ivory">
                    راهنمای سایز
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-[11px] text-cream/50 md:flex-row">
          <p>© ۱۴۰۴ ولورا — تمامی حقوق مادی و معنوی محفوظ است.</p>
          <p>طراحی و دوخت در ایران</p>
        </div>
      </div>
    </footer>
  );
}

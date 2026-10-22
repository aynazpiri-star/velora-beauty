import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "ولورا | بوتیک لباس و استایل زنانه",
  description:
    "ولورا، بوتیک آنلاین لباس مجلسی، استایل اداری و اکسسوری‌های لوکس زنانه؛ با ارسال سراسری و ضمانت بازگشت کالا.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <StoreProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}

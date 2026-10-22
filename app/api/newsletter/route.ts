import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email = "";

  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, message: "داده‌های ارسالی معتبر نیست." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, message: "لطفاً یک ایمیل معتبر وارد کنید." },
      { status: 422 },
    );
  }

  // Demo storefront: no mailing list provider is connected yet, so the address
  // is only validated and acknowledged.
  return NextResponse.json({ ok: true, message: "عضویت ثبت شد." });
}

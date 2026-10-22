"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setStatus("error");
      setMessage("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !data.ok) throw new Error(data.message ?? "unknown");
      setStatus("success");
      setMessage("عضویت شما ثبت شد؛ اولین خبرها را برایتان می‌فرستیم.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("ثبت ایمیل انجام نشد. کمی بعد دوباره تلاش کنید.");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="ایمیل شما"
          aria-label="ایمیل برای عضویت در خبرنامه"
          aria-invalid={status === "error"}
          className="h-11 flex-1 rounded-[3px] border border-ivory/25 bg-transparent px-4 text-[13px] text-ivory outline-none transition-colors placeholder:text-cream/45 focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-gold h-11 px-6 disabled:opacity-70"
        >
          {status === "loading" ? "در حال ثبت…" : "عضویت"}
        </button>
      </div>
      {message && (
        <p
          aria-live="polite"
          className={`mt-3 flex items-center gap-1.5 text-[11.5px] ${status === "success" ? "text-gold" : "text-[#f0b9b0]"}`}
        >
          {status === "success" && <CheckIcon className="h-3.5 w-3.5" />}
          {message}
        </p>
      )}
    </form>
  );
}

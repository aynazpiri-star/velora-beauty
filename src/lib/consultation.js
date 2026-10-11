import { toLatinDigits } from './digits'

/**
 * ارسال درخواست مشاوره.
 *
 * اگر متغیر محیطی VITE_CONSULTATION_ENDPOINT تنظیم شده باشد، درخواست به همان
 * سرویس واقعی ارسال می‌شود. در غیر این صورت فرم در حالت نمایشی کار می‌کند:
 * درخواست در مرورگر ذخیره می‌شود و پیام «نمایشی» به کاربر نشان داده می‌شود تا
 * هیچ‌گاه ادعای ارسال موفق واقعی نداشته باشیم.
 */
export const isDemoMode = !import.meta.env.VITE_CONSULTATION_ENDPOINT

export class ConsultationError extends Error {}

export function validateConsultation(form) {
  const errors = {}
  const name = form.name.trim()
  const phone = toLatinDigits(form.phone).trim()

  if (name.length < 3) {
    errors.name = 'نام و نام خانوادگی را کامل وارد کنید.'
  }

  if (!phone) {
    errors.phone = 'شماره تماس الزامی است.'
  } else if (!/^0?\d{10,11}$/.test(phone)) {
    errors.phone = 'شماره تماس را به شکل صحیح وارد کنید؛ مثال: ۰۹۱۲۳۴۵۶۷۸۹'
  }

  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'ایمیل وارد‌شده معتبر نیست.'
  }

  if (!form.projectType) {
    errors.projectType = 'نوع پروژه را انتخاب کنید.'
  }

  if (form.description.trim().length < 10) {
    errors.description = 'توضیح کوتاهی درباره پروژه بنویسید (حداقل ۱۰ نویسه).'
  }

  return errors
}

const STORAGE_KEY = 'arka-sazeh:consultation-requests'

export async function submitConsultation(form) {
  const errors = validateConsultation(form)
  if (Object.keys(errors).length > 0) {
    throw new ConsultationError('اطلاعات فرم کامل نیست.')
  }

  const payload = {
    ...form,
    phone: toLatinDigits(form.phone).trim(),
    submittedAt: new Date().toISOString(),
  }

  if (!isDemoMode) {
    try {
      const response = await fetch(import.meta.env.VITE_CONSULTATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new ConsultationError('سرویس دریافت درخواست پاسخ مناسبی نداد.')
      }

      return { demo: false }
    } catch (error) {
      if (error instanceof ConsultationError) throw error
      throw new ConsultationError('ارتباط با سرویس دریافت درخواست برقرار نشد.')
    }
  }

  // حالت نمایشی: درخواست فقط در همین مرورگر نگهداری می‌شود.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const list = stored ? JSON.parse(stored) : []
    list.push(payload)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // اگر ذخیره‌سازی در مرورگر در دسترس نباشد، ادامه کار را متوقف نمی‌کنیم.
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 900)
  })

  return { demo: true }
}

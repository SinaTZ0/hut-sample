import type { JDate } from '../../content/types'
import { isoToJalali, JALALI_MONTHS } from './jalali'

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

/** Replace Latin digits with Persian digits, leaving everything else intact. */
export const faDigits = (input: string | number) => String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)])

const grouped = new Intl.NumberFormat('fa-IR')
/** Number with Persian digits and thousands separators. */
export const faNumber = (n: number) => grouped.format(n)

export const monthName = (m: number) => JALALI_MONTHS[m - 1]

/** "۱۵ شهریور ۱۴۰۵" (year optional). */
export function formatJalali([y, m, d]: JDate, opts: { year?: boolean } = {}) {
  return faDigits(`${d} ${monthName(m)}${opts.year ? ` ${y}` : ''}`)
}

/** "۲۴ تا ۲۵ آذر", "۲۸ آذر تا ۱۱ دی", or a single date. */
export function formatJalaliRange(start: JDate, end?: JDate, opts: { year?: boolean } = {}) {
  if (!end) return formatJalali(start, opts)
  const yr = opts.year ? ` ${end[0]}` : ''
  if (start[1] === end[1]) return faDigits(`${start[2]} تا ${end[2]} ${monthName(end[1])}${yr}`)
  return faDigits(`${start[2]} ${monthName(start[1])} تا ${end[2]} ${monthName(end[1])}${yr}`)
}

/** Publication date (ISO Gregorian) shown in Jalali. */
export const formatIsoDate = (iso: string, opts: { year?: boolean } = { year: true }) => formatJalali(isoToJalali(iso), opts)

/** Normalise Persian/Arabic text for search: unify ی/ک, drop ZWNJ, diacritics and extra spaces. */
export const normalizeFa = (s: string) =>
  s
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[‌‏‎]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** Relative day phrase: "امروز", "فردا", "۳ روز دیگر", "۲ روز پیش". */
export function relativeDays(days: number) {
  if (days === 0) return 'امروز'
  if (days === 1) return 'فردا'
  if (days === -1) return 'دیروز'
  return days > 0 ? `${faNumber(days)} روز دیگر` : `${faNumber(-days)} روز پیش`
}

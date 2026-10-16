import type { JDate } from '../../content/types'

/**
 * Jalali (Solar Hijri) helpers built on the browser's Intl Persian calendar,
 * so leap years follow the platform's implementation. All dates are handled at UTC noon.
 */

const DAY = 86_400_000

const partsFmt = (timeZone: string) =>
  new Intl.DateTimeFormat('en-u-ca-persian-nu-latn', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone })

const utcFmt = partsFmt('UTC')

export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const

export function toJalali(date: Date, timeZone = 'UTC'): JDate {
  const fmt = timeZone === 'UTC' ? utcFmt : partsFmt(timeZone)
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]))
  return [Number(p.year), Number(p.month), Number(p.day)]
}

export const jKey = ([y, m, d]: JDate) => y * 10_000 + m * 100 + d

export function fromJalali(j: JDate): Date {
  const [y, m, d] = j
  const dayOfYear = m <= 6 ? (m - 1) * 31 + d : 186 + (m - 7) * 30 + d
  // 1 Farvardin falls on 20 or 21 March; start from 21 March and correct by at most a few days.
  const guess = new Date(Date.UTC(y + 621, 2, 21 + dayOfYear - 1, 12))
  const target = jKey(j)
  for (let i = 0; i < 4; i++) {
    const k = jKey(toJalali(guess))
    if (k === target) break
    guess.setUTCDate(guess.getUTCDate() + (k < target ? 1 : -1))
  }
  return guess
}

/** Whole days from a to b (b − a). */
export const daysBetween = (a: JDate, b: JDate) => Math.round((fromJalali(b).getTime() - fromJalali(a).getTime()) / DAY)

export const todayInTehran = (): JDate => toJalali(new Date(), 'Asia/Tehran')

/** Parse "1405-09-26" or "1405/09/26". */
export function parseJalali(s: string | null | undefined): JDate | null {
  const m = s?.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/)
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null
}

export const isoToJalali = (iso: string): JDate => toJalali(new Date(`${iso}T12:00:00Z`))

const weekdayFmt = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', timeZone: 'UTC' })
export const jalaliWeekday = (j: JDate) => weekdayFmt.format(fromJalali(j))

import type { Semester } from './types'

/**
 * Academic calendar, first semester 1405–1406 (نیم‌سال ۴۰۵۱).
 * Transcribed from the official calendar image/PDF (archive/documents/calendar-4051.*),
 * because the live homepage widget still showed the previous semester.
 */
export const semester: Semester = {
  code: '4051',
  title: 'نیم‌سال اول سال تحصیلی ۱۴۰۶–۱۴۰۵',
  sourceHref: 'https://hut.ac.ir/fa/w/-772',
  events: [
    {
      id: 'reg-402',
      label: 'انتخاب واحد',
      cohort: 'ورودی ۴۰۲ و ماقبل',
      start: [1405, 6, 15],
      kind: 'registration',
      milestone: true,
    },
    { id: 'reg-403', label: 'انتخاب واحد', cohort: 'ورودی ۴۰۳', start: [1405, 6, 16], kind: 'registration' },
    { id: 'reg-404', label: 'انتخاب واحد', cohort: 'ورودی ۴۰۴', start: [1405, 6, 17], kind: 'registration' },
    { id: 'reg-late', label: 'انتخاب واحد با تأخیر', cohort: 'همه ورودی‌ها', start: [1405, 6, 18], kind: 'registration' },
    { id: 'classes-start', label: 'شروع کلاس‌ها', start: [1405, 6, 28], kind: 'classes', milestone: true },
    {
      id: 'adddrop-402',
      label: 'حذف و اضافه',
      cohort: 'ورودی ۴۰۲ و ماقبل',
      start: [1405, 7, 5],
      kind: 'adddrop',
      milestone: true,
    },
    { id: 'adddrop-403', label: 'حذف و اضافه', cohort: 'ورودی ۴۰۳ و ۴۰۴', start: [1405, 7, 6], kind: 'adddrop' },
    { id: 'single-drop', label: 'حذف تک‌درس', start: [1405, 9, 24], end: [1405, 9, 25], kind: 'adddrop', milestone: true },
    {
      id: 'evaluation',
      label: 'ارزشیابی اساتید',
      start: [1405, 9, 28],
      end: [1405, 10, 11],
      kind: 'evaluation',
      milestone: true,
    },
    { id: 'prereg-402', label: 'پیش‌ثبت‌نام', cohort: 'ورودی ۴۰۲ و ماقبل', start: [1405, 9, 29], kind: 'registration' },
    { id: 'prereg-403', label: 'پیش‌ثبت‌نام', cohort: 'ورودی ۴۰۳ و ۴۰۴', start: [1405, 9, 30], kind: 'registration' },
    { id: 'classes-end', label: 'پایان کلاس‌ها', start: [1405, 10, 15], kind: 'classes', milestone: true },
    { id: 'practical-exams', label: 'امتحانات دروس عملی', start: [1405, 10, 19], end: [1405, 10, 23], kind: 'exams' },
    { id: 'exams', label: 'امتحانات پایان‌ترم', start: [1405, 10, 26], end: [1405, 11, 13], kind: 'exams', milestone: true },
    { id: 'project-deadline', label: 'آخرین مهلت ثبت نمره پروژه و تحویل به کتابخانه', start: [1405, 11, 15], kind: 'deadline' },
  ],
  notes: [
    'دانشجویی که غیبتش در درسی بیش از حد مجاز باشد، مجاز به حذف اضطراری آن درس نیست (ماده ۱۷ آیین‌نامه آموزشی).',
    'یک هفته پس از حذف و اضافه، انتخاب واحد خود را با کمک استاد راهنما دوباره بررسی کنید.',
    'شرکت نکردن در پیش‌ثبت‌نام یعنی انتخاب واحد فقط در روز ثبت‌نام با تأخیر در نیم‌سال بعد.',
    'شرکت نکردن در انتخاب واحد یعنی حداکثر ۱۴ واحد در حذف و اضافه.',
    'شرکت نکردن در ارزشیابی اساتید یعنی کارت ورود به جلسه و پیش‌ثبت‌نام ترم بعد صادر نمی‌شود.',
  ],
}

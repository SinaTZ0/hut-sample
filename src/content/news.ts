import achJournal from '../assets/hut/ach-journal.jpg'
import achRockBook from '../assets/hut/ach-rock-book.png'
import achSmartCity from '../assets/hut/ach-smart-city.png'
import achSports from '../assets/hut/ach-sports.jpg'
import annGraduation from '../assets/hut/ann-graduation-1405.jpg'
import campus from '../assets/hut/campus-alvand.jpg'
import growth200s from '../assets/hut/growth-200s.jpg'
import growthCareer from '../assets/hut/growth-career.jpg'
import newsAifora from '../assets/hut/news-aifora.jpg'
import newsCrisis from '../assets/hut/news-crisis-day.jpg'
import newsEeHead from '../assets/hut/news-ee-head.jpg'
import newsElites from '../assets/hut/news-president-elites.jpg'
import type { NewsItem, NewsTab } from './types'

/** Source: archive/catalog.json (homepage asset publishers), full titles from archive/article-titles.json. */

export const news: NewsItem[] = [
  {
    id: 'top-2-percent',
    title: 'چهار عضو هیئت علمی دانشگاه صنعتی همدان در فهرست دانشمندان دو درصد برتر جهان قرار گرفتند',
    date: '2026-10-13',
    href: 'https://hut.ac.ir/fa/w/چهار-عضو-هیئت-علمی-دانشگاه-صنعتی-همدان-در-فهرست-دا',
    image: campus,
    category: 'university',
  },
  {
    id: 'crisis-day',
    title: 'پیام رئیس دانشگاه صنعتی همدان به مناسبت روز ملی مدیریت بحران',
    date: '2026-10-12',
    image: newsCrisis,
    category: 'university',
  },
  {
    id: 'elites-council',
    title: 'انتصاب رئیس دانشگاه صنعتی همدان به عضویت شورای علمی بنیاد نخبگان استان',
    summary: 'دکتر محمود پری‌پور، رئیس دانشگاه صنعتی همدان، به عضویت شورای علمی بنیاد نخبگان استان همدان منصوب شد.',
    date: '2026-10-11',
    image: newsElites,
    category: 'university',
  },
  {
    id: 'ee-head',
    title: 'انتصاب دکتر پژمان بیات به سمت مدیر گروه مهندسی برق',
    date: '2026-10-07',
    image: newsEeHead,
    category: 'university',
  },
  {
    id: 'ai-fora',
    title: 'انتشار کتاب بین‌المللی پروژه AI FORA با مشارکت عضو هیئت علمی دانشگاه',
    summary:
      'کتاب «Participatory Modelling and Simulation to Improve AI-based Public Social Services» با مشارکت عضو هیئت علمی دانشگاه منتشر شد.',
    date: '2026-10-04',
    image: newsAifora,
    category: 'university',
  },
  // education
  {
    id: 'a-19057678',
    title: 'اطلاعیه ثبت عنوان پروژه کارشناسی نیم‌سال ۴۰۵۱',
    date: '2026-10-04',
    href: 'https://hut.ac.ir/article/19057678',
    category: 'education',
  },
  {
    id: 'a-19057712',
    title: 'اطلاعیه معرفی به استاد نیم‌سال ۴۰۵۱',
    date: '2026-10-04',
    href: 'https://hut.ac.ir/article/19057712',
    category: 'education',
  },
  {
    id: 'a-19042273',
    title: 'آغاز کلاس‌های تربیت بدنی و ورزش ۱',
    date: '2026-09-29',
    href: 'https://hut.ac.ir/article/19042273',
    category: 'education',
  },
  {
    id: 'a-19039509',
    title: 'اطلاعیه مهم حذف و اضافه ترم ۴۰۵۱',
    date: '2026-09-26',
    href: 'https://hut.ac.ir/article/19039509',
    category: 'education',
  },
  {
    id: 'a-18985527',
    title: 'اطلاعیه مهم انتخاب واحد کلیه دانشجویان',
    date: '2026-09-05',
    href: 'https://hut.ac.ir/article/18985527',
    category: 'education',
  },
  // graduate
  {
    id: 'a-19057912',
    title: 'اطلاعیه دفاع دانشجویان کارشناسی ارشد',
    date: '2026-10-04',
    href: 'https://hut.ac.ir/article/19057912',
    category: 'graduate',
  },
  {
    id: 'a-18989220',
    title: 'سهمیه رتبه اول دوره کارشناسی برای پذیرش در آزمون کارشناسی ارشد ۱۴۰۵',
    summary: 'متقاضیان تا پایان وقت اداری یکشنبه ۲۲ شهریور ۱۴۰۵ درخواست خود را ثبت کنند.',
    date: '2026-09-08',
    href: 'https://hut.ac.ir/article/18989220',
    category: 'graduate',
  },
  {
    id: 'a-18986145',
    title: 'جلسه دفاع از سمینار کارشناسی ارشد گروه مهندسی معدن',
    date: '2026-09-06',
    href: 'https://hut.ac.ir/article/18986145',
    category: 'graduate',
  },
  {
    id: 'a-18986550',
    title: 'مهلت دفاع از پایان‌نامه کارشناسی ارشد در نیم‌سال دوم ۱۴۰۵–۱۴۰۴',
    date: '2026-09-06',
    href: 'https://hut.ac.ir/article/18986550',
    category: 'graduate',
  },
  {
    id: 'a-18953187',
    title: 'تاریخ و چگونگی ثبت‌نام در مقطع دکتری',
    date: '2026-08-24',
    href: 'https://hut.ac.ir/article/18953187',
    category: 'graduate',
  },
  // student
  {
    id: 'a-18904770',
    title: 'طرح احوال‌پرسی پسا جنگ',
    date: '2026-08-02',
    href: 'https://hut.ac.ir/article/18904770',
    category: 'student',
  },
  {
    id: 'a-18609450',
    title: 'وام‌های دانشجویی نیم‌سال دوم ۱۴۰۵–۱۴۰۴',
    date: '2026-04-14',
    href: 'https://hut.ac.ir/article/18609450',
    category: 'student',
  },
  {
    id: 'a-16686617',
    title: 'آغاز ثبت‌نام وام ضروری و وام شهریه در سایت صندوق رفاه دانشجویان',
    date: '2025-12-07',
    href: 'https://hut.ac.ir/article/16686617',
    category: 'student',
  },
  {
    id: 'a-6133335',
    title: 'اطلاعیه شماره ۲ خوابگاه ویژه امتحانات حضوری',
    date: '2025-08-19',
    href: 'https://hut.ac.ir/article/6133335',
    category: 'student',
  },
  // industry
  {
    id: 'a-5885096',
    title: 'بورس حین تحصیل و بدون کنکور صنعت و مشاغل',
    date: '2025-05-20',
    href: 'https://hut.ac.ir/article/5885096',
    category: 'industry',
  },
  {
    id: 'a-5621389',
    title: 'طرح دستیار فناوری',
    date: '2025-02-02',
    href: 'https://hut.ac.ir/article/5621389',
    category: 'industry',
  },
  {
    id: 'a-5495019',
    title: 'رویداد فناورانه ملی با رویکرد مهارتی',
    date: '2025-02-23',
    href: 'https://hut.ac.ir/article/5495019',
    category: 'industry',
  },
  {
    id: 'a-5412107',
    title: 'سخنرانی‌های هفته پژوهش ۱۴۰۳',
    date: '2024-12-15',
    href: 'https://hut.ac.ir/article/5412107',
    category: 'industry',
  },
  // open education
  {
    id: 'a-9505501',
    title: 'دوره رایگان «چگونه دانش‌بنیان شویم»',
    summary: 'آشنایی گام‌به‌گام با مسیر ثبت شرکت دانش‌بنیان و حمایت‌هایی که به آن تعلق می‌گیرد.',
    date: '2025-11-09',
    href: 'https://hut.ac.ir/article/9505501',
    category: 'openEducation',
  },
  {
    id: 'a-9646200',
    title: 'سمینار رایگان معامله‌گری در بازارهای مالی',
    href: 'https://hut.ac.ir/article/9646200',
    category: 'openEducation',
  },
  {
    id: 'a-5371035',
    title: 'ثبت‌نام درس HSE، پیش‌نیاز دروس عملی',
    date: '2024-12-25',
    href: 'https://hut.ac.ir/article/5371035',
    category: 'openEducation',
  },
  // growth center
  {
    id: 'g-200s',
    title: 'مسابقه «ارائه‌های ۲۰۰ ثانیه‌ای» با حضور دانشجویان',
    summary: 'دانشجویان ایده یا پژوهش خود را در دویست ثانیه برای داوران و مخاطبان ارائه می‌کنند.',
    image: growth200s,
    category: 'growth',
    href: 'https://hut.ac.ir/web/roshd',
  },
  {
    id: 'g-career',
    title: 'نشست تخصصی هدایت شغلی با حضور مدیران صنعت',
    summary: 'گفت‌وگوی دانشجویان با مدیران صنعت درباره مسیر شغلی و نیازهای بازار کار.',
    image: growthCareer,
    category: 'growth',
    href: 'https://hut.ac.ir/web/roshd',
  },
  {
    id: 'g-career-center',
    title: 'مرکز هدایت شغلی دانشگاه صنعتی همدان افتتاح شد',
    category: 'growth',
    href: 'https://hut.ac.ir/web/roshd',
  },
]

export const newsTabs: NewsTab[] = [
  { id: 'university', title: 'دانشگاه', moreHref: 'https://hut.ac.ir/web/hut/اخبار' },
  { id: 'education', title: 'آموزش', moreHref: 'https://hut.ac.ir/web/hut/اطلاعیه-ها' },
  { id: 'graduate', title: 'تحصیلات تکمیلی', moreHref: 'https://hut.ac.ir/web/hut/اطلاعیه-ها' },
  { id: 'student', title: 'دانشجویی', moreHref: 'https://student.hut.ac.ir/' },
  { id: 'industry', title: 'ارتباط با صنعت', moreHref: 'http://industry.hut.ac.ir/' },
  { id: 'growth', title: 'مرکز رشد', moreHref: 'https://hut.ac.ir/web/roshd' },
  { id: 'openEducation', title: 'آموزش آزاد', moreHref: 'https://hut.ac.ir/web/hut/کارگاه-ها-و-دوره-های-اموزشی' },
]

/** Featured announcement (graduation ceremony 1405). */
export const featuredAnnouncement: NewsItem = {
  id: 'graduation-1405',
  title: 'مراسم آیین دانش‌آموختگی سال ۱۴۰۵',
  summary:
    'ویژه دانشجویان دکتری و کارشناسی ورودی ۱۴۰۱ و کارشناسی ارشد ورودی ۱۴۰۳. ثبت‌نام ۱۳ تا ۱۷ مهر در سامانه گلستان (پیشخوان خدمت). سالن شهید چمران.',
  date: '2026-10-05',
  href: 'https://hut.ac.ir/fa/w/اطلاعیه-شماره-۱-🎓-مراسم-آیین-دانش-آموختگی-سال-1405-دا',
  image: annGraduation,
  category: 'student',
}

export const achievements: NewsItem[] = [
  {
    id: 'ach-top2',
    title: 'چهار عضو هیئت علمی در فهرست دو درصد دانشمندان برتر جهان',
    image: campus,
    category: 'achievement',
  },
  {
    id: 'ach-journal',
    title: 'نشریه «انرژی پایدار و هوش مصنوعی» در پایگاه‌های بین‌المللی نمایه شد',
    summary: 'نشریه علمی‌پژوهشی Sustainable Energy and Artificial Intelligence متعلق به دانشگاه صنعتی همدان.',
    image: achJournal,
    href: 'https://enai.hut.ac.ir/',
    category: 'achievement',
  },
  {
    id: 'ach-smart-city',
    title: 'تدوین سند جامع مدیریت شهری هوشمند همدان با همکاری دانشگاه',
    image: achSmartCity,
    category: 'achievement',
  },
  {
    id: 'ach-rock-book',
    title: 'انتشار کتاب «Failure Mechanism of Rock Materials Containing Pre-existing Notch»',
    summary: 'تألیف دکتر وهاب سرفرازی، عضو هیئت علمی گروه مهندسی معدن.',
    image: achRockBook,
    category: 'achievement',
  },
  {
    id: 'ach-sports',
    title: 'مدال طلای کاراته در هفدهمین المپیاد ورزشی دانشجویان کشور',
    summary: 'به‌همراه مقام پنجم کشتی فرنگی و جایگاه هشتم تیراندازی.',
    image: achSports,
    category: 'achievement',
  },
]

export const newsByCategory = (id: NewsItem['category']) => news.filter((n) => n.category === id)

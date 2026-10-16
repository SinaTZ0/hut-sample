import campusDusk from '../assets/hut/campus-dusk.jpg'
import campus from '../assets/hut/campus-alvand.jpg'
import logoFooter from '../assets/hut/logo-footer.png'
import logo from '../assets/hut/logo.png'
import type { Contact, Department, Link, SocialLink, Stat } from './types'

export const identity = {
  name: 'دانشگاه صنعتی همدان',
  nameEn: 'Hamedan University of Technology',
  abbr: 'HUT',
  city: 'همدان',
  /** Plain statement of what the university is; avoids slogans. */
  mission: 'دانشگاهی دولتی و مهندسی‌محور در دامنه الوند که در هشت گروه آموزشی، دانشجو تربیت می‌کند و با صنعت استان همکاری دارد.',
  englishHref: 'https://en.hut.ac.ir/en',
  loginHref: 'https://hut.ac.ir/c/portal/login?p_l_id=13',
  /** Plain white logo mark (transparent PNG); tint it with CSS mask in light themes. */
  logo,
  logoFooter,
  images: {
    campus,
    campusAlt: 'ساختمان مرکزی دانشگاه صنعتی همدان با کوه‌های برف‌پوش الوند در پس‌زمینه',
    campusDusk,
  },
}

export const stats: Stat[] = [
  { value: 2300, suffix: '+', label: 'دانشجو' },
  { value: 400, suffix: '+', label: 'دانشجوی ارشد' },
  { value: 115, suffix: '+', label: 'عضو هیئت علمی' },
  { value: 2400, suffix: '+', label: 'مقاله علمی' },
  { value: 2200, suffix: '+', label: 'دانش‌آموخته' },
  { value: 75, suffix: '+', label: 'کارمند' },
]

export const departments: Department[] = [
  {
    id: 'ee',
    title: 'گروه مهندسی برق',
    short: 'برق',
    href: 'http://ee.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-برق',
  },
  {
    id: 'ce',
    title: 'گروه مهندسی کامپیوتر',
    short: 'کامپیوتر',
    href: 'http://ce.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-کامپیوتر',
  },
  {
    id: 'mech',
    title: 'گروه مهندسی مکانیک',
    short: 'مکانیک',
    href: 'http://mech.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-مکانیک',
  },
  {
    id: 'bme',
    title: 'گروه مهندسی پزشکی',
    short: 'پزشکی',
    href: 'http://bme.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-پزشکی',
  },
  {
    id: 'materials',
    title: 'گروه مهندسی مواد',
    short: 'مواد',
    href: 'http://materials.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-مواد',
  },
  {
    id: 'chem',
    title: 'گروه مهندسی شیمی',
    short: 'شیمی',
    href: 'http://chemeng.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-شیمی',
  },
  {
    id: 'mining',
    title: 'گروه مهندسی معدن',
    short: 'معدن',
    href: 'http://me.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-مهندسی-معدن',
  },
  {
    id: 'bs',
    title: 'گروه علوم پایه',
    short: 'علوم پایه',
    href: 'http://bs.hut.ac.ir/',
    labHref: 'https://hut.ac.ir/آزمایشگاه-علوم-پایه',
  },
]

/** Research & outreach units, shown on the public lane. */
export const researchUnits: (Link & {
  description: string
  icon: 'journal' | 'library' | 'flask' | 'industry' | 'growth' | 'book'
})[] = [
  {
    label: 'نشریه انرژی پایدار و هوش مصنوعی',
    href: 'https://enai.hut.ac.ir/',
    description: 'نشریه علمی‌پژوهشی دانشگاه',
    icon: 'journal',
  },
  {
    label: 'مرکز رشد، فناوری و کارآفرینی',
    href: 'https://hut.ac.ir/web/roshd',
    description: 'حمایت از ایده‌ها و شرکت‌های دانش‌بنیان',
    icon: 'growth',
  },
  {
    label: 'دفتر ارتباط با صنعت',
    href: 'http://industry.hut.ac.ir/',
    description: 'کارآموزی، بورس صنعت و طرح دستیار فناوری',
    icon: 'industry',
  },
  {
    label: 'آزمایشگاه مرکزی',
    href: 'http://lab.hut.ac.ir/',
    description: 'خدمات آزمایشگاهی برای پژوهشگران و صنعت',
    icon: 'flask',
  },
  { label: 'کتابخانه مرکزی', href: 'http://library.hut.ac.ir/', description: 'منابع چاپی و دیجیتال', icon: 'library' },
  { label: 'اداره انتشارات', href: 'http://press.hut.ac.ir/', description: 'کتاب‌های منتشرشده دانشگاه', icon: 'book' },
]

export const contact: Contact = {
  address: 'همدان، پل پژوهش، بلوار شهید فهمیده، خیابان مردم',
  phone: '۰۸۱-۳۸۴۱۱۰۰۰',
  phoneHref: 'tel:+988138411000',
  fax: '۰۸۱-۳۸۳۸۰۶۶۰',
  poBox: '۶۵۱۵۵-۵۷۹',
  email: 'info@hut.ac.ir',
  mapHref: 'https://balad.ir/embed?p=42j1sJdgp1Qvp6',
}

export const social: SocialLink[] = [
  { id: 'eitaa', label: 'کانال ایتا', href: 'https://eitaa.com/info_hut' },
  { id: 'linkedin', label: 'لینکدین', href: 'https://www.linkedin.com/school/hamedan-university-of-technology/' },
  { id: 'aparat', label: 'آپارات', href: 'https://www.aparat.com/hut.university' },
  { id: 'email', label: 'ایمیل', href: 'mailto:info@hut.ac.ir' },
]

/** Footer utility links (kept from the current site). */
export const utilityLinks: Link[] = [
  { label: 'نقشه سایت', href: 'https://hut.ac.ir/fa/نقشه-سایت' },
  { label: 'تماس با ما', href: 'https://hut.ac.ir/ارتباط-با-ما' },
  { label: 'دفترچه تلفن', href: 'https://hut.ac.ir/تلفن-داخلی' },
  { label: 'منشور اخلاق', href: 'https://hut.ac.ir/documents/38165/453653/نظامنامه+اخلاق+آموزش.pdf' },
  { label: 'نظام پیشنهادات', href: 'https://hut.ac.ir/فرم نظرات پیشنهادات' },
  { label: 'انجمن دانش‌آموختگان', href: 'https://hut.ac.ir/web/دانش-آموختگان' },
  { label: 'جذب هیئت علمی', href: 'http://jazb.hut.ac.ir/' },
]

/** "پیوندها" block from the current footer. */
export const affiliates: Link[] = [
  { label: 'وزارت علوم، تحقیقات و فناوری', href: 'https://www.msrt.ir/fa' },
  { label: 'معاونت علمی و فناوری ریاست جمهوری', href: 'http://isti.ir/' },
  { label: 'پارک علم و فناوری استان همدان', href: 'https://hstp.ir/' },
  { label: 'بنیاد نخبگان استان همدان', href: 'https://hamedan.bmn.ir/' },
  { label: 'صندوق حمایت از پژوهشگران و فناوران', href: 'http://insf.org/fa' },
  { label: 'استانداری همدان', href: 'https://www.ostan-hm.ir' },
  { label: 'دفتر مقام معظم رهبری', href: 'https://www.leader.ir/fa' },
  { label: 'دفتر ریاست جمهوری', href: 'https://www.president.ir/fa/' },
  { label: 'بازرسی و پاسخگویی به شکایات وزارت علوم', href: 'https://erp.msrt.ir/Dashboard' },
]

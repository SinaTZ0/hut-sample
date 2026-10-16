import type { NavSection } from './types'

/**
 * Information architecture shared by all versions.
 *
 * Two lanes:
 *  - public:  who we are, what we teach, what we research (prestige, external visitors)
 *  - portal:  what students and staff come to do every day (services)
 *
 * The old "اداری و مالی" menu becomes part of "دانشگاه", and "سامانه‌ها" is split:
 * student systems go to the portal lane, staff/faculty systems to their own compact menu.
 */
export const navSections: NavSection[] = [
  {
    id: 'about',
    title: 'دانشگاه',
    href: 'https://hut.ac.ir/معرفی-دانشگاه',
    lane: 'public',
    summary: 'معرفی، مدیریت دانشگاه و راه‌های ارتباط',
    groups: [
      {
        title: 'معرفی',
        links: [
          { label: 'درباره دانشگاه', href: 'https://hut.ac.ir/معرفی-دانشگاه' },
          { label: 'اعضای هیئت علمی', href: 'https://hut.ac.ir/اعضای-هیات-علمی' },
          { label: 'روسای ادوار دانشگاه', href: 'https://hut.ac.ir/روسای-پیشین-دانشگاه' },
          { label: 'همکاری‌های علمی بین‌المللی', href: 'https://hut.ac.ir/اداره-همکاری-های-علمی-بین-المللی' },
        ],
      },
      {
        title: 'مدیریت',
        links: [
          { label: 'رئیس دانشگاه', href: 'https://hut.ac.ir/رئیس-دانشگاه1' },
          { label: 'معاونت آموزشی و پژوهشی', href: 'https://edu.hut.ac.ir/' },
          { label: 'معاونت دانشجویی و فرهنگی', href: 'https://student.hut.ac.ir/' },
          { label: 'معاونت اداری و مالی', href: 'https://daf.hut.ac.ir/' },
          { label: 'هیئت امنا', href: 'https://omana.basu.ac.ir/' },
        ],
      },
      {
        title: 'ارتباط',
        links: [
          { label: 'تماس با ما', href: 'https://hut.ac.ir/ارتباط-با-ما' },
          { label: 'دفترچه تلفن', href: 'https://hut.ac.ir/تلفن-داخلی' },
          { label: 'روابط عمومی', href: 'https://hut.ac.ir/روابط-عمومی' },
          { label: 'جذب هیئت علمی', href: 'http://jazb.hut.ac.ir/' },
        ],
      },
    ],
  },
  {
    id: 'education',
    title: 'آموزش',
    href: 'https://hut.ac.ir/اموزش',
    lane: 'public',
    summary: 'گروه‌های آموزشی، تحصیلات تکمیلی و آموزش آزاد',
    groups: [
      {
        title: 'گروه‌های آموزشی',
        href: 'https://hut.ac.ir/groups',
        links: [
          { label: 'مهندسی برق', href: 'http://ee.hut.ac.ir/' },
          { label: 'مهندسی کامپیوتر', href: 'http://ce.hut.ac.ir/' },
          { label: 'مهندسی مکانیک', href: 'http://mech.hut.ac.ir/' },
          { label: 'مهندسی پزشکی', href: 'http://bme.hut.ac.ir/' },
          { label: 'مهندسی مواد', href: 'http://materials.hut.ac.ir/' },
          { label: 'مهندسی شیمی', href: 'http://chemeng.hut.ac.ir/' },
          { label: 'مهندسی معدن', href: 'http://me.hut.ac.ir/' },
          { label: 'علوم پایه', href: 'http://bs.hut.ac.ir/' },
        ],
      },
      {
        title: 'امور آموزشی',
        links: [
          { label: 'خدمات آموزشی', href: 'http://web.hut.ac.ir/web/edu/مدیریت-خدمات-آموزشی' },
          { label: 'تحصیلات تکمیلی', href: 'http://web.hut.ac.ir/web/edu/اداره-تحصیلات-تکمیلی2' },
          { label: 'پذیرش و دانش‌آموختگان', href: 'http://web.hut.ac.ir/web/edu/اداره-دانش-آموختگان' },
          { label: 'تقویم آموزشی', href: 'https://hut.ac.ir/web/edu/تقویم-آموزشی' },
        ],
      },
      {
        title: 'آموزش آزاد و مجازی',
        links: [
          { label: 'آموزش مجازی', href: 'https://hut.ac.ir/آموزش-مجازی' },
          { label: 'مرکز آموزش‌های آزاد', href: 'https://hut.ac.ir/fa/آموزش-آزاد' },
        ],
      },
    ],
  },
  {
    id: 'research',
    title: 'پژوهش و فناوری',
    href: 'https://hut.ac.ir/پژوهش',
    lane: 'public',
    summary: 'نشریه، آزمایشگاه‌ها، مرکز رشد و ارتباط با صنعت',
    groups: [
      {
        title: 'پژوهش',
        links: [
          { label: 'امور پژوهشی', href: 'https://edu.hut.ac.ir/مدیریت-پژوهشی' },
          { label: 'نشریه انرژی پایدار و هوش مصنوعی', href: 'https://enai.hut.ac.ir/' },
          { label: 'اداره انتشارات', href: 'http://press.hut.ac.ir/' },
          { label: 'کتابخانه مرکزی', href: 'http://library.hut.ac.ir/' },
        ],
      },
      {
        title: 'فناوری و صنعت',
        links: [
          { label: 'مرکز رشد، فناوری و کارآفرینی', href: 'https://hut.ac.ir/web/roshd' },
          { label: 'دفتر ارتباط با صنعت', href: 'http://industry.hut.ac.ir/' },
          { label: 'آزمایشگاه مرکزی', href: 'http://lab.hut.ac.ir/' },
          { label: 'آزمایشگاه‌های گروه‌ها', href: 'https://hut.ac.ir/آزمایشگاه' },
        ],
      },
    ],
  },
  {
    id: 'campus-life',
    title: 'زندگی دانشجویی',
    href: 'https://hut.ac.ir/دانشجویی-فرهنگی',
    lane: 'public',
    summary: 'خوابگاه، تغذیه، کانون‌ها و مشاوره',
    groups: [
      {
        title: 'رفاه',
        links: [
          { label: 'خدمات رفاهی', href: 'https://student.hut.ac.ir/خدمات-رفاهی-دانشجویی' },
          { label: 'خوابگاه‌ها', href: 'https://student.hut.ac.ir/اداره-خوابگاه-ها' },
          { label: 'اداره تغذیه', href: 'https://student.hut.ac.ir/اداره-تغذیه' },
          { label: 'تربیت بدنی', href: 'http://web.hut.ac.ir/web/student/اداره-تربیت-بدنی' },
        ],
      },
      {
        title: 'فرهنگی',
        links: [
          { label: 'کانون‌های فرهنگی و هنری', href: 'https://student.hut.ac.ir/کانون-های-فرهنگی' },
          { label: 'انجمن‌های علمی', href: 'https://student.hut.ac.ir/انجمن-های-علمی-صنعتی' },
          { label: 'تشکل‌های دانشجویی', href: 'https://student.hut.ac.ir/tashakol' },
          { label: 'نشریات دانشجویی', href: 'https://hut.ac.ir/پایگاه-نشریات-دانشجویی' },
        ],
      },
      {
        title: 'پشتیبانی',
        links: [
          { label: 'مرکز مشاوره', href: 'http://counseling.hut.ac.ir/' },
          { label: 'شورای انضباطی', href: 'https://student.hut.ac.ir/شورای-انضباطی' },
          { label: 'دانشجویان شاهد و ایثارگر', href: 'https://hut.ac.ir/امور-دانشجویان-شاهد-و-ایثارگر' },
        ],
      },
    ],
  },
  {
    id: 'services',
    title: 'سامانه‌ها',
    href: 'https://hut.ac.ir/سامانه-ها',
    lane: 'portal',
    summary: 'گلستان، تغذیه، کتابخانه و همه سامانه‌های دانشجویی',
    groups: [],
  },
]

export const publicNav = navSections.filter((s) => s.lane === 'public')
export const portalNav = navSections.filter((s) => s.lane === 'portal')

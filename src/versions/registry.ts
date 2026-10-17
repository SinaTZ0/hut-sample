import type { ComponentType } from 'react'

export interface VersionMeta {
  id: string
  /** URL segment, e.g. "v1" → /v1 */
  slug: string
  name: string
  nameEn: string
  /** Which audience the hero prioritises. */
  emphasis: string
  concept: string
  /** Palette preview for the gallery (hex). */
  swatches: string[]
  fonts: string
  load: () => Promise<{ default: ComponentType }>
}

/**
 * Add a design version: create src/versions/<id>/index.tsx (default export = page)
 * and register it here. Routing and the gallery pick it up automatically.
 */
export const versions: VersionMeta[] = [
  {
    id: 'v1-ganjnameh',
    slug: 'v1',
    name: 'گنج‌نامه',
    nameEn: 'Ganjnameh',
    emphasis: 'اول هویت دانشگاه',
    concept:
      'دو کتیبه سنگی گنج‌نامه در دامنه الوند، دو مسیر صفحه را می‌سازند: یکی معرفی دانشگاه برای بازدیدکننده و دیگری درگاه سامانه‌ها برای دانشجو.',
    swatches: ['#2B2F33', '#1D3B6F', '#E6E7E3', '#F7F8F6', '#8E6A3A'],
    fonts: 'Noto Kufi Arabic / Noto Naskh Arabic',
    load: () => import('./v1-ganjnameh'),
  },
  {
    id: 'v2-lalejin',
    slug: 'v2',
    name: 'لالجین',
    nameEn: 'Lalejin',
    emphasis: 'اول خدمات دانشجویی',
    concept:
      'کاشی‌های لعاب‌دار سفال لالجین: سامانه‌ها موزاییکی هستند که اندازه هر کاشی را میزان استفاده تعیین می‌کند، با جست‌وجوی فوری.',
    swatches: ['#16858A', '#22408C', '#F5FAFA', '#4E3529', '#E1A12B'],
    fonts: 'Lalezar / Vazirmatn',
    load: () => import('./v2-lalejin'),
  },
  {
    id: 'v3-taqvim',
    slug: 'v3',
    name: 'تقویم',
    nameEn: 'Taqvim',
    emphasis: 'اول زمان‌بندی ترم',
    concept:
      'ترم به‌عنوان ستون فقرات صفحه: خط زمانی زنده نیم‌سال با نشانگر امروز، و ستون «اکنون» که مهلت بعدی و سامانه‌های پرکاربرد را همیشه در دید نگه می‌دارد.',
    swatches: ['#1C2430', '#FCFCFB', '#2F6FB5', '#C62F3B', '#7C8F7A'],
    fonts: 'Vazirmatn',
    load: () => import('./v3-taqvim'),
  },
  {
    id: 'v4-alvand',
    slug: 'v4',
    name: 'الوند',
    nameEn: 'Alvand',
    emphasis: 'اول چهره دانشگاه',
    concept:
      'عکس دانشگاه در دامنه الوند با پوشش سبز کاج و طلایی گندم، و نوار سامانه‌های روزانه که زیر آن پهلو گرفته است؛ سپس اخبار، خط نیم‌سال، دانشگاه در یک نگاه و خوش‌آمد به نودانشجویان.',
    swatches: ['#0B2F32', '#103D40', '#1B6A64', '#E7BC65', '#F6F8F5'],
    fonts: 'Vazirmatn',
    load: () => import('./v4-alvand'),
  },
  {
    id: 'v5-hegmataneh',
    slug: 'v5',
    name: 'هگمتانه',
    nameEn: 'Hegmataneh',
    emphasis: 'اول امروزِ دانشگاه',
    concept:
      'برش عمودی تپه هگمتانه: آسمان شامگاهی دانشگاه بالا، نوار افق که امروز و مهلت بعدی را روی لبه عکس نگه می‌دارد، لایه‌های روشن سطح برای آنچه هر روز عوض می‌شود و لایه‌های عمیق نیلی برای آنچه نمی‌شود.',
    swatches: ['#141B30', '#1C2543', '#D9822B', '#EFE9DC', '#FAF7F1'],
    fonts: 'Noto Naskh Arabic / Vazirmatn',
    load: () => import('./v5-hegmataneh'),
  },
  {
    id: 'v6-babataher',
    slug: 'v6',
    name: 'بابا طاهر',
    nameEn: 'Baba Taher',
    emphasis: 'اول کار امروز مراجعه‌کننده',
    concept:
      'سنگ و شیشه، به تقلید از برج هشت‌ضلعی بابا طاهر: نوارهای تیره صفحه بافت واقعی سنگ گرانیت دارند و گره‌چینی بر آن نشسته است، و «میز خدمت» مثل تخته‌سنگی بر لبه پایینی عکس نشسته که جست‌وجوی زنده سامانه‌ها، سامانه‌های روزمره و مهلت بعدی را با هم نگه می‌دارد.',
    swatches: ['#14181B', '#1D2328', '#1AA69C', '#EAE7E1', '#F4F2EE'],
    fonts: 'Noto Kufi Arabic / Vazirmatn',
    load: () => import('./v6-babataher'),
  },
]

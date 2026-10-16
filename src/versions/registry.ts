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
]

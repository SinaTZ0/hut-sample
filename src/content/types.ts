/**
 * Shared content model. Every design version renders these shapes;
 * none of them hardcode university data.
 */

/** Jalali (Solar Hijri) calendar date as [year, month, day]. */
export type JDate = readonly [number, number, number]

export type Audience = 'student' | 'staff' | 'faculty' | 'public'

export interface Link {
  label: string
  href: string
}

export interface NavGroup {
  title: string
  href?: string
  links: Link[]
}

/** A top-level navigation section. `lane` says which audience lane it serves. */
export interface NavSection {
  id: string
  title: string
  href: string
  lane: 'public' | 'portal'
  /** One-line plain description, used in mega menus and the mobile drawer. */
  summary: string
  groups: NavGroup[]
}

export type ServiceGroupId = 'education' | 'living' | 'library' | 'support' | 'staff'

export type IconName =
  | 'golestan'
  | 'food'
  | 'fund'
  | 'library'
  | 'book'
  | 'lms'
  | 'courseware'
  | 'open-ed'
  | 'dorm'
  | 'counsel'
  | 'student-affairs'
  | 'forms'
  | 'office'
  | 'mail'
  | 'clock'
  | 'chart'
  | 'faculty'
  | 'payslip'
  | 'new-student'
  | 'payment'
  | 'search'
  | 'external'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'calendar'
  | 'phone'
  | 'pin'
  | 'globe'
  | 'login'
  | 'journal'
  | 'flask'
  | 'industry'
  | 'growth'
  | 'bell'
  | 'sun'
  | 'moon'
  | 'chevron'

export interface Service {
  id: string
  /** Full name as the university uses it. */
  title: string
  /** Short label for tiles and chips. */
  short: string
  /** What a student does there, in plain words. */
  description: string
  href: string
  audience: Audience[]
  group: ServiceGroupId
  icon: IconName
  /** 1 = daily, 2 = weekly, 3 = occasional. Drives prominence in layouts. */
  priority: 1 | 2 | 3
  /** Extra search terms (Persian + Latin). */
  keywords: string[]
  /** Only reachable from the campus network. */
  internalOnly?: boolean
}

export interface ServiceGroup {
  id: ServiceGroupId
  title: string
  summary: string
}

export type NewsCategory =
  'university' | 'education' | 'graduate' | 'industry' | 'student' | 'openEducation' | 'growth' | 'achievement'

export interface NewsItem {
  id: string
  title: string
  summary?: string
  /** ISO date (Gregorian) as published. */
  date?: string
  href?: string
  image?: string
  category: NewsCategory
}

export interface NewsTab {
  id: NewsCategory
  title: string
  moreHref: string
}

export type CalendarKind = 'registration' | 'classes' | 'adddrop' | 'evaluation' | 'exams' | 'deadline'

export interface CalendarEvent {
  id: string
  label: string
  /** Who it applies to, e.g. "ورودی ۴۰۳". */
  cohort?: string
  start: JDate
  end?: JDate
  kind: CalendarKind
  /** Milestones are the headline events shown on compact timelines. */
  milestone?: boolean
}

export interface Semester {
  code: string
  title: string
  events: CalendarEvent[]
  notes: string[]
  sourceHref: string
}

export interface Stat {
  value: number
  suffix?: string
  label: string
}

export interface Department {
  id: string
  title: string
  /** Name without the "گروه مهندسی" prefix. */
  short: string
  href: string
  labHref?: string
}

export interface Contact {
  address: string
  phone: string
  phoneHref: string
  fax: string
  poBox: string
  email: string
  mapHref: string
}

export interface SocialLink {
  id: 'eitaa' | 'linkedin' | 'aparat' | 'email'
  label: string
  href: string
}

import type { SVGProps } from 'react'
import type { IconName } from '../../content/types'

/**
 * Inline line-icon set (24×24, stroke = currentColor). No icon dependency.
 * Directional icons (arrow, external) are drawn for RTL: they point left/“forward”.
 */
const paths: Record<IconName, string> = {
  golestan:
    'M12 3c2.5 2.2 2.5 5.3 0 7.5C9.5 8.3 9.5 5.2 12 3Zm0 7.5c3-.8 5.8.5 6.8 3-3 .8-5.8-.5-6.8-3Zm0 0c-3-.8-5.8.5-6.8 3 3 .8 5.8-.5 6.8-3ZM12 10.5V21m-4 0h8',
  food: 'M7 3v7a2 2 0 0 0 2 2v9M11 3v7a2 2 0 0 1-2 2M9 3v6m8-6c-1.7 1-2.5 3-2.5 5.5S15.3 12 17 12v9',
  fund: 'M3 8.5 12 4l9 4.5M5 10v7m4.7-7v7m4.6-7v7M19 10v7M3 20h18',
  library: 'M4 4h4v16H4zM10 4h4v16h-4zM15.5 5.2l3.8-1 3 15.4-3.8 1z',
  book: 'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5m0-15v15m0 0A1.5 1.5 0 0 0 6.5 21H19M9 7h6',
  lms: 'M3 5h18v11H3zM8 20h8m-4-4v4M10 8.5v4l3.5-2z',
  courseware: 'M4 4h11l5 5v11H4zM15 4v5h5M8 13h8M8 17h5',
  'open-ed': 'M12 4 2 9l10 5 10-5-10-5Zm-6 7.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8M22 9v6',
  dorm: 'M3 11 12 4l9 7M5 9.5V20h14V9.5M10 20v-5h4v5',
  counsel: 'M4 5h12v8H9l-4 3v-3H4zM16 9h4v8h-1v3l-4-3h-3v-1',
  'student-affairs':
    'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.3a3 3 0 0 1 0 5.4M18 14.8c1.8.7 3 2.6 3 5.2',
  forms: 'M6 3h12v18H6zM9 7h6M9 11h6M9 15h3',
  office: 'M3 7h18v12H3zM8 7V4h8v3M3 12h18M11 12v2h2v-2',
  mail: 'M3 5h18v14H3zm0 1 9 7 9-7',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2',
  chart: 'M4 20V4m0 16h16M8 16v-4m4 4V8m4 8v-6',
  faculty: 'M12 3 3 7.5 12 12l9-4.5L12 3ZM7 9.7V15c1.3 1.3 3 2 5 2s3.7-.7 5-2V9.7',
  payslip: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3',
  'new-student': 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9c0-3.9 3.1-6.5 7-6.5 1 0 2 .2 2.8.5M18 15v6m-3-3h6',
  payment: 'M3 6h18v12H3zM3 10h18M7 15h3',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 3-4-4',
  external: 'M14 4h6v6M20 4l-9 9M10 6H4v14h14v-6',
  arrow: 'M19 12H5m6-6-6 6 6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v5m8-5v5',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  login: 'M10 17l-5-5 5-5M5 12h11M14 4h5v16h-5',
  journal: 'M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3zm0 15a3 3 0 0 1 3-3h11M9 7h6',
  flask: 'M9 3h6M10 3v6L4.5 19a1.4 1.4 0 0 0 1.2 2h12.6a1.4 1.4 0 0 0 1.2-2L14 9V3M7.5 14h9',
  industry: 'M3 21V11l5 3V11l5 3V5h4l1 9 3 1v6zM7 18h2m3 0h2m3 0h2',
  growth: 'M12 21v-8m0 0C12 8 9 5 4 5c0 5 3 8 8 8Zm0 0c0-4 2.5-6.5 7-6.5 0 4-2.5 6.5-7 6.5Z',
}

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  /** Accessible label. Omit for decorative icons (the default). */
  label?: string
}

export function Icon({ name, size = 24, label, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  )
}

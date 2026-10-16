import type { ReactNode } from 'react'
import s from './SectionHead.module.css'

interface SectionHeadProps {
  id: string
  title: string
  /** Optional "see all" link aligned to the end of the rule. */
  more?: { label: string; href: string }
  children?: ReactNode
}

/** Kufic heading set on a full-width rule; the bronze notch marks the start of each section. */
export function SectionHead({ id, title, more, children }: SectionHeadProps) {
  return (
    <div className={s.head}>
      <h2 id={id} className={s.title}>
        {title}
      </h2>
      {children}
      {more && (
        <a href={more.href} className={s.more}>
          {more.label}
        </a>
      )}
    </div>
  )
}

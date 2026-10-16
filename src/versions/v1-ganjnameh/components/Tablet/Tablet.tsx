import type { ReactNode } from 'react'
import s from './Tablet.module.css'

interface TabletProps {
  /** Heading id, used to label the region. */
  id: string
  title: ReactNode
  /** Short line carved above the heading, naming who the tablet is for. */
  audience: string
  children: ReactNode
  tone?: 'stone' | 'lapis'
  /** The identity tablet carries the page's h1. */
  headingLevel?: 'h1' | 'h2'
  className?: string
}

/**
 * Carved stone panel, after the twin Ganjnameh inscriptions on Mount Alvand.
 * The visual signature of V1: used only for the two hero tablets.
 */
export function Tablet({ id, title, audience, children, tone = 'stone', headingLevel: Heading = 'h2', className }: TabletProps) {
  return (
    <section aria-labelledby={id} className={[s.tablet, s[tone], className].filter(Boolean).join(' ')}>
      <p className={s.audience}>{audience}</p>
      <Heading id={id} className={s.title}>
        {title}
      </Heading>
      <div className={s.body}>{children}</div>
    </section>
  )
}

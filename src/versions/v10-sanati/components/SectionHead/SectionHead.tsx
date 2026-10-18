import { Icon } from '../../../../shared/components/Icon'
import s from './SectionHead.module.css'

interface SectionHeadProps {
  id: string
  title: string
  more?: { label: string; href: string }
}

/** Section headings sit on the page above their cards, marked by the amber bar the live site uses. */
export function SectionHead({ id, title, more }: SectionHeadProps) {
  return (
    <div className={s.head}>
      <h2 id={id} className={s.title}>
        {title}
      </h2>
      {more && (
        <a href={more.href} className={s.more}>
          {more.label}
          <Icon name="arrow" size={16} />
        </a>
      )}
    </div>
  )
}

import s from './SectionHead.module.css'

interface SectionHeadProps {
  id: string
  title: string
  more?: { label: string; href: string }
}

/** Section headings sit in the open above their sheet, with the "more" link at the far end. */
export function SectionHead({ id, title, more }: SectionHeadProps) {
  return (
    <div className={s.head}>
      <h2 id={id} className={s.title}>
        {title}
      </h2>
      {more && (
        <a href={more.href} className={s.more}>
          {more.label}
        </a>
      )}
    </div>
  )
}

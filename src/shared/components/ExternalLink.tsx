import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  /** Open in a new tab. Used for separate systems (Golestan, Nutrition, …). */
  newTab?: boolean
}

/**
 * Link to another site or university system. Adds safe rel attributes and
 * tells screen-reader users when a new tab opens.
 */
export function ExternalLink({ href, children, newTab = false, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : { rel: 'noopener' })} {...rest}>
      {children}
      {newTab && <span className="visually-hidden"> (در زبانه جدید باز می‌شود)</span>}
    </a>
  )
}

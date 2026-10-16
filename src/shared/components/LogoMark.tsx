import { identity } from '../../content'

interface LogoMarkProps {
  size?: number
  className?: string
  /** The source PNG is white; on light surfaces it is drawn as a mask in `currentColor`. Set `--logo-size` in CSS to resize. */
  tint?: boolean
}

/** University emblem. Decorative: always paired with the visible university name. */
export function LogoMark({ size = 48, className, tint = true }: LogoMarkProps) {
  const style = tint
    ? {
        // `--logo-size` lets a version resize the mark responsively from CSS.
        width: `var(--logo-size, ${size}px)`,
        height: `var(--logo-size, ${size}px)`,
        backgroundColor: 'currentColor',
        WebkitMask: `url(${identity.logo}) center / contain no-repeat`,
        mask: `url(${identity.logo}) center / contain no-repeat`,
        display: 'inline-block',
        flex: 'none',
      }
    : undefined
  if (tint) return <span aria-hidden="true" className={className} style={style} />
  return <img src={identity.logo} alt="" width={size} height={size} className={className} />
}

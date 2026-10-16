import type { Service } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import s from './Tile.module.css'

const SIZE_BY_PRIORITY = { 1: 'large', 2: 'wide', 3: 'small' } as const

/**
 * One glazed tile. Size encodes how often the service is used (priority);
 * glaze colour encodes its group.
 */
export function Tile({ service }: { service: Service }) {
  const size = SIZE_BY_PRIORITY[service.priority]
  return (
    <li className={s.cell} data-size={size} data-group={service.group}>
      <a href={service.href} className={s.tile} target="_blank" rel="noopener noreferrer">
        <Icon name={service.icon} size={size === 'large' ? 40 : 28} className={s.icon} />
        <span className={s.text}>
          <span className={s.name}>{service.short}</span>
          {size !== 'small' && <span className={s.desc}>{service.description}</span>}
        </span>
        <Icon name="external" size={16} className={s.out} />
        <span className="visually-hidden"> ({service.title}، در زبانه جدید)</span>
        {service.internalOnly && <span className={s.flag}>فقط شبکه داخلی</span>}
      </a>
    </li>
  )
}

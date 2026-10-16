import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { JDate } from '../../content/types'
import { parseJalali, todayInTehran } from '../utils/jalali'

/**
 * Today's Jalali date in Tehran. For reviewing designs at other points of the
 * semester, pass `?today=1405-09-28` in the URL.
 */
export function useToday(): JDate {
  const [params] = useSearchParams()
  const override = params.get('today')
  return useMemo(() => parseJalali(override) ?? todayInTehran(), [override])
}

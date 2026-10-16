import { useDeferredValue, useMemo, useState } from 'react'
import type { Service } from '../../content/types'
import { normalizeFa } from '../utils/fa'

const haystack = (s: Service) => normalizeFa([s.title, s.short, s.description, ...s.keywords].join(' '))

/** Live filter over services. Matches every word of the query against names, descriptions and keywords. */
export function useServiceSearch(list: Service[]) {
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const index = useMemo(() => list.map((s) => [s, haystack(s)] as const), [list])

  const results = useMemo(() => {
    const words = normalizeFa(deferred).split(' ').filter(Boolean)
    if (!words.length) return list
    return index.filter(([, h]) => words.every((w) => h.includes(w))).map(([s]) => s)
  }, [deferred, index, list])

  return { query, setQuery, results, isFiltering: deferred.trim().length > 0 }
}

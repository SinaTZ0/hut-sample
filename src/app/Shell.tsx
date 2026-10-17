import { Outlet, ScrollRestoration } from 'react-router'
import { TokenPanel } from './TokenPanel'
import { VersionBar } from './VersionBar'

/** Route shell shared by the gallery and every design version. */
export function Shell() {
  return (
    <>
      <Outlet />
      <VersionBar />
      <TokenPanel />
      <ScrollRestoration />
    </>
  )
}

import { createBrowserRouter } from 'react-router'
import { VersionGallery } from '../pages/VersionGallery/VersionGallery'
import { versions } from '../versions/registry'
import { Shell } from './Shell'

/** "/" lists the versions; each registered version is lazy-loaded at "/<slug>" with its own CSS and fonts. */
export const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { index: true, element: <VersionGallery /> },
      ...versions.map((v) => ({
        path: v.slug,
        lazy: async () => ({ Component: (await v.load()).default }),
      })),
    ],
  },
])

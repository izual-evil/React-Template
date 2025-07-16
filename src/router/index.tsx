import { type RouteObject, createHashRouter } from 'react-router-dom'
import LayoutLoader from './LayoutLoader'
import privateRoutes from './private'
import Root from '@/Root'

export const rootRoutes: RouteObject[] = [
  {
    id: 'root',
    element: <Root />,
    children: [
      {
        path: '/login',
        lazy: () => import('@/pages/login'),
        meta: {
          isWhite: true,
        },
      },
      {
        id: 'layout',
        lazy: () => import('@/layouts'),
        loader: LayoutLoader,
        children: [
          {
            path: '/',
            lazy: () => import('@/pages/home'),
            parentIndex: 0,
            meta: {
              title: 'route.home.root',
              icon: 'ri:home-heart-fill',
              auth: "menu:home",
            },
          },
          ...privateRoutes,
          {
            path: '/reload',
            lazy: () => import('@/pages/error/reload'),
          },
        ],
      },
      {
        path: '/403',
        // element: <Suspense><Error403 /></Suspense>,
        lazy: () => import('@/pages/error/403'),
      },
      {
        path: '*',
        // element: <Suspense><Error404 /></Suspense>,
        lazy: () => import('@/pages/error/404'),
      },
    ],
  },
]

export default createHashRouter(rootRoutes)

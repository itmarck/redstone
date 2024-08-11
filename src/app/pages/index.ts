import { RouteObject } from 'react-router-dom'

import Home from './Home'
import Settings from './Settings'
import Layout from '../components/Layout'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '',
        Component: Home,
      },
      {
        path: '/settings',
        Component: Settings,
      },
    ],
  },
]

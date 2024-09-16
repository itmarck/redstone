import { RouteObject } from 'react-router-dom'

import Editor from '../components/Editor'
import Layout from '../components/Layout'
import Archive from './Archive'
import Finance from './Finance'
import Planner from './Planner'
import Settings from './Settings'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '',
        Component: Planner,
      },
      {
        path: 'notes',
        children: [
          {
            path: '',
            Component: Archive,
          },
          {
            path: ':id',
            Component: Editor,
          },
        ],
      },
      {
        path: 'finances',
        Component: Finance,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]

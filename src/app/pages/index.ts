import { RouteObject } from 'react-router-dom'

import Main from '../layouts/Main'
import Archive from './Archive'
import Editor from './Archive/components/Editor'
import Finance from './Finance'
import Planner from './Planner'
import Settings from './Settings'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Main,
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

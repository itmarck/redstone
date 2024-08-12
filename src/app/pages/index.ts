import { RouteObject } from 'react-router-dom'

import Layout from '../components/Layout'
import Accounts from './Accounts'
import Home from './Home'
import Notes from './Notes'
import Settings from './Settings'

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
        path: 'notes',
        Component: Notes,
      },
      {
        path: 'accounts',
        Component: Accounts,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]

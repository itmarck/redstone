import { Outlet } from 'react-router-dom'

import Bar from '../Bar'
import Inbox from '../Inbox'
import Navigation from '../Navigation'

import './Layout.css'

function Layout() {
  return (
    <div className="Layout row">
      <Navigation />

      <div className="auto column">
        <Bar />

        <main className="Layout__content auto">
          <Outlet />
        </main>
      </div>

      <Inbox />
    </div>
  )
}

export default Layout

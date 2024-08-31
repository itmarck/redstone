import { Outlet } from 'react-router-dom'

import Bar from '../Bar'
import Inbox from '../Inbox'
import Navigation from '../Navigation'

import './Layout.css'

function Layout() {
  return (
    <div className="Layout">
      <Navigation />

      <div className="Layout__block">
        <Bar />

        <main className="Layout__content">
          <Outlet />
        </main>
      </div>

      <Inbox />
    </div>
  )
}

export default Layout

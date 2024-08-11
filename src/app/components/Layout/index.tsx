import { Outlet } from 'react-router-dom'

import Inbox from '../Inbox'
import Navigation from '../Navigation'

import './Layout.css'

function Layout() {
  return (
    <div className="Layout">
      <Navigation />

      <div className="Layout__block">
        <header className="Bar">
          <div className="Bar__status">All up to date</div>
        </header>

        <main className="Layout__content">
          <Outlet />
        </main>
      </div>

      <Inbox />
    </div>
  )
}

export default Layout

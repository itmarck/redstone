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
          <div className="Bar__status">There are 5 elements</div>
          <span className="material-symbols-rounded">undo</span>
          <span className="material-symbols-rounded">redo</span>
          <span className="material-symbols-rounded">cloud_sync</span>
          <span className="material-symbols-rounded">wifi_tethering</span>
          <span className="material-symbols-rounded">settings</span>
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

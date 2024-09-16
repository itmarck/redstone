import { Outlet } from 'react-router-dom'

import Bar from './components/Bar'
import Inbox from './components/Inbox'
import Navigation from './components/Navigation'

import './Main.css'

function Main() {
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

export default Main

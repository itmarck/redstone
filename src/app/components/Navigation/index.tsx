import { Link } from 'react-router-dom'

import './Navigation.css'

function Navigation() {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <Link to="/">T</Link>
        </li>
        <li>
          <Link to="/notes">N</Link>
        </li>
        <li>
          <Link to="/accounts">A</Link>
        </li>
        <li>
          <Link to="/settings">S</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

import { Link } from 'react-router-dom'

import './Navigation.css'

function Navigation() {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <Link to="/">H</Link>
        </li>
        <li>
          <Link to="/settings">S</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

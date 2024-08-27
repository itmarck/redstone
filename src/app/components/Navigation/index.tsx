import { Link } from 'react-router-dom'

import './Navigation.css'

function Navigation() {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <Link to="/">
            <div className="material-symbols-rounded">select_check_box</div>
          </Link>
        </li>
        <li>
          <Link to="/notes">
            <div className="material-symbols-rounded">note_stack</div>
          </Link>
        </li>
        <li>
          <Link to="/accounts">
            <div className="material-symbols-rounded">wallet</div>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <div className="material-symbols-rounded">search</div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

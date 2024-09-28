import { Link } from 'react-router-dom'

import './Navigation.css'

function Navigation() {
  return (
    <nav className="Navigation">
      <ul className="column">
        <li>
          <Link to="/">
            <div className="material-symbols-rounded sunken regular">
              select_check_box
            </div>
          </Link>
        </li>
        <li>
          <Link to="/notes">
            <div className="material-symbols-rounded sunken regular">
              note_stack
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

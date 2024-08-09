import Inbox from '../../app/components/Inbox'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <div className="Layout">
      <nav className="Navigation">
        <ul>
          <li>
            <a href="/">H</a>
          </li>
          <li>
            <a href="/settings">S</a>
          </li>
        </ul>
      </nav>

      <div className="Layout__block">
        <header className="Bar">
          <div className="Bar__status">All up to date</div>
        </header>

        <main className="Layout__content">{children}</main>
      </div>

      <Inbox />
    </div>
  )
}

export default Layout

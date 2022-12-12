import Link from "next/link"
import { useRouter } from "next/router"

const NavLink = props => {
  const { asPath } = useRouter()
  const active = asPath === props.href

  return (
    <Link
      {...props}
      aria-selected={active}
      className={
        active ? "app-nav__link app-nav__link--active" : "app-nav__link"
      }
    >
      {props.children}
    </Link>
  )
}

const AppNav = () => (
  <nav className="app-nav">
    <NavLink href="/">Profile</NavLink>
    <NavLink href="/applications">Active applications</NavLink>
    <NavLink href="/past-applications">Past applications</NavLink>
    <NavLink href="/documents">Documents</NavLink>
    <NavLink href="/payments">Payments</NavLink>
  </nav>
)

export default AppNav

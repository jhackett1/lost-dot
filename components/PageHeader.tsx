import { useSession } from "next-auth/react"
import AppNav from "./AppNav"

const PageHeader = () => {
  const session = useSession()

  return (
    <header className="page-header">
      <p className="page-header__heading">
        Hi {session?.data?.user?.firstName}
      </p>
      <AppNav />
    </header>
  )
}

export default PageHeader

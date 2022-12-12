import { useSession } from "next-auth/react"
import AppNav from "./AppNav"

const PageHeader = () => {
  const session = useSession()

  return (
    <header className="page-header">
      <h1 className="page-header__heading">
        Hi {session?.data?.user?.firstName}
      </h1>
      <AppNav />
    </header>
  )
}

export default PageHeader

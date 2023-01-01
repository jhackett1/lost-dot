import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const PUBLIC_PATHS = ["/404", "/auth"]

const useProtected = () => {
  const { replace, asPath } = useRouter()
  const session = useSession()

  useEffect(() => {
    if (
      session.status === "unauthenticated" &&
      !PUBLIC_PATHS.includes(asPath)
    ) {
      replace(`/auth/sign-in`)
    }
  }, [asPath])

  return
}

export default useProtected

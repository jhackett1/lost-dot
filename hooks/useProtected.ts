import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const useProtected = () => {
  const { replace } = useRouter()
  const session = useSession()

  if (session.status === "unauthenticated") replace("/auth/sign-in")

  return
}

export default useProtected

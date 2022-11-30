import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const useProtected = () => {
  const { replace } = useRouter()
  const session = useSession()

  if (session.status === "unauthenticated") replace("/api/auth/signin")

  return
}

export default useProtected

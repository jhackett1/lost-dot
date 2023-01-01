import { useRouter } from "next/router"
import { useEffect } from "react"

/** detect whether the user has some query string data to apply to a specific race */
export const useInitialApplicationCookie = () => {
  const { query, replace, asPath } = useRouter()

  useEffect(() => {
    if (query["apply_to"]) {
      // save it as a cookie
      document.cookie = `apply_to=${query["apply_to"]}`
      // and delete the param
      const newParams = { ...query }
      delete newParams["apply_to"]
      replace(
        `${asPath}?${new URLSearchParams(newParams as Record<string, string>)}`
      )
    }
  }, [query])
}

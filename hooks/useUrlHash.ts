import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

/** useState, but synced to url hash state */
const useUrlHash = (): [
  string | false,
  Dispatch<SetStateAction<string | false>>
] => {
  const { asPath, replace } = useRouter()
  const [state, setState] = useState<string | false>(false)

  useEffect(() => {
    // grab initial reading from url
    setState(asPath.split("#")[1])
  }, [])

  useEffect(() => {
    // keep url in sync
    if (state) replace({ hash: state })
  }, [state])

  return [state, setState]
}

export default useUrlHash

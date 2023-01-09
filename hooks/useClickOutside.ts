import { useEffect, useRef } from "react"

const useClickOutside = handleClick => {
  const ref = useRef<HTMLDivElement>()

  const handleOutsideClick = e => {
    if (!ref.current.contains(e.target)) handleClick()
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick)
    return () => window.removeEventListener("click", handleOutsideClick)
  }, [])

  return ref
}

export default useClickOutside

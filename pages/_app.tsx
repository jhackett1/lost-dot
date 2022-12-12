import { SessionProvider } from "next-auth/react"
import AppLayout from "../components/AppLayout"
import "../styles/index.scss"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  )
}

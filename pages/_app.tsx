import { SessionProvider } from "next-auth/react"
import { SWRConfig } from "swr"
import AppLayout from "../components/AppLayout"
import { useInitialApplicationCookie } from "../hooks/useInitialApplicationCookie"
import "../styles/index.scss"

const defaultFetcher = url => fetch(url).then(res => res.json())

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // useInitialApplicationCookie()

  return (
    <SWRConfig value={{ fetcher: defaultFetcher }}>
      <SessionProvider session={session}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SessionProvider>
    </SWRConfig>
  )
}

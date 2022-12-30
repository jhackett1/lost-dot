import { SessionProvider } from "next-auth/react"
import { SWRConfig } from "swr"
import AppLayout from "../components/AppLayout"
import "../styles/index.scss"

const defaultFetcher = url => fetch(url).then(res => res.json())

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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

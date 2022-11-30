import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout"
import "../styles/index.scss"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

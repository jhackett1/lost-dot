import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import Head from "next/head"
import PageHeader from "../components/PageHeader"
import { authOptions } from "./api/auth/[...nextauth]"

const DocumentsPage = () => (
  <>
    <Head>
      <title>Documents | Lost Dot</title>
    </Head>
    <PageHeader />
    <div className="documents">
      <header className="admin-header">
        <h1>Your documents</h1>
      </header>

      <p className="no-results">No documents to show right now.</p>
    </div>
  </>
)

export default DocumentsPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: `/auth/sign-in`,
        permanent: false,
      },
    }

  const documents = await prisma.document.findMany({
    where: {
      ownedBy: session.user.id,
    },
  })

  return {
    props: {
      documents: documents.map(document =>
        JSON.parse(JSON.stringify(document))
      ),
    },
  }
}

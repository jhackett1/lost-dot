import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import ApplicationList from "../../components/ApplicationList"
import PageHeader from "../../components/PageHeader"
import { getRaceById } from "../../lib/races"

const ApplicationsPage = ({ applications }) => (
  <>
    <Head>
      <title>Active applications | Lost Dot</title>
    </Head>

    <PageHeader />

    <ApplicationList applications={applications} />
  </>
)

export default ApplicationsPage

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  const applications = await prisma.application.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return {
    props: {
      applications: applications.map(application =>
        JSON.parse(JSON.stringify(application))
      ),
    },
  }
}

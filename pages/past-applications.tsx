import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import Head from "next/head"
import ApplicationList from "../components/ApplicationList"
import PageHeader from "../components/PageHeader"
import prisma from "../lib/prisma"
import { authOptions } from "./api/auth/[...nextauth]"

const PastApplicationsPage = ({
  applications,
}: {
  applications: Application[]
}) => (
  <>
    <Head>
      <title>Past applications | Lost Dot</title>
    </Head>

    <PageHeader />

    {applications.length > 0 ? (
      <ApplicationList applications={applications} />
    ) : (
      <p className="no-results">You have no past applications</p>
    )}
  </>
)

export default PastApplicationsPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: `/auth/sign-in`,
        permanent: false,
      },
    }

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

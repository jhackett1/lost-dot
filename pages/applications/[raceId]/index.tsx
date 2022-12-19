import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import ApplicationBox from "../../../components/ApplicationBox"
import PageHeader from "../../../components/PageHeader"
import { getRaceById } from "../../../lib/races"
import prisma from "../../../lib/prisma"

const ApplicationPage = (application: Application) => {
  const race = getRaceById(application.raceId)

  return (
    <>
      <Head>
        <title>Your {race.title} application | Lost Dot</title>
      </Head>

      <PageHeader />

      <ApplicationBox race={race} application={application} />
    </>
  )
}

export default ApplicationPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { raceId } = context.params
  const session = await getSession(context)

  const application = await prisma.application.findUnique({
    where: {
      raceId_userId: {
        userId: session.user.id,
        raceId: raceId as string,
      },
    },
  })

  if (!application)
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    }

  return {
    props: JSON.parse(JSON.stringify(application)),
  }
}

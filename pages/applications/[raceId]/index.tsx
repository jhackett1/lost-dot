import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import ApplicationBox from "../../../components/ApplicationBox"
import PageHeader from "../../../components/PageHeader"
import { getRaceById } from "../../../lib/races"
import prisma from "../../../lib/prisma"
import { useEffect } from "react"
import { authOptions } from "../../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"

const ApplicationPage = (application: Application) => {
  const race = getRaceById(application.raceId)

  return (
    <>
      <Head>
        <title>
          Your {race?.title || application.raceId} application | Lost Dot
        </title>
      </Head>

      <PageHeader />

      <ApplicationBox race={race} application={application} />
    </>
  )
}

export default ApplicationPage

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const { raceId } = params
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: `/auth/sign-in`,
        permanent: false,
      },
    }

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

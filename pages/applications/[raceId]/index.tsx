import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import PageHeader from "../../../components/PageHeader"
import { formatDate, formatDateAndTime } from "../../../lib/formatters"
import { getRaceById } from "../../../lib/races"

const ApplicationPage = (application: Application) => {
  const race = getRaceById(application.raceId)

  const completion = 0.5

  return (
    <>
      <Head>
        <title>Your {race.title} application | Lost Dot</title>
      </Head>

      <PageHeader />

      <div className="application-box">
        <h1 className="application-box__headline">
          Finish your {race.hashtag} application using the race manual
        </h1>

        <strong className="application-box__deadline">
          Deadline: {formatDateAndTime(race.deadline)}
        </strong>

        <div className="application-box__body">
          <p className="application-box__completion-meter">
            {Math.round(completion * 100)}% complete
          </p>

          <ol className="application-box__timeline">
            <li>Create a Lost Dot profile</li>
            <li>Answer a few questions and pay for the race manual</li>
            <li>
              Use the race manual to answer some specific questions to complete
              your application
              <a href="#">View race manual</a>
            </li>
          </ol>

          <Link
            href={`/applications/${application.raceId}/steps`}
            className="button"
          >
            Continue
          </Link>
        </div>
      </div>
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

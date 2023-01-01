import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import Head from "next/head"
import ApplicationList from "../../components/ApplicationList"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"
import prisma from "../../lib/prisma"
import { getRaceById } from "../../lib/races"
import { authOptions } from "../api/auth/[...nextauth]"

const ApplicationsPage = ({ applications }) => {
  const appliableRaces = races.filter(
    race =>
      !applications.map(application => application.raceId).includes(race.id)
  )

  const activeApplications = applications.filter(application => {
    const race = getRaceById(application.raceId)
    if (!race) return false
    return !(new Date(race.date) < new Date())
  })

  return (
    <>
      <Head>
        <title>Active applications | Lost Dot</title>
      </Head>

      <PageHeader />

      {activeApplications.length > 0 ? (
        <ApplicationList applications={activeApplications} />
      ) : (
        <p className="no-results">You have no active applications</p>
      )}

      {appliableRaces.length > 0 && (
        <form
          className="start-application-box"
          method="get"
          action="/applications/new"
        >
          <div className="field">
            <label htmlFor="race_id" className="field__label">
              Choose a race to apply to
            </label>
            <select name="race_id" id="race_id" className="field__input">
              {appliableRaces.map(race => (
                <option value={race.id} key={race.id}>
                  {race.title}
                </option>
              ))}
            </select>
          </div>

          <button>Start application</button>
        </form>
      )}
    </>
  )
}

export default ApplicationsPage

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

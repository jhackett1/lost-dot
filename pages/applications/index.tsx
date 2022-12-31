import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import ApplicationList from "../../components/ApplicationList"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"
import prisma from "../../lib/prisma"

const ApplicationsPage = ({ applications }) => {
  const appliableRaces = races.filter(
    race =>
      !applications.map(application => application.raceId).includes(race.id)
  )

  return (
    <>
      <Head>
        <title>Active applications | Lost Dot</title>
      </Head>

      <PageHeader />

      {applications.length > 0 ? (
        <ApplicationList applications={applications} />
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

import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import ApplicationList from "../../components/ApplicationList"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"

const AdminApplicationsPage = ({
  applications,
}: {
  applications: Application[]
}) => (
  <>
    <Head>
      <title>All applications | Lost Dot</title>
    </Head>

    <PageHeader />

    <h2>All applications</h2>

    <p>Showing {applications.length} results</p>

    <form>
      <div>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          placeholder="Search by name or contact detail..."
        />
      </div>

      <div>
        <label htmlFor="race">Races</label>
        <select id="race">
          <option>All races</option>
          {races.map(race => (
            <option key={race.id}>{race.title} only</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="type">Application type</label>
        <select id="type">
          <option>All applications</option>
          <option>Racing only</option>
          <option>Volunteering only</option>
        </select>
      </div>
    </form>

    <table>
      <thead>
        <tr>
          {Object.keys(applications[0]).map(key => (
            <th scope="col" key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {applications.map(user => (
          <tr key={user.id}>
            {Object.values(user).map(value => (
              <td key={value?.toString()}>{value?.toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default AdminApplicationsPage

export const getServerSideProps: GetServerSideProps = async context => {
  const applications = await prisma.application.findMany()

  return {
    props: {
      applications: applications.map(application =>
        JSON.parse(JSON.stringify(application))
      ),
    },
  }
}

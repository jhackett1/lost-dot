import { Application, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import ApplicationList from "../../components/ApplicationList"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"

const AdminApplicationsPage = ({ users }: { users: User[] }) => (
  <>
    <Head>
      <title>All users | Lost Dot</title>
    </Head>

    <PageHeader />

    <h2>All users</h2>

    <p>Showing {users.length} results</p>

    <form>
      <div>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          placeholder="Search by name or contact detail..."
        />
      </div>
    </form>

    <table>
      <thead>
        <tr>
          {Object.keys(users[0]).map(key => (
            <th scope="col" key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
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
  const users = await prisma.user.findMany()

  return {
    props: {
      users: users.map(users => JSON.parse(JSON.stringify(users))),
    },
  }
}

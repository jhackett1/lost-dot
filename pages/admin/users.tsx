import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import PageHeader from "../../components/PageHeader"
import prisma from "../../lib/prisma"
import GroupField from "../../components/GroupField"
import Field from "../../components/Field"
import { FormProvider, useForm } from "react-hook-form"

const AdminApplicationsPage = ({ users }: { users: User[] }) => {
  const helpers = useForm()

  return (
    <>
      <Head>
        <title>All users | Lost Dot</title>
      </Head>

      <PageHeader />

      <h2>All users</h2>

      <p>Showing {users.length} results</p>

      <FormProvider {...helpers}>
        <form>
          <Field
            label="Search"
            name="search"
            type="search"
            placeholder="Search by name or contact detail..."
            dontShowOptional
          />

          <fieldset className="fieldset">
            <legend>Only show</legend>

            <GroupField
              label="Administrators"
              value={1}
              name="only_admins"
              type="checkbox"
            />

            <GroupField
              label="Users with applications"
              value={1}
              name="only_with_applications"
              type="checkbox"
            />
          </fieldset>
        </form>
      </FormProvider>

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
}

export default AdminApplicationsPage

export const getServerSideProps: GetServerSideProps = async context => {
  const users = await prisma.user.findMany()

  return {
    props: {
      users: users.map(users => JSON.parse(JSON.stringify(users))),
    },
  }
}

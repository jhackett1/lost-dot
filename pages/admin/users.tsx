import { GetServerSideProps } from "next"
import Head from "next/head"
import PageHeader from "../../components/PageHeader"
import prisma from "../../lib/prisma"
import GroupField from "../../components/GroupField"
import Field from "../../components/Field"
import { FormProvider, useForm } from "react-hook-form"
import useSWR from "swr"
import { UserAdminFilters, UserWithApplications } from "../../types"
import { getRaceById } from "../../lib/races"
import { useState } from "react"

const AdminUsersPage = ({ users }: { users: UserWithApplications[] }) => {
  const helpers = useForm<UserAdminFilters>()

  const { data, mutate } = useSWR<UserWithApplications[]>(
    `/api/admin/users?${new URLSearchParams(helpers.getValues())}`,
    {
      fallbackData: users,
    }
  )

  return (
    <>
      <Head>
        <title>All users | Lost Dot</title>
      </Head>

      <PageHeader />

      <h2>All users</h2>

      <p>Showing {users.length} results</p>

      <FormProvider {...helpers}>
        <form
          onSubmit={helpers.handleSubmit(() => mutate())}
          className="filters"
        >
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
            <th scope="col">User</th>
            <th scope="col">Their applications</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => {
            const [expanded, setExpanded] = useState<boolean>(false)

            return (
              <>
                <tr key={user.id} aria-expanded={expanded}>
                  <td scope="row">
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>
                    <p>
                      {user.email}{" "}
                      {user.admin && <span className="tag">Admin</span>}
                    </p>
                  </td>
                  <td>
                    <ul>
                      {user.applications.map(application => (
                        <li>{getRaceById(application.raceId).title}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => setExpanded(!expanded)}>
                      See {expanded ? "less" : "more"}
                    </button>
                  </td>
                </tr>
                {expanded && (
                  <tr>
                    <td colSpan={4}>More deets here</td>
                  </tr>
                )}
              </>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default AdminUsersPage

export const getServerSideProps: GetServerSideProps = async context => {
  const users = await prisma.user.findMany({
    include: {
      applications: true,
    },
  })

  return {
    props: {
      users: users.map(users => JSON.parse(JSON.stringify(users))),
    },
  }
}

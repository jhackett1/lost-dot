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
import { useEffect, useState } from "react"
import { prettyKey } from "../../lib/formatters"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import useUrlHash from "../../hooks/useUrlHash"

const AdminUsersPage = ({ users }: { users: UserWithApplications[] }) => {
  const helpers = useForm<UserAdminFilters>()

  const session = useSession()

  const { data, mutate } = useSWR<UserWithApplications[]>(
    `/api/admin/users?${new URLSearchParams(helpers.getValues())}`,
    {
      fallbackData: users,
    }
  )

  const [expanded, setExpanded] = useUrlHash()

  return (
    <>
      <Head>
        <title>All users | Lost Dot</title>
      </Head>

      <PageHeader />

      <header className="admin-header">
        <div>
          <h1>All users</h1>
          <p className="result-count">Showing {users.length} results</p>
        </div>

        <Link href="/api/users/export" className="button">
          Export CSV
        </Link>
      </header>

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

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col" className="visually-hidden">
              Avatar
            </th>
            <th scope="col">User</th>
            <th scope="col">Applications</th>
            <th scope="col" className="visually-hidden">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => {
            const open = expanded === user.id

            return (
              <>
                <tr key={user.id} aria-expanded={open} id={user.id}>
                  <td>
                    <img className="avatar" src="/mystery-person.svg" alt="" />
                  </td>
                  <td scope="row">
                    <strong>
                      {user.onboardedAt
                        ? `${user.firstName} ${user.lastName}`
                        : "Unknown"}
                    </strong>
                    <br />
                    {user.email}{" "}
                    {user.admin && (
                      <span className="tag tag--yellow">Admin</span>
                    )}
                    {!user.onboardedAt && (
                      <span className="tag tag--grey">Not yet onboarded</span>
                    )}
                    {user.id === session?.data?.user?.id && (
                      <span className="tag">You</span>
                    )}
                  </td>
                  <td>
                    <ul>
                      {user.applications.map(application => (
                        <li>
                          <Link href={`/admin/applications#${application.id}`}>
                            {getRaceById(application.raceId)?.title ||
                              "Unknown race"}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        open ? setExpanded(false) : setExpanded(user.id)
                      }
                      className="link"
                    >
                      See {open ? "less" : "more"}
                    </button>
                  </td>
                </tr>
                {open && (
                  <tr className="expanded-row">
                    <td colSpan={4}>
                      <dl>
                        {Object.entries(user).map(entry => (
                          <div>
                            <dt>{prettyKey(entry[0])}</dt>
                            <dd>{JSON.stringify(entry[1], null, 2)}</dd>
                          </div>
                        ))}
                      </dl>
                    </td>
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
      // grab most recent session
      sessions: {
        orderBy: {
          expires: "desc",
        },
        take: 1,
      },
    },
  })

  return {
    props: {
      users: users.map(users => JSON.parse(JSON.stringify(users))),
    },
  }
}

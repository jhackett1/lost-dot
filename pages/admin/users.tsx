import { GetServerSideProps } from "next"
import Head from "next/head"
import PageHeader from "../../components/PageHeader"
import prisma from "../../lib/prisma"
import GroupField from "../../components/GroupField"
import Field from "../../components/Field"
import { FormProvider, useForm } from "react-hook-form"
import useSWR from "swr"
import { UserAdminFilters, UserWithApplicationsAndSessions } from "../../types"
import { getRaceById } from "../../lib/races"
import React, { useEffect, useState } from "react"
import { prettyKey, prettyTimeDiff } from "../../lib/formatters"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import useUrlHash from "../../hooks/useUrlHash"
import UserFilters from "../../components/UserFilters"
import { useUsers } from "../../hooks/useAdminData"
import ExpanderRow from "../../components/ExpanderRow"
import { commonUsersQuery } from "../api/admin/users"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"

const AdminUsersPage = ({
  initialUsers,
}: {
  initialUsers: UserWithApplicationsAndSessions[]
}) => {
  const helpers = useForm<UserAdminFilters>()
  const session = useSession()
  const { data, mutate } = useUsers(helpers, initialUsers)
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
          <p className="result-count">
            Showing {data.count} result{data.count !== 1 && "s"}
          </p>
        </div>

        <Link href="/api/admin/users/export" className="button">
          Export CSV
        </Link>
      </header>

      <FormProvider {...helpers}>
        <UserFilters {...helpers} mutate={mutate} />
      </FormProvider>

      {data.data.length > 0 ? (
        <div className="table-holder">
          <table>
            <thead>
              <tr>
                <th scope="col" className="visually-hidden">
                  Avatar
                </th>
                <th scope="col">User</th>
                <th scope="col">Applications</th>
                <th scope="col">Last signed in</th>
                <th scope="col" className="visually-hidden">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map(user => {
                const open = expanded === user.id

                return (
                  <React.Fragment key={user.id}>
                    <tr aria-expanded={open} id={user.id}>
                      <td>
                        <img
                          className="avatar"
                          src="/mystery-person.svg"
                          alt=""
                        />
                      </td>
                      <td scope="row">
                        <strong>
                          {user.onboardedAt
                            ? `${user.firstName} ${user.lastName}`
                            : "Unknown"}
                        </strong>
                        <br />
                        <span className="secondary-text">
                          {user.email}
                        </span>{" "}
                        {user.admin && (
                          <span className="tag tag--yellow">Admin</span>
                        )}
                        {!user.onboardedAt && (
                          <span className="tag tag--grey">
                            Not yet onboarded
                          </span>
                        )}
                        {user.id === session?.data?.user?.id && (
                          <span className="tag">You</span>
                        )}
                      </td>
                      <td>
                        <ul>
                          {user.applications.map(application => (
                            <li key={application.id}>
                              <Link
                                href={`/admin/applications#${application.id}`}
                              >
                                {getRaceById(application.raceId)?.title ||
                                  application.raceId}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        {prettyTimeDiff(user?.sessions?.[0]?.createdAt) ||
                          "Never"}
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
                    {open && <ExpanderRow {...user} />}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-results">No results</p>
      )}
    </>
  )
}

export default AdminUsersPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: `/auth/sign-in`,
        permanent: false,
      },
    }

  if (!session.user.admin)
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }

  const users = await prisma.user.findMany(commonUsersQuery)

  return {
    props: {
      initialUsers: users.map(users => JSON.parse(JSON.stringify(users))),
    },
  }
}

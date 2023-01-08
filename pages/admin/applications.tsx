import React from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { FormProvider, useForm } from "react-hook-form"
import PageHeader from "../../components/PageHeader"
import prisma from "../../lib/prisma"
import useSWR from "swr"
import { getRaceById } from "../../lib/races"
import {
  AdminAPIResponse,
  ApplicationAdminFilters,
  ApplicationStatus,
  ApplicationWithUser,
} from "../../types"
import { formatDate, prettyKey, prettyStatus } from "../../lib/formatters"
import { getStatus } from "../../lib/applications"
import Link from "next/link"
import { removeFalsy } from "../../lib/helpers"
import useUrlHash from "../../hooks/useUrlHash"
import ApplicationFilters from "../../components/ApplicationFilters"
import { useApplications } from "../../hooks/useAdminData"
import ExpanderRow from "../../components/ExpanderRow"
import { commonApplicationsQuery } from "../api/admin/applications"
import { useSession } from "next-auth/react"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import ApplicationColumns from "../../components/ApplicationColumns"

const AdminApplicationsPage = ({
  initialApplications,
}: {
  initialApplications: ApplicationWithUser[]
}) => {
  const helpers = useForm<ApplicationAdminFilters>()
  const { data, mutate, isLoading } = useApplications(
    helpers,
    initialApplications
  )
  const { data: sessionData } = useSession()
  const [expanded, setExpanded] = useUrlHash()

  return (
    <>
      <Head>
        <title>All applications | Lost Dot</title>
      </Head>

      <PageHeader />

      <header className="admin-header">
        <div>
          <h1>All applications</h1>
          <p className="result-count">
            Showing {data.count} result{data.count !== 1 && "s"}
          </p>
        </div>

        <Link href="/api/admin/applications/export" className="button">
          Export CSV
        </Link>
      </header>

      <FormProvider {...helpers}>
        <ApplicationFilters {...helpers} mutate={mutate} />
      </FormProvider>

      {data.data.length > 0 ? (
        <div className="table-holder">
          <table
            className={`admin-table ${isLoading ? "admin-table--loading" : ""}`}
          >
            <thead>
              <tr>
                <th scope="col">Applicant</th>
                <th scope="col">Race</th>

                {sessionData?.user?.preferences?.map(col => (
                  <th scope="col">{col}</th>
                ))}

                <th scope="col" className="visually-hidden">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map(application => {
                const open = expanded === application.id

                const status = getStatus(application)

                return (
                  <React.Fragment key={application.id}>
                    <tr aria-expanded={open} id={application.id}>
                      <td>
                        <Link href={`/admin/users#${application.user.id}`}>
                          {application.user.firstName}{" "}
                          {application.user.lastName}
                        </Link>
                      </td>
                      <td scope="row">
                        {getRaceById(application.raceId)?.title ||
                          application.raceId}
                      </td>

                      {sessionData?.user?.preferences?.map(col => (
                        <ApplicationColumns
                          col={col}
                          application={application}
                        />
                      ))}

                      <td>
                        <button
                          onClick={() =>
                            open
                              ? setExpanded(false)
                              : setExpanded(application.id)
                          }
                          className="link"
                        >
                          See {open ? "less" : "more"}
                        </button>
                      </td>
                    </tr>

                    {open && <ExpanderRow {...application} />}
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

export default AdminApplicationsPage

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

  const applications = await prisma.application.findMany(
    commonApplicationsQuery
  )

  return {
    props: {
      initialApplications: applications.map(application =>
        JSON.parse(JSON.stringify(application))
      ),
    },
  }
}

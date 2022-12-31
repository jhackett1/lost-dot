import { Application, ApplicationType } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"
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
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { removeFalsy } from "../../lib/helpers"
import useUrlHash from "../../hooks/useUrlHash"

const AdminApplicationsPage = ({
  initialApplications,
}: {
  initialApplications: ApplicationWithUser[]
}) => {
  const helpers = useForm<ApplicationAdminFilters>()

  const {
    data: { data },
    mutate,
  } = useSWR<AdminAPIResponse<ApplicationWithUser[]>>(
    `/api/admin/applications?${new URLSearchParams(
      removeFalsy(helpers.getValues())
    )}`,
    {
      fallbackData: {
        count: initialApplications.length,
        data: initialApplications,
      },
    }
  )

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
          <p className="result-count">Showing {data.length} results</p>
        </div>

        <Link href="/api/applications/export" className="button">
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

          <Field type="select" label="Races" name="race_id" dontShowOptional>
            <option value="">All races</option>
            {races.map(race => (
              <option key={race.id} value={race.id}>
                {race.title} only
              </option>
            ))}
          </Field>

          <Field
            type="select"
            label="Application type"
            name="application_type"
            dontShowOptional
          >
            <option value="">All applications</option>
            <option value={ApplicationType.Racing}>Racing only</option>
            <option value={ApplicationType.Volunteering}>
              Volunteering only
            </option>
          </Field>
        </form>
      </FormProvider>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Race</th>
            <th scope="col">Type</th>

            <th scope="col">Applicant</th>

            <th scope="col">Started</th>

            <th scope="col">Status</th>
            <th scope="col" className="visually-hidden">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(application => {
            const open = expanded === application.id

            return (
              <>
                <tr
                  key={application.id}
                  aria-expanded={open}
                  id={application.id}
                >
                  <td scope="row">
                    {getRaceById(application.raceId)?.title || "Unknown race"}
                  </td>
                  <td>{application.type}</td>
                  <td>
                    <Link href={`/admin/users#${application.user.id}`}>
                      {application.user.firstName} {application.user.lastName}
                    </Link>
                  </td>
                  <td>{formatDate(application.createdAt)}</td>
                  <td>
                    <span className="tag">
                      {prettyStatus(getStatus(application))}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        open ? setExpanded(false) : setExpanded(application.id)
                      }
                      className="link"
                    >
                      See {open ? "less" : "more"}
                    </button>
                  </td>
                </tr>

                {open && (
                  <tr className="expanded-row">
                    <td colSpan={6}>
                      <dl>
                        {Object.entries(application).map(entry => (
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

export default AdminApplicationsPage

export const getServerSideProps: GetServerSideProps = async context => {
  const applications = await prisma.application.findMany({
    include: {
      user: true,
    },
  })

  return {
    props: {
      initialApplications: applications.map(application =>
        JSON.parse(JSON.stringify(application))
      ),
    },
  }
}

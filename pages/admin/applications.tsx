import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"
import prisma from "../../lib/prisma"
import useSWR from "swr"
import { getRaceById } from "../../lib/races"
import { ApplicationAdminFilters, ApplicationWithUser } from "../../types"
import { formatDate } from "../../lib/formatters"
import { getStatus } from "../../lib/applications"

const AdminApplicationsPage = ({
  applications,
}: {
  applications: ApplicationWithUser[]
}) => {
  const helpers = useForm<ApplicationAdminFilters>()

  const { data, mutate } = useSWR<ApplicationWithUser[]>(
    `/api/admin/applications?${new URLSearchParams(helpers.getValues())}`,
    {
      fallbackData: applications,
    }
  )

  return (
    <>
      <Head>
        <title>All applications | Lost Dot</title>
      </Head>

      <PageHeader />

      <h2>All applications</h2>

      <p>Showing {data.length} results</p>

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
            <option>All races</option>
            {races.map(race => (
              <option key={race.id}>{race.title} only</option>
            ))}
          </Field>

          <Field
            type="select"
            label="Application type"
            name="application_type"
            dontShowOptional
          >
            <option>All applications</option>
            <option>Racing only</option>
            <option>Volunteering only</option>
          </Field>
        </form>
      </FormProvider>

      <table>
        <thead>
          <tr>
            <th scope="col">Race</th>
            <th scope="col">Type</th>

            <th scope="col">Applicant</th>

            <th scope="col">Started</th>

            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td scope="row">{getRaceById(application.raceId).title}</td>
              <td>Race</td>
              <td>
                {application.user.firstName} {application.user.lastName}
              </td>
              <td>{formatDate(application.createdAt)}</td>
              <td>{getStatus(application)}</td>
            </tr>
          ))}
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
      applications: applications.map(application =>
        JSON.parse(JSON.stringify(application))
      ),
    },
  }
}

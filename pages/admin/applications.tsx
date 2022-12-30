import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
import PageHeader from "../../components/PageHeader"
import races from "../../data/races.json"
import prisma from "../../lib/prisma"

const AdminApplicationsPage = ({
  applications,
}: {
  applications: Application[]
}) => {
  const helpers = useForm()

  return (
    <>
      <Head>
        <title>All applications | Lost Dot</title>
      </Head>

      <PageHeader />

      <h2>All applications</h2>

      <p>Showing {applications.length} results</p>

      <FormProvider {...helpers}>
        <form>
          <Field
            label="Search"
            name="search"
            type="search"
            placeholder="Search by name or contact detail..."
            dontShowOptional
          />

          <Field type="select" label="Races" name="races" dontShowOptional>
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
}

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

import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import races from "../../../../data/races.json"
import legals from "../../../../data/legals.json"
import Field from "../../../../components/Field"
import { FormProvider, useForm } from "react-hook-form"
import { generateApplicationSchema } from "../../../../lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import Loader from "../../../../components/Loader"
import GroupField from "../../../../components/GroupField"

const ApplicationStepIndexPage = (application: Application) => {
  const race = races.find(race => race.id === application.raceId)
  const methods = useForm({
    defaultValues: application.answers as { [x: string]: any },
    // resolver: zodResolver(generateApplicationSchema(questions)),
  })

  const onSubmit = async values => {
    await fetch(`/api/applications/${application.raceId}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
  }

  return (
    <>
      <h1>Apply to ride</h1>
      <p className="caption">{race?.title || "Unknown race"}</p>

      <h2>Legals</h2>
      <p>
        By applying for the Transcontinental Race No.9 we expect you to have a
        good understanding of what you're signing up for. If you are new to the
        race and would like to learn more about it please access the information
        on our website transcontinental.cc.
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <fieldset>
            <legend>Please confirm the following:</legend>
            {legals.map(legal => (
              <GroupField
                name="legals"
                label={legal}
                key={legal}
                value={legal}
                type="checkbox"
              />
            ))}
          </fieldset>

          <Link href={`/applications/${application.raceId}/steps`}>
            Go back
          </Link>

          <button disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader />}
            Continue
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default ApplicationStepIndexPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { raceId } = context.params
  const session = await getSession(context)

  const application = await prisma.application.findUnique({
    where: {
      raceId_userId: {
        userId: session.user.id,
        raceId: raceId as string,
      },
    },
  })

  if (!application)
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    }

  return {
    props: JSON.parse(JSON.stringify(application)),
  }
}

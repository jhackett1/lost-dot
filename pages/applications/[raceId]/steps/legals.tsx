import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import races from "../../../../data/races.json"
import legals from "../../../../data/legals.json"
import Field from "../../../../components/Field"
import { FormProvider, useForm } from "react-hook-form"
import {
  generateApplicationSchema,
  legalsSchema,
} from "../../../../lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import Loader from "../../../../components/Loader"
import GroupField from "../../../../components/GroupField"
import { useRouter } from "next/router"
import { z } from "zod"

const ApplicationStepIndexPage = (application: Application) => {
  const race = races.find(race => race.id === application.raceId)

  const { push } = useRouter()
  const methods = useForm({
    defaultValues: application.answers as { [x: string]: any },
    resolver: zodResolver(legalsSchema),
  })

  const onSubmit = async values => {
    const res = await fetch(`/api/applications/${application.raceId}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
    if (res.ok) push(`/applications/${application.raceId}/steps/pay`)
  }

  const error = methods.formState.errors["legals"]

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
          <fieldset className="fieldset">
            <legend>Please confirm the following:</legend>

            {error && (
              <p role="alert" className="error">
                {error.message.toString()}
              </p>
            )}

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

          <div className="form__footer">
            {!methods.formState.isValid &&
              methods.formState.submitCount > 0 && (
                <p role="alert" className="error">
                  There are errors with your application
                </p>
              )}

            <Link href={`/applications/${application.raceId}/steps`}>
              Go back
            </Link>
            <button disabled={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting && <Loader />}
              Save
            </button>
          </div>
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

import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import races from "../../../../data/races.json"
import questions from "../../../../data/about-you.json"
import Field from "../../../../components/Field"
import { FormProvider, useForm } from "react-hook-form"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { generateApplicationSchema } from "../../../../lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import Loader from "../../../../components/Loader"
import GroupField from "../../../../components/GroupField"

const ApplicationStepAboutYouPage = (application: Application) => {
  const race = races.find(race => race.id === application.raceId)

  const { push } = useRouter()
  const methods = useForm({
    defaultValues: application.answers as { [x: string]: any },
    resolver: zodResolver(generateApplicationSchema(questions)),
  })

  const onSubmit = async values => {
    const res = await fetch(`/api/applications/${application.raceId}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
    if (res.ok) push(`/applications/${application.raceId}/steps/legals`)
  }

  return (
    <>
      <h1>Apply to ride</h1>
      <p className="caption">{race?.title || "Unknown race"}</p>

      <h2>About you</h2>
      <p>
        First we'd like a little more information about you, your history with
        the race or ultra endurance racing and your experience. Transcontinental
        is not all about qualifying but if you have done some big things before
        or if you look like you could win it we want to know. Here's your chance
        to tell us. Please be kind and keep your answers short, sweet and
        relevant.
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          {questions.map(question => {
            if (question.options)
              return (
                <fieldset>
                  <legend>{question.label}</legend>
                  {question.options.map(option => (
                    <GroupField
                      name={question.name}
                      label={option}
                      key={option}
                      type={question.type}
                      value={option}
                    />
                  ))}
                </fieldset>
              )

            return <Field {...question} key={question.name} />
          })}

          <button disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader />}
            Continue
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default ApplicationStepAboutYouPage

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

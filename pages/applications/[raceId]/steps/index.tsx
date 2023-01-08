import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import races from "../../../../data/races.json"
import questions from "../../../../data/about-you"
import { FormProvider, useForm } from "react-hook-form"
import { generateApplicationSchema } from "../../../../lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import Loader from "../../../../components/Loader"
import ErrorSummary from "../../../../components/ErrorSummary"
import prisma from "../../../../lib/prisma"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]"
import FlexibleFormFields from "../../../../components/FlexibleFormFields"
import Head from "next/head"

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
      <Head>
        <title>Apply to ride | Lost Dot</title>
      </Head>

      <div className="narrow-container centred">
        <h1>Apply to ride</h1>
        <p className="caption">{race?.title || application.raceId}</p>

        <h2>About you</h2>

        <p className="centred">
          First we'd like a little more information about you, your history with
          the race or ultra endurance racing and your experience.
          Transcontinental is not all about qualifying but if you have done some
          big things before or if you look like you could win it we want to
          know. Here's your chance to tell us. Please be kind and keep your
          answers short, sweet and relevant.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <>
            <FlexibleFormFields questions={questions} />

            <ErrorSummary>
              There are errors with your application—answer all the required
              questions and try again.
            </ErrorSummary>

            <div className="form__footer">
              <button disabled={methods.formState.isSubmitting}>
                {methods.formState.isSubmitting && <Loader />}
                Save
              </button>
            </div>
          </>
        </form>
      </FormProvider>
    </>
  )
}

export default ApplicationStepAboutYouPage

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const { raceId } = params
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: `/auth/sign-in`,
        permanent: false,
      },
    }

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

import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Link from "next/link"

const ApplicationPage = (application: Application) => (
  <>
    <h1>Application detail page</h1>

    <div>{JSON.stringify(application, null, 2)}</div>

    <Link href={`/applications/${application.raceId}/steps`} className="button">
      Continue
    </Link>
  </>
)

export default ApplicationPage

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

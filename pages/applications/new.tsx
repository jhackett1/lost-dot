import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

const NewApplicationPage = () => null

export default NewApplicationPage

export const getServerSideProps: GetServerSideProps = async context => {
  const race_id = context.query?.race_id

  if (!race_id)
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }

  const session = await getSession(context)

  if (!session)
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }

  const userId = session.user.id

  const application = await prisma.application.upsert({
    where: {
      raceId_userId: {
        raceId: race_id as string,
        userId,
      },
    },
    create: {
      user: {
        connect: {
          id: userId,
        },
      },
      raceId: race_id as string,
      answers: {},
    },
    update: {},
  })

  return {
    redirect: {
      destination: `/applications/${application.raceId}`,
      permanent: false,
    },
  }
}

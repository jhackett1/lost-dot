import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]"
import prisma from "../../lib/prisma"

const NewApplicationPage = () => null

export default NewApplicationPage

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const race_id = query?.race_id

  if (!race_id)
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session)
    return {
      redirect: {
        destination: `/auth/sign-in?callbackUrl=${req.url}`,
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

  if (session.user.onboardedAt) {
    // if the user is onboarded, take them to their new application
    return {
      redirect: {
        destination: `/applications/${application.raceId}/steps`,
        permanent: false,
      },
    }
  } else {
    // otherwise, take them to onboarding/profile page
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }
}

import UserForm from "../components/UserForm"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { User } from "@prisma/client"
import PageHeader from "../components/PageHeader"
import Head from "next/head"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

const ProfilePage = (user?: User) => {
  return (
    <div>
      <Head>
        <title>
          {user.onboardedAt
            ? "Profile | Lost Dot"
            : "Create a profile | Lost Dot"}
        </title>
      </Head>

      {user.onboardedAt ? (
        <PageHeader />
      ) : (
        <header className="page-header">
          <h1 className="page-header__heading">Hello!</h1>
          <p className="page-header__caption">
            First, create a Lost Dot profile
          </p>
        </header>
      )}

      {user && <UserForm user={user} />}
    </div>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  })

  if (!session || !user)
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }

  return {
    props: JSON.parse(JSON.stringify(user)),
  }
}

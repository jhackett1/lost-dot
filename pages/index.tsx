import UserForm from "../components/UserForm"
import useProtected from "../hooks/useProtected"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { User } from "@prisma/client"
import AppNav from "../components/AppNav"
import PageHeader from "../components/PageHeader"
import Head from "next/head"

const ProfilePage = (user?: User) => {
  useProtected()

  return (
    <div>
      <Head>
        <title>
          {user.onboardedAt ? "Profile" : "Create a profile"} | Lost Dot
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

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  })

  return {
    props: JSON.parse(JSON.stringify(user)),
  }
}

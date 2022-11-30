import UserForm from "../components/UserForm"
import useProtected from "../hooks/useProtected"
import prisma from "../lib/prisma"
import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { User } from "@prisma/client"

const ProfilePage = (user?: User) => {
  useProtected()

  return (
    <div>
      {JSON.stringify(user)}

      <h1>Testing</h1>

      {user && <UserForm user={user} />}
    </div>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  })

  return {
    props: JSON.parse(JSON.stringify(user)),
  }
}

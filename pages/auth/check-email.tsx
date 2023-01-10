import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { authOptions } from "../api/auth/[...nextauth]"

const CheckEmailPage = () => {
  const methods = useForm()

  const onSubmit = async values => {
    const res = await signIn("email", values)
  }

  return (
    <div className="page-header">
      <h1 className="page-header__heading">Check your email</h1>
      <p className="page-header__body">
        A sign in link has been sent to your email address.
      </p>
      <p className="page-header__body">
        If you&apos;re having trouble signing in,{" "}
        <Link href="/">let us know</Link>.
      </p>
    </div>
  )
}

export default CheckEmailPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  // disallow access if user is already signed in
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }

  return {
    props: {},
  }
}

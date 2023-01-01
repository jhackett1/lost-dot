import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
import { SignInSchema } from "../../lib/validators"
import { authOptions } from "../api/auth/[...nextauth]"

const SignInPage = () => {
  const methods = useForm({
    resolver: zodResolver(SignInSchema),
  })

  const { query } = useRouter()

  const onSubmit = async values => {
    const res = await signIn("email", {
      ...values,
      callbackUrl: query.callbackUrl || "/",
    })
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__heading">Sign in to Lost Dot</h1>
        <p className="page-header__body">
          To sign in or sign up, enter your email address below and we'll email
          you a one-time magic link.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form form--sign-in"
        >
          <Field
            label="Your email"
            name="email"
            autoComplete="email"
            required
          />
          <button>Continue</button>
        </form>
      </FormProvider>
    </>
  )
}

export default SignInPage

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

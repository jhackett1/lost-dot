import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSideProps } from "next"
import { getCsrfToken, getSession, signIn } from "next-auth/react"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
import useNotSignedIn from "../../hooks/useNotSignedIn"
import { SignInSchema } from "../../lib/validators"

const SignInPage = () => {
  const methods = useForm({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = async values => {
    const res = await signIn("email", values)
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

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  // disallow access if user is signed in
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

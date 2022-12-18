import { GetServerSideProps } from "next"
import { getCsrfToken, getSession, signIn } from "next-auth/react"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"

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
        If you're having trouble signing in, <a href="/">let us know</a>.
      </p>
    </div>
  )
}

export default CheckEmailPage

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

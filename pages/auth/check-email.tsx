import { getCsrfToken, signIn } from "next-auth/react"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"

const CheckEmailPage = () => {
  const methods = useForm()

  const onSubmit = async values => {
    const res = await signIn("email", values)
  }

  return (
    <div className="container">
      <h1>Check your email</h1>
      <p>A sign in link has been sent to your email address.</p>
      <p>
        If you're having trouble signing in, <a href="/">let us know</a>.
      </p>
    </div>
  )
}

export default CheckEmailPage

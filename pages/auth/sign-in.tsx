import { zodResolver } from "@hookform/resolvers/zod"
import { getCsrfToken, signIn } from "next-auth/react"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
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
      <h1>Sign in to Lost Dot</h1>
      <p>
        Lost Dot uses passwordless sign-in. To sign in or sign up just enter
        your email address below and you'll be emailed a one-time sign-in link.
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Field label="Email" name="email" />
          <button type="submit">Continue</button>
        </form>
      </FormProvider>
    </>
  )
}

export default SignInPage

// export async function getServerSideProps(context) {
//   const csrfToken = await getCsrfToken(context)
//   return {
//     props: { csrfToken },
//   }
// }

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { EffectCallback, useEffect, useState } from "react"
import CheckoutForm from "../../../../components/CheckoutForm"
import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { getRaceById } from "../../../../lib/races"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const ApplicationPayPage = (application: Application) => {
  const [clientSecret, setClientSecret] = useState<string>("")

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`/api/applications/${application.raceId}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "none",
    },
  }

  return (
    <>
      <h1>
        You will need to study the race manual to complete your application
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default ApplicationPayPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { raceId } = context.params
  const session = await getSession(context)

  const application = await prisma.application.findUnique({
    where: {
      raceId_userId: {
        userId: session.user.id,
        raceId: raceId as string,
      },
    },
  })

  if (!application)
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    }

  return {
    props: JSON.parse(JSON.stringify(application)),
  }
}

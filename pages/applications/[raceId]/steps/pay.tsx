import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import CheckoutForm from "../../../../components/CheckoutForm"
import { Application } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { getRaceById } from "../../../../lib/races"
import { formatCurrency } from "../../../../lib/formatters"
import prisma from "../../../../lib/prisma"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const ApplicationPayPage = (application: Application) => {
  const [clientSecret, setClientSecret] = useState<string>("")

  const race = getRaceById(application.raceId)

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
      variables: {
        colorPrimary: "#01636A",
        colorBackground: "#ffffff",
        colorText: "#0b0c0c",
        colorDanger: "#921414",
        fontFamily: "'Open Sans', sans-serif",
        // fontSizeBase: "17px",
        spacingUnit: "5px",
        borderRadius: "5px",
        focusOutline: "#dda437",
        focusBoxShadow: "#dda437",
      },
    },
  }

  return (
    <div className="narrow-container">
      <h1>
        You will need to study the race manual to complete your application
      </h1>

      <p>
        We take a small payment of{" "}
        <strong>{formatCurrency(race.costs.expressionOfInterest)}</strong> to
        provide you with the race manual.
      </p>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            completionLink={`${process.env.PUBLIC_URL}/applications/${application.raceId}`}
            goBackLink={`/applications/${application.raceId}/steps/legals`}
          />
        </Elements>
      )}
    </div>
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

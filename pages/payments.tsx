import { GetServerSideProps } from "next"
import Stripe from "stripe"

const PaymentsPage = charges => (
  <ul>
    {charges.data.map(charge => (
      <li>{JSON.stringify(charge)}</li>
    ))}
  </ul>
)

export default PaymentsPage

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  })

  const charges = await stripe.charges.list({
    limit: 10,
  })

  return {
    props: charges,
  }
}

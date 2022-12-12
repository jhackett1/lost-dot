import { GetServerSideProps } from "next"
import Head from "next/head"
import Stripe from "stripe"
import AppNav from "../components/AppNav"
import PageHeader from "../components/PageHeader"

const PaymentsPage = (
  charges: Stripe.Response<Stripe.ApiList<Stripe.Charge>>
) => (
  <>
    <Head>
      <title>Payments | Lost Dot</title>
    </Head>
    <PageHeader />
    <table>
      <thead>
        <tr>
          <th scope="col">Payment</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Customer</th>
        </tr>
      </thead>
      <tbody>
        {charges.data.map(charge => (
          <tr key={charge.id}>
            <td scope="row">{charge.description}</td>
            <td>{new Date(charge.created * 1000).toDateString()}</td>
            <td>{charge.amount}</td>
            <td>{charge.customer.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
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

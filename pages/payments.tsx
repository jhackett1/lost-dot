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
          {Object.keys(charges.data[0]).map(key => (
            <th scope="col" key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {charges.data.map(user => (
          <tr key={user.id}>
            {Object.values(user).map(value => (
              <td key={value?.toString()}>{value?.toString()}</td>
            ))}
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

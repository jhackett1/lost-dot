import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import Head from "next/head"
import Stripe from "stripe"
import PageHeader from "../components/PageHeader"
import { getPaymentsByCustomer } from "../lib/payments"
import { formatCurrency, formatDate, prettyKey } from "../lib/formatters"
import { authOptions } from "./api/auth/[...nextauth]"
import Link from "next/link"
import { getRaceById } from "../lib/races"

const PaymentsPage = (
  charges: Stripe.Response<Stripe.ApiList<Stripe.Charge>>
) => (
  <>
    <Head>
      <title>Payments | Lost Dot</title>
    </Head>
    <PageHeader />

    <div className="payments">
      <header className="admin-header">
        <h1>Your payments</h1>
      </header>

      <div className="table-holder">
        <table>
          <thead>
            <tr>
              <th scope="col" className="visually-hidden">
                Charge
              </th>
              <th scope="col">Amount</th>
              <th scope="col">Made</th>
              <th scope="col" className="visually-hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {charges.data.map(charge => (
              <tr key={charge.id}>
                <td scope="row">
                  <strong>
                    {getRaceById(charge.metadata["raceId"])?.title ||
                      charge.metadata["raceId"]}
                  </strong>
                  <br />
                  <span className="secondary-text">
                    {prettyKey(charge.metadata["type"])}
                  </span>
                </td>
                <td>{formatCurrency(charge.amount / 100)}</td>
                <td>{formatDate(charge.created * 1000)}</td>
                <td>
                  <Link href={charge.receipt_url}>View receipt</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
)

export default PaymentsPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const charges = await getPaymentsByCustomer(session.user.customerId)

  return {
    props: charges,
  }
}

import { NextApiHandler } from "next"
import { getRaceById } from "../../../../lib/races"
import Stripe from "stripe"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import { PaymentType } from "../../../../types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
})

const handler: NextApiHandler = async (req, res) => {
  const race = getRaceById(req.query.raceId as string)
  const session = await unstable_getServerSession(req, res, authOptions)

  const paymentType = PaymentType.expressionOfInterest // TODO: make this dynamic

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: race.costs[paymentType] * 100,
      currency: "gbp",
      receipt_email: session.user.email,
      automatic_payment_methods: {
        enabled: true,
      },
      customer: session.user.customerId,
      metadata: {
        raceId: race.id,
        type: paymentType,
        userId: session.user.id,
      },
    },
    {
      idempotencyKey: `${race.id}-${session.user.customerId}-${paymentType}`,
    }
  )

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}

export default handler

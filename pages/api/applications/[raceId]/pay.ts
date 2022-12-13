import { NextApiHandler } from "next"
import { getRaceById } from "../../../../lib/races"
import Stripe from "stripe"
import { getSession } from "next-auth/react"
import { PaymentType } from "@prisma/client"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
})

const handler: NextApiHandler = async (req, res) => {
  const race = getRaceById(req.query.raceId as string)
  const session = await unstable_getServerSession(req, res, authOptions)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: race.costs.expressionOfInterest * 100,
    currency: "gbp",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    // customer: session.user.email,
    metadata: {
      raceId: race.id,
      type: PaymentType.expressionOfInterest, // TODO: make this dynamic, based on what the user has paid for
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}

export default handler

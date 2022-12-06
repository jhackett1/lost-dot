import { NextApiHandler } from "next"
import { getRaceById } from "../../../../lib/races"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

const handler: NextApiHandler = async (req, res) => {
  const race = getRaceById(req.query.raceId as string)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: race.costs.expressionOfInterest,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}

export default handler

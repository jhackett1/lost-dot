import type { NextApiHandler } from "next"
import Stripe from "stripe"
import { Readable } from "node:stream"
import { submitApplication } from "../../lib/applications.server"

const buffer = async (readable: Readable) => {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        const buf = await buffer(req)
        const sig = req.headers["stripe-signature"]

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2022-11-15",
        })

        const event = stripe.webhooks.constructEvent(
          buf,
          sig,
          process.env.STRIPE_WEBHOOK_SIGNING_SECRET
        )

        switch (event.type) {
          case "charge.succeeded":
            const charge = event.data.object as Stripe.Charge

            await submitApplication(
              charge.metadata["raceId"],
              charge.metadata["userId"]
            )

            break
          default:
            throw "Unhandled webhook event type"
        }

        res.status(200).end()
        break
      default:
        throw "Method not allowed"
        break
    }
  } catch (e: any) {
    console.error(e)
    res.status(400).json({ error: e?.name || e })
  }
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}

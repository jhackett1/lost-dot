import type { NextApiHandler } from "next"
import prisma from "../../lib/prisma"
import { sendConfirmationEmail } from "../../lib/emails"
import Stripe from "stripe"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        const sig = req.headers["stripe-signature"]

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2022-11-15",
        })

        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SIGNING_SECRET
        )

        switch (event.type) {
          case "charge.succeeded":
            const charge = event.data.object as Stripe.Charge

            const updatedApplication = await prisma.application.update({
              where: {
                raceId_userId: {
                  raceId: charge.metadata["raceId"],
                  userId: charge.metadata["userId"],
                },
              },
              data: {
                submittedAt: new Date(),
              },
            })

            await sendConfirmationEmail(
              charge.metadata["userId"],
              updatedApplication
            )

            break
          default:
            throw "Unhandled webhook event type"
        }

        res.status(200)
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

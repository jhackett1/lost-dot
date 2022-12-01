import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import prisma from "../../lib/prisma"
import { UserInputSchema } from "../../lib/validators"
import { authOptions } from "./auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "PUT":
        const data = JSON.parse(req.body)
        UserInputSchema.parse(data)
        const session = await unstable_getServerSession(req, res, authOptions)
        const result = await prisma.user.update({
          where: {
            email: session.user.email,
          },
          data: {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth),
            onboardedAt: new Date(), // the first time the user edits their profile, they become onboarded
          },
        })

        res.status(200).json(result)
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

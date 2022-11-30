import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import prisma from "../../lib/prisma"
import { authOptions } from "./auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "PUT":
        const data = JSON.parse(req.body)

        const session = await unstable_getServerSession(req, res, authOptions)
        const result = await prisma.user.update({
          where: {
            email: session.user.email,
          },
          data,
        })

        res.status(201).json(result)
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

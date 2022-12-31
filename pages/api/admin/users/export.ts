import type { NextApiHandler } from "next"
import prisma from "../../../../lib/prisma"
import csv from "csvjson"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const session = await unstable_getServerSession(req, res, authOptions)

        if (!session.user.admin) throw "Unauthorised"

        const users = await prisma.user.findMany()
        const data = csv.toCSV(users)

        res.status(200).send(data)
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

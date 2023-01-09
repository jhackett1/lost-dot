import { Prisma } from "@prisma/client"
import type { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import prisma from "../../../../lib/prisma"
import { UserAdminFilters } from "../../../../types"
import { authOptions } from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "PUT":
        const session = await unstable_getServerSession(req, res, authOptions)

        if (!session || !session.user.admin) throw "Unauthorised"

        const data = JSON.parse(req.body)

        const user = await prisma.user.update({
          where: {
            id: req.query.id as string,
          },
          data: {
            admin: data.admin,
          },
        })

        res.status(200).send(user)
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

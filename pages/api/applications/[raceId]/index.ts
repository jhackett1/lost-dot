import type { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import prisma from "../../../../lib/prisma"
import { authOptions } from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      // handle saving application answers
      case "PUT":
        const { raceId } = req.query
        const data = JSON.parse(req.body)

        const session = await unstable_getServerSession(req, res, authOptions)

        if (!session) throw "Unauthorised"

        const existingApplication = await prisma.application.findUnique({
          where: {
            raceId_userId: {
              raceId: raceId as string,
              userId: session.user.id,
            },
          },
          select: {
            answers: true,
          },
        })

        const result = await prisma.application.update({
          where: {
            raceId_userId: {
              raceId: raceId as string,
              userId: session.user.id,
            },
          },
          data: {
            answers: {
              ...(existingApplication.answers as object),
              ...data,
            },
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

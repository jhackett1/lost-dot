import { ApplicationType } from "@prisma/client"
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import prisma from "../../../../lib/prisma"
import { UserInputSchema } from "../../../../lib/validators"
import { ApplicationAdminFilters } from "../../../../types"
import { authOptions } from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const { search, type, race_id } = req.query as ApplicationAdminFilters

        const applications = await prisma.application.findMany({
          where: {
            raceId: race_id,
            type: type as ApplicationType,

            OR: search
              ? [
                  {
                    user: {
                      firstName: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    user: {
                      lastName: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    user: {
                      email: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                ]
              : undefined,
          },
          include: {
            user: true,
          },
        })

        res.status(200).json({
          count: applications.length,
          data: applications,
        })
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

import { ApplicationType } from "@prisma/client"
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import prisma from "../../../../lib/prisma"
import { UserInputSchema } from "../../../../lib/validators"
import { ApplicationAdminFilters, UserAdminFilters } from "../../../../types"
import { authOptions } from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const { search, only_admins, only_with_applications } =
          req.query as UserAdminFilters

        const users = await prisma.user.findMany({
          where: {
            admin: only_admins ? true : undefined,
            applications: only_with_applications
              ? {
                  some: {},
                }
              : undefined,

            OR: search
              ? [
                  {
                    firstName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ]
              : undefined,
          },
          include: {
            applications: true,
          },
        })

        res.status(200).json({
          count: users.length,
          data: users,
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

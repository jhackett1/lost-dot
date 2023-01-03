import { Prisma } from "@prisma/client"
import type { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import prisma from "../../../../lib/prisma"
import { UserAdminFilters } from "../../../../types"
import { authOptions } from "../../auth/[...nextauth]"

export const commonUsersQuery: Prisma.UserFindManyArgs = {
  include: {
    applications: true,
    sessions: {
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    },
  },
  orderBy: {
    admin: "desc",
  },
}

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const session = await unstable_getServerSession(req, res, authOptions)

        if (!session || !session.user.admin) throw "Unauthorised"

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
          ...commonUsersQuery,
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

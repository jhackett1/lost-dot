import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User } from "@prisma/client"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { createCustomer } from "../../../lib/payments"
import prisma from "../../../lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/check-email",
  },
  callbacks: {
    session: async ({ session, user }) => {
      const u: User = user

      session.user.id = u.id
      session.user.firstName = u.firstName
      session.user.admin = u.admin
      session.user.customerId = u.customerId

      return session
    },

    signIn: async ({ user, account, profile, email, credentials }) => {
      const u: User = user

      // if the customer doesn't have an id, give them one
      if (!u.customerId) {
        const customer = await createCustomer()

        await prisma.user.update({
          where: {
            id: u.id,
          },
          data: {
            customerId: customer.id,
          },
        })
      }

      return true
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ url }) {
        if (process.env.NODE_ENV === "development")
          console.log(`Sign in URL: ${url}`)
      },
    }),
  ],
}

export default NextAuth(authOptions)

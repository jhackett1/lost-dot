import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User } from "@prisma/client"
import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { sendMagicLink } from "../../../lib/emails"
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

    redirect: async (...args) => {
      console.log("REDIRECT CALLBACK TRIGGERED WITH: ", args)
      return "/fake-path"
    },

    signIn: async ({ user, account, profile, email, credentials }) => {
      const u: User = user

      // if the customer doesn't have an id, give them one
      if (!u.customerId) {
        const customer = await createCustomer()

        await prisma.user.upsert({
          where: {
            email: u.email,
          },
          create: {
            customerId: customer.id,
          },
          update: {
            customerId: customer.id,
          },
        })
      }

      return true
    },
  },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ url, ...args }) => {
        if (process.env.NODE_ENV === "development")
          console.log(`Sign in URL: ${url}`) // for local dev

        await sendMagicLink({ url, ...args })
      },
    }),
  ],
}

export default NextAuth(authOptions)
